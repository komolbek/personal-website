import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/shared/EmptyState';
import { formatCurrency, formatDate, intlLocale } from '@/lib/utils';
import { revalidatePath } from 'next/cache';
import { DollarSign, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import { RevenueChart } from '@/components/charts/RevenueChart';
import { CategoryPieChart } from '@/components/charts/CategoryPieChart';
import { TransactionDialog } from './TransactionDialog';
import { getServerT, getLocale } from '@/lib/i18n/server';
import type { Locale } from '@/lib/i18n/config';

async function addPayment(formData: FormData) {
  'use server';
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') return;

  await prisma.hubPayment.create({
    data: {
      type: formData.get('type') as any,
      amount: parseFloat(formData.get('amount') as string),
      currency: (formData.get('currency') as any) || 'USD',
      category: formData.get('category') as any,
      description: formData.get('description') as string,
      date: formData.get('date') ? new Date(formData.get('date') as string) : new Date(),
      recurring: formData.get('recurring') === 'on',
      recurringInterval: formData.get('recurringInterval') as any || null,
      projectId: (formData.get('projectId') as string) || null,
      productId: (formData.get('productId') as string) || null,
      notes: (formData.get('notes') as string) || null,
    },
  });

  revalidatePath('/finances');
}

async function deletePayment(formData: FormData) {
  'use server';
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') return;

  await prisma.hubPayment.delete({ where: { id: formData.get('id') as string } });
  revalidatePath('/finances');
}

async function runOverdueCheck() {
  'use server';
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') return;

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  await prisma.hubClient.updateMany({
    where: {
      paymentStatus: 'ACTIVE',
      monthlyFee: { gt: 0 },
      OR: [
        { lastPayment: { lt: thirtyDaysAgo } },
        { lastPayment: null, startDate: { lt: thirtyDaysAgo } },
      ],
    },
    data: { paymentStatus: 'OVERDUE' },
  });

  revalidatePath('/finances');
}

// Amounts are stored per payment in their own currency and there is no
// exchange rate anywhere in the schema. Adding a UZS amount to a USD one
// produces a number that means nothing, so every total below is kept per
// currency and rendered separately rather than converted.
const CURRENCY_ORDER = ['USD', 'UZS'];

type Money = { amount: number; currency: string };

function currenciesPresent(payments: Money[]): string[] {
  const seen = new Set(payments.map((p) => p.currency));
  const ordered = CURRENCY_ORDER.filter((c) => seen.has(c));
  const rest = Array.from(seen).filter((c) => !CURRENCY_ORDER.includes(c)).sort();
  const all = [...ordered, ...rest];
  // With no payments at all, still render a single zero figure.
  return all.length > 0 ? all : ['USD'];
}

function sumByCurrency(
  payments: (Money & { type: string })[],
  type: string
): Record<string, number> {
  const totals: Record<string, number> = {};
  for (const p of payments) {
    if (p.type !== type) continue;
    totals[p.currency] = (totals[p.currency] || 0) + p.amount;
  }
  return totals;
}

function getMonthlyData(payments: { type: string; amount: number; date: Date }[], locale: Locale) {
  const months: Record<string, { income: number; expenses: number }> = {};
  const now = new Date();

  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = d.toLocaleDateString(intlLocale(locale), { month: 'short', year: '2-digit' });
    months[key] = { income: 0, expenses: 0 };
  }

  payments.forEach((p) => {
    const d = new Date(p.date);
    const key = d.toLocaleDateString(intlLocale(locale), { month: 'short', year: '2-digit' });
    if (months[key]) {
      if (p.type === 'INCOME') months[key].income += p.amount;
      else months[key].expenses += p.amount;
    }
  });

  return Object.entries(months).map(([month, data]) => ({ month, ...data }));
}

function getCategoryBreakdown(payments: { type: string; category: string; amount: number }[], type: string) {
  const categories: Record<string, number> = {};
  payments
    .filter((p) => p.type === type)
    .forEach((p) => {
      const label = p.category.replace(/_/g, ' ');
      categories[label] = (categories[label] || 0) + p.amount;
    });

  return Object.entries(categories)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}

export default async function FinancesPage() {
  const session = await getSession();
  if (!session) redirect('/login');

  const t = getServerT();
  const locale = getLocale();

  if (session.role === 'VIEWER') {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">{t('finances.title')}</h1>
        <p className="text-muted-foreground">{t('finances.noPermission')}</p>
      </div>
    );
  }

  const [payments, projects, products] = await Promise.all([
    prisma.hubPayment.findMany({
      include: { project: true, product: true, client: true },
      orderBy: { date: 'desc' },
    }),
    prisma.hubProject.findMany({ select: { id: true, name: true }, orderBy: { name: 'asc' } }),
    prisma.hubProduct.findMany({ select: { id: true, name: true }, orderBy: { name: 'asc' } }),
  ]);

  // Derived from the full payment list rather than a SQL SUM, because the sum
  // has to be grouped by currency and the rows are already loaded here.
  const currencies = currenciesPresent(payments);
  const incomeByCurrency = sumByCurrency(payments, 'INCOME');
  const expensesByCurrency = sumByCurrency(payments, 'EXPENSE');

  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const thisMonthPayments = payments.filter(
    (p) => new Date(p.date) >= startOfMonth
  );
  const thisMonthIncomeByCurrency = sumByCurrency(thisMonthPayments, 'INCOME');
  const thisMonthExpensesByCurrency = sumByCurrency(thisMonthPayments, 'EXPENSE');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{t('finances.title')}</h1>
          <p className="text-muted-foreground">{t('finances.subtitle')}</p>
        </div>
        <div className="flex items-center gap-2">
          {session.role === 'ADMIN' && (
            <>
              <TransactionDialog action={addPayment} projects={projects} products={products} />
              <form action={runOverdueCheck}>
                <Button type="submit" variant="outline" size="sm">
                  <AlertTriangle className="h-4 w-4 mr-2" /> {t('finances.checkOverdue')}
                </Button>
              </form>
            </>
          )}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{t('finances.card.totalIncome')}</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {currencies.map((c) => (
                <div key={c} className="text-2xl font-bold text-green-600">
                  {formatCurrency(incomeByCurrency[c] || 0, c)}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{t('finances.card.totalExpenses')}</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {currencies.map((c) => (
                <div key={c} className="text-2xl font-bold text-red-600">
                  {formatCurrency(expensesByCurrency[c] || 0, c)}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{t('finances.card.netProfit')}</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {currencies.map((c) => {
                const net = (incomeByCurrency[c] || 0) - (expensesByCurrency[c] || 0);
                return (
                  <div key={c} className={`text-2xl font-bold ${net >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(net, c)}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{t('finances.card.monthPL')}</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {currencies.map((c) => {
                const net =
                  (thisMonthIncomeByCurrency[c] || 0) - (thisMonthExpensesByCurrency[c] || 0);
                return (
                  <div key={c} className={`text-2xl font-bold ${net >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(net, c)}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {currencies.map((c) => (
          <Card key={`revenue-${c}`}>
            <CardHeader>
              <CardTitle>
                {t('finances.chart.monthlyRevenue')} · {c}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RevenueChart
                data={getMonthlyData(payments.filter((p) => p.currency === c), locale)}
              />
            </CardContent>
          </Card>
        ))}

        {currencies.map((c) => (
          <Card key={`expenses-${c}`}>
            <CardHeader>
              <CardTitle>
                {t('finances.chart.expenseBreakdown')} · {c}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CategoryPieChart
                data={getCategoryBreakdown(payments.filter((p) => p.currency === c), 'EXPENSE')}
              />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Transaction List */}
      {payments.length === 0 ? (
        <EmptyState
          icon={<DollarSign className="h-12 w-12" />}
          title={t('finances.empty.title')}
          description={t('finances.empty.description')}
        />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>{t('finances.allTransactions', { count: payments.length })}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left p-3 font-medium">{t('common.date')}</th>
                      <th className="text-left p-3 font-medium">{t('common.description')}</th>
                      <th className="text-left p-3 font-medium">{t('common.category')}</th>
                      <th className="text-left p-3 font-medium">{t('finances.table.linkedTo')}</th>
                      <th className="text-right p-3 font-medium">{t('common.amount')}</th>
                      {session.role === 'ADMIN' && <th className="p-3 w-16"></th>}
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((payment) => (
                      <tr key={payment.id} className="border-b hover:bg-muted/30">
                        <td className="p-3 whitespace-nowrap">{formatDate(payment.date, locale)}</td>
                        <td className="p-3">
                          {payment.description}
                          {payment.recurring && (
                            <span className="ml-1 text-xs text-muted-foreground">{t('finances.recurring')}</span>
                          )}
                        </td>
                        <td className="p-3">
                          <span className="text-xs">{t(`enum.${payment.category}`)}</span>
                        </td>
                        <td className="p-3 text-xs text-muted-foreground">
                          {payment.project?.name || payment.product?.name || payment.client?.name || '—'}
                        </td>
                        <td className={`p-3 text-right font-medium whitespace-nowrap ${payment.type === 'INCOME' ? 'text-green-600' : 'text-red-600'}`}>
                          {payment.type === 'INCOME' ? '+' : '-'}{formatCurrency(payment.amount, payment.currency)}
                        </td>
                        {session.role === 'ADMIN' && (
                          <td className="p-3">
                            <form action={deletePayment}>
                              <input type="hidden" name="id" value={payment.id} />
                              <Button type="submit" variant="ghost" size="sm" className="text-destructive h-7 text-xs">
                                {t('finances.delete')}
                              </Button>
                            </form>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

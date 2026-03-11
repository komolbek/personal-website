import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/shared/EmptyState';
import { formatCurrency, formatDate } from '@/lib/utils';
import { revalidatePath } from 'next/cache';
import { DollarSign, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import { RevenueChart } from '@/components/charts/RevenueChart';
import { CategoryPieChart } from '@/components/charts/CategoryPieChart';
import { TransactionDialog } from './TransactionDialog';

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

function getMonthlyData(payments: { type: string; amount: number; date: Date }[]) {
  const months: Record<string, { income: number; expenses: number }> = {};
  const now = new Date();

  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
    months[key] = { income: 0, expenses: 0 };
  }

  payments.forEach((p) => {
    const d = new Date(p.date);
    const key = d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
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

  if (session.role === 'VIEWER') {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Finances</h1>
        <p className="text-muted-foreground">You do not have permission to view financial data.</p>
      </div>
    );
  }

  const [payments, projects, products, incomeAgg, expenseAgg] = await Promise.all([
    prisma.hubPayment.findMany({
      include: { project: true, product: true, client: true },
      orderBy: { date: 'desc' },
    }),
    prisma.hubProject.findMany({ select: { id: true, name: true }, orderBy: { name: 'asc' } }),
    prisma.hubProduct.findMany({ select: { id: true, name: true }, orderBy: { name: 'asc' } }),
    prisma.hubPayment.aggregate({ where: { type: 'INCOME' }, _sum: { amount: true } }),
    prisma.hubPayment.aggregate({ where: { type: 'EXPENSE' }, _sum: { amount: true } }),
  ]);

  const totalIncome = incomeAgg._sum.amount || 0;
  const totalExpenses = expenseAgg._sum.amount || 0;
  const netProfit = totalIncome - totalExpenses;

  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const thisMonthIncome = payments
    .filter((p) => p.type === 'INCOME' && new Date(p.date) >= startOfMonth)
    .reduce((s, p) => s + p.amount, 0);

  const thisMonthExpenses = payments
    .filter((p) => p.type === 'EXPENSE' && new Date(p.date) >= startOfMonth)
    .reduce((s, p) => s + p.amount, 0);

  const monthlyData = getMonthlyData(payments);
  const expenseCategories = getCategoryBreakdown(payments, 'EXPENSE');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Finances</h1>
          <p className="text-muted-foreground">Income, expenses, and financial overview</p>
        </div>
        <div className="flex items-center gap-2">
          {session.role === 'ADMIN' && (
            <>
              <TransactionDialog action={addPayment} projects={projects} products={products} />
              <form action={runOverdueCheck}>
                <Button type="submit" variant="outline" size="sm">
                  <AlertTriangle className="h-4 w-4 mr-2" /> Check Overdue
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
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Income</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(totalIncome)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Expenses</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{formatCurrency(totalExpenses)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Net Profit</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(netProfit)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">This Month P&L</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${thisMonthIncome - thisMonthExpenses >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(thisMonthIncome - thisMonthExpenses)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue (Last 12 Months)</CardTitle>
          </CardHeader>
          <CardContent>
            <RevenueChart data={monthlyData} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Expense Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <CategoryPieChart data={expenseCategories} />
          </CardContent>
        </Card>
      </div>

      {/* Transaction List */}
      {payments.length === 0 ? (
        <EmptyState
          icon={<DollarSign className="h-12 w-12" />}
          title="No transactions yet"
          description="Record your first income or expense to start tracking finances."
        />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>All Transactions ({payments.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left p-3 font-medium">Date</th>
                      <th className="text-left p-3 font-medium">Description</th>
                      <th className="text-left p-3 font-medium">Category</th>
                      <th className="text-left p-3 font-medium">Linked To</th>
                      <th className="text-right p-3 font-medium">Amount</th>
                      {session.role === 'ADMIN' && <th className="p-3 w-16"></th>}
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((payment) => (
                      <tr key={payment.id} className="border-b hover:bg-muted/30">
                        <td className="p-3 whitespace-nowrap">{formatDate(payment.date)}</td>
                        <td className="p-3">
                          {payment.description}
                          {payment.recurring && (
                            <span className="ml-1 text-xs text-muted-foreground">(recurring)</span>
                          )}
                        </td>
                        <td className="p-3">
                          <span className="text-xs">{payment.category.replace(/_/g, ' ')}</span>
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
                                Del
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

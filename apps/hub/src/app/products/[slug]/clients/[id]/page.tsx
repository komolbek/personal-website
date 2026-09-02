import { getSession } from '@/lib/auth';
import { redirect, notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { EmptyState } from '@/components/shared/EmptyState';
import { formatCurrency, formatDate } from '@/lib/utils';
import { PhoneInput } from '@/components/ui/phone-input';
import { AmountInput } from '@/components/ui/amount-input';
import Link from 'next/link';
import { ArrowLeft, DollarSign, Trash2 } from 'lucide-react';
import { getServerT, getLocale } from '@/lib/i18n/server';
import {
  updateClient,
  recordPayment,
  deleteClient,
  deletePayment,
} from '@/lib/client-actions';

export default async function ClientDetailPage({ params }: { params: { slug: string; id: string } }) {
  const session = await getSession();
  if (!session) redirect('/login');
  const t = getServerT();
  const locale = getLocale();

  const client = await prisma.hubClient.findUnique({
    where: { id: params.id },
    include: {
      product: true,
      lead: true,
      payments: { orderBy: { date: 'desc' } },
    },
  });

  if (!client) notFound();

  const totalPaid = client.payments
    .filter((p) => p.type === 'INCOME')
    .reduce((s, p) => s + p.amount, 0);

  const isEditor = session.role !== 'VIEWER';

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href={`/products/${params.slug}/clients`}>
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">{client.name}</h1>
          <div className="flex items-center gap-2 mt-1">
            <StatusBadge status={client.paymentStatus} />
            <span className="text-sm text-muted-foreground">{client.product.name}</span>
            {client.plan && <span className="text-sm text-muted-foreground">- {client.plan}</span>}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Client Details Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>{t('clients.details')}</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={updateClient} className="grid gap-4 sm:grid-cols-2">
              <input type="hidden" name="id" value={client.id} />
              <input type="hidden" name="slug" value={params.slug} />
              <div className="space-y-2">
                <Label>{t('clients.businessName')}</Label>
                <Input name="name" defaultValue={client.name} required />
              </div>
              <div className="space-y-2">
                <Label>{t('clients.contactPerson')}</Label>
                <Input name="contactPerson" defaultValue={client.contactPerson || ''} />
              </div>
              <div className="space-y-2">
                <Label>{t('common.phone')}</Label>
                <PhoneInput name="phone" defaultValue={client.phone || ''} />
              </div>
              <div className="space-y-2">
                <Label>{t('clients.plan')}</Label>
                <Input name="plan" defaultValue={client.plan || ''} />
              </div>
              <div className="space-y-2">
                <Label>{t('clients.monthlyFee')}</Label>
                <AmountInput name="monthlyFee" defaultValue={client.monthlyFee} />
              </div>
              <div className="space-y-2">
                <Label>{t('common.currency')}</Label>
                <Select
                  name="currency"
                  defaultValue={client.currency}
                  options={[
                    { value: 'USD', label: 'USD' },
                    { value: 'UZS', label: 'UZS' },
                  ]}
                />
              </div>
              <div className="space-y-2">
                <Label>{t('clients.paymentStatus')}</Label>
                <Select
                  name="paymentStatus"
                  defaultValue={client.paymentStatus}
                  options={[
                    { value: 'ACTIVE', label: t('enum.ACTIVE') },
                    { value: 'OVERDUE', label: t('enum.OVERDUE') },
                    { value: 'CHURNED', label: t('enum.CHURNED') },
                  ]}
                />
              </div>
              <div className="space-y-2">
                <Label>{t('clients.startDate')}</Label>
                <Input type="date" disabled defaultValue={client.startDate ? new Date(client.startDate).toISOString().split('T')[0] : ''} />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>{t('common.notes')}</Label>
                <Textarea name="notes" defaultValue={client.notes || ''} rows={3} />
              </div>
              <div className="sm:col-span-2 flex items-center gap-2">
                {isEditor && <Button type="submit" size="sm">{t('common.saveChanges')}</Button>}
                {session.role === 'ADMIN' && (
                  <form action={deleteClient}>
                    <input type="hidden" name="id" value={client.id} />
                    <input type="hidden" name="slug" value={params.slug} />
                    <Button type="submit" variant="destructive" size="sm">{t('clients.deleteClient')}</Button>
                  </form>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Summary */}
        <Card>
          <CardHeader>
            <CardTitle>{t('clients.summaryTitle')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">{t('clients.monthlyFee')}</span>
              <span className="font-medium">{client.monthlyFee ? formatCurrency(client.monthlyFee, client.currency) : '—'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">{t('clients.totalPaid')}</span>
              <span className="font-medium text-green-600">{formatCurrency(totalPaid, client.currency)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">{t('clients.table.lastPayment')}</span>
              <span className="text-sm">{formatDate(client.lastPayment, locale)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">{t('clients.clientSince')}</span>
              <span className="text-sm">{formatDate(client.startDate, locale)}</span>
            </div>
            {client.lead && (
              <div className="flex justify-between border-t pt-4">
                <span className="text-sm text-muted-foreground">{t('clients.convertedFromLead')}</span>
                <span className="text-sm">{formatDate(client.lead.createdAt, locale)}</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Record Payment */}
      {isEditor && (
        <Card>
          <CardHeader>
            <CardTitle>{t('clients.recordPayment')}</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={recordPayment} className="flex items-end gap-3 flex-wrap">
              <input type="hidden" name="clientId" value={client.id} />
              <input type="hidden" name="slug" value={params.slug} />
              <div className="space-y-1">
                <Label className="text-xs">{t('common.amount')}</Label>
                <AmountInput name="amount" defaultValue={client.monthlyFee} required placeholder="0" className="h-9 w-32" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">{t('clients.payment.description')}</Label>
                <Input name="description" placeholder={t('clients.payment.descriptionPlaceholder')} className="h-9 w-48" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">{t('common.date')}</Label>
                <Input name="date" type="date" defaultValue={new Date().toISOString().split('T')[0]} className="h-9 w-36" />
              </div>
              <Button type="submit" size="sm" variant="outline" className="h-9">
                <DollarSign className="h-3 w-3 mr-1" /> {t('clients.recordPayment')}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle>{t('clients.paymentHistory', { count: client.payments.length })}</CardTitle>
        </CardHeader>
        <CardContent>
          {client.payments.length === 0 ? (
            <EmptyState
              icon={<DollarSign className="h-8 w-8" />}
              title={t('clients.payment.empty.title')}
              description={t('clients.payment.empty.description')}
            />
          ) : (
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left p-3 font-medium">{t('common.date')}</th>
                    <th className="text-left p-3 font-medium">{t('common.description')}</th>
                    <th className="text-left p-3 font-medium">{t('common.type')}</th>
                    <th className="text-right p-3 font-medium">{t('common.amount')}</th>
                    {session.role === 'ADMIN' && <th className="p-3 w-12"></th>}
                  </tr>
                </thead>
                <tbody>
                  {client.payments.map((payment) => (
                    <tr key={payment.id} className="border-b">
                      <td className="p-3">{formatDate(payment.date, locale)}</td>
                      <td className="p-3">{payment.description}</td>
                      <td className="p-3"><StatusBadge status={payment.type} /></td>
                      <td className={`p-3 text-right font-medium ${payment.type === 'INCOME' ? 'text-green-600' : 'text-red-600'}`}>
                        {payment.type === 'INCOME' ? '+' : '-'}{formatCurrency(payment.amount, payment.currency)}
                      </td>
                      {session.role === 'ADMIN' && (
                        <td className="p-3">
                          <form action={deletePayment}>
                            <input type="hidden" name="id" value={payment.id} />
                            <input type="hidden" name="clientId" value={client.id} />
                            <input type="hidden" name="slug" value={params.slug} />
                            <Button type="submit" variant="ghost" size="sm" className="h-7 text-destructive hover:text-destructive">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </form>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

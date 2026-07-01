import { getSession } from '@/lib/auth';
import { redirect, notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { EmptyState } from '@/components/shared/EmptyState';
import { formatCurrency, formatDate } from '@/lib/utils';
import Link from 'next/link';
import { revalidatePath } from 'next/cache';
import { ArrowLeft, UserCheck, DollarSign } from 'lucide-react';
import { AddClientDialog } from './ClientDialogs';
import { getServerT } from '@/lib/i18n/server';

async function createClient(formData: FormData) {
  'use server';
  const session = await getSession();
  if (!session || session.role === 'VIEWER') return;

  const slug = formData.get('slug') as string;

  await prisma.hubClient.create({
    data: {
      productId: formData.get('productId') as string,
      name: formData.get('name') as string,
      contactPerson: (formData.get('contactPerson') as string) || null,
      phone: (formData.get('phone') as string) || null,
      plan: (formData.get('plan') as string) || null,
      monthlyFee: formData.get('monthlyFee') ? parseFloat(formData.get('monthlyFee') as string) : null,
      currency: (formData.get('currency') as any) || 'USD',
      startDate: new Date(),
      notes: (formData.get('notes') as string) || null,
    },
  });

  revalidatePath(`/products/${slug}/clients`);
}

async function recordPayment(formData: FormData) {
  'use server';
  const session = await getSession();
  if (!session || session.role === 'VIEWER') return;

  const clientId = formData.get('clientId') as string;
  const slug = formData.get('slug') as string;

  const client = await prisma.hubClient.findUnique({
    where: { id: clientId },
    include: { product: true },
  });

  if (!client) return;

  const amount = parseFloat(formData.get('amount') as string);

  await prisma.hubPayment.create({
    data: {
      type: 'INCOME',
      amount,
      currency: client.currency,
      category: 'PRODUCT_REVENUE',
      productId: client.productId,
      clientId: client.id,
      description: `${client.product.name} - ${client.name} subscription`,
      date: new Date(),
    },
  });

  await prisma.hubClient.update({
    where: { id: clientId },
    data: { lastPayment: new Date(), paymentStatus: 'ACTIVE' },
  });

  revalidatePath(`/products/${slug}/clients`);
}

export default async function ClientsPage({ params }: { params: { slug: string } }) {
  const session = await getSession();
  if (!session) redirect('/login');
  const t = getServerT();

  const product = await prisma.hubProduct.findUnique({
    where: { slug: params.slug },
    include: {
      clients: {
        include: { lead: true },
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  if (!product) notFound();

  const totalMRR = product.clients
    .filter((c) => c.paymentStatus === 'ACTIVE')
    .reduce((s, c) => s + (c.monthlyFee || 0), 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href={`/products/${params.slug}`}>
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{t('clients.title', { product: product.name })}</h1>
          <p className="text-muted-foreground">
            {t('clients.summary', { count: product.clients.length, mrr: formatCurrency(totalMRR) })}
          </p>
        </div>
        {session.role !== 'VIEWER' && (
          <AddClientDialog productId={product.id} slug={params.slug} action={createClient} />
        )}
      </div>

      {/* Client List */}
      {product.clients.length === 0 ? (
        <EmptyState
          icon={<UserCheck className="h-12 w-12" />}
          title={t('clients.empty.title')}
          description={t('clients.empty.description', { product: product.name })}
        />
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-3 font-medium">{t('clients.table.name')}</th>
                  <th className="text-left p-3 font-medium">{t('clients.table.plan')}</th>
                  <th className="text-left p-3 font-medium">{t('clients.table.monthlyFee')}</th>
                  <th className="text-left p-3 font-medium">{t('clients.table.status')}</th>
                  <th className="text-left p-3 font-medium">{t('clients.table.lastPayment')}</th>
                  <th className="text-left p-3 font-medium">{t('clients.table.action')}</th>
                </tr>
              </thead>
              <tbody>
                {product.clients.map((client) => (
                  <tr key={client.id} className="border-b hover:bg-muted/30">
                    <td className="p-3">
                      <Link href={`/products/${params.slug}/clients/${client.id}`} className="block">
                        <div className="font-medium text-primary hover:underline">{client.name}</div>
                        {client.contactPerson && (
                          <div className="text-xs text-muted-foreground">{client.contactPerson}</div>
                        )}
                      </Link>
                    </td>
                    <td className="p-3">{client.plan || '—'}</td>
                    <td className="p-3">{client.monthlyFee ? formatCurrency(client.monthlyFee, client.currency) : '—'}</td>
                    <td className="p-3"><StatusBadge status={client.paymentStatus} /></td>
                    <td className="p-3">{formatDate(client.lastPayment)}</td>
                    <td className="p-3">
                      {session.role !== 'VIEWER' && (
                        <form action={recordPayment} className="flex items-center gap-1">
                          <input type="hidden" name="clientId" value={client.id} />
                          <input type="hidden" name="slug" value={params.slug} />
                          <Input
                            name="amount"
                            type="number"
                            step="0.01"
                            defaultValue={client.monthlyFee || ''}
                            className="h-7 w-24 text-xs"
                            required
                          />
                          <Button type="submit" size="sm" variant="outline" className="h-7 text-xs">
                            <DollarSign className="h-3 w-3 mr-1" /> {t('clients.pay')}
                          </Button>
                        </form>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

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
import Link from 'next/link';
import { revalidatePath } from 'next/cache';
import { ArrowLeft, UserCheck, Plus, DollarSign } from 'lucide-react';

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
      startDate: formData.get('startDate') ? new Date(formData.get('startDate') as string) : new Date(),
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
        <Link href="/products">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">{product.name} - Clients</h1>
          <p className="text-muted-foreground">
            {product.clients.length} clients | MRR: {formatCurrency(totalMRR)}
          </p>
        </div>
      </div>

      {/* Add Client Form */}
      {session.role !== 'VIEWER' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Plus className="h-4 w-4" /> Add Client
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form action={createClient} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <input type="hidden" name="productId" value={product.id} />
              <input type="hidden" name="slug" value={params.slug} />
              <div className="space-y-2">
                <Label>Business Name</Label>
                <Input name="name" placeholder="e.g., Seven Salon" required />
              </div>
              <div className="space-y-2">
                <Label>Contact Person</Label>
                <Input name="contactPerson" placeholder="Name" />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input name="phone" placeholder="+998..." />
              </div>
              <div className="space-y-2">
                <Label>Plan</Label>
                <Input name="plan" placeholder="e.g., Basic, Pro" />
              </div>
              <div className="space-y-2">
                <Label>Monthly Fee</Label>
                <Input name="monthlyFee" type="number" step="0.01" placeholder="0.00" />
              </div>
              <div className="space-y-2">
                <Label>Currency</Label>
                <Select
                  name="currency"
                  defaultValue="UZS"
                  options={[
                    { value: 'USD', label: 'USD' },
                    { value: 'UZS', label: 'UZS' },
                  ]}
                />
              </div>
              <div className="space-y-2 sm:col-span-2 lg:col-span-3">
                <Label>Notes</Label>
                <Textarea name="notes" rows={2} />
              </div>
              <div>
                <Button type="submit" size="sm">Add Client</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Client List */}
      {product.clients.length === 0 ? (
        <EmptyState
          icon={<UserCheck className="h-12 w-12" />}
          title="No clients yet"
          description={`${product.name} doesn't have any paying clients yet.`}
        />
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-3 font-medium">Name</th>
                  <th className="text-left p-3 font-medium">Plan</th>
                  <th className="text-left p-3 font-medium">Monthly Fee</th>
                  <th className="text-left p-3 font-medium">Status</th>
                  <th className="text-left p-3 font-medium">Last Payment</th>
                  <th className="text-left p-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {product.clients.map((client) => (
                  <tr key={client.id} className="border-b hover:bg-muted/30">
                    <td className="p-3">
                      <div className="font-medium">{client.name}</div>
                      {client.contactPerson && (
                        <div className="text-xs text-muted-foreground">{client.contactPerson}</div>
                      )}
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
                            <DollarSign className="h-3 w-3 mr-1" /> Pay
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

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
import { formatCurrency, formatDate } from '@/lib/utils';
import Link from 'next/link';
import { revalidatePath } from 'next/cache';
import { ArrowLeft, Users, UserCheck, DollarSign } from 'lucide-react';

async function updateProduct(formData: FormData) {
  'use server';
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') return;

  const id = formData.get('id') as string;
  const slug = formData.get('slug') as string;

  await prisma.hubProduct.update({
    where: { id },
    data: {
      name: formData.get('name') as string,
      status: formData.get('status') as any,
      description: (formData.get('description') as string) || null,
      url: (formData.get('url') as string) || null,
    },
  });

  revalidatePath(`/products/${slug}`);
}

async function deleteProduct(formData: FormData) {
  'use server';
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') return;

  const id = formData.get('id') as string;
  await prisma.hubProduct.delete({ where: { id } });
  redirect('/products');
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const session = await getSession();
  if (!session) redirect('/login');

  const product = await prisma.hubProduct.findUnique({
    where: { slug: params.slug },
    include: {
      leads: { orderBy: { createdAt: 'desc' }, take: 5 },
      clients: { orderBy: { createdAt: 'desc' }, take: 5 },
      payments: { orderBy: { date: 'desc' }, take: 10 },
      _count: { select: { leads: true, clients: true, payments: true } },
    },
  });

  if (!product) notFound();

  const totalRevenue = product.payments
    .filter((p) => p.type === 'INCOME')
    .reduce((s, p) => s + p.amount, 0);

  const activeMRR = product.clients
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
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <div className="flex items-center gap-2 mt-1">
            <StatusBadge status={product.status} />
            {product.url && (
              <a href={product.url} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                {product.url}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{product._count.leads}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Clients</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{product._count.clients}</div>
            <p className="text-xs text-muted-foreground">MRR: {formatCurrency(activeMRR)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(totalRevenue)}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Edit Product */}
        {session.role === 'ADMIN' && (
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form action={updateProduct} className="grid gap-4 sm:grid-cols-2">
                <input type="hidden" name="id" value={product.id} />
                <input type="hidden" name="slug" value={product.slug} />
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input name="name" defaultValue={product.name} required />
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select
                    name="status"
                    defaultValue={product.status}
                    options={[
                      { value: 'ACTIVE', label: 'Active' },
                      { value: 'PARKED', label: 'Parked' },
                      { value: 'ARCHIVED', label: 'Archived' },
                    ]}
                  />
                </div>
                <div className="space-y-2">
                  <Label>URL</Label>
                  <Input name="url" defaultValue={product.url || ''} placeholder="https://..." />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea name="description" defaultValue={product.description || ''} rows={1} />
                </div>
                <div className="sm:col-span-2 flex items-center gap-2">
                  <Button type="submit" size="sm">Save Changes</Button>
                  <form action={deleteProduct}>
                    <input type="hidden" name="id" value={product.id} />
                    <Button type="submit" variant="destructive" size="sm">Delete Product</Button>
                  </form>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Quick Links */}
        <Card>
          <CardHeader>
            <CardTitle>Manage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href={`/products/${product.slug}/leads`} className="block">
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" /> Leads ({product._count.leads})
              </Button>
            </Link>
            <Link href={`/products/${product.slug}/clients`} className="block">
              <Button variant="outline" className="w-full justify-start">
                <UserCheck className="h-4 w-4 mr-2" /> Clients ({product._count.clients})
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Recent Clients */}
      {product.clients.length > 0 && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Clients</CardTitle>
            <Link href={`/products/${product.slug}/clients`}>
              <Button variant="outline" size="sm">View All</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left p-3 font-medium">Name</th>
                    <th className="text-left p-3 font-medium">Plan</th>
                    <th className="text-left p-3 font-medium">Status</th>
                    <th className="text-left p-3 font-medium">Last Payment</th>
                  </tr>
                </thead>
                <tbody>
                  {product.clients.map((client) => (
                    <tr key={client.id} className="border-b">
                      <td className="p-3 font-medium">
                        <Link href={`/products/${product.slug}/clients/${client.id}`} className="text-primary hover:underline">
                          {client.name}
                        </Link>
                      </td>
                      <td className="p-3">{client.plan || '—'}</td>
                      <td className="p-3"><StatusBadge status={client.paymentStatus} /></td>
                      <td className="p-3">{formatDate(client.lastPayment)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

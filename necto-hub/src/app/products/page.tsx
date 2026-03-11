import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { EmptyState } from '@/components/shared/EmptyState';
import Link from 'next/link';
import { revalidatePath } from 'next/cache';
import { Package, Users, UserCheck, Plus } from 'lucide-react';

async function createProduct(formData: FormData) {
  'use server';
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') return;

  const name = formData.get('name') as string;
  const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const status = formData.get('status') as 'ACTIVE' | 'PARKED' | 'ARCHIVED';
  const description = formData.get('description') as string;
  const url = formData.get('url') as string;

  await prisma.hubProduct.create({
    data: { name, slug, status, description: description || null, url: url || null },
  });

  revalidatePath('/products');
}

async function deleteProduct(formData: FormData) {
  'use server';
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') return;

  const id = formData.get('id') as string;
  await prisma.hubProduct.delete({ where: { id } });
  revalidatePath('/products');
}

export default async function ProductsPage() {
  const session = await getSession();
  if (!session) redirect('/login');

  const products = await prisma.hubProduct.findMany({
    include: {
      _count: { select: { leads: true, clients: true } },
    },
    orderBy: [{ status: 'asc' }, { name: 'asc' }],
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-muted-foreground">In-house products and services</p>
        </div>
      </div>

      {/* Add Product Form (Admin only) */}
      {session.role === 'ADMIN' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Plus className="h-4 w-4" /> Add Product
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form action={createProduct} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" placeholder="e.g., Wabi" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  id="status"
                  name="status"
                  defaultValue="ACTIVE"
                  options={[
                    { value: 'ACTIVE', label: 'Active' },
                    { value: 'PARKED', label: 'Parked' },
                    { value: 'ARCHIVED', label: 'Archived' },
                  ]}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="url">URL</Label>
                <Input id="url" name="url" placeholder="https://..." />
              </div>
              <div className="space-y-2 sm:col-span-2 lg:col-span-1">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" placeholder="Brief description..." rows={1} />
              </div>
              <div className="sm:col-span-2 lg:col-span-4">
                <Button type="submit" size="sm">Add Product</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Product List */}
      {products.length === 0 ? (
        <EmptyState
          icon={<Package className="h-12 w-12" />}
          title="No products yet"
          description="Add your first product to start tracking leads and clients."
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Card key={product.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <StatusBadge status={product.status} />
                </div>
                {product.description && (
                  <p className="text-sm text-muted-foreground">{product.description}</p>
                )}
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6 mb-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{product._count.leads} leads</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <UserCheck className="h-4 w-4 text-muted-foreground" />
                    <span>{product._count.clients} clients</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link href={`/products/${product.slug}/leads`}>
                    <Button variant="outline" size="sm">Leads</Button>
                  </Link>
                  <Link href={`/products/${product.slug}/clients`}>
                    <Button variant="outline" size="sm">Clients</Button>
                  </Link>
                  {session.role === 'ADMIN' && (
                    <form action={deleteProduct} className="ml-auto">
                      <input type="hidden" name="id" value={product.id} />
                      <Button type="submit" variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                        Delete
                      </Button>
                    </form>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

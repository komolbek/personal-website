import { getSession } from '@/lib/auth';
import { redirect, notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { EmptyState } from '@/components/shared/EmptyState';
import { KanbanBoard } from '@/components/shared/KanbanBoard';
import Link from 'next/link';
import { revalidatePath } from 'next/cache';
import { ArrowLeft, Users, Plus } from 'lucide-react';

const LEAD_STATUSES = [
  { value: 'NOT_CONTACTED', label: 'Not Contacted' },
  { value: 'CONTACTED', label: 'Contacted' },
  { value: 'DEMO_SCHEDULED', label: 'Demo Scheduled' },
  { value: 'DEMO_DONE', label: 'Demo Done' },
  { value: 'TRIAL', label: 'Trial' },
  { value: 'NEGOTIATING', label: 'Negotiating' },
  { value: 'SIGNED', label: 'Signed' },
  { value: 'LOST', label: 'Lost' },
];

const LEAD_SOURCES = [
  { value: 'WALK_IN', label: 'Walk-in' },
  { value: 'INSTAGRAM', label: 'Instagram' },
  { value: 'REFERRAL', label: 'Referral' },
  { value: 'GOOGLE_MAPS', label: 'Google Maps' },
  { value: 'TWOGIS', label: '2GIS' },
  { value: 'OTHER', label: 'Other' },
];

async function createLead(formData: FormData) {
  'use server';
  const session = await getSession();
  if (!session || session.role === 'VIEWER') return;

  const productId = formData.get('productId') as string;
  const slug = formData.get('slug') as string;

  await prisma.hubLead.create({
    data: {
      productId,
      name: formData.get('name') as string,
      contactPerson: (formData.get('contactPerson') as string) || null,
      phone: (formData.get('phone') as string) || null,
      telegram: (formData.get('telegram') as string) || null,
      instagram: (formData.get('instagram') as string) || null,
      source: (formData.get('source') as any) || 'OTHER',
      status: 'NOT_CONTACTED',
      notes: (formData.get('notes') as string) || null,
      followUp: formData.get('followUp') ? new Date(formData.get('followUp') as string) : null,
    },
  });

  revalidatePath(`/products/${slug}/leads`);
}

export default async function LeadsPage({ params }: { params: { slug: string } }) {
  const session = await getSession();
  if (!session) redirect('/login');

  const product = await prisma.hubProduct.findUnique({
    where: { slug: params.slug },
    include: {
      leads: { orderBy: { createdAt: 'desc' } },
    },
  });

  if (!product) notFound();

  // Build columns for Kanban board - show all statuses
  const kanbanColumns = LEAD_STATUSES.map((s) => ({
    ...s,
    leads: product.leads
      .filter((l) => l.status === s.value)
      .map((l) => ({
        id: l.id,
        name: l.name,
        contactPerson: l.contactPerson,
        phone: l.phone,
        telegram: l.telegram,
        source: l.source,
        status: l.status,
        followUp: l.followUp?.toISOString() || null,
        notes: l.notes,
      })),
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/products">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">{product.name} - Leads</h1>
          <p className="text-muted-foreground">{product.leads.length} total leads</p>
        </div>
      </div>

      {/* Add Lead Form */}
      {session.role !== 'VIEWER' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Plus className="h-4 w-4" /> Add Lead
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form action={createLead} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <input type="hidden" name="productId" value={product.id} />
              <input type="hidden" name="slug" value={params.slug} />
              <div className="space-y-2">
                <Label>Business Name</Label>
                <Input name="name" placeholder="e.g., Salon Bella" required />
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
                <Label>Telegram</Label>
                <Input name="telegram" placeholder="@username" />
              </div>
              <div className="space-y-2">
                <Label>Source</Label>
                <Select name="source" defaultValue="OTHER" options={LEAD_SOURCES} />
              </div>
              <div className="space-y-2">
                <Label>Follow-up Date</Label>
                <Input name="followUp" type="date" />
              </div>
              <div className="space-y-2 sm:col-span-2 lg:col-span-3">
                <Label>Notes</Label>
                <Textarea name="notes" placeholder="Initial observations..." rows={2} />
              </div>
              <div>
                <Button type="submit" size="sm">Add Lead</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Kanban Board with Drag & Drop */}
      {product.leads.length === 0 ? (
        <EmptyState
          icon={<Users className="h-12 w-12" />}
          title="No leads yet"
          description={`Start adding potential ${product.name} customers.`}
        />
      ) : (
        <KanbanBoard columns={kanbanColumns} slug={params.slug} />
      )}
    </div>
  );
}

import { getSession } from '@/lib/auth';
import { redirect, notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { EmptyState } from '@/components/shared/EmptyState';
import { KanbanBoard } from '@/components/shared/KanbanBoard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { revalidatePath } from 'next/cache';
import { ArrowLeft, Users } from 'lucide-react';
import { AddLeadDialog } from './LeadDialogs';

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
        <Link href={`/products/${params.slug}`}>
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{product.name} - Leads</h1>
          <p className="text-muted-foreground">{product.leads.length} total leads</p>
        </div>
        {session.role !== 'VIEWER' && (
          <AddLeadDialog productId={product.id} slug={params.slug} action={createLead} />
        )}
      </div>

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

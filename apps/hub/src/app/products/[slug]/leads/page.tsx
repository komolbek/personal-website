import { getSession } from '@/lib/auth';
import { redirect, notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { EmptyState } from '@/components/shared/EmptyState';
import { KanbanBoard } from '@/components/shared/KanbanBoard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Users } from 'lucide-react';
import { AddLeadDialog } from './LeadDialogs';
import { createLead } from '@/lib/lead-actions';
import { getServerT } from '@/lib/i18n/server';

const LEAD_STATUS_VALUES = [
  'NOT_CONTACTED',
  'CONTACTED',
  'DEMO_SCHEDULED',
  'DEMO_DONE',
  'TRIAL',
  'NEGOTIATING',
  'SIGNED',
  'LOST',
];


export default async function LeadsPage({ params }: { params: { slug: string } }) {
  const session = await getSession();
  if (!session) redirect('/login');
  const t = getServerT();

  const product = await prisma.hubProduct.findUnique({
    where: { slug: params.slug },
    include: {
      leads: { orderBy: { createdAt: 'desc' } },
    },
  });

  if (!product) notFound();

  const kanbanColumns = LEAD_STATUS_VALUES.map((value) => ({
    value,
    label: t(`enum.${value}`),
    leads: product.leads
      .filter((l) => l.status === value)
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
          <h1 className="text-2xl font-bold">{t('leads.title', { product: product.name })}</h1>
          <p className="text-muted-foreground">{t('leads.totalCount', { count: product.leads.length })}</p>
        </div>
        {session.role !== 'VIEWER' && (
          <AddLeadDialog productId={product.id} slug={params.slug} action={createLead} />
        )}
      </div>

      {product.leads.length === 0 ? (
        <EmptyState
          icon={<Users className="h-12 w-12" />}
          title={t('leads.empty.title')}
          description={t('leads.empty.description', { product: product.name })}
        />
      ) : (
        <KanbanBoard columns={kanbanColumns} slug={params.slug} />
      )}
    </div>
  );
}

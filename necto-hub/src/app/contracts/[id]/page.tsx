import { getSession } from '@/lib/auth';
import { redirect, notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { formatCurrency, formatDate } from '@/lib/utils';
import Link from 'next/link';
import { revalidatePath } from 'next/cache';
import { ArrowLeft, Download } from 'lucide-react';

async function updateContractStatus(formData: FormData) {
  'use server';
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') return;

  const id = formData.get('id') as string;
  const status = formData.get('status') as any;
  const updateData: any = { status };
  if (status === 'SIGNED') updateData.signedDate = new Date();

  await prisma.hubContract.update({ where: { id }, data: updateData });
  revalidatePath(`/contracts/${id}`);
}

export default async function ContractDetailPage({ params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session) redirect('/login');

  const contract = await prisma.hubContract.findUnique({
    where: { id: params.id },
    include: { project: true },
  });

  if (!contract) notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/contracts">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Contract - {contract.clientName}</h1>
          <div className="flex items-center gap-2 mt-1">
            <StatusBadge status={contract.status} />
            <span className="text-sm text-muted-foreground">
              Project: <Link href={`/projects/${contract.project.id}`} className="text-primary hover:underline">{contract.project.name}</Link>
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Contract Content */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Agreement</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-base mb-2">Parties</h3>
                <p className="text-sm">
                  <strong>Service Provider:</strong> Necto Automations LLC<br />
                  <strong>Client:</strong> {contract.clientName}
                  {contract.clientContact && <><br /><strong>Contact:</strong> {contract.clientContact}</>}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-base mb-2">Scope of Work</h3>
                <p className="text-sm whitespace-pre-wrap">
                  {contract.scopeDescription || 'No scope description provided.'}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-base mb-2">Pricing</h3>
                <p className="text-sm">
                  Total Price: <strong>{formatCurrency(contract.totalPrice, contract.currency)}</strong>
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-base mb-2">Payment Terms</h3>
                <p className="text-sm whitespace-pre-wrap">
                  {contract.paymentTerms || '50% upfront, 50% on delivery'}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-base mb-2">Timeline</h3>
                <p className="text-sm">
                  Start Date: <strong>{formatDate(contract.startDate)}</strong><br />
                  Deadline: <strong>{formatDate(contract.deadline)}</strong>
                </p>
              </div>

              {contract.signedDate && (
                <div>
                  <h3 className="font-semibold text-base mb-2">Signed</h3>
                  <p className="text-sm">{formatDate(contract.signedDate)}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Status Sidebar */}
        <Card>
          <CardHeader>
            <CardTitle>Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <a href={`/api/contracts/${contract.id}/pdf`} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="w-full">
                <Download className="h-4 w-4 mr-2" /> Download PDF
              </Button>
            </a>

            {session.role === 'ADMIN' && (
              <form action={updateContractStatus} className="space-y-3">
                <input type="hidden" name="id" value={contract.id} />
                <Select
                  name="status"
                  defaultValue={contract.status}
                  options={[
                    { value: 'DRAFT', label: 'Draft' },
                    { value: 'SENT', label: 'Sent' },
                    { value: 'SIGNED', label: 'Signed' },
                  ]}
                />
                <Button type="submit" size="sm" className="w-full">Update Status</Button>
              </form>
            )}

            <div className="border-t pt-4 space-y-3 text-sm">
              <div>
                <span className="text-muted-foreground">Created</span>
                <p>{formatDate(contract.createdAt)}</p>
              </div>
              {contract.notes && (
                <div>
                  <span className="text-muted-foreground">Notes</span>
                  <p>{contract.notes}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
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
import { FileCheck, Plus } from 'lucide-react';

async function createContract(formData: FormData) {
  'use server';
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') return;

  await prisma.hubContract.create({
    data: {
      projectId: formData.get('projectId') as string,
      clientName: formData.get('clientName') as string,
      clientContact: (formData.get('clientContact') as string) || null,
      scopeDescription: (formData.get('scopeDescription') as string) || null,
      totalPrice: parseFloat(formData.get('totalPrice') as string),
      currency: (formData.get('currency') as any) || 'USD',
      paymentTerms: (formData.get('paymentTerms') as string) || null,
      startDate: formData.get('startDate') ? new Date(formData.get('startDate') as string) : null,
      deadline: formData.get('deadline') ? new Date(formData.get('deadline') as string) : null,
    },
  });

  revalidatePath('/contracts');
}

export default async function ContractsPage() {
  const session = await getSession();
  if (!session) redirect('/login');

  const [contracts, projectsWithoutContract] = await Promise.all([
    prisma.hubContract.findMany({
      include: { project: true },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.hubProject.findMany({
      where: { contract: null },
      select: { id: true, name: true, totalPrice: true, clientContact: true },
      orderBy: { name: 'asc' },
    }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Contracts</h1>
        <p className="text-muted-foreground">Project agreements and contracts</p>
      </div>

      {session.role === 'ADMIN' && projectsWithoutContract.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Plus className="h-4 w-4" /> New Contract
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form action={createContract} className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Project</Label>
                <Select
                  name="projectId"
                  placeholder="Select project..."
                  options={projectsWithoutContract.map((p) => ({ value: p.id, label: p.name }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Client Name</Label>
                <Input name="clientName" required />
              </div>
              <div className="space-y-2">
                <Label>Client Contact</Label>
                <Input name="clientContact" />
              </div>
              <div className="space-y-2">
                <Label>Total Price (USD)</Label>
                <Input name="totalPrice" type="number" step="0.01" required />
              </div>
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input name="startDate" type="date" />
              </div>
              <div className="space-y-2">
                <Label>Deadline</Label>
                <Input name="deadline" type="date" />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>Scope Description</Label>
                <Textarea name="scopeDescription" rows={3} placeholder="What you're building..." />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>Payment Terms</Label>
                <Textarea name="paymentTerms" rows={2} placeholder="e.g., 50% upfront, 50% on delivery" />
              </div>
              <div>
                <Button type="submit" size="sm">Create Contract</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {contracts.length === 0 ? (
        <EmptyState
          icon={<FileCheck className="h-12 w-12" />}
          title="No contracts yet"
          description="Create contracts for your projects."
        />
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-3 font-medium">Client</th>
                  <th className="text-left p-3 font-medium">Project</th>
                  <th className="text-left p-3 font-medium">Total</th>
                  <th className="text-left p-3 font-medium">Status</th>
                  <th className="text-left p-3 font-medium">Deadline</th>
                  <th className="p-3 w-20"></th>
                </tr>
              </thead>
              <tbody>
                {contracts.map((c) => (
                  <tr key={c.id} className="border-b hover:bg-muted/30">
                    <td className="p-3 font-medium">{c.clientName}</td>
                    <td className="p-3">
                      <Link href={`/projects/${c.project.id}`} className="text-primary hover:underline">
                        {c.project.name}
                      </Link>
                    </td>
                    <td className="p-3">{formatCurrency(c.totalPrice)}</td>
                    <td className="p-3"><StatusBadge status={c.status} /></td>
                    <td className="p-3">{formatDate(c.deadline)}</td>
                    <td className="p-3">
                      <Link href={`/contracts/${c.id}`}>
                        <Button variant="outline" size="sm">View</Button>
                      </Link>
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

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
import { ArrowLeft, Plus } from 'lucide-react';
import { logActivity } from '@/lib/activity';

const PROJECT_STATUSES = [
  { value: 'LEAD', label: 'Lead' },
  { value: 'PROPOSAL', label: 'Proposal' },
  { value: 'NEGOTIATING', label: 'Negotiating' },
  { value: 'IN_PROGRESS', label: 'In Progress' },
  { value: 'FROZEN', label: 'Frozen' },
  { value: 'DELIVERED', label: 'Delivered' },
  { value: 'PAID', label: 'Paid' },
  { value: 'LOST', label: 'Lost' },
];

const MILESTONE_STATUSES = [
  { value: 'PENDING', label: 'Pending' },
  { value: 'INVOICED', label: 'Invoiced' },
  { value: 'PAID', label: 'Paid' },
];

async function updateProject(formData: FormData) {
  'use server';
  const session = await getSession();
  if (!session || !['ADMIN', 'MANAGER'].includes(session.role)) return;

  const id = formData.get('id') as string;

  const name = formData.get('name') as string;
  await prisma.hubProject.update({
    where: { id },
    data: {
      name,
      type: (formData.get('type') as string) || null,
      status: formData.get('status') as any,
      clientContact: (formData.get('clientContact') as string) || null,
      clientPhone: (formData.get('clientPhone') as string) || null,
      totalPrice: formData.get('totalPrice') ? parseFloat(formData.get('totalPrice') as string) : null,
      currency: (formData.get('currency') as any) || 'USD',
      upfrontPercent: formData.get('upfrontPercent') ? parseFloat(formData.get('upfrontPercent') as string) : null,
      referralSource: (formData.get('referralSource') as string) || null,
      referralFeePercent: formData.get('referralFeePercent') ? parseFloat(formData.get('referralFeePercent') as string) : null,
      startDate: formData.get('startDate') ? new Date(formData.get('startDate') as string) : null,
      deadline: formData.get('deadline') ? new Date(formData.get('deadline') as string) : null,
      notes: (formData.get('notes') as string) || null,
    },
  });

  await logActivity('updated', 'project', id, name);
  revalidatePath(`/projects/${id}`);
}

async function addMilestone(formData: FormData) {
  'use server';
  const session = await getSession();
  if (!session || !['ADMIN', 'MANAGER'].includes(session.role)) return;

  const projectId = formData.get('projectId') as string;

  await prisma.hubProjectMilestone.create({
    data: {
      projectId,
      title: formData.get('title') as string,
      amount: parseFloat(formData.get('amount') as string),
      currency: (formData.get('currency') as any) || 'USD',
      dueDate: formData.get('dueDate') ? new Date(formData.get('dueDate') as string) : null,
    },
  });

  revalidatePath(`/projects/${projectId}`);
}

async function updateMilestoneStatus(formData: FormData) {
  'use server';
  const session = await getSession();
  if (!session || !['ADMIN', 'MANAGER'].includes(session.role)) return;

  const id = formData.get('id') as string;
  const projectId = formData.get('projectId') as string;
  const status = formData.get('status') as any;

  const updateData: any = { status };
  if (status === 'PAID') {
    updateData.paidDate = new Date();

    // Auto-create payment record
    const milestone = await prisma.hubProjectMilestone.findUnique({
      where: { id },
      include: { project: true },
    });
    if (milestone) {
      await prisma.hubPayment.create({
        data: {
          type: 'INCOME',
          amount: milestone.amount,
          currency: milestone.currency,
          category: 'PROJECT_REVENUE',
          projectId: milestone.projectId,
          milestoneId: milestone.id,
          description: `${milestone.project.name} - ${milestone.title}`,
          date: new Date(),
        },
      });
    }
  }

  await prisma.hubProjectMilestone.update({ where: { id }, data: updateData });
  revalidatePath(`/projects/${projectId}`);
}

async function deleteProject(formData: FormData) {
  'use server';
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') return;

  const id = formData.get('id') as string;
  await prisma.hubProject.delete({ where: { id } });
  redirect('/projects');
}

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session) redirect('/login');

  const project = await prisma.hubProject.findUnique({
    where: { id: params.id },
    include: {
      milestones: { orderBy: { dueDate: 'asc' } },
      payments: { orderBy: { date: 'desc' } },
      quotes: { orderBy: { createdAt: 'desc' } },
      contract: true,
    },
  });

  if (!project) notFound();

  const totalReceived = project.payments
    .filter((p) => p.type === 'INCOME')
    .reduce((s, p) => s + p.amount, 0);

  const dateToInput = (d: Date | null) => d ? new Date(d).toISOString().split('T')[0] : '';

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/projects">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">{project.name}</h1>
          <div className="flex items-center gap-2 mt-1">
            <StatusBadge status={project.status} />
            {project.type && <span className="text-sm text-muted-foreground">{project.type}</span>}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Project Details Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={updateProject} className="grid gap-4 sm:grid-cols-2">
              <input type="hidden" name="id" value={project.id} />
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" defaultValue={project.name} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Input id="type" name="type" defaultValue={project.type || ''} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select id="status" name="status" defaultValue={project.status} options={PROJECT_STATUSES} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="totalPrice">Total Price (USD)</Label>
                <Input id="totalPrice" name="totalPrice" type="number" step="0.01" defaultValue={project.totalPrice || ''} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientContact">Client Contact</Label>
                <Input id="clientContact" name="clientContact" defaultValue={project.clientContact || ''} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientPhone">Client Phone</Label>
                <Input id="clientPhone" name="clientPhone" defaultValue={project.clientPhone || ''} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input id="startDate" name="startDate" type="date" defaultValue={dateToInput(project.startDate)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deadline">Deadline</Label>
                <Input id="deadline" name="deadline" type="date" defaultValue={dateToInput(project.deadline)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="referralSource">Referral Source</Label>
                <Input id="referralSource" name="referralSource" defaultValue={project.referralSource || ''} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="referralFeePercent">Referral Fee %</Label>
                <Input id="referralFeePercent" name="referralFeePercent" type="number" step="0.1" defaultValue={project.referralFeePercent || ''} />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" name="notes" defaultValue={project.notes || ''} rows={3} />
              </div>
              <div className="sm:col-span-2 flex items-center gap-2">
                <Button type="submit" size="sm">Save Changes</Button>
                {session.role === 'ADMIN' && (
                  <form action={deleteProject}>
                    <input type="hidden" name="id" value={project.id} />
                    <Button type="submit" variant="destructive" size="sm">Delete Project</Button>
                  </form>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Financial Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Financial Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Total Price</span>
              <span className="font-medium">{formatCurrency(project.totalPrice || 0)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Received</span>
              <span className="font-medium text-green-600">{formatCurrency(totalReceived)}</span>
            </div>
            <div className="flex justify-between border-t pt-4">
              <span className="text-sm font-medium">Outstanding</span>
              <span className="font-bold text-amber-600">
                {formatCurrency(Math.max(0, (project.totalPrice || 0) - totalReceived))}
              </span>
            </div>
            {project.referralSource && (
              <>
                <div className="border-t pt-4 flex justify-between">
                  <span className="text-sm text-muted-foreground">Referral: {project.referralSource}</span>
                  <span className="text-sm">{project.referralFeePercent || 0}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Net after referral</span>
                  <span className="font-medium">
                    {formatCurrency((project.totalPrice || 0) * (1 - (project.referralFeePercent || 0) / 100))}
                  </span>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Milestones */}
      <Card>
        <CardHeader>
          <CardTitle>Milestones</CardTitle>
        </CardHeader>
        <CardContent>
          {project.milestones.length > 0 && (
            <div className="border rounded-lg overflow-hidden mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left p-3 font-medium">Title</th>
                    <th className="text-left p-3 font-medium">Amount</th>
                    <th className="text-left p-3 font-medium">Due Date</th>
                    <th className="text-left p-3 font-medium">Status</th>
                    <th className="text-left p-3 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {project.milestones.map((ms) => (
                    <tr key={ms.id} className="border-b">
                      <td className="p-3 font-medium">{ms.title}</td>
                      <td className="p-3">{formatCurrency(ms.amount)}</td>
                      <td className="p-3">{formatDate(ms.dueDate)}</td>
                      <td className="p-3"><StatusBadge status={ms.status} /></td>
                      <td className="p-3">
                        {ms.status !== 'PAID' && ['ADMIN', 'MANAGER'].includes(session.role) && (
                          <form action={updateMilestoneStatus} className="flex items-center gap-2">
                            <input type="hidden" name="id" value={ms.id} />
                            <input type="hidden" name="projectId" value={project.id} />
                            <Select
                              name="status"
                              defaultValue={ms.status}
                              options={MILESTONE_STATUSES}
                              className="h-8 text-xs w-28"
                            />
                            <Button type="submit" size="sm" variant="outline" className="h-8">
                              Update
                            </Button>
                          </form>
                        )}
                        {ms.status === 'PAID' && (
                          <span className="text-xs text-muted-foreground">Paid {formatDate(ms.paidDate)}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {['ADMIN', 'MANAGER'].includes(session.role) && (
            <form action={addMilestone} className="flex items-end gap-3 flex-wrap">
              <input type="hidden" name="projectId" value={project.id} />
              <div className="space-y-1">
                <Label className="text-xs">Title</Label>
                <Input name="title" placeholder="e.g., 40% Upfront" required className="h-9 w-40" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Amount (USD)</Label>
                <Input name="amount" type="number" step="0.01" placeholder="0.00" required className="h-9 w-28" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Due Date</Label>
                <Input name="dueDate" type="date" className="h-9 w-36" />
              </div>
              <Button type="submit" size="sm" variant="outline" className="h-9">
                <Plus className="h-3 w-3 mr-1" /> Add Milestone
              </Button>
            </form>
          )}
        </CardContent>
      </Card>

      {/* Payment History */}
      {project.payments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left p-3 font-medium">Date</th>
                    <th className="text-left p-3 font-medium">Description</th>
                    <th className="text-left p-3 font-medium">Type</th>
                    <th className="text-right p-3 font-medium">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {project.payments.map((payment) => (
                    <tr key={payment.id} className="border-b">
                      <td className="p-3">{formatDate(payment.date)}</td>
                      <td className="p-3">{payment.description}</td>
                      <td className="p-3">
                        <StatusBadge status={payment.type} />
                      </td>
                      <td className={`p-3 text-right font-medium ${payment.type === 'INCOME' ? 'text-green-600' : 'text-red-600'}`}>
                        {payment.type === 'INCOME' ? '+' : '-'}{formatCurrency(payment.amount)}
                      </td>
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

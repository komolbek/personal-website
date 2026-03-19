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
import { ArrowLeft, Plus, DollarSign, Trash2, FileText, FileCheck, Download } from 'lucide-react';
import { logActivity } from '@/lib/activity';
import { PhoneInput } from '@/components/ui/phone-input';
import { AmountInput } from '@/components/ui/amount-input';
import { AddPaymentDialog, AddQuoteDialog, CreateContractDialog } from './ProjectDetailClient';

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

const PROJECT_TYPES = [
  { value: '', label: 'None' },
  { value: 'Website / Landing Page', label: 'Website / Landing Page' },
  { value: 'Web Application / SaaS', label: 'Web Application / SaaS' },
  { value: 'Telegram Bot', label: 'Telegram Bot' },
  { value: 'Mobile Application', label: 'Mobile Application' },
  { value: 'CRM System', label: 'CRM System' },
  { value: 'E-commerce', label: 'E-commerce' },
  { value: 'AI/ML Solution', label: 'AI/ML Solution' },
  { value: 'Design / Branding', label: 'Design / Branding' },
  { value: 'Bitrix24 Integration', label: 'Bitrix24 Integration' },
  { value: 'IoT / Hardware Integration', label: 'IoT / Hardware Integration' },
  { value: 'Production Management System', label: 'Production Management System' },
];

const REFERRAL_SOURCES = [
  { value: '', label: 'None' },
  { value: 'Personal Network', label: 'Personal Network' },
  { value: 'IT Park', label: 'IT Park' },
  { value: 'Partner', label: 'Partner' },
  { value: 'Telegram Group', label: 'Telegram Group' },
  { value: 'Instagram', label: 'Instagram' },
  { value: 'LinkedIn', label: 'LinkedIn' },
  { value: 'Friend / Colleague', label: 'Friend / Colleague' },
  { value: 'Event', label: 'Event' },
  { value: 'Other', label: 'Other' },
];

const REFERRAL_FEES = [
  { value: '0', label: 'None (0%)' },
  { value: '5', label: '5%' },
  { value: '10', label: '10%' },
  { value: '15', label: '15%' },
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
  const customType = (formData.get('customType') as string)?.trim();
  const selectedType = (formData.get('type') as string) || null;
  const projectType = customType || selectedType;

  await prisma.hubProject.update({
    where: { id },
    data: {
      name,
      type: projectType,
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

async function deleteMilestone(formData: FormData) {
  'use server';
  const session = await getSession();
  if (!session || !['ADMIN', 'MANAGER'].includes(session.role)) return;

  const id = formData.get('id') as string;
  const projectId = formData.get('projectId') as string;

  await prisma.hubProjectMilestone.delete({ where: { id } });
  revalidatePath(`/projects/${projectId}`);
}

async function addPayment(formData: FormData) {
  'use server';
  const session = await getSession();
  if (!session || !['ADMIN', 'MANAGER'].includes(session.role)) return;

  const projectId = formData.get('projectId') as string;

  await prisma.hubPayment.create({
    data: {
      type: formData.get('type') as any,
      amount: parseFloat(formData.get('amount') as string),
      currency: (formData.get('currency') as any) || 'USD',
      category: formData.get('category') as any,
      projectId,
      description: formData.get('description') as string,
      date: formData.get('date') ? new Date(formData.get('date') as string) : new Date(),
    },
  });

  revalidatePath(`/projects/${projectId}`);
}

async function deletePayment(formData: FormData) {
  'use server';
  const session = await getSession();
  if (!session || !['ADMIN', 'MANAGER'].includes(session.role)) return;

  const id = formData.get('id') as string;
  const projectId = formData.get('projectId') as string;

  await prisma.hubPayment.delete({ where: { id } });
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

async function createQuote(formData: FormData) {
  'use server';
  const session = await getSession();
  if (!session || !['ADMIN', 'MANAGER'].includes(session.role)) return;

  const projectId = formData.get('projectId') as string;
  const items = JSON.parse(formData.get('items') as string || '[]');
  const basePrice = items.reduce((sum: number, item: any) => sum + item.price, 0);
  const discountPercent = parseFloat(formData.get('discountPercent') as string) || 0;
  const totalPrice = basePrice * (1 - discountPercent / 100);

  await prisma.hubQuote.create({
    data: {
      projectId,
      clientName: formData.get('clientName') as string,
      clientPhone: (formData.get('clientPhone') as string) || null,
      items,
      basePrice,
      totalPrice,
      currency: (formData.get('currency') as any) || 'USD',
      discountPercent: discountPercent || null,
      notes: (formData.get('notes') as string) || null,
      validUntil: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    },
  });

  revalidatePath(`/projects/${projectId}`);
}

async function updateQuoteStatus(formData: FormData) {
  'use server';
  const session = await getSession();
  if (!session) return;

  const id = formData.get('id') as string;
  const projectId = formData.get('projectId') as string;
  const status = formData.get('status') as any;

  await prisma.hubQuote.update({ where: { id }, data: { status } });
  revalidatePath(`/projects/${projectId}`);
}

async function createContract(formData: FormData) {
  'use server';
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') return;

  const projectId = formData.get('projectId') as string;

  await prisma.hubContract.create({
    data: {
      projectId,
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

  revalidatePath(`/projects/${projectId}`);
}

async function updateContractStatus(formData: FormData) {
  'use server';
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') return;

  const id = formData.get('id') as string;
  const projectId = formData.get('projectId') as string;
  const status = formData.get('status') as any;
  const updateData: any = { status };
  if (status === 'SIGNED') updateData.signedDate = new Date();

  await prisma.hubContract.update({ where: { id }, data: updateData });
  revalidatePath(`/projects/${projectId}`);
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
  const isEditor = ['ADMIN', 'MANAGER'].includes(session.role);

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
                <Select id="type" name="type" defaultValue={project.type || ''} options={PROJECT_TYPES} />
                <Input name="customType" placeholder="Or enter custom type..." className="mt-1" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select id="status" name="status" defaultValue={project.status} options={PROJECT_STATUSES} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="totalPrice">Total Price (USD)</Label>
                <AmountInput id="totalPrice" name="totalPrice" defaultValue={project.totalPrice} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientContact">Client Contact</Label>
                <Input id="clientContact" name="clientContact" defaultValue={project.clientContact || ''} />
              </div>
              <div className="space-y-2">
                <Label>Client Phone</Label>
                <PhoneInput name="clientPhone" defaultValue={project.clientPhone || ''} />
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
                <Select id="referralSource" name="referralSource" defaultValue={project.referralSource || ''} options={REFERRAL_SOURCES} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="referralFeePercent">Referral Fee</Label>
                <Select id="referralFeePercent" name="referralFeePercent" defaultValue={String(project.referralFeePercent || 0)} options={REFERRAL_FEES} />
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

      {/* Contract */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FileCheck className="h-4 w-4" /> Contract
          </CardTitle>
          {!project.contract && isEditor && session.role === 'ADMIN' && (
            <CreateContractDialog
              projectId={project.id}
              clientName={project.clientContact || ''}
              clientContact={project.clientPhone || ''}
              totalPrice={project.totalPrice || 0}
              action={createContract}
            />
          )}
        </CardHeader>
        <CardContent>
          {project.contract ? (
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Client</span>
                  <p className="font-medium">{project.contract.clientName}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Total</span>
                  <p className="font-medium">{formatCurrency(project.contract.totalPrice, project.contract.currency)}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Status</span>
                  <p><StatusBadge status={project.contract.status} /></p>
                </div>
                <div>
                  <span className="text-muted-foreground">Timeline</span>
                  <p>{formatDate(project.contract.startDate)} — {formatDate(project.contract.deadline)}</p>
                </div>
              </div>
              {project.contract.scopeDescription && (
                <div className="text-sm">
                  <span className="text-muted-foreground">Scope</span>
                  <p className="whitespace-pre-wrap mt-1">{project.contract.scopeDescription}</p>
                </div>
              )}
              {project.contract.paymentTerms && (
                <div className="text-sm">
                  <span className="text-muted-foreground">Payment Terms</span>
                  <p className="whitespace-pre-wrap mt-1">{project.contract.paymentTerms}</p>
                </div>
              )}
              {project.contract.signedDate && (
                <div className="text-sm">
                  <span className="text-muted-foreground">Signed</span>
                  <p>{formatDate(project.contract.signedDate)}</p>
                </div>
              )}
              <div className="flex items-center gap-2 pt-2">
                <a href={`/api/contracts/${project.contract.id}/pdf`} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" /> PDF
                  </Button>
                </a>
                {session.role === 'ADMIN' && (
                  <form action={updateContractStatus} className="flex items-center gap-2">
                    <input type="hidden" name="id" value={project.contract.id} />
                    <input type="hidden" name="projectId" value={project.id} />
                    <Select
                      name="status"
                      defaultValue={project.contract.status}
                      options={[
                        { value: 'DRAFT', label: 'Draft' },
                        { value: 'SENT', label: 'Sent' },
                        { value: 'SIGNED', label: 'Signed' },
                      ]}
                      className="h-8 text-xs w-28"
                    />
                    <Button type="submit" size="sm" variant="outline" className="h-8">Update</Button>
                  </form>
                )}
              </div>
            </div>
          ) : (
            <EmptyState
              icon={<FileCheck className="h-8 w-8" />}
              title="No contract"
              description="Create a contract for this project."
            />
          )}
        </CardContent>
      </Card>

      {/* Quotes */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-4 w-4" /> Quotes ({project.quotes.length})
          </CardTitle>
          {isEditor && (
            <AddQuoteDialog
              projectId={project.id}
              clientName={project.clientContact || ''}
              clientPhone={project.clientPhone || ''}
              action={createQuote}
            />
          )}
        </CardHeader>
        <CardContent>
          {project.quotes.length === 0 ? (
            <EmptyState
              icon={<FileText className="h-8 w-8" />}
              title="No quotes yet"
              description="Create a price quote for this project."
            />
          ) : (
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left p-3 font-medium">Client</th>
                    <th className="text-left p-3 font-medium">Total</th>
                    <th className="text-left p-3 font-medium">Status</th>
                    <th className="text-left p-3 font-medium">Valid Until</th>
                    <th className="text-left p-3 font-medium">Created</th>
                    <th className="p-3 w-32"></th>
                  </tr>
                </thead>
                <tbody>
                  {project.quotes.map((quote) => (
                    <tr key={quote.id} className="border-b">
                      <td className="p-3 font-medium">{quote.clientName}</td>
                      <td className="p-3 font-medium">{formatCurrency(quote.totalPrice, quote.currency)}</td>
                      <td className="p-3"><StatusBadge status={quote.status} /></td>
                      <td className="p-3">{formatDate(quote.validUntil)}</td>
                      <td className="p-3">{formatDate(quote.createdAt)}</td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <a href={`/api/quotes/${quote.id}/pdf`} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" size="sm" className="h-7 text-xs">
                              <Download className="h-3 w-3 mr-1" /> PDF
                            </Button>
                          </a>
                          <form action={updateQuoteStatus} className="flex items-center gap-1">
                            <input type="hidden" name="id" value={quote.id} />
                            <input type="hidden" name="projectId" value={project.id} />
                            <Select
                              name="status"
                              defaultValue={quote.status}
                              options={[
                                { value: 'DRAFT', label: 'Draft' },
                                { value: 'SENT', label: 'Sent' },
                                { value: 'ACCEPTED', label: 'Accepted' },
                                { value: 'REJECTED', label: 'Rejected' },
                              ]}
                              className="h-7 text-xs w-24"
                            />
                            <Button type="submit" size="sm" variant="ghost" className="h-7 text-xs">Update</Button>
                          </form>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

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
                        <div className="flex items-center gap-2">
                          {ms.status !== 'PAID' && isEditor && (
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
                          {isEditor && (
                            <form action={deleteMilestone}>
                              <input type="hidden" name="id" value={ms.id} />
                              <input type="hidden" name="projectId" value={project.id} />
                              <Button type="submit" variant="ghost" size="sm" className="h-8 text-destructive hover:text-destructive">
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </form>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {isEditor && (
            <form action={addMilestone} className="flex items-end gap-3 flex-wrap">
              <input type="hidden" name="projectId" value={project.id} />
              <div className="space-y-1">
                <Label className="text-xs">Title</Label>
                <Input name="title" placeholder="e.g., 40% Upfront" required className="h-9 w-40" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Amount (USD)</Label>
                <AmountInput name="amount" required placeholder="0" className="h-9 w-28" />
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
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Payment History</CardTitle>
          {isEditor && (
            <AddPaymentDialog projectId={project.id} action={addPayment} />
          )}
        </CardHeader>
        <CardContent>
          {project.payments.length === 0 ? (
            <EmptyState
              icon={<DollarSign className="h-8 w-8" />}
              title="No payments yet"
              description="Record payments to track project finances."
            />
          ) : (
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left p-3 font-medium">Date</th>
                    <th className="text-left p-3 font-medium">Description</th>
                    <th className="text-left p-3 font-medium">Type</th>
                    <th className="text-right p-3 font-medium">Amount</th>
                    {isEditor && <th className="p-3 w-12"></th>}
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
                      {isEditor && (
                        <td className="p-3">
                          <form action={deletePayment}>
                            <input type="hidden" name="id" value={payment.id} />
                            <input type="hidden" name="projectId" value={project.id} />
                            <Button type="submit" variant="ghost" size="sm" className="h-7 text-destructive hover:text-destructive">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </form>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// Server actions for the project detail page.
//
// These lived inline in app/projects/[id]/page.tsx. They are business logic,
// so they belong here (see the repo conventions), and moving them out is what
// let every one of them go through requireRole().
//
// Each previously returned silently when the caller lacked the role, so a
// forbidden write looked identical to a successful one from the browser.
// requireRole throws instead. The UI already hides these controls from
// viewers, so this is a backstop rather than the primary gate.
'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import type { HubUserRole } from '@necto/db-hub';
import prisma from '@/lib/prisma';
import { getSession, requireRole } from '@/lib/auth';
import { logActivity } from '@/lib/activity';

// Who may change a project's records.
const EDITORS: HubUserRole[] = ['ADMIN', 'MANAGER'];
// Destructive or contractual changes.
const ADMINS: HubUserRole[] = ['ADMIN'];

export async function updateProject(formData: FormData) {
  const session = await getSession();
  requireRole(session, EDITORS);

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

export async function addMilestone(formData: FormData) {
  const session = await getSession();
  requireRole(session, EDITORS);

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

export async function updateMilestoneStatus(formData: FormData) {
  const session = await getSession();
  requireRole(session, EDITORS);

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

export async function deleteMilestone(formData: FormData) {
  const session = await getSession();
  requireRole(session, EDITORS);

  const id = formData.get('id') as string;
  const projectId = formData.get('projectId') as string;

  await prisma.hubProjectMilestone.delete({ where: { id } });
  revalidatePath(`/projects/${projectId}`);
}

export async function addPayment(formData: FormData) {
  const session = await getSession();
  requireRole(session, EDITORS);

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

export async function deletePayment(formData: FormData) {
  const session = await getSession();
  requireRole(session, EDITORS);

  const id = formData.get('id') as string;
  const projectId = formData.get('projectId') as string;

  await prisma.hubPayment.delete({ where: { id } });
  revalidatePath(`/projects/${projectId}`);
}

export async function deleteProject(formData: FormData) {
  const session = await getSession();
  requireRole(session, ADMINS);

  const id = formData.get('id') as string;

  // Milestones cascade. The contract does not — its projectId is required, so
  // the delete would fail on the foreign key — and it means nothing without
  // its project, so it goes too. Quotes and payments hold their project
  // optionally and are detached rather than destroyed: money records outlive
  // the project they were raised against.
  await prisma.$transaction([
    prisma.hubContract.deleteMany({ where: { projectId: id } }),
    prisma.hubProject.delete({ where: { id } }),
  ]);

  redirect('/projects');
}

export async function createQuote(formData: FormData) {
  const session = await getSession();
  requireRole(session, EDITORS);

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

// Accepting or rejecting a quote is a commercial decision, so it takes an
// editor like every other mutation here. It previously checked only for a
// session, which let a viewer move a quote to ACCEPTED.
export async function updateQuoteStatus(formData: FormData) {
  const session = await getSession();
  requireRole(session, EDITORS);

  const id = formData.get('id') as string;
  const projectId = formData.get('projectId') as string;
  const status = formData.get('status') as any;

  await prisma.hubQuote.update({ where: { id }, data: { status } });
  revalidatePath(`/projects/${projectId}`);
}

export async function createContract(formData: FormData) {
  const session = await getSession();
  requireRole(session, ADMINS);

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

export async function updateContractStatus(formData: FormData) {
  const session = await getSession();
  requireRole(session, ADMINS);

  const id = formData.get('id') as string;
  const projectId = formData.get('projectId') as string;
  const status = formData.get('status') as any;
  const updateData: any = { status };
  if (status === 'SIGNED') updateData.signedDate = new Date();

  await prisma.hubContract.update({ where: { id }, data: updateData });
  revalidatePath(`/projects/${projectId}`);
}

// --- Action for the projects list page ---

export async function createProject(formData: FormData) {
  const session = await getSession();
  requireRole(session, EDITORS);

  const name = formData.get('name') as string;
  const clientContact = (formData.get('clientContact') as string)?.trim() || null;
  const clientPhone = (formData.get('clientPhone') as string)?.trim() || null;

  const project = await prisma.hubProject.create({
    data: {
      name,
      type: (formData.get('type') as string) || null,
      status: (formData.get('status') as any) || 'LEAD',
      clientContact,
      clientPhone,
      totalPrice: formData.get('totalPrice') ? parseFloat(formData.get('totalPrice') as string) : null,
      currency: (formData.get('currency') as any) || 'USD',
      notes: (formData.get('notes') as string) || null,
    },
  });

  // Auto-create contact from project client info
  if (clientContact) {
    const existing = await prisma.hubContact.findFirst({ where: { name: clientContact } });
    if (!existing) {
      await prisma.hubContact.create({
        data: {
          name: clientContact,
          phone: clientPhone,
          type: 'CLIENT',
        },
      });
    }
  }

  await logActivity('created', 'project', project.id, name);
  revalidatePath('/projects');
}

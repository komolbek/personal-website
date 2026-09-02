// Server actions for the finances page.
//
// These lived inline in app/finances/page.tsx. They are business logic, so
// they belong here (see the repo conventions), and moving them out is what
// lets each one go through requireRole().
//
// Every one of them previously returned silently when the caller was not an
// admin, so a forbidden write to the money records looked identical to a
// successful one from the browser. requireRole throws instead. The page
// already hides these controls from non-admins, so this is a backstop rather
// than the primary gate.
'use server';

import { revalidatePath } from 'next/cache';
import type { HubUserRole } from '@necto/db-hub';
import prisma from '@/lib/prisma';
import { getSession, requireRole } from '@/lib/auth';

// Money is admin-only: every action here writes or reclassifies a payment.
const ADMINS: HubUserRole[] = ['ADMIN'];

export async function addPayment(formData: FormData) {
  const session = await getSession();
  requireRole(session, ADMINS);

  await prisma.hubPayment.create({
    data: {
      type: formData.get('type') as any,
      amount: parseFloat(formData.get('amount') as string),
      currency: (formData.get('currency') as any) || 'USD',
      category: formData.get('category') as any,
      description: formData.get('description') as string,
      date: formData.get('date') ? new Date(formData.get('date') as string) : new Date(),
      recurring: formData.get('recurring') === 'on',
      recurringInterval: formData.get('recurringInterval') as any || null,
      projectId: (formData.get('projectId') as string) || null,
      productId: (formData.get('productId') as string) || null,
      notes: (formData.get('notes') as string) || null,
    },
  });

  revalidatePath('/finances');
}

export async function deletePayment(formData: FormData) {
  const session = await getSession();
  requireRole(session, ADMINS);

  await prisma.hubPayment.delete({ where: { id: formData.get('id') as string } });
  revalidatePath('/finances');
}

export async function runOverdueCheck() {
  const session = await getSession();
  requireRole(session, ADMINS);

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  await prisma.hubClient.updateMany({
    where: {
      paymentStatus: 'ACTIVE',
      monthlyFee: { gt: 0 },
      OR: [
        { lastPayment: { lt: thirtyDaysAgo } },
        { lastPayment: null, startDate: { lt: thirtyDaysAgo } },
      ],
    },
    data: { paymentStatus: 'OVERDUE' },
  });

  revalidatePath('/finances');
}

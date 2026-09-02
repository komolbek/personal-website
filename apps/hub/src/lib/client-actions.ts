// Server actions for a product's client detail page.
//
// These lived inline in app/products/[slug]/clients/[id]/page.tsx. They are
// business logic, so they belong here (see the repo conventions), and moving
// them out is what lets each one go through requireRole().
//
// Each previously returned silently when the caller lacked the role, so a
// forbidden edit to a client or its payments looked identical to a successful
// one from the browser. requireRole throws instead. The page already hides
// these controls, so this is a backstop rather than the primary gate.
'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import type { HubUserRole } from '@necto/db-hub';
import prisma from '@/lib/prisma';
import { getSession, requireRole } from '@/lib/auth';

// Who may change a client's record or log a payment against it.
const EDITORS: HubUserRole[] = ['ADMIN', 'MANAGER'];
// Deletions, of a client or of a payment already recorded.
const ADMINS: HubUserRole[] = ['ADMIN'];

export async function updateClient(formData: FormData) {
  const session = await getSession();
  requireRole(session, EDITORS);

  const id = formData.get('id') as string;
  const slug = formData.get('slug') as string;

  await prisma.hubClient.update({
    where: { id },
    data: {
      name: formData.get('name') as string,
      contactPerson: (formData.get('contactPerson') as string) || null,
      phone: (formData.get('phone') as string) || null,
      plan: (formData.get('plan') as string) || null,
      monthlyFee: formData.get('monthlyFee') ? parseFloat(formData.get('monthlyFee') as string) : null,
      currency: (formData.get('currency') as any) || 'UZS',
      paymentStatus: (formData.get('paymentStatus') as any) || 'ACTIVE',
      notes: (formData.get('notes') as string) || null,
    },
  });

  revalidatePath(`/products/${slug}/clients/${id}`);
}

export async function recordPayment(formData: FormData) {
  const session = await getSession();
  requireRole(session, EDITORS);

  const clientId = formData.get('clientId') as string;
  const slug = formData.get('slug') as string;

  const client = await prisma.hubClient.findUnique({
    where: { id: clientId },
    include: { product: true },
  });
  if (!client) return;

  const amount = parseFloat(formData.get('amount') as string);

  await prisma.hubPayment.create({
    data: {
      type: 'INCOME',
      amount,
      currency: client.currency,
      category: 'PRODUCT_REVENUE',
      productId: client.productId,
      clientId: client.id,
      description: formData.get('description') as string || `${client.product.name} - ${client.name} subscription`,
      date: formData.get('date') ? new Date(formData.get('date') as string) : new Date(),
    },
  });

  await prisma.hubClient.update({
    where: { id: clientId },
    data: { lastPayment: new Date(), paymentStatus: 'ACTIVE' },
  });

  revalidatePath(`/products/${slug}/clients/${clientId}`);
}

export async function deleteClient(formData: FormData) {
  const session = await getSession();
  requireRole(session, ADMINS);

  const id = formData.get('id') as string;
  const slug = formData.get('slug') as string;

  await prisma.hubClient.delete({ where: { id } });
  redirect(`/products/${slug}/clients`);
}

export async function deletePayment(formData: FormData) {
  const session = await getSession();
  requireRole(session, ADMINS);

  const id = formData.get('id') as string;
  const clientId = formData.get('clientId') as string;
  const slug = formData.get('slug') as string;

  await prisma.hubPayment.delete({ where: { id } });
  revalidatePath(`/products/${slug}/clients/${clientId}`);
}

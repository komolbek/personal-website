// Server actions for a product's leads page.
//
// This lived inline in app/products/[slug]/leads/page.tsx. It is business
// logic, so it belongs here (see the repo conventions), and moving it out is
// what lets it go through requireRole().
//
// It previously returned silently when the caller was a viewer, so a
// forbidden write looked identical to a successful one from the browser.
// requireRole throws instead. The page already hides the control, so this is
// a backstop rather than the primary gate.
'use server';

import { revalidatePath } from 'next/cache';
import type { HubUserRole } from '@necto/db-hub';
import prisma from '@/lib/prisma';
import { getSession, requireRole } from '@/lib/auth';

// Who may add a lead against a product.
const EDITORS: HubUserRole[] = ['ADMIN', 'MANAGER'];

export async function createLead(formData: FormData) {
  const session = await getSession();
  requireRole(session, EDITORS);

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

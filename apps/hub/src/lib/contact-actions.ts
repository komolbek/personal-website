// Server actions for the contacts page.
//
// These lived inline in app/contacts/page.tsx. They are business logic, so
// they belong here (see the repo conventions), and moving them out is what
// lets each one go through requireRole().
//
// Both previously returned silently when the caller lacked the role, so a
// forbidden write looked identical to a successful one from the browser.
// requireRole throws instead. The page already hides these controls, so this
// is a backstop rather than the primary gate.
'use server';

import { revalidatePath } from 'next/cache';
import type { HubUserRole } from '@necto/db-hub';
import prisma from '@/lib/prisma';
import { getSession, requireRole } from '@/lib/auth';

// Who may add a contact to the book.
const EDITORS: HubUserRole[] = ['ADMIN', 'MANAGER'];
// Removing one is admin-only.
const ADMINS: HubUserRole[] = ['ADMIN'];

export async function createContact(formData: FormData) {
  const session = await getSession();
  requireRole(session, EDITORS);

  await prisma.hubContact.create({
    data: {
      name: formData.get('name') as string,
      company: (formData.get('company') as string) || null,
      role: (formData.get('role') as string) || null,
      phone: (formData.get('phone') as string) || null,
      email: (formData.get('email') as string) || null,
      telegram: (formData.get('telegram') as string) || null,
      type: (formData.get('type') as any) || 'POTENTIAL',
      source: (formData.get('source') as any) || 'OTHER',
      notes: (formData.get('notes') as string) || null,
    },
  });

  revalidatePath('/contacts');
}

export async function deleteContact(formData: FormData) {
  const session = await getSession();
  requireRole(session, ADMINS);

  await prisma.hubContact.delete({ where: { id: formData.get('id') as string } });
  revalidatePath('/contacts');
}

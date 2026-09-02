// Server actions for the products pages.
//
// These lived inline in app/products/page.tsx. They are business logic, so
// they belong here (see the repo conventions), and moving them out is what
// lets each one go through requireRole().
//
// Each previously returned silently when the caller was not an admin, so a
// forbidden write looked identical to a successful one from the browser.
// requireRole throws instead. The page already hides these controls, so this
// is a backstop rather than the primary gate.
'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import type { HubUserRole } from '@necto/db-hub';
import prisma from '@/lib/prisma';
import { getSession, requireRole } from '@/lib/auth';

// The product roster is admin-only.
const ADMINS: HubUserRole[] = ['ADMIN'];

export async function createProduct(formData: FormData) {
  const session = await getSession();
  requireRole(session, ADMINS);

  const name = formData.get('name') as string;
  const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const status = formData.get('status') as 'ACTIVE' | 'PARKED' | 'ARCHIVED';
  const description = formData.get('description') as string;
  const url = formData.get('url') as string;

  await prisma.hubProduct.create({
    data: { name, slug, status, description: description || null, url: url || null },
  });

  revalidatePath('/products');
}

// --- Actions for the product detail page (products/[slug]) ---

export async function updateProduct(formData: FormData) {
  const session = await getSession();
  requireRole(session, ADMINS);

  const id = formData.get('id') as string;
  const slug = formData.get('slug') as string;

  await prisma.hubProduct.update({
    where: { id },
    data: {
      name: formData.get('name') as string,
      status: formData.get('status') as any,
      description: (formData.get('description') as string) || null,
      url: (formData.get('url') as string) || null,
    },
  });

  revalidatePath(`/products/${slug}`);
}

export async function deleteProduct(formData: FormData) {
  const session = await getSession();
  requireRole(session, ADMINS);

  const id = formData.get('id') as string;

  // Leads and clients hold their product as a required field, so they cannot
  // be detached the way payments are: deleting the product would have to
  // destroy them, and CRM history should not disappear as a side effect of
  // tidying the roster. Refuse instead. The page hides the control while
  // either count is above zero, so this is a backstop — and until now the
  // delete failed here anyway, on the foreign key, with nothing to explain it.
  const [leads, clients] = await Promise.all([
    prisma.hubLead.count({ where: { productId: id } }),
    prisma.hubClient.count({ where: { productId: id } }),
  ]);
  if (leads > 0 || clients > 0) {
    throw new Error(
      `Refusing to delete a product with ${leads} lead(s) and ${clients} client(s) still attached.`
    );
  }

  // Payments hold their product optionally, so they detach rather than being
  // deleted — the money outlives the product it was earned from, the same
  // rule deleteProject follows.
  await prisma.hubProduct.delete({ where: { id } });
  redirect('/products');
}

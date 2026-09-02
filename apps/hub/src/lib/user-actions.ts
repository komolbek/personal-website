// Server actions for the users page.
//
// These lived inline in app/users/page.tsx. They are business logic, so they
// belong here (see the repo conventions), and moving them out is what lets
// each one go through requireRole().
//
// Each previously returned silently when the caller was not an admin, so a
// rejected attempt to create a user or change someone's role looked exactly
// like a successful one. That matters more here than anywhere else in Hub:
// these actions are how privilege is granted. requireRole throws instead.
//
// updateUserRole and removeUser take requireRole's return value rather than
// calling it for its throw alone: both need session.id to stop an admin
// demoting or deleting themselves, and the call does not narrow the variable
// away from null on its own.
'use server';

import { revalidatePath } from 'next/cache';
import type { HubUserRole } from '@necto/db-hub';
import prisma from '@/lib/prisma';
import { getSession, hashPassword, requireRole } from '@/lib/auth';
import { logActivity } from '@/lib/activity';

// Managing the team is admin-only.
const ADMINS: HubUserRole[] = ['ADMIN'];

const VALID_ROLES: HubUserRole[] = ['ADMIN', 'MANAGER', 'VIEWER'];

export async function createUser(formData: FormData) {
  const session = await getSession();
  requireRole(session, ADMINS);

  const name = (formData.get('name') as string)?.trim();
  const email = (formData.get('email') as string)?.trim().toLowerCase();
  const password = formData.get('password') as string;
  const role = formData.get('role') as HubUserRole;

  if (!name || !email || !password || !VALID_ROLES.includes(role)) return;

  const existing = await prisma.hubUser.findUnique({ where: { email } });
  if (existing) return; // Email already in use

  const passwordHash = await hashPassword(password);
  const user = await prisma.hubUser.create({
    data: { name, email, passwordHash, role },
  });

  await logActivity('created', 'user', user.id, user.email, `Role: ${role}`);
  revalidatePath('/users');
}

export async function updateUserRole(formData: FormData) {
  const session = requireRole(await getSession(), ADMINS);

  const id = formData.get('id') as string;
  const role = formData.get('role') as HubUserRole;
  if (!VALID_ROLES.includes(role)) return;

  // Don't let an admin strip their own admin rights (avoids locking out the last admin).
  if (id === session.id && role !== 'ADMIN') return;

  const user = await prisma.hubUser.update({ where: { id }, data: { role } });
  await logActivity('changed role', 'user', user.id, user.email, `New role: ${role}`);
  revalidatePath('/users');
}

export async function removeUser(formData: FormData) {
  const session = requireRole(await getSession(), ADMINS);

  const id = formData.get('id') as string;
  if (id === session.id) return; // Can't delete yourself

  const user = await prisma.hubUser.delete({ where: { id } });
  await logActivity('removed', 'user', user.id, user.email);
  revalidatePath('/users');
}

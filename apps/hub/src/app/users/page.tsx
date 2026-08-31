import { getSession, hashPassword } from '@/lib/auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { logActivity } from '@/lib/activity';
import { formatDate } from '@/lib/utils';
import { ShieldCheck, UserPlus, Users as UsersIcon } from 'lucide-react';
import { RoleSelect } from './RoleSelect';
import { getServerT, getLocale } from '@/lib/i18n/server';
import type { HubUserRole } from '@necto/db-hub';

const VALID_ROLES: HubUserRole[] = ['ADMIN', 'MANAGER', 'VIEWER'];

async function createUser(formData: FormData) {
  'use server';
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') return;

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

async function updateUserRole(formData: FormData) {
  'use server';
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') return;

  const id = formData.get('id') as string;
  const role = formData.get('role') as HubUserRole;
  if (!VALID_ROLES.includes(role)) return;

  // Don't let an admin strip their own admin rights (avoids locking out the last admin).
  if (id === session.id && role !== 'ADMIN') return;

  const user = await prisma.hubUser.update({ where: { id }, data: { role } });
  await logActivity('changed role', 'user', user.id, user.email, `New role: ${role}`);
  revalidatePath('/users');
}

async function removeUser(formData: FormData) {
  'use server';
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') return;

  const id = formData.get('id') as string;
  if (id === session.id) return; // Can't delete yourself

  const user = await prisma.hubUser.delete({ where: { id } });
  await logActivity('removed', 'user', user.id, user.email);
  revalidatePath('/users');
}

export default async function UsersPage() {
  const session = await getSession();
  if (!session) redirect('/login');
  if (session.role !== 'ADMIN') {
    // Non-admins can't manage the team.
    redirect('/settings');
  }

  const users = await prisma.hubUser.findMany({ orderBy: { createdAt: 'asc' } });
  const t = getServerT();
  const locale = getLocale();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <UsersIcon className="h-6 w-6" /> {t('users.title')}
        </h1>
        <p className="text-muted-foreground">{t('users.subtitle')}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <UserPlus className="h-4 w-4" /> {t('users.addUser')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createUser} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <Label>{t('common.name')}</Label>
              <Input name="name" required placeholder={t('users.fullNamePlaceholder')} />
            </div>
            <div className="space-y-2">
              <Label>{t('common.email')}</Label>
              <Input name="email" type="email" required placeholder={t('users.emailPlaceholder')} />
            </div>
            <div className="space-y-2">
              <Label>{t('common.password')}</Label>
              <Input name="password" type="password" required minLength={6} />
            </div>
            <div className="space-y-2">
              <Label>{t('common.role')}</Label>
              <Select
                name="role"
                defaultValue="MANAGER"
                options={[
                  { value: 'ADMIN', label: t('enum.ADMIN') },
                  { value: 'MANAGER', label: t('enum.MANAGER') },
                  { value: 'VIEWER', label: t('enum.VIEWER') },
                ]}
              />
            </div>
            <div className="sm:col-span-2 lg:col-span-4">
              <Button type="submit" size="sm">{t('users.addUser')}</Button>
            </div>
          </form>
          <p className="text-xs text-muted-foreground mt-3">
            {t('users.shareHint')}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" /> {t('users.teamMembers')} ({users.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-3 font-medium">{t('common.name')}</th>
                  <th className="text-left p-3 font-medium">{t('common.email')}</th>
                  <th className="text-left p-3 font-medium">{t('common.role')}</th>
                  <th className="text-left p-3 font-medium">{t('common.joined')}</th>
                  <th className="p-3 w-16"></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b">
                    <td className="p-3 font-medium">
                      {user.name}
                      {user.id === session.id && (
                        <span className="ml-2 text-xs text-muted-foreground">{t('common.you')}</span>
                      )}
                    </td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">
                      {user.id === session.id ? (
                        <StatusBadge status={user.role} />
                      ) : (
                        <RoleSelect userId={user.id} currentRole={user.role} action={updateUserRole} />
                      )}
                    </td>
                    <td className="p-3">{formatDate(user.createdAt, locale)}</td>
                    <td className="p-3">
                      {user.id !== session.id && (
                        <form action={removeUser}>
                          <input type="hidden" name="id" value={user.id} />
                          <Button type="submit" variant="ghost" size="sm" className="text-destructive h-7 text-xs">
                            {t('users.remove')}
                          </Button>
                        </form>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

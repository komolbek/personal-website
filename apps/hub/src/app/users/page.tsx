import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { logActivity } from '@/lib/activity';
import { formatDate } from '@/lib/utils';
import { ShieldCheck, Users as UsersIcon } from 'lucide-react';
import { InvitePanel } from './InvitePanel';
import { RoleSelect } from './RoleSelect';
import type { HubUserRole } from '@necto/db';

const VALID_ROLES: HubUserRole[] = ['ADMIN', 'MANAGER', 'VIEWER'];

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

  const [users, invitations] = await Promise.all([
    prisma.hubUser.findMany({ orderBy: { createdAt: 'asc' } }),
    prisma.hubInvitation.findMany({
      where: { acceptedAt: null, expiresAt: { gt: new Date() } },
      orderBy: { createdAt: 'desc' },
    }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <UsersIcon className="h-6 w-6" /> Users & Roles
        </h1>
        <p className="text-muted-foreground">Invite teammates and manage their access</p>
      </div>

      <InvitePanel
        invitations={invitations.map((inv) => ({
          id: inv.id,
          email: inv.email,
          role: inv.role,
          expiresAt: inv.expiresAt.toISOString(),
        }))}
      />

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" /> Team members ({users.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-3 font-medium">Name</th>
                  <th className="text-left p-3 font-medium">Email</th>
                  <th className="text-left p-3 font-medium">Role</th>
                  <th className="text-left p-3 font-medium">Joined</th>
                  <th className="p-3 w-16"></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b">
                    <td className="p-3 font-medium">
                      {user.name}
                      {user.id === session.id && (
                        <span className="ml-2 text-xs text-muted-foreground">(you)</span>
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
                    <td className="p-3">{formatDate(user.createdAt)}</td>
                    <td className="p-3">
                      {user.id !== session.id && (
                        <form action={removeUser}>
                          <input type="hidden" name="id" value={user.id} />
                          <Button type="submit" variant="ghost" size="sm" className="text-destructive h-7 text-xs">
                            Remove
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

import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { hashPassword } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { Settings, UserPlus } from 'lucide-react';
import { PricingAdmin } from './PricingAdmin';

async function createUser(formData: FormData) {
  'use server';
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') return;

  const password = formData.get('password') as string;
  const passwordHash = await hashPassword(password);

  await prisma.hubUser.create({
    data: {
      email: formData.get('email') as string,
      name: formData.get('name') as string,
      passwordHash,
      role: formData.get('role') as any,
    },
  });

  revalidatePath('/settings');
}

async function deleteUser(formData: FormData) {
  'use server';
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') return;

  const id = formData.get('id') as string;
  if (id === session.id) return; // Can't delete yourself

  await prisma.hubUser.delete({ where: { id } });
  revalidatePath('/settings');
}

export default async function SettingsPage() {
  const session = await getSession();
  if (!session) redirect('/login');

  const [users, projectTypes] = session.role === 'ADMIN'
    ? await Promise.all([
        prisma.hubUser.findMany({ orderBy: { createdAt: 'asc' } }),
        prisma.hubProjectType.findMany({
          include: { features: { orderBy: { sortOrder: 'asc' } } },
          orderBy: { sortOrder: 'asc' },
        }),
      ])
    : [[], []];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account and users</p>
      </div>

      {/* Current User */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-4 w-4" /> Your Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3 text-sm">
            <div>
              <span className="text-muted-foreground">Name</span>
              <p className="font-medium">{session.name}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Email</span>
              <p className="font-medium">{session.email}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Role</span>
              <p><StatusBadge status={session.role} /></p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User Management (Admin only) */}
      {session.role === 'ADMIN' && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <UserPlus className="h-4 w-4" /> Add User
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form action={createUser} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input name="name" required />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input name="email" type="email" required />
                </div>
                <div className="space-y-2">
                  <Label>Password</Label>
                  <Input name="password" type="password" required minLength={6} />
                </div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Select
                    name="role"
                    defaultValue="MANAGER"
                    options={[
                      { value: 'ADMIN', label: 'Admin' },
                      { value: 'MANAGER', label: 'Manager' },
                      { value: 'VIEWER', label: 'Viewer' },
                    ]}
                  />
                </div>
                <div className="sm:col-span-2 lg:col-span-4">
                  <Button type="submit" size="sm">Add User</Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>All Users ({users.length})</CardTitle>
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
                        <td className="p-3 font-medium">{user.name}</td>
                        <td className="p-3">{user.email}</td>
                        <td className="p-3"><StatusBadge status={user.role} /></td>
                        <td className="p-3">{new Date(user.createdAt).toLocaleDateString()}</td>
                        <td className="p-3">
                          {user.id !== session.id && (
                            <form action={deleteUser}>
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

          <PricingAdmin projectTypes={projectTypes} />
        </>
      )}
    </div>
  );
}

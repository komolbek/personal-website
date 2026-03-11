import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { EmptyState } from '@/components/shared/EmptyState';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { revalidatePath } from 'next/cache';
import { Users, Plus } from 'lucide-react';

const CONTACT_TYPES = [
  { value: 'CLIENT', label: 'Client' },
  { value: 'REFERRAL_SOURCE', label: 'Referral Source' },
  { value: 'POTENTIAL', label: 'Potential' },
  { value: 'PARTNER', label: 'Partner' },
];

const CONTACT_SOURCES = [
  { value: 'PERSONAL', label: 'Personal' },
  { value: 'IT_PARK', label: 'IT Park' },
  { value: 'TELEGRAM_GROUP', label: 'Telegram Group' },
  { value: 'INSTAGRAM', label: 'Instagram' },
  { value: 'REFERRAL', label: 'Referral' },
  { value: 'OTHER', label: 'Other' },
];

async function createContact(formData: FormData) {
  'use server';
  const session = await getSession();
  if (!session || session.role === 'VIEWER') return;

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

async function deleteContact(formData: FormData) {
  'use server';
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') return;

  await prisma.hubContact.delete({ where: { id: formData.get('id') as string } });
  revalidatePath('/contacts');
}

export default async function ContactsPage() {
  const session = await getSession();
  if (!session) redirect('/login');

  const contacts = await prisma.hubContact.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Contacts</h1>
        <p className="text-muted-foreground">Universal contact book</p>
      </div>

      {session.role !== 'VIEWER' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Plus className="h-4 w-4" /> Add Contact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form action={createContact} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input name="name" required />
              </div>
              <div className="space-y-2">
                <Label>Company</Label>
                <Input name="company" />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Input name="role" placeholder="e.g., CEO, Manager" />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input name="phone" />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input name="email" type="email" />
              </div>
              <div className="space-y-2">
                <Label>Telegram</Label>
                <Input name="telegram" placeholder="@username" />
              </div>
              <div className="space-y-2">
                <Label>Type</Label>
                <Select name="type" defaultValue="POTENTIAL" options={CONTACT_TYPES} />
              </div>
              <div className="space-y-2">
                <Label>Source</Label>
                <Select name="source" defaultValue="OTHER" options={CONTACT_SOURCES} />
              </div>
              <div className="space-y-2">
                <Label>Notes</Label>
                <Textarea name="notes" rows={1} />
              </div>
              <div className="sm:col-span-2 lg:col-span-3">
                <Button type="submit" size="sm">Add Contact</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {contacts.length === 0 ? (
        <EmptyState
          icon={<Users className="h-12 w-12" />}
          title="No contacts yet"
          description="Build your network by adding contacts."
        />
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-3 font-medium">Name</th>
                  <th className="text-left p-3 font-medium">Company</th>
                  <th className="text-left p-3 font-medium">Type</th>
                  <th className="text-left p-3 font-medium">Phone</th>
                  <th className="text-left p-3 font-medium">Telegram</th>
                  <th className="text-left p-3 font-medium">Source</th>
                  {session.role === 'ADMIN' && <th className="p-3 w-16"></th>}
                </tr>
              </thead>
              <tbody>
                {contacts.map((c) => (
                  <tr key={c.id} className="border-b hover:bg-muted/30">
                    <td className="p-3 font-medium">{c.name}</td>
                    <td className="p-3">{c.company || '—'}</td>
                    <td className="p-3"><StatusBadge status={c.type} /></td>
                    <td className="p-3">{c.phone || '—'}</td>
                    <td className="p-3">{c.telegram || '—'}</td>
                    <td className="p-3 text-xs">{c.source.replace(/_/g, ' ')}</td>
                    {session.role === 'ADMIN' && (
                      <td className="p-3">
                        <form action={deleteContact}>
                          <input type="hidden" name="id" value={c.id} />
                          <Button type="submit" variant="ghost" size="sm" className="text-destructive h-7 text-xs">Del</Button>
                        </form>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

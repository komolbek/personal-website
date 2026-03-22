import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/shared/EmptyState';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { revalidatePath } from 'next/cache';
import { Users } from 'lucide-react';
import { ContactFormDialog } from './ContactFormDialog';

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Contacts</h1>
          <p className="text-muted-foreground">Universal contact book</p>
        </div>
        {session.role !== 'VIEWER' && (
          <ContactFormDialog action={createContact} />
        )}
      </div>

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

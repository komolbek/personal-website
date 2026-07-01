import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/shared/EmptyState';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { revalidatePath } from 'next/cache';
import { Users } from 'lucide-react';
import { ContactFormDialog } from './ContactFormDialog';
import { getServerT } from '@/lib/i18n/server';

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

  const t = getServerT();

  const contacts = await prisma.hubContact.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{t('contacts.title')}</h1>
          <p className="text-muted-foreground">{t('contacts.subtitle')}</p>
        </div>
        {session.role !== 'VIEWER' && (
          <ContactFormDialog action={createContact} />
        )}
      </div>

      {contacts.length === 0 ? (
        <EmptyState
          icon={<Users className="h-12 w-12" />}
          title={t('contacts.empty.title')}
          description={t('contacts.empty.description')}
        />
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-3 font-medium">{t('common.name')}</th>
                  <th className="text-left p-3 font-medium">{t('common.company')}</th>
                  <th className="text-left p-3 font-medium">{t('common.type')}</th>
                  <th className="text-left p-3 font-medium">{t('common.phone')}</th>
                  <th className="text-left p-3 font-medium">{t('common.telegram')}</th>
                  <th className="text-left p-3 font-medium">{t('common.source')}</th>
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
                    <td className="p-3 text-xs">{t(`enum.${c.source}`)}</td>
                    {session.role === 'ADMIN' && (
                      <td className="p-3">
                        <form action={deleteContact}>
                          <input type="hidden" name="id" value={c.id} />
                          <Button type="submit" variant="ghost" size="sm" className="text-destructive h-7 text-xs">{t('contacts.delete')}</Button>
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

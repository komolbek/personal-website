import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

async function getContacts() {
  return prisma.contactSubmission.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

async function markAsRead(formData: FormData) {
  'use server';

  const session = await getSession();
  if (!session) return;

  const id = formData.get('id') as string;

  await prisma.contactSubmission.update({
    where: { id },
    data: { isRead: true },
  });

  revalidatePath('/admin/contacts');
}

async function deleteContact(formData: FormData) {
  'use server';

  const session = await getSession();
  if (!session) return;

  const id = formData.get('id') as string;

  await prisma.contactSubmission.delete({ where: { id } });

  revalidatePath('/admin/contacts');
}

export default async function ContactsPage() {
  const session = await getSession();

  if (!session) {
    redirect('/admin/login');
  }

  const contacts = await getContacts();

  const unreadCount = contacts.filter((c) => !c.isRead).length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Contact Submissions
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          View and manage contact form submissions
          {unreadCount > 0 && (
            <span className="ml-2 px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-sm rounded">
              {unreadCount} unread
            </span>
          )}
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        {contacts.length === 0 ? (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            No contact submissions yet.
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className={`p-6 ${!contact.isRead ? 'bg-amber-50/50 dark:bg-amber-900/10' : ''}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {!contact.isRead && (
                        <span className="w-2 h-2 bg-amber-500 rounded-full" />
                      )}
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {contact.name}
                      </span>
                      {contact.company && (
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          from {contact.company}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <span>📱 {contact.phone}</span>
                      {contact.email && <span>✉️ {contact.email}</span>}
                      {contact.service && (
                        <span className="px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded">
                          {contact.service}
                        </span>
                      )}
                      {contact.budget && (
                        <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded">
                          {contact.budget}
                        </span>
                      )}
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
                      {contact.message}
                    </p>

                    <div className="mt-3 text-xs text-gray-400">
                      {new Date(contact.createdAt).toLocaleString()}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {!contact.isRead && (
                      <form action={markAsRead}>
                        <input type="hidden" name="id" value={contact.id} />
                        <button
                          type="submit"
                          className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-lg transition-colors"
                        >
                          Mark Read
                        </button>
                      </form>
                    )}

                    <form action={deleteContact}>
                      <input type="hidden" name="id" value={contact.id} />
                      <button
                        type="submit"
                        className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        onClick={(e) => {
                          if (!confirm('Are you sure you want to delete this submission?')) {
                            e.preventDefault();
                          }
                        }}
                      >
                        🗑️
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

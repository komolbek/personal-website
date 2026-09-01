import type { Metadata } from 'next';
import './globals.css';
import AdminLayout from './admin-layout';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'Necto Admin',
  description: 'Necto Automations Admin Panel',
};

// The sidebar is a client component and cannot query the database, so the
// unread count is read here and passed down. Failing to read it must not take
// the whole panel down, hence the fallback to zero.
async function getUnreadContacts(): Promise<number> {
  try {
    return await prisma.contactSubmission.count({ where: { isRead: false } });
  } catch {
    return 0;
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const unreadContacts = await getUnreadContacts();

  return (
    <html lang="en">
      <body>
        <AdminLayout unreadContacts={unreadContacts}>{children}</AdminLayout>
      </body>
    </html>
  );
}

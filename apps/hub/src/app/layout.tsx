import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Sidebar } from '@/components/layout/Sidebar';
import { getSession } from '@/lib/auth';
import { I18nProvider } from '@/components/i18n/I18nProvider';
import { getLocale, getDictionary } from '@/lib/i18n/server';
import prisma from '@/lib/prisma';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Necto Hub',
  description: 'Internal business management system for Necto Automations',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = getLocale();
  const dict = getDictionary(locale);

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <I18nProvider locale={locale} dict={dict}>
          <AppShell>{children}</AppShell>
        </I18nProvider>
      </body>
    </html>
  );
}

async function AppShell({ children }: { children: React.ReactNode }) {
  // Check if we're on the login page by checking the session
  // Login page handles its own layout
  const session = await getSession();

  if (!session) {
    // We can't check the pathname in a server component easily,
    // so login page will have its own simple layout
    return <>{children}</>;
  }

  // Website enquiries arrive as projects in LEAD status. Counting them here
  // lets the sidebar show how many are waiting from anywhere in Hub; the
  // sidebar is a client component and cannot read this itself. A failure to
  // read it falls back to zero rather than taking the whole shell down.
  let newEnquiries = 0;
  try {
    newEnquiries = await prisma.hubProject.count({ where: { status: 'LEAD' } });
  } catch {
    newEnquiries = 0;
  }

  return (
    <div className="min-h-screen">
      <Sidebar newEnquiries={newEnquiries} />
      <main className="lg:pl-64">
        <div className="p-6 lg:p-8 pt-16 lg:pt-8">{children}</div>
      </main>
    </div>
  );
}

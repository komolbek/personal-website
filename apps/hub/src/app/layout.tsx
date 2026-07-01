import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Sidebar } from '@/components/layout/Sidebar';
import { getSession } from '@/lib/auth';
import { I18nProvider } from '@/components/i18n/I18nProvider';
import { getLocale, getDictionary } from '@/lib/i18n/server';

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

  return (
    <div className="min-h-screen">
      <Sidebar />
      <main className="lg:pl-64">
        <div className="p-6 lg:p-8 pt-16 lg:pt-8">{children}</div>
      </main>
    </div>
  );
}

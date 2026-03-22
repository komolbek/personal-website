import type { Metadata } from 'next';
import './globals.css';
import AdminLayout from './admin-layout';

export const metadata: Metadata = {
  title: 'Necto Admin',
  description: 'Necto Automations Admin Panel',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AdminLayout>{children}</AdminLayout>
      </body>
    </html>
  );
}

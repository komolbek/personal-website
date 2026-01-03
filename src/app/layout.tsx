import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';
import { LocaleProvider } from '@/hooks/useLocale';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.komolbek-ibragimov.com'),
  title: {
    default: 'Komolbek Ibragimov - Mobile App Developer | iOS & Android Apps',
    template: '%s | Komolbek Ibragimov',
  },
  description: 'Komolbek Ibragimov is a mobile app developer specializing in iOS and Android applications. View my portfolio of apps and get in touch for your next project.',
  keywords: [
    'Komolbek Ibragimov',
    'Komolbek',
    'Ibragimov',
    'mobile app developer',
    'iOS developer',
    'Android developer',
    'app development',
    'Swift developer',
    'Kotlin developer',
    'Uzbekistan developer',
  ],
  authors: [{ name: 'Komolbek Ibragimov', url: 'https://www.komolbek-ibragimov.com' }],
  creator: 'Komolbek Ibragimov',
  openGraph: {
    title: 'Komolbek Ibragimov - Mobile App Developer',
    description: 'Mobile app developer specializing in iOS and Android applications. View my portfolio and get in touch.',
    url: 'https://www.komolbek-ibragimov.com',
    siteName: 'Komolbek Ibragimov',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Komolbek Ibragimov - Mobile App Developer',
    description: 'Mobile app developer specializing in iOS and Android applications.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your Google Search Console verification code here after you get it
    // google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100`}
      >
        <LocaleProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </LocaleProvider>
        <Analytics />
      </body>
    </html>
  );
}

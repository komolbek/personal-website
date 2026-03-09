import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';
import { LocaleProvider } from '@/hooks/useLocale';
import { siteConfig } from '@/config/site';
import { LayoutContent } from '@/components/layout/LayoutContent';
import { JsonLd } from '@/components/seo/JsonLd';

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
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    // English
    'Necto Automations', 'IT solutions', 'software development', 'business automation',
    'custom CRM', 'mobile app development', 'AI integration', 'web development',
    'e-commerce solutions', 'Uzbekistan', 'Tashkent', 'software company',
    'website development', 'custom software', 'IT consulting',
    // Russian - high traffic keywords
    'разработка сайтов', 'создание сайтов', 'веб-разработка', 'разработка сайтов Ташкент',
    'автоматизация бизнеса', 'CRM система', 'разработка мобильных приложений',
    'IT решения', 'разработка ПО', 'программное обеспечение на заказ',
    'интернет магазин', 'электронная коммерция', 'интеграция ИИ',
    'разработка сайтов Узбекистан', 'создание интернет магазина',
    'автоматизация процессов', 'разработка CRM', 'веб студия Ташкент',
    'заказать сайт', 'сделать сайт', 'разработка приложений',
    // Uzbek - high traffic keywords
    'sayt yaratish', 'veb-sayt ishlab chiqish', 'sayt yaratish Toshkent',
    'biznes avtomatlashtirish', "dasturiy ta'minot", 'mobil ilova yaratish',
    'CRM tizimi', 'IT yechimlar', "internet do'kon yaratish",
    'dastur yaratish', 'veb-sayt buyurtma', 'Toshkent dasturchilar',
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  alternates: {
    canonical: siteConfig.url,
    languages: {
      'en': siteConfig.url,
      'ru': `${siteConfig.url}?lang=ru`,
      'uz': `${siteConfig.url}?lang=uz`,
    },
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: 'ru_RU',
    alternateLocale: ['en_US', 'uz_UZ'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
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
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}
      >
        <JsonLd />
        <LocaleProvider>
          <LayoutContent>{children}</LayoutContent>
        </LocaleProvider>
        <Analytics />
      </body>
    </html>
  );
}

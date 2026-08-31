import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';
import { LocaleProvider } from '@/hooks/useLocale';
import { siteConfig } from '@/config/site';
import { LayoutContent } from '@/components/layout/LayoutContent';
import { JsonLd } from '@/components/seo/JsonLd';
import { HtmlLangSetter } from '@/components/seo/HtmlLangSetter';

// Each snippet renders only when its ID is configured. These are inlined at
// build time, so they must be set as build args for the deployed image — see
// the ARG declarations in apps/web/Dockerfile — not only at runtime.
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || '';
const YM_COUNTER_ID = process.env.NEXT_PUBLIC_YM_ID || '';
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || '';

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
      'en': `${siteConfig.url}/en`,
      'ru': siteConfig.url,
      'uz': `${siteConfig.url}/uz`,
      'x-default': siteConfig.url,
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
    images: [
      {
        url: `${siteConfig.url}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: 'Necto Automations - IT Solutions & Software Development',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${siteConfig.url}/opengraph-image`],
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
      <head>
        {/* Google Analytics (GA4) */}
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
        {/* Meta Pixel (Facebook/Instagram Ads) */}
        {META_PIXEL_ID && (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${META_PIXEL_ID}');
              fbq('track', 'PageView');
            `}
          </Script>
        )}
        {/* Yandex.Metrica */}
        {YM_COUNTER_ID && (
          <Script id="yandex-metrica" strategy="afterInteractive">
            {`
              (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r)return;}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
              ym(${YM_COUNTER_ID}, "init", {
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:true
              });
            `}
          </Script>
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}
      >
        <JsonLd />
        <LocaleProvider>
          <HtmlLangSetter />
          <LayoutContent>{children}</LayoutContent>
        </LocaleProvider>

        <Analytics />
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Contact Us - Get a Free Consultation',
  description: 'Contact Necto Automations for website development, business automation, CRM systems in Tashkent. Free consultation. Заказать сайт, автоматизация бизнеса - бесплатная консультация. Bepul maslahat - sayt yaratish, biznes avtomatlashtirish.',
  alternates: {
    canonical: `${siteConfig.url}/contact`,
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}

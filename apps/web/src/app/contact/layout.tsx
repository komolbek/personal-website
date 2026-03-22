import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Контакты — Бесплатная консультация',
  description: 'Заказать сайт, CRM, мобильное приложение или автоматизацию бизнеса в Ташкенте. Бесплатная консультация. Free consultation for web & mobile development.',
  alternates: {
    canonical: `${siteConfig.url}/contact`,
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}

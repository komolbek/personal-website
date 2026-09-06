import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Наши работы — программы, сайты и приложения из Ташкента',
  description: 'Программы для бизнеса, сайты и мобильные приложения, которые мы сделали. CRM и ERP системы, маркетплейсы, приложения для iPhone и Android.',
  alternates: {
    canonical: `${siteConfig.url}/works`,
  },
};

export default function WorksLayout({ children }: { children: React.ReactNode }) {
  return children;
}

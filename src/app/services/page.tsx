import type { Metadata } from 'next';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Услуги — Веб, мобильная разработка, CRM',
  description: 'IT-услуги в Ташкенте: разработка сайтов, мобильных приложений, CRM/ERP систем, UI/UX дизайн, интеграция ИИ, IT-консалтинг. Professional IT services in Tashkent.',
  alternates: {
    canonical: `${siteConfig.url}/services`,
  },
};

export default function ServicesPage() {
  return <ServicesSection />;
}

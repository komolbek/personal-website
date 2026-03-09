import type { Metadata } from 'next';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Services - Web, Mobile, CRM Development | Necto Automations',
  description: 'Professional IT services in Tashkent: web development, mobile apps, CRM/ERP systems, UI/UX design, AI integration, IT consulting. Custom software solutions for Uzbek businesses.',
  alternates: {
    canonical: `${siteConfig.url}/services`,
  },
};

export default function ServicesPage() {
  return <ServicesSection />;
}

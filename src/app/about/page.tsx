import type { Metadata } from 'next';
import { AboutPageClient } from '@/components/AboutPageClient';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'About Us - IT Company in Tashkent | О компании',
  description: 'Necto Automations - your trusted IT partner in Uzbekistan. Custom software, business automation, CRM, mobile apps. О компании Necto Automations - IT решения в Ташкенте. Biz haqimizda - Toshkentda IT yechimlar.',
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
};

export default async function AboutPage() {
  return <AboutPageClient />;
}

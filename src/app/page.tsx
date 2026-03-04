import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { PortfolioPreview } from '@/components/sections/PortfolioPreview';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { CTASection } from '@/components/sections/CTASection';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Necto Automations - IT Solutions & Software Development | Разработка сайтов Ташкент',
  description: 'Professional IT solutions in Tashkent: website development, business automation, CRM systems, mobile apps, AI integration. Разработка сайтов, автоматизация бизнеса, CRM системы в Ташкенте. Sayt yaratish, biznes avtomatlashtirish Toshkentda.',
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <PortfolioPreview />
      <WhyChooseUs />
      <CTASection />
    </>
  );
}

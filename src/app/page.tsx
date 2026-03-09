import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { ClientLogos } from '@/components/sections/ClientLogos';
import { PortfolioPreview } from '@/components/sections/PortfolioPreview';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { CTASection } from '@/components/sections/CTASection';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Necto Automations - IT Solutions & Software Development | Razrabotka saytov Tashkent',
  description: 'Professional IT solutions in Tashkent: website development, business automation, CRM systems, mobile apps, AI integration. Razrabotka saytov, avtomatizatsiya biznesa, CRM sistemy v Tashkente. Sayt yaratish, biznes avtomatlashtirish Toshkentda.',
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <ClientLogos />
      <PortfolioPreview />
      <WhyChooseUs />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}

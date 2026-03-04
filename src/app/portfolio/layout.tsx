import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Portfolio - Our Projects & Products | Портфолио',
  description: 'Explore our portfolio: CRM systems, websites, mobile apps, business automation solutions. Наши работы: CRM системы, сайты, мобильные приложения, автоматизация. Bizning ishlarimiz: CRM tizimlar, saytlar, mobil ilovalar.',
  alternates: {
    canonical: `${siteConfig.url}/portfolio`,
  },
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Partners & Testimonials | Партнёры и отзывы',
  description: 'Trusted by leading companies in Uzbekistan. See our partners and client testimonials. Нам доверяют ведущие компании Узбекистана. Bizga O\'zbekiston yetakchi kompaniyalari ishonadi.',
  alternates: {
    canonical: `${siteConfig.url}/partners`,
  },
};

export default function PartnersLayout({ children }: { children: React.ReactNode }) {
  return children;
}

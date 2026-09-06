import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { AboutContent } from './AboutContent';

// §4.2 puts «О студии» in the footer, and the old /about redirected to the
// homepage's About section — which the redesign removed. This is that section,
// as its own page, with the numbers Stage 0 (§2.3) settled on.
export const metadata: Metadata = {
  title: 'О студии — Necto Automations, Ташкент',
  description:
    'Студия разработки в Ташкенте. Три собственных продукта в продакшене — Yuridix, Ordo, TalimX — и заказная разработка: программы для бизнеса, сайты, мобильные приложения.',
  alternates: { canonical: `${siteConfig.url}/about` },
};

export default function AboutPage() {
  return <AboutContent />;
}

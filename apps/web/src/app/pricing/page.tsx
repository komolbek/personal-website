import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { PricingContent } from './PricingContent';

// The homepage is now an interface: almost no text, everything behind clicks.
// This page is the text version of the same prices, so the queries that used to
// land on the homepage ("разработка сайтов Ташкент", "CRM Ташкент") still have
// something to land on (REDESIGN.md §7).
export const metadata: Metadata = {
  title: 'Цены — программы, сайты и приложения для бизнеса в Ташкенте',
  description:
    'Полный прайс: программа для одного отдела — 38 000 000 сум, сайт — от 5 000 000 сум, мобильное приложение — 75 000 000 сум. Точная цена и срок фиксируются в договоре.',
  alternates: { canonical: `${siteConfig.url}/pricing` },
};

export default function PricingPage() {
  return <PricingContent />;
}

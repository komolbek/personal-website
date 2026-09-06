import type { Metadata } from 'next';
import { Calculator } from '@/components/calculator/Calculator';
import { ExplainPanels } from '@/components/calculator/ExplainPanels';
import { Intro } from '@/components/calculator/Intro';
import { ProductStrip } from '@/components/calculator/ProductStrip';
import { siteConfig } from '@/config/site';

// The price goes in the description itself (REDESIGN.md §7): the search result
// is where a visitor decides whether they can afford to click.
//
// Metadata is Russian only. Next resolves it on the server with no locale
// context — the switcher is a client-side preference, not a route — so there is
// one canonical language for the tab title and the search snippet, and Russian
// is it. Per-language metadata needs /uz and /en routes; see the note in
// REDESIGN.md §6.4 follow-ups.
export const metadata: Metadata = {
  title: 'Necto Automations — программа для вашего бизнеса, цена сразу',
  description:
    'Программы для бизнеса в Ташкенте: проекты от 38 000 000 сум, сайты от 5 000 000. Точная цена и срок — в договоре, а не «от». Посчитайте за минуту.',
  alternates: {
    canonical: siteConfig.url,
  },
};

/** The homepage is one tool: pick what is going wrong, get an exact price. */
export default function Home() {
  return (
    <div className="mx-auto max-w-[1060px] px-5 pb-24 lg:pb-8">
      <Intro />
      <Calculator />

      {/* Wide screens get this beside the heading instead — see ProductStrip. */}
      <div className="mb-10">
        <ProductStrip where="below" />
      </div>

      <ExplainPanels />
    </div>
  );
}

'use client';

import Link from 'next/link';
import { useLocale } from '@/hooks/useLocale';

const PRODUCTS = ['yuridix', 'ordo', 'talimx'] as const;
const NAMES: Record<(typeof PRODUCTS)[number], string> = {
  yuridix: 'Yuridix',
  ordo: 'Ordo',
  talimx: 'TalimX',
};

export function AboutContent() {
  const { t } = useLocale();
  const c = t.calc;
  const link = 'border-b border-accent-line text-accent hover:border-accent';

  return (
    <div className="mx-auto max-w-[820px] px-5 pb-20 pt-10">
      <h1 className="m-0 mb-3 text-[clamp(26px,4vw,36px)] font-semibold leading-[1.15] tracking-[-0.03em]">
        {c.about.h1}
      </h1>

      <p className="m-0 mb-4 max-w-[62ch] text-ink-muted">{c.about.p1}</p>
      <p className="m-0 mb-10 max-w-[62ch] text-ink-muted">{c.about.p2}</p>

      <h2 className="mb-3 text-[20px] font-semibold">{c.about.productsTitle}</h2>
      <ul className="mb-10 grid list-none gap-3 p-0 text-[15px]">
        {PRODUCTS.map((slug) => (
          <li key={slug}>
            <Link href={`/works/${slug}`} className="font-semibold text-accent hover:underline">
              {NAMES[slug]}
            </Link>
            <span className="text-ink-muted"> — {c.about.products[slug]}</span>
          </li>
        ))}
      </ul>

      <h2 className="mb-3 text-[20px] font-semibold">{c.about.howTitle}</h2>
      <ul className="mb-10 grid list-disc gap-1.5 pl-5 text-[15px] text-ink-muted">
        {c.about.how.map((line, i) => (
          <li key={i}>{line}</li>
        ))}
      </ul>

      <p className="text-[15px] text-ink-muted">
        <Link href="/works" className={link}>
          {c.footer.works}
        </Link>
        {' · '}
        <Link href="/pricing" className={link}>
          {c.footer.pricing}
        </Link>
        {' · '}
        <Link href="/contact" className={link}>
          {c.footer.contact}
        </Link>
      </p>
    </div>
  );
}

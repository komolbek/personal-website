'use client';

import { useLocale } from '@/hooks/useLocale';
import { ProductStrip } from './ProductStrip';

/**
 * The H1 and the paragraph under it, with the product screenshots filling the
 * space beside them.
 *
 * §7 wants this to be static server-rendered text, and §6.4 wants it
 * translated — which look like opposite requirements. They are not: a client
 * component is still server-rendered, so the Russian text is in the HTML a
 * crawler receives, and the visitor's own language replaces it on hydration.
 * What §7 rules out is mounting the text on a click, and nothing here does.
 */
export function Intro() {
  const { t } = useLocale();

  return (
    <div className="grid items-end gap-8 pb-2 pt-10 lg:grid-cols-[1fr_384px] lg:gap-[38px]">
      <div>
        <h1 className="m-0 mb-3 max-w-[20ch] text-[clamp(28px,4.4vw,42px)] font-semibold leading-[1.1] tracking-[-0.035em]">
          {t.calc.h1}
        </h1>
        <p className="m-0 max-w-[58ch] text-[17px] leading-[1.5] text-ink-muted">{t.calc.intro}</p>
      </div>

      <ProductStrip />
    </div>
  );
}

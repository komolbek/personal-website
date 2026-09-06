'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from '@/hooks/useLocale';

/**
 * Three real product screenshots, in the space to the right of the heading.
 *
 * That space was empty on first paint, which is most of why the page read as a
 * form rather than a page. Putting them here rather than above the questions
 * means the calculator does not move down a pixel — the tool is still the first
 * thing on the screen.
 *
 * These are the only three products that actually run in production, so the
 * strip doubles as the proof the homepage otherwise lost when the portfolio
 * moved to /works.
 */

const SHOTS = [
  { slug: 'yuridix', name: 'Yuridix', src: '/products/yuridix/screenshot-1.png' },
  { slug: 'ordo', name: 'Ordo', src: '/products/ordo/screenshot-2.png' },
  { slug: 'talimx', name: 'TalimX', src: '/products/talimx/screenshot-5.png' },
] as const;

/**
 * `where` decides which breakpoint shows it. Beside the heading there is only
 * room on a wide screen, so the narrow layout renders a second copy below the
 * calculator instead — mobile is most of the traffic here, and it would
 * otherwise be the one layout with no imagery at all.
 */
export function ProductStrip({ where = 'aside' }: { where?: 'aside' | 'below' }) {
  const { t } = useLocale();

  return (
    <div className={where === 'aside' ? 'hidden lg:block' : 'mb-10 border-t border-line pt-8 lg:hidden'}>
      {/* Not uppercase: the eyebrow above the H1 uses that treatment, and two of
          them side by side read as a pair of column headings. */}
      <p className="mb-3 text-[13px] text-ink-faint">{t.calc.works.stripLabel}</p>

      <div className="grid grid-cols-3 gap-3">
        {SHOTS.map((s) => (
          <Link
            key={s.slug}
            href={`/works/${s.slug}`}
            className="group block"
          >
            <span className="block overflow-hidden rounded-lg border border-line bg-paper-alt shadow-[0_1px_2px_rgba(60,45,20,0.06),0_8px_20px_-12px_rgba(60,45,20,0.25)] transition-shadow group-hover:shadow-[0_1px_2px_rgba(60,45,20,0.08),0_12px_28px_-12px_rgba(60,45,20,0.35)]">
              <Image
                src={s.src}
                // Decorative here: the product name is right below as text, so
                // an alt would make a screen reader say it twice.
                alt=""
                width={640}
                height={364}
                sizes="220px"
                className="h-auto w-full"
              />
            </span>
            <span className="mt-2 block text-[13px] font-medium text-ink-muted group-hover:text-accent">
              {s.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

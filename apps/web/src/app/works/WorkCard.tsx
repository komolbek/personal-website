'use client';

import Link from 'next/link';
import type { Locale } from '@/types';
import type { CalcText } from '@/locales/calc';

/**
 * One card shape for both in-house products and client projects.
 *
 * The two it replaces built a decorative gradient header per entry, picked an
 * icon by hashing the slug, and lifted on hover — invented visuals standing in
 * for a screenshot nobody had. This shows what is actually known: a name, a
 * sentence, the kind of work, the year, the stack.
 */
export interface WorkCardProps {
  href: string;
  title: string;
  description: string;
  /** Localised kind of work, or null for in-house products. */
  kind?: string | null;
  year?: string | null;
  tech: string[];
  locale: Locale;
  c: CalcText;
}

export function WorkCard({ href, title, description, kind, year, tech, c }: WorkCardProps) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col rounded-xl border border-line bg-paper p-5 transition-colors hover:border-accent-line hover:bg-accent-soft"
    >
      {(kind || year) && (
        <p className="mb-2 flex items-center gap-2 text-[12px] uppercase tracking-[0.09em] text-ink-faint">
          {kind && <span>{kind}</span>}
          {kind && year && <span aria-hidden="true">·</span>}
          {year && <span className="num normal-case tracking-normal">{year}</span>}
        </p>
      )}

      <h3 className="mb-1.5 text-[17px] font-semibold tracking-[-0.01em] text-ink">{title}</h3>

      <p className="mb-4 line-clamp-3 text-[14.5px] leading-[1.45] text-ink-muted">{description}</p>

      {tech.length > 0 && (
        <p className="mb-4 mt-auto text-[13px] text-ink-faint">{tech.slice(0, 4).join(' · ')}</p>
      )}

      <span className="mt-auto text-[14px] font-semibold text-accent">
        {c.works.open}
        <span aria-hidden="true" className="ml-1 inline-block transition-transform group-hover:translate-x-0.5">
          →
        </span>
      </span>
    </Link>
  );
}

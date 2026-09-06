'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

/**
 * The shared frame for both kinds of detail page (REDESIGN.md §5).
 *
 * It replaces seven bespoke components — full-bleed gradient heroes, platform
 * tabs, feature accordions, animated tech-stack diagrams — that differed from
 * each other in decoration and not in content. Everything they showed came from
 * src/config/solutions.ts and src/config/projects.ts; the one exception is in
 * src/config/product-extras.ts.
 */

export function DetailHeader({
  back,
  backLabel,
  kicker,
  title,
  lead,
  actions,
}: {
  back: string;
  backLabel: string;
  kicker?: string | null;
  title: string;
  lead: string;
  actions?: ReactNode;
}) {
  return (
    <header className="border-b border-line pb-8">
      <Link
        href={back}
        className="mb-6 inline-flex items-center gap-1.5 text-[14px] text-ink-muted hover:text-ink"
      >
        <span aria-hidden="true">←</span>
        {backLabel}
      </Link>

      {kicker && (
        <p className="mb-2 text-[12px] uppercase tracking-[0.09em] text-ink-faint">{kicker}</p>
      )}

      <h1 className="m-0 mb-3 text-[clamp(26px,4vw,36px)] font-semibold leading-[1.15] tracking-[-0.03em]">
        {title}
      </h1>
      <p className="m-0 max-w-[62ch] text-[17px] leading-[1.5] text-ink-muted">{lead}</p>

      {actions && <div className="mt-6 flex flex-wrap gap-3">{actions}</div>}
    </header>
  );
}

export function DetailLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-[9px] border border-accent-line px-4 py-2.5 text-[14px] font-semibold text-accent hover:bg-accent-soft"
    >
      {children}
    </a>
  );
}

export function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border-b border-line py-10 last:border-b-0">
      <h2 className="mb-4 text-[20px] font-semibold">{title}</h2>
      {children}
    </section>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return <p className="m-0 max-w-[70ch] leading-[1.6] text-ink-muted">{children}</p>;
}

export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="grid max-w-[70ch] list-none gap-2.5 p-0">
      {items.map((item, i) => (
        <li key={i} className="relative pl-5 leading-[1.5] text-ink-muted">
          <span aria-hidden="true" className="absolute left-0 text-accent-line">
            –
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

export function TechList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2 p-0">
      {items.map((tech) => (
        <li
          key={tech}
          className="num list-none rounded-lg border border-line px-3 py-1.5 text-[13px] text-ink-muted"
        >
          {tech}
        </li>
      ))}
    </ul>
  );
}

/**
 * Screenshots are the one thing on these pages worth showing large. They are
 * lazy by default — only the first is eager, since it is the only one that can
 * be above the fold.
 */
export function Screenshots({ images, alt }: { images: string[]; alt: string }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {images.map((src, i) => (
        <div
          key={src}
          className="overflow-hidden rounded-xl border border-line bg-paper-alt"
        >
          <Image
            src={src}
            alt={`${alt} — ${i + 1}`}
            width={800}
            height={600}
            // Three across on desktop, two on tablet, one on mobile — without
            // this Next ships a full-width candidate for a 330px slot, and
            // these screenshots are ~500 KB PNGs.
            sizes="(min-width: 1024px) 330px, (min-width: 640px) 50vw, 100vw"
            loading={i === 0 ? 'eager' : 'lazy'}
            className="h-auto w-full"
          />
        </div>
      ))}
    </div>
  );
}

export function DetailCta({
  title,
  button,
  href = '/',
}: {
  title: string;
  button: string;
  href?: string;
}) {
  return (
    <section className="mt-10 rounded-xl border border-accent-line bg-accent-soft px-6 py-8">
      <h2 className="mb-4 text-[20px] font-semibold">{title}</h2>
      <Link
        href={href}
        className="inline-block rounded-[9px] bg-accent px-6 py-3.5 text-[15px] font-semibold text-accent-ink hover:opacity-90"
      >
        {button}
      </Link>
    </section>
  );
}

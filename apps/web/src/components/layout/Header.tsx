'use client';

import Link from 'next/link';
import { useLocale } from '@/hooks/useLocale';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { siteConfig } from '@/config/site';

/**
 * Logo · the wedge · Telegram. No menu (REDESIGN.md §4.2).
 *
 * On the homepage there is nowhere to go except answer the questions, and a
 * five-item nav offered five ways to leave before seeing a price. Everything
 * that was in it is in the footer.
 */
export function Header() {
  const { t } = useLocale();
  const c = t.calc;

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper">
      <div className="mx-auto flex h-14 max-w-[1060px] items-center gap-3.5 px-5">
        <Link
          href="/"
          className="mr-auto min-w-0 truncate text-[17px] font-semibold tracking-[-0.02em] text-ink hover:opacity-80"
        >
          Necto <span className="hidden font-normal text-ink-faint sm:inline">Automations</span>
        </Link>

        {/* The position, stated once, where it is read before anything else. */}
        <span className="mr-auto hidden border-l-2 border-accent pl-3 text-[14px] text-ink-muted md:inline">
          {c.header.wedge}
        </span>

        <a
          href={`https://t.me/${siteConfig.telegram}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-none whitespace-nowrap rounded-lg border border-accent-line px-3 py-[7px] text-[14px] font-semibold text-accent hover:bg-accent-soft sm:px-3.5"
        >
          <span className="hidden sm:inline">{c.header.telegram}</span>
          <span className="sm:hidden">Telegram</span>
        </a>

        <LanguageSwitcher />
      </div>
    </header>
  );
}

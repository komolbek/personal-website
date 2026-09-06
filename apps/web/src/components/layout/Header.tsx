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
          // Quieter than a filled button on purpose: this was the most
          // button-shaped thing on the page, inviting people to leave and
          // message instead of using the calculator.
          className="flex-none whitespace-nowrap px-1 py-[7px] text-[14px] font-medium text-ink-muted underline decoration-line-strong underline-offset-4 hover:text-accent hover:decoration-accent sm:px-2"
        >
          <span className="hidden sm:inline">{c.header.telegram}</span>
          <span className="sm:hidden">Telegram</span>
        </a>

        <LanguageSwitcher />
      </div>
    </header>
  );
}

'use client';

import Link from 'next/link';
import { useLocale } from '@/hooks/useLocale';
import { siteConfig } from '@/config/site';
import { TelegramIcon, InstagramIcon, MailIcon, PhoneIcon } from '@/components/ui/Icons';

/**
 * Everything the header used to hold (REDESIGN.md §4.2). The site is still
 * whole and still indexed — it just stops competing with the price.
 */

const LINK_HREFS = ['/works', '/pricing', '/blog', '/about', '/contact'] as const;
const LINK_KEYS = ['works', 'pricing', 'blog', 'about', 'contact'] as const;
const LEGAL_HREFS = ['/legal/privacy', '/legal/terms'] as const;
const LEGAL_KEYS = ['privacy', 'terms'] as const;

export function Footer() {
  const { t } = useLocale();
  const c = t.calc;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-10 border-t border-line">
      <div className="mx-auto max-w-[1060px] px-5 py-8">
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2.5 text-[14px]">
          {LINK_HREFS.map((href, i) => (
            <Link
              key={href}
              href={href}
              className="border-b border-line text-ink-muted hover:border-ink-faint hover:text-ink"
            >
              {c.footer[LINK_KEYS[i]]}
            </Link>
          ))}
        </nav>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href={`https://t.me/${siteConfig.telegram}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Telegram"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft text-accent hover:opacity-80"
          >
            <TelegramIcon className="h-4 w-4" />
          </a>
          <a
            href="https://www.instagram.com/necto__uz/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft text-accent hover:opacity-80"
          >
            <InstagramIcon className="h-4 w-4" />
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            aria-label="Email"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft text-accent hover:opacity-80"
          >
            <MailIcon className="h-4 w-4" />
          </a>
          <a
            href={`tel:${siteConfig.phone}`}
            aria-label={c.footer.phoneLabel}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft text-accent hover:opacity-80"
          >
            <PhoneIcon className="h-4 w-4" />
          </a>
          <span className="text-[14px] text-ink-muted">
            <a href={`tel:${siteConfig.phone}`} className="hover:text-ink">
              {siteConfig.phone}
            </a>
            {' · '}
            <a href={`mailto:${siteConfig.email}`} className="hover:text-ink">
              {siteConfig.email}
            </a>
          </span>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-6 text-[13px] text-ink-faint">
          <span className="mr-auto">
            © {currentYear} {siteConfig.name} · {c.footer.city}
          </span>
          {LEGAL_HREFS.map((href, i) => (
            <Link key={href} href={href} className="hover:text-ink-muted">
              {c.footer[LEGAL_KEYS[i]]}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

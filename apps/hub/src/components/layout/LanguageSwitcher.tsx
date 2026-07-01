'use client';

import { useRouter } from 'next/navigation';
import { useI18n } from '@/components/i18n/I18nProvider';
import { LOCALES, LOCALE_COOKIE, LOCALE_LABELS, type Locale } from '@/lib/i18n/config';
import { cn } from '@/lib/utils';

export function LanguageSwitcher({ className }: { className?: string }) {
  const router = useRouter();
  const { locale } = useI18n();

  function setLocale(next: Locale) {
    if (next === locale) return;
    // Cookie is read server-side on the next render to pick the dictionary.
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    router.refresh();
  }

  return (
    <div className={cn('inline-flex items-center rounded-md border p-0.5', className)}>
      {LOCALES.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => setLocale(loc)}
          className={cn(
            'px-2 py-0.5 text-xs font-medium rounded transition-colors',
            loc === locale
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
          )}
          aria-pressed={loc === locale}
        >
          {LOCALE_LABELS[loc]}
        </button>
      ))}
    </div>
  );
}

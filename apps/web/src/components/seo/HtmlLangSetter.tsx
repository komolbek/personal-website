'use client';

import { useEffect } from 'react';
import { useLocale } from '@/hooks/useLocale';

/**
 * Dynamically sets the <html lang="..."> attribute based on the active locale.
 * This ensures screen readers use the correct pronunciation and search engines
 * understand the page language.
 */
export function HtmlLangSetter() {
  const { locale } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}

'use client';

import { createContext, useContext } from 'react';
import type { Locale } from '@/lib/i18n/config';
import { makeT, type Dictionary, type TFunction } from '@/lib/i18n/translate';

interface I18nContextValue {
  locale: Locale;
  t: TFunction;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({
  locale,
  dict,
  children,
}: {
  locale: Locale;
  dict: Dictionary;
  children: React.ReactNode;
}) {
  const t = makeT(dict);
  return <I18nContext.Provider value={{ locale, t }}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return ctx;
}

import { cookies } from 'next/headers';
import { DEFAULT_LOCALE, LOCALE_COOKIE, isLocale, type Locale } from './config';
import { dictionaries } from './dictionaries';
import { makeT, type Dictionary, type TFunction } from './translate';

export function getLocale(): Locale {
  const value = cookies().get(LOCALE_COOKIE)?.value;
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

export function getDictionary(locale: Locale = getLocale()): Dictionary {
  return dictionaries[locale];
}

// Server-side translator: reads the locale cookie and returns a t() function.
export function getServerT(locale: Locale = getLocale()): TFunction {
  return makeT(dictionaries[locale]);
}

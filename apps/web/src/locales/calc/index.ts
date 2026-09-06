import { calcRu } from './ru';
import { calcUz } from './uz';
import { calcEn } from './en';
import type { CalcText } from './types';
import type { Locale } from '@/types';

export type { CalcText, PkgText } from './types';
export { calcRu, calcUz, calcEn };

const byLocale: Record<Locale, CalcText> = { ru: calcRu, uz: calcUz, en: calcEn };

/**
 * Used by server code that has no locale context — JsonLd and the page
 * metadata. Russian is what the server renders and what is indexed.
 */
export function getCalcText(locale: Locale): CalcText {
  return byLocale[locale] ?? calcRu;
}

/** Fills {name} placeholders. Missing keys are left in place, not blanked. */
export function fmt(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (whole, key: string) =>
    key in vars ? String(vars[key]) : whole
  );
}

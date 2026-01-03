import { en } from './en';
import { ru } from './ru';
import { uz } from './uz';
import { Locale } from '@/types';

export const dictionaries = {
  en,
  ru,
  uz,
};

export type Dictionary = typeof en;

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] || dictionaries.en;
}

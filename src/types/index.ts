export type Locale = 'en' | 'ru' | 'uz';

export interface App {
  id: string;
  name: string;
  description: Record<Locale, string>;
  longDescription?: Record<Locale, string>;
  features?: Record<Locale, string[]>;
  icon: string;
  screenshots?: string[];
  appStoreUrl?: string;
  playStoreUrl?: string;
  webUrl?: string;
  category: string;
  featured?: boolean;
  color?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

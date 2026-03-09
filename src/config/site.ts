import { App, SocialLink } from '@/types';

export const siteConfig = {
  name: 'Necto Automations',
  title: 'Necto Automations - IT Solutions & Software Development',
  description: 'Professional IT solutions including business automation, custom CRM, mobile apps, e-commerce, and AI integration. Transform your business with modern technology.',
  url: 'https://necto.uz',
  phone: '+998 77 070 72 70',
  email: 'info@necto.uz',
  telegram: 'necto_customers_bot',
  address: {
    en: 'Tashkent, Uzbekistan',
    ru: 'Ташкент, Узбекистан',
    uz: "Toshkent, O'zbekiston",
  },
  defaultLocale: 'ru' as const,
  locales: ['en', 'ru', 'uz'] as const,
};

export const socialLinks: SocialLink[] = [
  { platform: 'telegram', url: 'https://t.me/necto_customers_bot' },
  { platform: 'instagram', url: 'https://www.instagram.com/necto__uz/' },
];

// Apps/Projects are now managed through the admin panel as Client Projects
// This array is kept for backwards compatibility but should remain empty
export const apps: App[] = [];

export function getAppById(id: string): App | undefined {
  return apps.find(app => app.id === id);
}

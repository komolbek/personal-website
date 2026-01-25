import { App, SocialLink, CompanyStats } from '@/types';

export const siteConfig = {
  name: 'Necto Automations',
  title: 'Necto Automations - IT Solutions & Software Development',
  description: 'Professional IT solutions including business automation, custom CRM, mobile apps, e-commerce, and AI integration. Transform your business with modern technology.',
  url: 'https://nectoautomations.com',
  email: 'info@nectoautomations.com',
  phone: '+998 77 070 72 70',
  address: {
    en: 'Tashkent, Uzbekistan',
    ru: 'Ташкент, Узбекистан',
    uz: "Toshkent, O'zbekiston",
  },
  defaultLocale: 'en' as const,
  locales: ['en', 'ru', 'uz'] as const,
};

export const companyStats: CompanyStats = {
  projects: 50,
  clients: 30,
  years: 5,
  satisfaction: 98,
};

export const socialLinks: SocialLink[] = [
  {
    platform: 'GitHub',
    url: 'https://github.com/nectoautomations',
    icon: 'github',
  },
  {
    platform: 'LinkedIn',
    url: 'https://linkedin.com/company/nectoautomations',
    icon: 'linkedin',
  },
  {
    platform: 'Instagram',
    url: 'https://instagram.com/nectoautomations',
    icon: 'instagram',
  },
  {
    platform: 'Telegram',
    url: 'https://t.me/nectoautomations',
    icon: 'telegram',
  },
];

// Apps/Projects are now managed through the admin panel as Client Projects
// This array is kept for backwards compatibility but should remain empty
export const apps: App[] = [];

export function getAppById(id: string): App | undefined {
  return apps.find(app => app.id === id);
}

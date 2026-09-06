import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Контакты — Necto Automations, Ташкент',
  description: 'Напишите нам в Telegram, позвоните или оставьте контакт — ответим в течение 24 часов. Цену на программу или сайт можно посчитать самому за минуту.',
  alternates: {
    canonical: `${siteConfig.url}/contact`,
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}

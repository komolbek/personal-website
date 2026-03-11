import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { CalculatorClient } from './CalculatorClient';

export default async function CalculatorPage() {
  const session = await getSession();
  if (!session) redirect('/login');

  // Load pricing configs from DB
  const pricingConfigs = await prisma.hubPricingConfig.findMany({
    orderBy: [{ projectType: 'asc' }, { sortOrder: 'asc' }],
  });

  // Group by project type
  const pricingByType: Record<string, { name: string; type: string; price: number }[]> = {};
  pricingConfigs.forEach((config) => {
    if (!pricingByType[config.projectType]) {
      pricingByType[config.projectType] = [];
    }
    pricingByType[config.projectType].push({
      name: config.itemName,
      type: config.itemType,
      price: config.price,
    });
  });

  // Fallback to hardcoded data if DB is empty for a type
  const FALLBACK_PRICING: Record<string, { name: string; type: string; price: number }[]> = {
    website: [
      { name: 'Base: Single page, responsive, deployed', type: 'BASE', price: 400 },
      { name: 'Additional page (per page)', type: 'FEATURE', price: 80 },
      { name: 'CMS / admin panel', type: 'FEATURE', price: 300 },
      { name: 'Multi-language support (per language)', type: 'FEATURE', price: 150 },
      { name: 'Contact form with Telegram notification', type: 'FEATURE', price: 50 },
      { name: 'Photo gallery / portfolio section', type: 'FEATURE', price: 100 },
      { name: 'Blog / news section', type: 'FEATURE', price: 200 },
      { name: 'Animations / custom interactions', type: 'FEATURE', price: 150 },
      { name: 'SEO optimization', type: 'FEATURE', price: 100 },
      { name: 'Analytics integration', type: 'FEATURE', price: 50 },
    ],
    webapp: [
      { name: 'Base: Auth + 1 CRUD module + basic UI + deployed', type: 'BASE', price: 1500 },
      { name: 'Additional CRUD module', type: 'FEATURE', price: 400 },
      { name: 'User roles & permissions', type: 'FEATURE', price: 300 },
      { name: 'Dashboard with charts & analytics', type: 'FEATURE', price: 500 },
      { name: 'Report generation (PDF/Excel)', type: 'FEATURE', price: 300 },
      { name: 'Telegram bot integration', type: 'FEATURE', price: 400 },
      { name: 'Email notifications', type: 'FEATURE', price: 200 },
      { name: 'File upload & management', type: 'FEATURE', price: 200 },
      { name: 'Advanced search & filtering', type: 'FEATURE', price: 200 },
      { name: 'Multi-language support (per language)', type: 'FEATURE', price: 200 },
      { name: 'Multi-tenant architecture (SaaS)', type: 'FEATURE', price: 800 },
      { name: 'API layer (REST or GraphQL)', type: 'FEATURE', price: 500 },
    ],
    telegram_bot: [
      { name: 'Base: Menu navigation + auto-replies + basic flow', type: 'BASE', price: 250 },
      { name: 'Database integration', type: 'FEATURE', price: 200 },
      { name: 'Booking / appointment flow', type: 'FEATURE', price: 300 },
      { name: 'Order / catalog flow', type: 'FEATURE', price: 350 },
      { name: 'Admin notification system', type: 'FEATURE', price: 100 },
      { name: 'Web admin panel', type: 'FEATURE', price: 500 },
      { name: 'Multi-language support (per language)', type: 'FEATURE', price: 150 },
      { name: 'Analytics & reporting', type: 'FEATURE', price: 200 },
    ],
    mobile: [
      { name: 'Base: 1 platform, 3 screens, basic API', type: 'BASE', price: 2000 },
      { name: 'Cross-platform (add second platform)', type: 'FEATURE', price: 1500 },
      { name: 'Additional screen (per screen)', type: 'FEATURE', price: 200 },
      { name: 'Push notifications', type: 'FEATURE', price: 300 },
      { name: 'User auth (login/register/profile)', type: 'FEATURE', price: 400 },
      { name: 'Offline mode / local storage', type: 'FEATURE', price: 400 },
      { name: 'Camera / image capture', type: 'FEATURE', price: 200 },
      { name: 'App Store submission (per store)', type: 'FEATURE', price: 150 },
    ],
  };

  // Merge: DB configs take priority, fallback for types not in DB
  const finalPricing: Record<string, { name: string; type: string; price: number }[]> = {};
  for (const type of ['website', 'webapp', 'telegram_bot', 'mobile']) {
    finalPricing[type] = pricingByType[type]?.length > 0 ? pricingByType[type] : FALLBACK_PRICING[type];
  }

  return <CalculatorClient pricingData={finalPricing} />;
}

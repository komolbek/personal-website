import { prisma } from '@/lib/prisma';
import { companyStats } from '@/config/site';
import { AboutPageClient } from '@/components/AboutPageClient';

async function getStats() {
  try {
    const stats = await prisma.companyStat.findMany({
      where: { isVisible: true },
      orderBy: { order: 'asc' },
    });
    return stats;
  } catch {
    // Fallback to static stats if database is not available
    return null;
  }
}

export default async function AboutPage() {
  const dbStats = await getStats();

  // Use database stats if available, otherwise fall back to static config
  const statsData = dbStats && dbStats.length > 0
    ? dbStats.map(stat => ({
        key: stat.key,
        value: stat.value,
        suffix: stat.suffix,
        label_en: stat.label_en,
        label_ru: stat.label_ru,
        label_uz: stat.label_uz,
      }))
    : [
        { key: 'years', value: companyStats.years, suffix: '+', label_en: 'Years in Business', label_ru: 'Лет в бизнесе', label_uz: 'Yil biznesda' },
        { key: 'projects', value: companyStats.projects, suffix: '+', label_en: 'Projects Completed', label_ru: 'Выполненных проектов', label_uz: 'Bajarilgan loyihalar' },
        { key: 'clients', value: companyStats.clients, suffix: '+', label_en: 'Happy Clients', label_ru: 'Довольных клиентов', label_uz: 'Mamnun mijozlar' },
      ];

  return <AboutPageClient stats={statsData} />;
}

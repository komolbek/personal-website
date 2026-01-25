import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { companyStats } from '@/config/site';

// GET - Get public company statistics
export async function GET() {
  try {
    const stats = await prisma.companyStat.findMany({
      where: { isVisible: true },
      orderBy: { order: 'asc' },
      select: {
        key: true,
        value: true,
        suffix: true,
        label_en: true,
        label_ru: true,
        label_uz: true,
      },
    });

    // If no stats in database, return fallback
    if (stats.length === 0) {
      return NextResponse.json([
        { key: 'years', value: companyStats.years, suffix: '+', label_en: 'Years in Business', label_ru: 'Лет в бизнесе', label_uz: 'Yil biznesda' },
        { key: 'projects', value: companyStats.projects, suffix: '+', label_en: 'Projects Completed', label_ru: 'Выполненных проектов', label_uz: 'Bajarilgan loyihalar' },
        { key: 'clients', value: companyStats.clients, suffix: '+', label_en: 'Happy Clients', label_ru: 'Довольных клиентов', label_uz: 'Mamnun mijozlar' },
      ]);
    }

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    // Return fallback on error
    return NextResponse.json([
      { key: 'years', value: companyStats.years, suffix: '+', label_en: 'Years in Business', label_ru: 'Лет в бизнесе', label_uz: 'Yil biznesda' },
      { key: 'projects', value: companyStats.projects, suffix: '+', label_en: 'Projects Completed', label_ru: 'Выполненных проектов', label_uz: 'Bajarilgan loyihalar' },
      { key: 'clients', value: companyStats.clients, suffix: '+', label_en: 'Happy Clients', label_ru: 'Довольных клиентов', label_uz: 'Mamnun mijozlar' },
    ]);
  }
}

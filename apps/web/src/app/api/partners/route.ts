import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// GET - Get public partners list
export async function GET() {
  try {
    const partners = await prisma.partner.findMany({
      where: { isVisible: true },
      orderBy: [
        { featured: 'desc' },
        { order: 'asc' },
      ],
      select: {
        id: true,
        name: true,
        logo: true,
        website: true,
        desc_en: true,
        desc_ru: true,
        desc_uz: true,
        featured: true,
        testimonials: {
          where: {
            status: 'APPROVED',
            isVisible: true,
          },
          select: {
            id: true,
            authorName: true,
            position_en: true,
            position_ru: true,
            position_uz: true,
            quote_en: true,
            quote_ru: true,
            quote_uz: true,
            rating: true,
            avatar: true,
          },
        },
      },
    });

    return NextResponse.json(partners);
  } catch (error) {
    console.error('Error fetching partners:', error);
    return NextResponse.json([]);
  }
}

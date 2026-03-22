import { getSession } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const activities = await prisma.hubActivityLog.findMany({
    orderBy: { createdAt: 'desc' },
    take: 20,
  });

  return NextResponse.json(activities);
}

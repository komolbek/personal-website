import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/auth';

// This endpoint creates the initial admin user
// It should only work if no admin users exist yet
export async function POST(request: NextRequest) {
  try {
    // Check if any admin user already exists
    const existingAdmin = await prisma.adminUser.findFirst();

    if (existingAdmin) {
      return NextResponse.json(
        { error: 'Admin user already exists' },
        { status: 400 }
      );
    }

    const { email, password, name } = await request.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const admin = await prisma.adminUser.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    // Also seed initial stats
    await prisma.companyStat.createMany({
      data: [
        { key: 'years', value: 5, label_en: 'Years in Business', label_ru: 'Лет в бизнесе', label_uz: 'Yil biznesda', suffix: '+', order: 1 },
        { key: 'projects', value: 50, label_en: 'Projects Completed', label_ru: 'Выполненных проектов', label_uz: 'Bajarilgan loyihalar', suffix: '+', order: 2 },
        { key: 'clients', value: 30, label_en: 'Happy Clients', label_ru: 'Довольных клиентов', label_uz: 'Mamnun mijozlar', suffix: '+', order: 3 },
      ],
      skipDuplicates: true,
    });

    return NextResponse.json({
      success: true,
      message: 'Admin user created successfully',
      admin: { id: admin.id, email: admin.email, name: admin.name },
    });
  } catch (error) {
    console.error('Setup error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}

// GET to check if setup is needed
export async function GET() {
  try {
    const existingAdmin = await prisma.adminUser.findFirst();

    return NextResponse.json({
      setupRequired: !existingAdmin,
    });
  } catch {
    return NextResponse.json({ setupRequired: true });
  }
}

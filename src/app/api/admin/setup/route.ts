import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/auth';

async function ensureTablesExist() {
  try {
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "AdminUser" (
        "id" TEXT NOT NULL,
        "email" TEXT NOT NULL,
        "password" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
      );
      CREATE UNIQUE INDEX IF NOT EXISTS "AdminUser_email_key" ON "AdminUser"("email");

      CREATE TABLE IF NOT EXISTS "CompanyStat" (
        "id" TEXT NOT NULL,
        "key" TEXT NOT NULL,
        "value" INTEGER NOT NULL,
        "label_en" TEXT NOT NULL,
        "label_ru" TEXT NOT NULL,
        "label_uz" TEXT NOT NULL,
        "suffix" TEXT NOT NULL DEFAULT '+',
        "order" INTEGER NOT NULL DEFAULT 0,
        "isVisible" BOOLEAN NOT NULL DEFAULT true,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "CompanyStat_pkey" PRIMARY KEY ("id")
      );
      CREATE UNIQUE INDEX IF NOT EXISTS "CompanyStat_key_key" ON "CompanyStat"("key");
    `);
  } catch (e) {
    console.error('Table creation error:', e);
  }
}

// This endpoint creates the initial admin user
// It should only work if no admin users exist yet
export async function POST(request: NextRequest) {
  try {
    await ensureTablesExist();

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
    await ensureTablesExist();
    const existingAdmin = await prisma.adminUser.findFirst();

    return NextResponse.json({
      setupRequired: !existingAdmin,
    });
  } catch {
    return NextResponse.json({ setupRequired: true });
  }
}

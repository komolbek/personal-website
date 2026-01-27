import { prisma } from './prisma';

let initialized = false;

export async function ensureAllTablesExist() {
  if (initialized) return;

  try {
    // Check if tables exist by querying information_schema
    const result = await prisma.$queryRawUnsafe<{ count: bigint }[]>(
      `SELECT COUNT(*) as count FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'AdminUser'`
    );

    if (Number(result[0]?.count) > 0) {
      initialized = true;
      return;
    }

    // Create all tables
    const statements = [
      // AdminUser
      `CREATE TABLE IF NOT EXISTS "AdminUser" ("id" TEXT NOT NULL, "email" TEXT NOT NULL, "password" TEXT NOT NULL, "name" TEXT NOT NULL, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id"))`,
      `CREATE UNIQUE INDEX IF NOT EXISTS "AdminUser_email_key" ON "AdminUser"("email")`,

      // CompanyStat
      `CREATE TABLE IF NOT EXISTS "CompanyStat" ("id" TEXT NOT NULL, "key" TEXT NOT NULL, "value" INTEGER NOT NULL, "label_en" TEXT NOT NULL, "label_ru" TEXT NOT NULL, "label_uz" TEXT NOT NULL, "suffix" TEXT NOT NULL DEFAULT '+', "order" INTEGER NOT NULL DEFAULT 0, "isVisible" BOOLEAN NOT NULL DEFAULT true, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "CompanyStat_pkey" PRIMARY KEY ("id"))`,
      `CREATE UNIQUE INDEX IF NOT EXISTS "CompanyStat_key_key" ON "CompanyStat"("key")`,

      // Product
      `CREATE TABLE IF NOT EXISTS "Product" ("id" TEXT NOT NULL, "slug" TEXT NOT NULL, "title_en" TEXT NOT NULL, "title_ru" TEXT NOT NULL, "title_uz" TEXT NOT NULL, "shortDesc_en" TEXT NOT NULL, "shortDesc_ru" TEXT NOT NULL, "shortDesc_uz" TEXT NOT NULL, "fullDesc_en" TEXT NOT NULL, "fullDesc_ru" TEXT NOT NULL, "fullDesc_uz" TEXT NOT NULL, "icon" TEXT NOT NULL, "features_en" TEXT[] DEFAULT ARRAY[]::TEXT[], "features_ru" TEXT[] DEFAULT ARRAY[]::TEXT[], "features_uz" TEXT[] DEFAULT ARRAY[]::TEXT[], "benefits_en" TEXT[] DEFAULT ARRAY[]::TEXT[], "benefits_ru" TEXT[] DEFAULT ARRAY[]::TEXT[], "benefits_uz" TEXT[] DEFAULT ARRAY[]::TEXT[], "order" INTEGER NOT NULL DEFAULT 0, "isVisible" BOOLEAN NOT NULL DEFAULT true, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "Product_pkey" PRIMARY KEY ("id"))`,
      `CREATE UNIQUE INDEX IF NOT EXISTS "Product_slug_key" ON "Product"("slug")`,

      // ClientProject
      `CREATE TABLE IF NOT EXISTS "ClientProject" ("id" TEXT NOT NULL, "slug" TEXT NOT NULL, "title_en" TEXT NOT NULL, "title_ru" TEXT NOT NULL, "title_uz" TEXT NOT NULL, "clientName" TEXT, "clientLogo" TEXT, "category" TEXT NOT NULL, "desc_en" TEXT NOT NULL, "desc_ru" TEXT NOT NULL, "desc_uz" TEXT NOT NULL, "challenge_en" TEXT NOT NULL, "challenge_ru" TEXT NOT NULL, "challenge_uz" TEXT NOT NULL, "solution_en" TEXT NOT NULL, "solution_ru" TEXT NOT NULL, "solution_uz" TEXT NOT NULL, "results_en" TEXT, "results_ru" TEXT, "results_uz" TEXT, "images" TEXT[] DEFAULT ARRAY[]::TEXT[], "thumbnail" TEXT NOT NULL, "appStoreUrl" TEXT, "playStoreUrl" TEXT, "websiteUrl" TEXT, "completedDate" TIMESTAMP(3), "featured" BOOLEAN NOT NULL DEFAULT false, "isVisible" BOOLEAN NOT NULL DEFAULT true, "order" INTEGER NOT NULL DEFAULT 0, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "productId" TEXT, CONSTRAINT "ClientProject_pkey" PRIMARY KEY ("id"))`,
      `CREATE UNIQUE INDEX IF NOT EXISTS "ClientProject_slug_key" ON "ClientProject"("slug")`,
      `ALTER TABLE "ClientProject" ADD CONSTRAINT "ClientProject_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE`,

      // Partner
      `CREATE TABLE IF NOT EXISTS "Partner" ("id" TEXT NOT NULL, "name" TEXT NOT NULL, "logo" TEXT NOT NULL, "website" TEXT, "desc_en" TEXT, "desc_ru" TEXT, "desc_uz" TEXT, "featured" BOOLEAN NOT NULL DEFAULT false, "isVisible" BOOLEAN NOT NULL DEFAULT true, "order" INTEGER NOT NULL DEFAULT 0, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "Partner_pkey" PRIMARY KEY ("id"))`,

      // FeedbackStatus enum
      `DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'FeedbackStatus') THEN CREATE TYPE "FeedbackStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED'); END IF; END $$`,

      // Feedback
      `CREATE TABLE IF NOT EXISTS "Feedback" ("id" TEXT NOT NULL, "authorName" TEXT NOT NULL, "authorEmail" TEXT, "position_en" TEXT, "position_ru" TEXT, "position_uz" TEXT, "avatar" TEXT, "quote_en" TEXT NOT NULL, "quote_ru" TEXT, "quote_uz" TEXT, "rating" INTEGER DEFAULT 5, "status" "FeedbackStatus" NOT NULL DEFAULT 'PENDING', "featured" BOOLEAN NOT NULL DEFAULT false, "isVisible" BOOLEAN NOT NULL DEFAULT true, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "partnerId" TEXT, CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id"))`,
      `ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "Partner"("id") ON DELETE SET NULL ON UPDATE CASCADE`,

      // ContactSubmission
      `CREATE TABLE IF NOT EXISTS "ContactSubmission" ("id" TEXT NOT NULL, "name" TEXT NOT NULL, "email" TEXT, "phone" TEXT NOT NULL, "company" TEXT, "service" TEXT, "budget" TEXT, "message" TEXT NOT NULL, "isRead" BOOLEAN NOT NULL DEFAULT false, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "ContactSubmission_pkey" PRIMARY KEY ("id"))`,

      // SiteSetting
      `CREATE TABLE IF NOT EXISTS "SiteSetting" ("id" TEXT NOT NULL, "key" TEXT NOT NULL, "value" TEXT NOT NULL, "type" TEXT NOT NULL DEFAULT 'string', "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "SiteSetting_pkey" PRIMARY KEY ("id"))`,
      `CREATE UNIQUE INDEX IF NOT EXISTS "SiteSetting_key_key" ON "SiteSetting"("key")`,
    ];

    for (const sql of statements) {
      try {
        await prisma.$executeRawUnsafe(sql);
      } catch (e: unknown) {
        // Ignore "already exists" errors for constraints/indexes
        const message = e instanceof Error ? e.message : String(e);
        if (!message.includes('already exists')) {
          console.error('DB init statement error:', message);
        }
      }
    }

    initialized = true;
    console.log('Database tables initialized successfully');
  } catch (e) {
    console.error('Database initialization error:', e);
  }
}

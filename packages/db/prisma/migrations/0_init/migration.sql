-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "hub";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "public"."FeedbackStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "hub"."HubUserRole" AS ENUM ('ADMIN', 'MANAGER', 'VIEWER');

-- CreateEnum
CREATE TYPE "hub"."HubProductStatus" AS ENUM ('ACTIVE', 'PARKED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "hub"."HubLeadSource" AS ENUM ('WALK_IN', 'INSTAGRAM', 'REFERRAL', 'GOOGLE_MAPS', 'TWOGIS', 'OTHER');

-- CreateEnum
CREATE TYPE "hub"."HubLeadStatus" AS ENUM ('NOT_CONTACTED', 'CONTACTED', 'DEMO_SCHEDULED', 'DEMO_DONE', 'TRIAL', 'NEGOTIATING', 'SIGNED', 'LOST');

-- CreateEnum
CREATE TYPE "hub"."HubClientPaymentStatus" AS ENUM ('ACTIVE', 'OVERDUE', 'CHURNED');

-- CreateEnum
CREATE TYPE "hub"."HubProjectStatus" AS ENUM ('LEAD', 'PROPOSAL', 'NEGOTIATING', 'IN_PROGRESS', 'FROZEN', 'DELIVERED', 'PAID', 'LOST');

-- CreateEnum
CREATE TYPE "hub"."HubMilestoneStatus" AS ENUM ('PENDING', 'INVOICED', 'PAID');

-- CreateEnum
CREATE TYPE "hub"."HubPaymentType" AS ENUM ('INCOME', 'EXPENSE');

-- CreateEnum
CREATE TYPE "hub"."HubPaymentCategory" AS ENUM ('PROJECT_REVENUE', 'PRODUCT_REVENUE', 'HOSTING', 'DOMAINS', 'OFFICE', 'SMS_API', 'MARKETING', 'SALARY', 'TRANSPORT', 'TOOLS', 'OTHER');

-- CreateEnum
CREATE TYPE "hub"."HubCurrency" AS ENUM ('USD', 'UZS');

-- CreateEnum
CREATE TYPE "hub"."HubRecurringInterval" AS ENUM ('MONTHLY', 'YEARLY');

-- CreateEnum
CREATE TYPE "hub"."HubContactType" AS ENUM ('CLIENT', 'REFERRAL_SOURCE', 'POTENTIAL', 'PARTNER');

-- CreateEnum
CREATE TYPE "hub"."HubContactSource" AS ENUM ('PERSONAL', 'IT_PARK', 'TELEGRAM_GROUP', 'INSTAGRAM', 'REFERRAL', 'OTHER');

-- CreateEnum
CREATE TYPE "hub"."HubQuoteStatus" AS ENUM ('DRAFT', 'SENT', 'ACCEPTED', 'REJECTED');

-- CreateEnum
CREATE TYPE "hub"."HubContractStatus" AS ENUM ('DRAFT', 'SENT', 'SIGNED');

-- CreateTable
CREATE TABLE "public"."AdminUser" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Product" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title_en" TEXT NOT NULL,
    "title_ru" TEXT NOT NULL,
    "title_uz" TEXT NOT NULL,
    "shortDesc_en" TEXT NOT NULL,
    "shortDesc_ru" TEXT NOT NULL,
    "shortDesc_uz" TEXT NOT NULL,
    "fullDesc_en" TEXT NOT NULL,
    "fullDesc_ru" TEXT NOT NULL,
    "fullDesc_uz" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "features_en" TEXT[],
    "features_ru" TEXT[],
    "features_uz" TEXT[],
    "benefits_en" TEXT[],
    "benefits_ru" TEXT[],
    "benefits_uz" TEXT[],
    "order" INTEGER NOT NULL DEFAULT 0,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ClientProject" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title_en" TEXT NOT NULL,
    "title_ru" TEXT NOT NULL,
    "title_uz" TEXT NOT NULL,
    "clientName" TEXT,
    "clientLogo" TEXT,
    "category" TEXT NOT NULL,
    "desc_en" TEXT NOT NULL,
    "desc_ru" TEXT NOT NULL,
    "desc_uz" TEXT NOT NULL,
    "challenge_en" TEXT NOT NULL,
    "challenge_ru" TEXT NOT NULL,
    "challenge_uz" TEXT NOT NULL,
    "solution_en" TEXT NOT NULL,
    "solution_ru" TEXT NOT NULL,
    "solution_uz" TEXT NOT NULL,
    "results_en" TEXT,
    "results_ru" TEXT,
    "results_uz" TEXT,
    "images" TEXT[],
    "thumbnail" TEXT NOT NULL,
    "appStoreUrl" TEXT,
    "playStoreUrl" TEXT,
    "websiteUrl" TEXT,
    "completedDate" TIMESTAMP(3),
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "productId" TEXT,

    CONSTRAINT "ClientProject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Partner" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "website" TEXT,
    "desc_en" TEXT,
    "desc_ru" TEXT,
    "desc_uz" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Partner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Feedback" (
    "id" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,
    "authorEmail" TEXT,
    "position_en" TEXT,
    "position_ru" TEXT,
    "position_uz" TEXT,
    "avatar" TEXT,
    "quote_en" TEXT NOT NULL,
    "quote_ru" TEXT,
    "quote_uz" TEXT,
    "rating" INTEGER DEFAULT 5,
    "status" "public"."FeedbackStatus" NOT NULL DEFAULT 'PENDING',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "partnerId" TEXT,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ContactSubmission" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT NOT NULL,
    "company" TEXT,
    "service" TEXT,
    "budget" TEXT,
    "message" TEXT NOT NULL,
    "source" TEXT NOT NULL DEFAULT 'web',
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContactSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SiteSetting" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'string',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."BlogPost" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title_en" TEXT NOT NULL,
    "title_ru" TEXT NOT NULL,
    "title_uz" TEXT NOT NULL,
    "excerpt_en" TEXT NOT NULL DEFAULT '',
    "excerpt_ru" TEXT NOT NULL DEFAULT '',
    "excerpt_uz" TEXT NOT NULL DEFAULT '',
    "content_en" TEXT NOT NULL,
    "content_ru" TEXT NOT NULL,
    "content_uz" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL DEFAULT '',
    "category" TEXT NOT NULL DEFAULT 'news',
    "author" TEXT NOT NULL DEFAULT '',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BlogPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hub"."hub_users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" "hub"."HubUserRole" NOT NULL DEFAULT 'VIEWER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "hub_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hub"."hub_products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "status" "hub"."HubProductStatus" NOT NULL DEFAULT 'ACTIVE',
    "description" TEXT,
    "url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "hub_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hub"."hub_leads" (
    "id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "contact_person" TEXT,
    "phone" TEXT,
    "telegram" TEXT,
    "instagram" TEXT,
    "address" TEXT,
    "district" TEXT,
    "source" "hub"."HubLeadSource" NOT NULL DEFAULT 'OTHER',
    "current_system" TEXT,
    "status" "hub"."HubLeadStatus" NOT NULL DEFAULT 'NOT_CONTACTED',
    "lost_reason" TEXT,
    "notes" TEXT,
    "first_contact" TIMESTAMP(3),
    "last_contact" TIMESTAMP(3),
    "follow_up" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "hub_leads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hub"."hub_clients" (
    "id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "lead_id" TEXT,
    "name" TEXT NOT NULL,
    "contact_person" TEXT,
    "phone" TEXT,
    "plan" TEXT,
    "monthly_fee" DOUBLE PRECISION,
    "currency" "hub"."HubCurrency" NOT NULL DEFAULT 'USD',
    "paymentStatus" "hub"."HubClientPaymentStatus" NOT NULL DEFAULT 'ACTIVE',
    "start_date" TIMESTAMP(3),
    "last_payment" TIMESTAMP(3),
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "hub_clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hub"."hub_projects" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT,
    "status" "hub"."HubProjectStatus" NOT NULL DEFAULT 'LEAD',
    "client_contact" TEXT,
    "client_phone" TEXT,
    "total_price" DOUBLE PRECISION,
    "currency" "hub"."HubCurrency" NOT NULL DEFAULT 'USD',
    "upfront_percent" DOUBLE PRECISION,
    "referral_source" TEXT,
    "referral_fee_percent" DOUBLE PRECISION,
    "start_date" TIMESTAMP(3),
    "deadline" TIMESTAMP(3),
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "hub_projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hub"."hub_project_milestones" (
    "id" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" "hub"."HubCurrency" NOT NULL DEFAULT 'USD',
    "status" "hub"."HubMilestoneStatus" NOT NULL DEFAULT 'PENDING',
    "due_date" TIMESTAMP(3),
    "paid_date" TIMESTAMP(3),
    "notes" TEXT,

    CONSTRAINT "hub_project_milestones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hub"."hub_payments" (
    "id" TEXT NOT NULL,
    "type" "hub"."HubPaymentType" NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" "hub"."HubCurrency" NOT NULL DEFAULT 'USD',
    "category" "hub"."HubPaymentCategory" NOT NULL DEFAULT 'OTHER',
    "project_id" TEXT,
    "product_id" TEXT,
    "client_id" TEXT,
    "milestone_id" TEXT,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "recurring" BOOLEAN NOT NULL DEFAULT false,
    "recurring_interval" "hub"."HubRecurringInterval",
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "hub_payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hub"."hub_contacts" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "company" TEXT,
    "role" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "telegram" TEXT,
    "type" "hub"."HubContactType" NOT NULL DEFAULT 'POTENTIAL',
    "source" "hub"."HubContactSource" NOT NULL DEFAULT 'OTHER',
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "hub_contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hub"."hub_quotes" (
    "id" TEXT NOT NULL,
    "project_id" TEXT,
    "contact_id" TEXT,
    "client_name" TEXT NOT NULL,
    "client_phone" TEXT,
    "items" JSONB NOT NULL DEFAULT '[]',
    "base_price" DOUBLE PRECISION NOT NULL,
    "total_price" DOUBLE PRECISION NOT NULL,
    "currency" "hub"."HubCurrency" NOT NULL DEFAULT 'USD',
    "rush_fee_applied" BOOLEAN NOT NULL DEFAULT false,
    "rush_fee_percent" DOUBLE PRECISION,
    "discount_percent" DOUBLE PRECISION,
    "status" "hub"."HubQuoteStatus" NOT NULL DEFAULT 'DRAFT',
    "valid_until" TIMESTAMP(3),
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "hub_quotes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hub"."hub_contracts" (
    "id" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "client_name" TEXT NOT NULL,
    "client_contact" TEXT,
    "scope_description" TEXT,
    "total_price" DOUBLE PRECISION NOT NULL,
    "currency" "hub"."HubCurrency" NOT NULL DEFAULT 'USD',
    "payment_terms" TEXT,
    "start_date" TIMESTAMP(3),
    "deadline" TIMESTAMP(3),
    "status" "hub"."HubContractStatus" NOT NULL DEFAULT 'DRAFT',
    "signed_date" TIMESTAMP(3),
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "hub_contracts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hub"."hub_activity_logs" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "entity_type" TEXT NOT NULL,
    "entity_id" TEXT,
    "entity_name" TEXT,
    "details" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "hub_activity_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "public"."AdminUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "public"."Product"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ClientProject_slug_key" ON "public"."ClientProject"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "SiteSetting_key_key" ON "public"."SiteSetting"("key");

-- CreateIndex
CREATE UNIQUE INDEX "BlogPost_slug_key" ON "public"."BlogPost"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "hub_users_email_key" ON "hub"."hub_users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "hub_products_slug_key" ON "hub"."hub_products"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "hub_clients_lead_id_key" ON "hub"."hub_clients"("lead_id");

-- CreateIndex
CREATE UNIQUE INDEX "hub_contracts_project_id_key" ON "hub"."hub_contracts"("project_id");

-- AddForeignKey
ALTER TABLE "public"."ClientProject" ADD CONSTRAINT "ClientProject_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Feedback" ADD CONSTRAINT "Feedback_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "public"."Partner"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hub"."hub_leads" ADD CONSTRAINT "hub_leads_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "hub"."hub_products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hub"."hub_clients" ADD CONSTRAINT "hub_clients_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "hub"."hub_products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hub"."hub_clients" ADD CONSTRAINT "hub_clients_lead_id_fkey" FOREIGN KEY ("lead_id") REFERENCES "hub"."hub_leads"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hub"."hub_project_milestones" ADD CONSTRAINT "hub_project_milestones_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "hub"."hub_projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hub"."hub_payments" ADD CONSTRAINT "hub_payments_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "hub"."hub_projects"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hub"."hub_payments" ADD CONSTRAINT "hub_payments_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "hub"."hub_products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hub"."hub_payments" ADD CONSTRAINT "hub_payments_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "hub"."hub_clients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hub"."hub_payments" ADD CONSTRAINT "hub_payments_milestone_id_fkey" FOREIGN KEY ("milestone_id") REFERENCES "hub"."hub_project_milestones"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hub"."hub_quotes" ADD CONSTRAINT "hub_quotes_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "hub"."hub_projects"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hub"."hub_quotes" ADD CONSTRAINT "hub_quotes_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "hub"."hub_contacts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hub"."hub_contracts" ADD CONSTRAINT "hub_contracts_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "hub"."hub_projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;


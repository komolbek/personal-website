-- AlterTable
ALTER TABLE "ClientProject" ADD COLUMN     "demoUrl" TEXT,
ADD COLUMN     "techStack" TEXT[];

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "adminUrl" TEXT,
ADD COLUMN     "bookingUrl" TEXT,
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "mobileAppUrl" TEXT,
ADD COLUMN     "technologies" TEXT[],
ADD COLUMN     "websiteUrl" TEXT;

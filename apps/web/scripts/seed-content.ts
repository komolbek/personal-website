/**
 * Pushes src/config/solutions.ts and src/config/projects.ts into the database.
 *
 * Why this lives in apps/web and not in packages/db: the config files are the
 * content, and the old packages/db/prisma/seed-main.ts held a *second copy* of
 * the same paragraphs, which had already drifted out of date. This script reads
 * the real thing, so seeding cannot reintroduce stale copy.
 *
 * Once a row exists, the website reads the database and ignores the config —
 * see src/app/works/page.tsx. From then on admin.necto.uz is the source of
 * truth and the config files are only the fallback for an empty or unreachable
 * database.
 *
 * Every write is an upsert keyed on slug, so running it twice is harmless and
 * it will not clobber ids or created timestamps.
 *
 *   npx tsx scripts/seed-content.ts            # products and projects
 *   npx tsx scripts/seed-content.ts --products # products only
 *   npx tsx scripts/seed-content.ts --dry-run  # print, write nothing
 */

import { PrismaClient } from '@prisma/client';
import { solutions } from '../src/config/solutions';
import { projects } from '../src/config/projects';

const prisma = new PrismaClient();

const args = new Set(process.argv.slice(2));
const dryRun = args.has('--dry-run');
const productsOnly = args.has('--products');
const projectsOnly = args.has('--projects');

/** completedDate in the config is a year string; the column is a DateTime. */
function yearToDate(year?: string): Date | null {
  if (!year) return null;
  const n = Number(year);
  return Number.isFinite(n) ? new Date(Date.UTC(n, 0, 1)) : null;
}

async function seedProducts() {
  for (const s of solutions) {
    const data = {
      slug: s.slug,
      title_en: s.title.en,
      title_ru: s.title.ru,
      title_uz: s.title.uz,
      shortDesc_en: s.shortDescription.en,
      shortDesc_ru: s.shortDescription.ru,
      shortDesc_uz: s.shortDescription.uz,
      fullDesc_en: s.fullDescription.en,
      fullDesc_ru: s.fullDescription.ru,
      fullDesc_uz: s.fullDescription.uz,
      icon: s.icon,
      features_en: s.features.en,
      features_ru: s.features.ru,
      features_uz: s.features.uz,
      benefits_en: s.benefits.en,
      benefits_ru: s.benefits.ru,
      benefits_uz: s.benefits.uz,
      technologies: s.technologies,
      images: s.images ?? [],
      websiteUrl: s.links?.website ?? null,
      adminUrl: s.links?.admin ?? null,
      bookingUrl: s.links?.booking ?? null,
      mobileAppUrl: s.links?.mobileApp ?? null,
      order: s.order,
    };
    console.log(
      `  product ${s.slug.padEnd(12)} ${data.images.length} images, ` +
        `${data.technologies.length} tech, links: ` +
        [data.websiteUrl && 'website', data.adminUrl && 'admin', data.bookingUrl && 'booking']
          .filter(Boolean)
          .join('/') || 'none'
    );
    if (!dryRun) {
      await prisma.product.upsert({ where: { slug: s.slug }, update: data, create: data });
    }
  }
}

async function seedProjects() {
  for (const p of projects) {
    const data = {
      slug: p.slug,
      title_en: p.title.en,
      title_ru: p.title.ru,
      title_uz: p.title.uz,
      clientName: p.client ?? null,
      clientLogo: p.clientLogo ?? null,
      category: p.category,
      desc_en: p.description.en,
      desc_ru: p.description.ru,
      desc_uz: p.description.uz,
      challenge_en: p.challenge.en,
      challenge_ru: p.challenge.ru,
      challenge_uz: p.challenge.uz,
      solution_en: p.solution.en,
      solution_ru: p.solution.ru,
      solution_uz: p.solution.uz,
      results_en: p.results?.en ?? null,
      results_ru: p.results?.ru ?? null,
      results_uz: p.results?.uz ?? null,
      images: p.images,
      thumbnail: p.thumbnail,
      appStoreUrl: p.links?.appStore ?? null,
      playStoreUrl: p.links?.playStore ?? null,
      websiteUrl: p.links?.website ?? null,
      demoUrl: p.links?.demo ?? null,
      techStack: p.techStack,
      completedDate: yearToDate(p.completedDate),
      featured: p.featured,
    };
    console.log(
      `  project ${p.slug.padEnd(14)} ${data.images.length} images, ` +
        `${data.techStack.length} tech, results: ${data.results_ru ? 'yes' : 'no'}`
    );
    if (!dryRun) {
      await prisma.clientProject.upsert({ where: { slug: p.slug }, update: data, create: data });
    }
  }
}

async function main() {
  const target = process.env.DATABASE_URL ?? '';
  const host = target.replace(/:\/\/[^@]*@/, '://***@');
  console.log(`${dryRun ? 'DRY RUN — nothing will be written' : 'Seeding'}\ntarget: ${host}\n`);

  if (!projectsOnly) {
    console.log('Products (src/config/solutions.ts):');
    await seedProducts();
  }
  if (!productsOnly) {
    console.log('\nProjects (src/config/projects.ts):');
    await seedProjects();
  }

  if (!dryRun) {
    const [pc, cc] = await Promise.all([prisma.product.count(), prisma.clientProject.count()]);
    console.log(`\nDone. Product rows: ${pc}, ClientProject rows: ${cc}`);
    console.log('The website now reads these from the database, not from the config files.');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { prisma } from '@/lib/prisma';
import { solutions as staticSolutions } from '@/config/solutions';
import { projects } from '@/config/projects';

// Rendered per request rather than at build time. The build stage has no
// DATABASE_URL, so a prerendered sitemap would silently capture the static
// fallback once and never reflect anything published through the CMS.
export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  // Products come from the database, which is what the rest of the site
  // renders from; the static config was a second list, so a product added in
  // the CMS never reached the sitemap. The config remains a fallback for when
  // the database is unreachable or empty, matching the other product pages.
  const dbProducts = await prisma.product
    .findMany({
      where: { isVisible: true },
      select: { slug: true, updatedAt: true },
      orderBy: { order: 'asc' },
    })
    .catch(() => []);

  const solutionPages = (
    dbProducts.length > 0
      ? dbProducts.map((p) => ({ slug: p.slug, lastModified: p.updatedAt }))
      : staticSolutions.map((s) => ({ slug: s.slug, lastModified: new Date() }))
  ).map(({ slug, lastModified }) => ({
    url: `${baseUrl}/solutions/${slug}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Project pages
  const projectPages = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    // Main pages
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/partners`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // Legal pages
    {
      url: `${baseUrl}/legal/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/legal/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    // Dynamic pages
    ...solutionPages,
    ...projectPages,
    // Legacy app privacy/terms pages (for App Store)
    {
      url: `${baseUrl}/apps/memomind/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${baseUrl}/apps/memomind/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${baseUrl}/apps/moneycontrol/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.2,
    },
  ];
}

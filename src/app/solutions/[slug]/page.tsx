import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { dbProductToSolution } from '@/lib/transforms';
import { getSolutionBySlug, solutions as staticSolutions } from '@/config/solutions';
import { SolutionDetail } from '@/components/SolutionDetail';
import { siteConfig } from '@/config/site';

export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  // Try DB first
  const dbProduct = await prisma.product.findUnique({ where: { slug } }).catch(() => null);

  if (dbProduct) {
    const solution = dbProductToSolution(dbProduct);
    const title = solution.title?.en || solution.title?.ru || slug;
    const description = solution.shortDescription?.en || solution.shortDescription?.ru || '';
    return {
      title: `${title} - ${description.slice(0, 60)} | Necto Automations`,
      description,
      alternates: {
        canonical: `${siteConfig.url}/solutions/${slug}`,
      },
    };
  }

  // Fall back to static config
  const solution = getSolutionBySlug(slug);
  if (solution) {
    return {
      title: `${solution.title.en} - ${solution.shortDescription.en.slice(0, 60)} | Necto Automations`,
      description: solution.shortDescription.en,
      alternates: {
        canonical: `${siteConfig.url}/solutions/${slug}`,
      },
    };
  }

  return {
    title: 'Product Not Found | Necto Automations',
  };
}

export async function generateStaticParams() {
  const dbProducts = await prisma.product.findMany({
    where: { isVisible: true },
    select: { slug: true },
  }).catch(() => []);

  const dbSlugs = dbProducts.map(p => ({ slug: p.slug }));
  const staticSlugs = staticSolutions.map(s => ({ slug: s.slug }));

  // Merge both, deduplicate
  const seen = new Set<string>();
  const allSlugs = [];
  for (const s of [...dbSlugs, ...staticSlugs]) {
    if (!seen.has(s.slug)) {
      seen.add(s.slug);
      allSlugs.push(s);
    }
  }
  return allSlugs;
}

export default async function SolutionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Try DB first
  const dbProduct = await prisma.product.findUnique({ where: { slug } }).catch(() => null);

  if (dbProduct) {
    const solution = dbProductToSolution(dbProduct);
    return <SolutionDetail solution={solution} />;
  }

  // Fall back to static config
  const solution = getSolutionBySlug(slug);

  if (!solution) {
    notFound();
  }

  return <SolutionDetail solution={solution} />;
}

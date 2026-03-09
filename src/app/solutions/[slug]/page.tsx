import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { dbProductToSolution } from '@/lib/transforms';
import { getSolutionBySlug, solutions as staticSolutions } from '@/config/solutions';
import { SolutionDetail } from '@/components/SolutionDetail';

export const dynamicParams = true;

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

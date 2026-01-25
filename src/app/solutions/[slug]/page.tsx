import { notFound } from 'next/navigation';
import { getSolutionBySlug, solutions } from '@/config/solutions';
import { SolutionDetail } from '@/components/SolutionDetail';

export function generateStaticParams() {
  return solutions.map((solution) => ({
    slug: solution.slug,
  }));
}

export default async function SolutionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);

  if (!solution) {
    notFound();
  }

  return <SolutionDetail solution={solution} />;
}

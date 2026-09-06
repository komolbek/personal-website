import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { dbProductToSolution, dbProjectToProject } from '@/lib/transforms';
import { getSolutionBySlug, solutions as staticSolutions } from '@/config/solutions';
import { getProjectBySlug, projects as staticProjects } from '@/config/projects';
import { SolutionDetail } from '@/components/SolutionDetail';
import { ProjectDetail } from '@/components/ProjectDetail';
import { siteConfig } from '@/config/site';
import type { Project, Solution } from '@/types';

// One route for both kinds of work (REDESIGN.md §4.1). /solutions/<slug> and
// /projects/<slug> both 301 here with their slugs intact, so every URL already
// in the index keeps resolving.
//
// Slugs must therefore stay unique across products and projects. They are
// today; a product added in the CMS under an existing project slug would be
// shadowed by the product branch below.

// Content for this page lives in the database and is edited in
// admin.necto.uz. Without this the page is baked at build time, so an edit
// made in the admin never reaches the live site until someone redeploys.
// Sixty seconds keeps the prerendered speed and makes edits show up on their
// own.
export const revalidate = 60;

export const dynamicParams = true;

type Found =
  | { kind: 'solution'; solution: Solution }
  | { kind: 'project'; project: Project }
  | null;

async function resolve(slug: string): Promise<Found> {
  const dbProduct = await prisma.product.findUnique({ where: { slug } }).catch(() => null);
  if (dbProduct) return { kind: 'solution', solution: dbProductToSolution(dbProduct) };

  const dbProject = await prisma.clientProject.findUnique({ where: { slug } }).catch(() => null);
  if (dbProject) return { kind: 'project', project: dbProjectToProject(dbProject) };

  const solution = getSolutionBySlug(slug);
  if (solution) return { kind: 'solution', solution };

  const project = getProjectBySlug(slug);
  if (project) return { kind: 'project', project };

  return null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const found = await resolve(slug);
  if (!found) return { title: 'Страница не найдена' };

  const canonical = `${siteConfig.url}/works/${slug}`;

  if (found.kind === 'solution') {
    const { title, shortDescription } = found.solution;
    return {
      title: `${title.ru || title.en} — ${(shortDescription.ru || shortDescription.en).slice(0, 60)}`,
      description: shortDescription.ru || shortDescription.en,
      alternates: { canonical },
    };
  }

  const { title, description } = found.project;
  return {
    title: title.ru || title.en,
    description: description.ru || description.en,
    alternates: { canonical },
  };
}

export async function generateStaticParams() {
  const [dbProducts, dbProjects] = await Promise.all([
    prisma.product.findMany({ where: { isVisible: true }, select: { slug: true } }).catch(() => []),
    prisma.clientProject.findMany({ where: { isVisible: true }, select: { slug: true } }).catch(() => []),
  ]);

  const seen = new Set<string>();
  const out: { slug: string }[] = [];
  for (const { slug } of [
    ...dbProducts,
    ...dbProjects,
    ...staticSolutions.map((s) => ({ slug: s.slug })),
    ...staticProjects.map((p) => ({ slug: p.slug })),
  ]) {
    if (!seen.has(slug)) {
      seen.add(slug);
      out.push({ slug });
    }
  }
  return out;
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const found = await resolve(slug);

  if (!found) notFound();

  return found.kind === 'solution' ? (
    <SolutionDetail solution={found.solution} />
  ) : (
    <ProjectDetail project={found.project} />
  );
}

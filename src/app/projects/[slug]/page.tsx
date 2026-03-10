import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { dbProjectToProject } from '@/lib/transforms';
import { getProjectBySlug, projects as staticProjects } from '@/config/projects';
import { ProjectDetail } from '@/components/ProjectDetail';
import { siteConfig } from '@/config/site';

export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  // Try DB first
  const dbProject = await prisma.clientProject.findUnique({ where: { slug } }).catch(() => null);

  if (dbProject) {
    const project = dbProjectToProject(dbProject);
    const title = project.title?.en || project.title?.ru || slug;
    const description = project.description?.en || project.description?.ru || '';
    return {
      title: title,
      description,
      alternates: {
        canonical: `${siteConfig.url}/projects/${slug}`,
      },
    };
  }

  // Fall back to static config
  const project = getProjectBySlug(slug);
  if (project) {
    return {
      title: project.title.en,
      description: project.description.en,
      alternates: {
        canonical: `${siteConfig.url}/projects/${slug}`,
      },
    };
  }

  return {
    title: 'Project Not Found',
  };
}

export async function generateStaticParams() {
  const dbProjects = await prisma.clientProject.findMany({
    where: { isVisible: true },
    select: { slug: true },
  }).catch(() => []);

  const dbSlugs = dbProjects.map(p => ({ slug: p.slug }));
  const staticSlugs = staticProjects.map(p => ({ slug: p.slug }));

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

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Try DB first
  const dbProject = await prisma.clientProject.findUnique({ where: { slug } }).catch(() => null);

  if (dbProject) {
    const project = dbProjectToProject(dbProject);
    return <ProjectDetail project={project} />;
  }

  // Fall back to static config
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetail project={project} />;
}

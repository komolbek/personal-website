import { prisma } from '@/lib/prisma';
import { dbProductToSolution, dbProjectToProject } from '@/lib/transforms';
import { getSortedSolutions } from '@/config/solutions';
import { projects as staticProjects } from '@/config/projects';
import { WorksContent } from './WorksContent';

// Content for this page lives in the database and is edited in
// admin.necto.uz. Without this the page is baked at build time, so an edit
// made in the admin never reaches the live site until someone redeploys.
// Sixty seconds keeps the prerendered speed and makes edits show up on their
// own.
export const revalidate = 60;

export default async function WorksPage() {
  const [dbProducts, dbProjects] = await Promise.all([
    prisma.product.findMany({ where: { isVisible: true }, orderBy: { order: 'asc' } }).catch(() => []),
    prisma.clientProject.findMany({ where: { isVisible: true }, orderBy: { order: 'asc' } }).catch(() => []),
  ]);

  const solutions = dbProducts.length > 0 ? dbProducts.map(dbProductToSolution) : getSortedSolutions();
  const projects = dbProjects.length > 0 ? dbProjects.map(dbProjectToProject) : staticProjects;

  // REDESIGN.md §2.2: once the portfolio audit is settled, only projects
  // confirmed as delivered belong here. Nothing is filtered yet — the audit is
  // still open, and quietly hiding entries would be as much a guess as leaving
  // unverified ones up.
  return <WorksContent solutions={solutions} projects={projects} />;
}

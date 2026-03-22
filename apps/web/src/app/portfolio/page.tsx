import { prisma } from '@/lib/prisma';
import { dbProductToSolution, dbProjectToProject } from '@/lib/transforms';
import { getSortedSolutions } from '@/config/solutions';
import { projects as staticProjects } from '@/config/projects';
import { PortfolioContent } from './PortfolioContent';

export default async function PortfolioPage() {
  const [dbProducts, dbProjects] = await Promise.all([
    prisma.product.findMany({ where: { isVisible: true }, orderBy: { order: 'asc' } }).catch(() => []),
    prisma.clientProject.findMany({ where: { isVisible: true }, orderBy: { order: 'asc' } }).catch(() => []),
  ]);

  const solutions = dbProducts.length > 0 ? dbProducts.map(dbProductToSolution) : getSortedSolutions();
  const projects = dbProjects.length > 0 ? dbProjects.map(dbProjectToProject) : staticProjects;

  return <PortfolioContent solutions={solutions} projects={projects} />;
}

'use client';

import { useLocale } from '@/hooks/useLocale';
import { getSortedSolutions } from '@/config/solutions';
import { getFeaturedProjects } from '@/config/projects';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { ProjectCard } from '@/components/cards/ProjectCard';
import { Button } from '@/components/ui/Button';

export function PortfolioPreview() {
  const { locale, t } = useLocale();
  const solutions = getSortedSolutions();
  const featuredProjects = getFeaturedProjects().slice(0, 3);
  const portfolio = t.home.portfolio;

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title={portfolio.title}
          subtitle={portfolio.subtitle}
        />

        {/* Products sub-section */}
        <div className="mt-12 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 rounded-full bg-gradient-to-b from-indigo-500 to-purple-500" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {portfolio.productsHeading}
            </h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((solution) => (
              <ServiceCard
                key={solution.slug}
                solution={solution}
                locale={locale}
              />
            ))}
          </div>
        </div>

        {/* Subtle divider */}
        <div className="flex items-center gap-4 mb-16">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent" />
        </div>

        {/* Projects sub-section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 rounded-full bg-gradient-to-b from-pink-500 to-amber-500" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {portfolio.projectsHeading}
            </h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                locale={locale}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Button href="/portfolio" variant="outline">
            {portfolio.viewAll}
          </Button>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useLocale } from '@/hooks/useLocale';
import { Solution, Project } from '@/types';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { ProjectCard } from '@/components/cards/ProjectCard';

interface PortfolioContentProps {
  solutions: Solution[];
  projects: Project[];
}

export function PortfolioContent({ solutions, projects }: PortfolioContentProps) {
  const { locale, t } = useLocale();
  const portfolio = t.home.portfolio;

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      {/* Background decorations */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-10 w-72 h-72 bg-pink-500/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -translate-x-1/2" />
      </div>

      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title={portfolio.title}
          subtitle={portfolio.subtitle}
        />

        {/* IN-HOUSE SOFTWARE PRODUCTS */}
        <section className="mt-16 mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1.5 h-10 rounded-full bg-gradient-to-b from-indigo-500 to-purple-500" />
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 text-xs font-semibold uppercase tracking-wider mb-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
                In-house
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                {portfolio.productsHeading}
              </h2>
            </div>
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
        </section>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-20">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
        </div>

        {/* CLIENT PROJECTS */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1.5 h-10 rounded-full bg-gradient-to-b from-pink-500 to-amber-500" />
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 text-pink-600 text-xs font-semibold uppercase tracking-wider mb-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                Client Work
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                {portfolio.projectsHeading}
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                locale={locale}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

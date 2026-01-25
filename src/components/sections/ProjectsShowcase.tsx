'use client';

import { useLocale } from '@/hooks/useLocale';
import { getFeaturedProjects } from '@/config/projects';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProjectCard } from '@/components/cards/ProjectCard';
import { Button } from '@/components/ui/Button';

export function ProjectsShowcase() {
  const { locale, t } = useLocale();
  const featuredProjects = getFeaturedProjects().slice(0, 3);

  return (
    <section className="py-20 px-4 bg-gray-50/50 dark:bg-gray-900/50">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title={t.home.projects.title}
          subtitle={t.home.projects.subtitle}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              locale={locale}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button href="/projects" variant="outline">
            {t.home.projects.viewAll}
          </Button>
        </div>
      </div>
    </section>
  );
}

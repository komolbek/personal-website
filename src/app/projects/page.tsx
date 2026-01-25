'use client';

import { useState } from 'react';
import { useLocale } from '@/hooks/useLocale';
import { getProjectsByCategory } from '@/config/projects';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProjectFilter } from '@/components/forms/ProjectFilter';
import { ProjectCard } from '@/components/cards/ProjectCard';

export default function ProjectsPage() {
  const { locale, t } = useLocale();
  const [activeCategory, setActiveCategory] = useState('all');
  const filteredProjects = getProjectsByCategory(activeCategory);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      {/* Background decorations */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title={t.projects.title}
          subtitle={t.projects.subtitle}
        />

        <div className="mt-8">
          <ProjectFilter
            active={activeCategory}
            onChange={setActiveCategory}
            locale={locale}
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              locale={locale}
            />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              No projects found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

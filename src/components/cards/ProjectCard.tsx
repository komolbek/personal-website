'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Project, Locale } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { ArrowRightIcon } from '@/components/ui/Icons';

interface ProjectCardProps {
  project: Project;
  locale: Locale;
}

const categoryColors: Record<string, 'primary' | 'success' | 'warning' | 'info'> = {
  mobile: 'primary',
  website: 'info',
  crm: 'success',
  ai: 'warning',
  ecommerce: 'primary',
};

const categoryLabels: Record<string, Record<Locale, string>> = {
  mobile: { en: 'Mobile App', ru: 'Мобильное', uz: 'Mobil' },
  website: { en: 'Website', ru: 'Веб-сайт', uz: 'Veb-sayt' },
  crm: { en: 'CRM', ru: 'CRM', uz: 'CRM' },
  ai: { en: 'AI', ru: 'ИИ', uz: 'AI' },
  ecommerce: { en: 'E-commerce', ru: 'E-commerce', uz: 'E-tijorat' },
};

export function ProjectCard({ project, locale }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`}>
      <div className="group h-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-500/10">
        {/* Thumbnail */}
        <div className="relative h-48 bg-gradient-to-br from-indigo-500/20 to-pink-500/20 overflow-hidden">
          {project.thumbnail ? (
            <Image
              src={project.thumbnail}
              alt={project.title[locale]}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-6xl font-bold text-indigo-500/30">
                {project.title[locale].charAt(0)}
              </span>
            </div>
          )}
          {project.featured && (
            <div className="absolute top-3 right-3">
              <Badge variant="primary" size="sm">
                Featured
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant={categoryColors[project.category]} size="sm">
              {categoryLabels[project.category]?.[locale] || project.category}
            </Badge>
          </div>

          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {project.title[locale]}
          </h3>

          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
            {project.description[locale]}
          </p>

          <div className="flex flex-wrap gap-1 mb-4">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="text-xs text-gray-500 dark:text-gray-500"
              >
                {tech}
                {project.techStack.indexOf(tech) < Math.min(3, project.techStack.length - 1) && ' •'}
              </span>
            ))}
          </div>

          <div className="flex items-center text-indigo-600 dark:text-indigo-400 font-medium">
            <span>View Case Study</span>
            <ArrowRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}

'use client';

import Link from 'next/link';
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
  event: 'info',
  saas: 'success',
};

const categoryLabels: Record<string, Record<Locale, string>> = {
  mobile: { en: 'Mobile App', ru: 'Мобильное', uz: 'Mobil' },
  website: { en: 'Website', ru: 'Веб-сайт', uz: 'Veb-sayt' },
  crm: { en: 'CRM', ru: 'CRM', uz: 'CRM' },
  ai: { en: 'AI', ru: 'ИИ', uz: 'AI' },
  ecommerce: { en: 'E-commerce', ru: 'E-commerce', uz: 'E-tijorat' },
  event: { en: 'Event', ru: 'Мероприятия', uz: 'Tadbirlar' },
  saas: { en: 'SaaS', ru: 'SaaS', uz: 'SaaS' },
};

const slugGradients: Record<string, string> = {
  memomind: 'from-violet-600 via-purple-600 to-indigo-700',
  '4event': 'from-orange-500 via-amber-500 to-yellow-500',
  standai: 'from-cyan-500 via-teal-500 to-emerald-600',
};

const slugIcons: Record<string, string> = {
  memomind: '🧠',
  '4event': '🎪',
  standai: '🎨',
};

export function ProjectCard({ project, locale }: ProjectCardProps) {
  const gradient = slugGradients[project.slug] || 'from-indigo-500 via-purple-500 to-pink-500';
  const icon = slugIcons[project.slug] || '💡';

  return (
    <Link href={`/projects/${project.slug}`}>
      <div className="group h-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-500/10">
        {/* Visual header */}
        <div className={`relative h-40 bg-gradient-to-br ${gradient} overflow-hidden`}>
          {/* Decorative pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-4 w-24 h-24 border-2 border-white rounded-full" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 border-2 border-white rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-2 border-white rotate-45" />
          </div>
          {/* Project icon and name */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <span className="text-4xl mb-2">{icon}</span>
            <span className="text-lg font-bold tracking-wide opacity-90">
              {project.slug === 'memomind' ? 'MemoMind AI' : project.slug === '4event' ? '4Event' : 'StandAI'}
            </span>
          </div>
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
            {project.completedDate && (
              <span className="text-xs text-gray-400">{project.completedDate}</span>
            )}
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
                {project.techStack.indexOf(tech) < Math.min(3, project.techStack.length - 1) && ' · '}
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

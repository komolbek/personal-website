'use client';

import Link from 'next/link';
import { Project, Locale } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { ArrowRightIcon, AIIcon } from '@/components/ui/Icons';

function BrainIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 2a3.5 3.5 0 0 0-3.44 4.15A3.5 3.5 0 0 0 4 9.5a3.5 3.5 0 0 0 1.02 2.47A3.5 3.5 0 0 0 4 14.5a3.5 3.5 0 0 0 2.06 3.18A3.5 3.5 0 0 0 9.5 22h1V2h-1z" />
      <path d="M14.5 2a3.5 3.5 0 0 1 3.44 4.15A3.5 3.5 0 0 1 20 9.5a3.5 3.5 0 0 1-1.02 2.47A3.5 3.5 0 0 1 20 14.5a3.5 3.5 0 0 1-2.06 3.18A3.5 3.5 0 0 1 14.5 22h-1V2h1z" />
    </svg>
  );
}

function CalendarEventIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
    </svg>
  );
}

function PaletteIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.93 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-1 0-.83.67-1.5 1.5-1.5H16c3.31 0 6-2.69 6-6 0-5.52-4.48-9.99-10-9.99z" />
      <circle cx="7.5" cy="11.5" r="1.5" fill="currentColor" />
      <circle cx="10.5" cy="7.5" r="1.5" fill="currentColor" />
      <circle cx="14.5" cy="7.5" r="1.5" fill="currentColor" />
      <circle cx="17.5" cy="11.5" r="1.5" fill="currentColor" />
    </svg>
  );
}

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

const slugIconComponents: Record<string, React.FC<{ className?: string }>> = {
  memomind: BrainIcon,
  '4event': CalendarEventIcon,
  standai: PaletteIcon,
};

// Gradient pool for dynamic projects not in the hardcoded map
const dynamicGradients = [
  'from-indigo-500 via-purple-500 to-pink-500',
  'from-rose-500 via-pink-500 to-fuchsia-500',
  'from-blue-500 via-sky-500 to-cyan-500',
  'from-emerald-500 via-green-500 to-teal-500',
  'from-amber-500 via-orange-500 to-red-500',
];

function getGradientForSlug(slug: string): string {
  if (slugGradients[slug]) return slugGradients[slug];
  // Hash the slug to pick a consistent gradient
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = ((hash << 5) - hash) + slug.charCodeAt(i);
    hash |= 0;
  }
  return dynamicGradients[Math.abs(hash) % dynamicGradients.length];
}

// Category icon mapping for dynamic projects
const categoryIconComponents: Record<string, React.FC<{ className?: string }>> = {
  ai: BrainIcon,
  event: CalendarEventIcon,
  ecommerce: CalendarEventIcon,
  mobile: AIIcon,
  website: PaletteIcon,
  crm: AIIcon,
  saas: PaletteIcon,
};

export function ProjectCard({ project, locale }: ProjectCardProps) {
  const gradient = getGradientForSlug(project.slug);
  const IconComponent = slugIconComponents[project.slug] || categoryIconComponents[project.category] || AIIcon;

  return (
    <Link href={`/projects/${project.slug}`}>
      <div className="group h-full bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-500/10">
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
            <IconComponent className="w-10 h-10 mb-2" />
            <span className="text-lg font-bold tracking-wide opacity-90">
              {project.title[locale]}
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

          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
            {project.title[locale]}
          </h3>

          <p className="text-gray-600 mb-4 line-clamp-2">
            {project.description[locale]}
          </p>

          <div className="flex flex-wrap gap-1 mb-4">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="text-xs text-gray-500"
              >
                {tech}
                {project.techStack.indexOf(tech) < Math.min(3, project.techStack.length - 1) && ' · '}
              </span>
            ))}
          </div>

          <div className="flex items-center text-indigo-600 font-medium">
            <span>View Case Study</span>
            <ArrowRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}

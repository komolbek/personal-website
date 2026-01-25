'use client';

import Link from 'next/link';
import { Solution, Locale } from '@/types';
import { Badge } from '@/components/ui/Badge';
import {
  AutomationIcon,
  CRMIcon,
  WebsiteIcon,
  EcommerceIcon,
  MobileIcon,
  AIIcon,
  ArrowRightIcon,
} from '@/components/ui/Icons';

interface ServiceCardProps {
  solution: Solution;
  locale: Locale;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  automation: AutomationIcon,
  crm: CRMIcon,
  website: WebsiteIcon,
  ecommerce: EcommerceIcon,
  mobile: MobileIcon,
  ai: AIIcon,
};

export function ServiceCard({ solution, locale }: ServiceCardProps) {
  const IconComponent = iconMap[solution.icon] || AutomationIcon;

  return (
    <Link href={`/solutions/${solution.slug}`}>
      <div className="group h-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-500/10">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
          <IconComponent className="w-7 h-7 text-white" />
        </div>

        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {solution.title[locale]}
        </h3>

        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
          {solution.shortDescription[locale]}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {solution.technologies.slice(0, 3).map((tech) => (
            <Badge key={tech} variant="default" size="sm">
              {tech}
            </Badge>
          ))}
        </div>

        <div className="flex items-center text-indigo-600 dark:text-indigo-400 font-medium group-hover:gap-2 transition-all">
          <span>Learn More</span>
          <ArrowRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}

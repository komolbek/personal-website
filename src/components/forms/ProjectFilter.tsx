'use client';

import { Locale } from '@/types';
import { projectCategories } from '@/config/projects';

interface ProjectFilterProps {
  active: string;
  onChange: (category: string) => void;
  locale: Locale;
}

export function ProjectFilter({ active, onChange, locale }: ProjectFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      {projectCategories.map((category) => (
        <button
          key={category.value}
          onClick={() => onChange(category.value)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            active === category.value
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          {category.label[locale]}
        </button>
      ))}
    </div>
  );
}

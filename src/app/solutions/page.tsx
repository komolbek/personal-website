'use client';

import { useLocale } from '@/hooks/useLocale';
import { getSortedSolutions } from '@/config/solutions';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ServiceCard } from '@/components/cards/ServiceCard';

export default function SolutionsPage() {
  const { locale, t } = useLocale();
  const solutions = getSortedSolutions();

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      {/* Background decorations */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title={t.solutions.title}
          subtitle={t.solutions.subtitle}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {solutions.map((solution) => (
            <ServiceCard
              key={solution.slug}
              solution={solution}
              locale={locale}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

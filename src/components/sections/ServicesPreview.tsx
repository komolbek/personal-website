'use client';

import { useLocale } from '@/hooks/useLocale';
import { getSortedSolutions } from '@/config/solutions';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { Button } from '@/components/ui/Button';

export function ServicesPreview() {
  const { locale, t } = useLocale();
  const solutions = getSortedSolutions();

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title={t.home.services.title}
          subtitle={t.home.services.subtitle}
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

        <div className="text-center mt-12">
          <Button href="/solutions" variant="outline">
            {t.home.services.viewAll}
          </Button>
        </div>
      </div>
    </section>
  );
}

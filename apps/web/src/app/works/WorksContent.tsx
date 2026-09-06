'use client';

import { useLocale } from '@/hooks/useLocale';
import type { Solution, Project } from '@/types';
import { WorkCard } from './WorkCard';

interface WorksContentProps {
  solutions: Solution[];
  projects: Project[];
}

/**
 * Rebuilt on the design tokens (REDESIGN.md §5) so this page matches the
 * calculator and /pricing. What went: three fixed blurred colour blobs behind
 * the page, gradient section rules, pill badges, and cards that lifted and cast
 * a coloured shadow on hover.
 */
export function WorksContent({ solutions, projects }: WorksContentProps) {
  const { locale, t } = useLocale();
  const c = t.calc;
  const portfolio = t.home.portfolio;

  return (
    <div className="mx-auto max-w-[1060px] px-5 pb-20 pt-10">
      <h1 className="m-0 mb-3 text-[clamp(26px,4vw,36px)] font-semibold leading-[1.15] tracking-[-0.03em]">
        {portfolio.title}
      </h1>
      <p className="m-0 mb-12 max-w-[62ch] text-ink-muted">{c.works.lead}</p>

      {solutions.length > 0 && (
        <section className="mb-14">
          <h2 className="mb-1.5 text-[20px] font-semibold">{portfolio.productsHeading}</h2>
          <p className="mb-6 max-w-[62ch] text-[15px] text-ink-muted">{c.works.productsLead}</p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.map((s) => (
              <WorkCard
                key={s.slug}
                href={`/works/${s.slug}`}
                title={s.title[locale]}
                description={s.shortDescription[locale]}
                tech={s.technologies}
                locale={locale}
                c={c}
              />
            ))}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section className="border-t border-line pt-12">
          <h2 className="mb-1.5 text-[20px] font-semibold">{portfolio.projectsHeading}</h2>
          <p className="mb-6 max-w-[62ch] text-[15px] text-ink-muted">{c.works.projectsLead}</p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <WorkCard
                key={p.slug}
                href={`/works/${p.slug}`}
                title={p.title[locale]}
                description={p.description[locale]}
                kind={c.works.categories[p.category] ?? p.category}
                year={p.completedDate ?? null}
                tech={p.techStack}
                locale={locale}
                c={c}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

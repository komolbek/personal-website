'use client';

import { useLocale } from '@/hooks/useLocale';
import type { Solution } from '@/types';
import { PRODUCT_STEPS } from '@/config/product-extras';
import {
  BulletList,
  DetailCta,
  DetailHeader,
  DetailLink,
  Prose,
  Screenshots,
  Section,
  TechList,
} from '@/components/works/DetailShell';

/**
 * One template for every in-house product. The per-slug components it replaced
 * (Yuridix, Ordo, TalimX and a generic fallback) rendered the same fields with
 * different decoration; the only content unique to one of them now lives in
 * src/config/product-extras.ts.
 */
export function SolutionDetail({ solution }: { solution: Solution }) {
  const { locale, t } = useLocale();
  const c = t.calc;
  const title = solution.title[locale];
  const steps = PRODUCT_STEPS[solution.slug];
  const images = solution.images ?? [];

  return (
    <div className="mx-auto max-w-[1060px] px-5 pb-20 pt-10">
      <DetailHeader
        back="/works"
        backLabel={t.solutions.backToSolutions}
        kicker={t.home.portfolio.productsHeading}
        title={title}
        lead={solution.shortDescription[locale]}
        actions={
          solution.links && (
            <>
              {solution.links.website && (
                <DetailLink href={solution.links.website}>{t.projects.links.website}</DetailLink>
              )}
              {solution.links.booking && (
                <DetailLink href={solution.links.booking}>{t.projects.links.website}</DetailLink>
              )}
              {solution.links.mobileApp && (
                <DetailLink href={solution.links.mobileApp}>{t.projects.links.playStore}</DetailLink>
              )}
            </>
          )
        }
      />

      <Section title={c.works.overview}>
        <Prose>{solution.fullDescription[locale]}</Prose>
      </Section>

      {steps && (
        <Section title={c.works.howItWorks}>
          <ol className="grid max-w-[70ch] list-none gap-4 p-0">
            {steps.map((s) => (
              <li key={s.number} className="flex gap-4">
                <span className="num flex-none pt-0.5 text-[13px] text-ink-faint">
                  {String(s.number).padStart(2, '0')}
                </span>
                <span>
                  <b className="block font-semibold text-ink">{s.title[locale]}</b>
                  <span className="text-ink-muted">{s.description[locale]}</span>
                </span>
              </li>
            ))}
          </ol>
        </Section>
      )}

      {solution.features[locale]?.length > 0 && (
        <Section title={t.solutions.features}>
          <BulletList items={solution.features[locale]} />
        </Section>
      )}

      {solution.benefits[locale]?.length > 0 && (
        <Section title={t.solutions.benefits}>
          <BulletList items={solution.benefits[locale]} />
        </Section>
      )}

      {images.length > 0 && (
        <Section title={c.works.screenshots}>
          <Screenshots images={images} alt={title} />
        </Section>
      )}

      {solution.technologies.length > 0 && (
        <Section title={t.solutions.technologies}>
          <TechList items={solution.technologies} />
        </Section>
      )}

      <DetailCta title={t.solutions.cta} button={t.solutions.ctaButton} />
    </div>
  );
}

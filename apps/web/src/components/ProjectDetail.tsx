'use client';

import { useLocale } from '@/hooks/useLocale';
import type { Project } from '@/types';
import {
  DetailCta,
  DetailHeader,
  DetailLink,
  Prose,
  Screenshots,
  Section,
  TechList,
} from '@/components/works/DetailShell';

/**
 * One template for every client project, replacing the per-slug components for
 * MemoMind, RentEvent and StandAI plus a generic fallback.
 *
 * `results` is rendered only when the entry has it. REDESIGN.md §2.2 is still
 * open: several of these carry specific figures with no live link behind them,
 * and the audit decides which entries survive at all.
 */
export function ProjectDetail({ project }: { project: Project }) {
  const { locale, t } = useLocale();
  const c = t.calc;
  const title = project.title[locale];
  const kind = c.works.categories[project.category] ?? project.category;

  return (
    <div className="mx-auto max-w-[1060px] px-5 pb-20 pt-10">
      <DetailHeader
        back="/works"
        backLabel={t.projects.backToProjects}
        kicker={project.completedDate ? `${kind} · ${project.completedDate}` : kind}
        title={title}
        lead={project.description[locale]}
        actions={
          project.links && (
            <>
              {project.links.website && (
                <DetailLink href={project.links.website}>{t.projects.links.website}</DetailLink>
              )}
              {project.links.demo && (
                <DetailLink href={project.links.demo}>{t.projects.viewProject}</DetailLink>
              )}
              {project.links.appStore && (
                <DetailLink href={project.links.appStore}>{t.projects.links.appStore}</DetailLink>
              )}
              {project.links.playStore && (
                <DetailLink href={project.links.playStore}>{t.projects.links.playStore}</DetailLink>
              )}
            </>
          )
        }
      />

      <Section title={t.projects.challenge}>
        <Prose>{project.challenge[locale]}</Prose>
      </Section>

      <Section title={t.projects.solution}>
        <Prose>{project.solution[locale]}</Prose>
      </Section>

      {project.results?.[locale] && (
        <Section title={t.projects.results}>
          <Prose>{project.results[locale]}</Prose>
        </Section>
      )}

      {project.images.length > 0 && (
        <Section title={c.works.screenshots}>
          <Screenshots images={project.images} alt={title} />
        </Section>
      )}

      {project.techStack.length > 0 && (
        <Section title={t.projects.techStack}>
          <TechList items={project.techStack} />
        </Section>
      )}

      <DetailCta title={t.solutions.cta} button={t.solutions.ctaButton} />
    </div>
  );
}

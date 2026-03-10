import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { PortfolioPreview } from '@/components/sections/PortfolioPreview';
import { AboutSection } from '@/components/sections/AboutSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { CTASection } from '@/components/sections/CTASection';
import { FAQSection } from '@/components/sections/FAQSection';
import { siteConfig } from '@/config/site';
import { prisma } from '@/lib/prisma';
import {
  dbProductToSolution,
  dbProjectToProject,
  dbFeedbackToTestimonial,
} from '@/lib/transforms';
import { getSettings } from '@/lib/settings';

export const metadata: Metadata = {
  title: 'Necto Automations - IT Solutions & Software Development in Tashkent',
  description: 'Custom software development in Tashkent: CRM systems, web & mobile apps, business automation, and AI integration. 20+ clients, 6+ products shipped.',
  alternates: {
    canonical: siteConfig.url,
  },
};

export default async function Home() {
  const [dbProducts, dbProjects, dbFeedback, siteSettings] = await Promise.all([
    prisma.product.findMany({ where: { isVisible: true }, orderBy: { order: 'asc' } }).catch(() => []),
    prisma.clientProject.findMany({ where: { isVisible: true, featured: true }, orderBy: { order: 'asc' }, take: 3 }).catch(() => []),
    prisma.feedback.findMany({
      where: { status: 'APPROVED', featured: true },
      include: { partner: true },
      orderBy: { createdAt: 'desc' },
      take: 6,
    }).catch(() => []),
    getSettings([
      'hero.title_en', 'hero.title_ru', 'hero.title_uz',
      'hero.subtitle_en', 'hero.subtitle_ru', 'hero.subtitle_uz',
      'cta.title_en', 'cta.title_ru', 'cta.title_uz',
      'cta.subtitle_en', 'cta.subtitle_ru', 'cta.subtitle_uz',
    ]),
  ]);

  const solutions = dbProducts.map(dbProductToSolution);
  const projects = dbProjects.map(dbProjectToProject);

  const testimonials = dbFeedback.length > 0
    ? dbFeedback.map(f => dbFeedbackToTestimonial(f, f.partner?.name))
    : undefined;

  // Build override objects — only pass if settings have values
  const heroOverrides = {
    title: siteSettings['hero.title_ru'] || siteSettings['hero.title_en'] || undefined,
    subtitle: siteSettings['hero.subtitle_ru'] || siteSettings['hero.subtitle_en'] || undefined,
  };
  const ctaOverrides = {
    title: siteSettings['cta.title_ru'] || siteSettings['cta.title_en'] || undefined,
    subtitle: siteSettings['cta.subtitle_ru'] || siteSettings['cta.subtitle_en'] || undefined,
  };

  return (
    <>
      <Hero overrides={heroOverrides} />
      <PortfolioPreview solutions={solutions} projects={projects} />
      <AboutSection />
      <TestimonialsSection dbTestimonials={testimonials} />
      <FAQSection />
      <CTASection overrides={ctaOverrides} />
    </>
  );
}

import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { ClientLogos } from '@/components/sections/ClientLogos';
import { PortfolioPreview } from '@/components/sections/PortfolioPreview';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { CTASection } from '@/components/sections/CTASection';
import { siteConfig } from '@/config/site';
import { prisma } from '@/lib/prisma';
import {
  dbProductToSolution,
  dbProjectToProject,
  dbFeedbackToTestimonial,
  dbStatToTransformedStat,
} from '@/lib/transforms';

export const metadata: Metadata = {
  title: 'Necto Automations - IT Solutions & Software Development | Razrabotka saytov Tashkent',
  description: 'Professional IT solutions in Tashkent: website development, business automation, CRM systems, mobile apps, AI integration. Razrabotka saytov, avtomatizatsiya biznesa, CRM sistemy v Tashkente. Sayt yaratish, biznes avtomatlashtirish Toshkentda.',
  alternates: {
    canonical: siteConfig.url,
  },
};

export default async function Home() {
  const [dbProducts, dbProjects, dbStats, dbFeedback, dbPartners] = await Promise.all([
    prisma.product.findMany({ where: { isVisible: true }, orderBy: { order: 'asc' } }).catch(() => []),
    prisma.clientProject.findMany({ where: { isVisible: true, featured: true }, orderBy: { order: 'asc' }, take: 3 }).catch(() => []),
    prisma.companyStat.findMany({ where: { isVisible: true }, orderBy: { order: 'asc' } }).catch(() => []),
    prisma.feedback.findMany({
      where: { status: 'APPROVED', featured: true },
      include: { partner: true },
      orderBy: { createdAt: 'desc' },
      take: 6,
    }).catch(() => []),
    prisma.partner.findMany({ where: { isVisible: true }, orderBy: { order: 'asc' } }).catch(() => []),
  ]);

  const solutions = dbProducts.map(dbProductToSolution);
  const projects = dbProjects.map(dbProjectToProject);

  // Deduplicate stats by key to prevent duplicate entries from showing
  const seenKeys = new Set<string>();
  const uniqueStats = dbStats.filter(stat => {
    if (seenKeys.has(stat.key)) return false;
    seenKeys.add(stat.key);
    return true;
  });
  const stats = uniqueStats.length > 0
    ? uniqueStats.map(dbStatToTransformedStat)
    : undefined;

  const testimonials = dbFeedback.length > 0
    ? dbFeedback.map(f => dbFeedbackToTestimonial(f, f.partner?.name))
    : undefined;
  const partnerNames = dbPartners.length > 0
    ? dbPartners.map(p => p.name)
    : undefined;

  return (
    <>
      <Hero />
      <ClientLogos partnerNames={partnerNames} />
      <PortfolioPreview solutions={solutions} projects={projects} />
      <WhyChooseUs dbStats={stats} />
      <TestimonialsSection dbTestimonials={testimonials} />
      <CTASection />
    </>
  );
}

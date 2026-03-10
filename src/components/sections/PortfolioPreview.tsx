'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from '@/hooks/useLocale';
import { getSortedSolutions } from '@/config/solutions';
import { getFeaturedProjects } from '@/config/projects';
import { Solution, Project, Locale } from '@/types';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';

interface PortfolioPreviewProps {
  solutions?: Solution[];
  projects?: Project[];
}

interface BentoItem {
  type: 'product' | 'project';
  slug: string;
  title: Record<string, string>;
  description: Record<string, string>;
  href: string;
  gradient: string;
  techStack: string[];
  thumbnail?: string;
}

const productGradients: Record<string, string> = {
  yuridix: 'from-blue-600 via-indigo-600 to-purple-700',
  ordo: 'from-emerald-500 via-teal-500 to-cyan-600',
  talimx: 'from-orange-500 via-amber-500 to-yellow-500',
};

const projectGradients: Record<string, string> = {
  memomind: 'from-violet-600 via-purple-600 to-indigo-700',
  '4event': 'from-rose-500 via-pink-500 to-fuchsia-500',
  standai: 'from-cyan-500 via-teal-500 to-emerald-600',
};

const fallbackGradients = [
  'from-indigo-500 via-purple-500 to-pink-500',
  'from-blue-500 via-sky-500 to-cyan-500',
  'from-amber-500 via-orange-500 to-red-500',
  'from-emerald-500 via-green-500 to-teal-500',
];

function getGradient(slug: string, type: 'product' | 'project', index: number): string {
  if (type === 'product' && productGradients[slug]) return productGradients[slug];
  if (type === 'project' && projectGradients[slug]) return projectGradients[slug];
  return fallbackGradients[index % fallbackGradients.length];
}

export function PortfolioPreview({ solutions: dbSolutions, projects: dbProjects }: PortfolioPreviewProps) {
  const { locale, t } = useLocale();
  const solutions = dbSolutions && dbSolutions.length > 0 ? dbSolutions : getSortedSolutions();
  const featuredProjects = dbProjects && dbProjects.length > 0 ? dbProjects : getFeaturedProjects().slice(0, 3);

  // Merge into unified bento items
  const items: BentoItem[] = [
    ...solutions.map((s, i) => ({
      type: 'product' as const,
      slug: s.slug,
      title: s.title as Record<string, string>,
      description: s.shortDescription as Record<string, string>,
      href: `/solutions/${s.slug}`,
      gradient: getGradient(s.slug, 'product', i),
      techStack: s.technologies.slice(0, 3),
      thumbnail: s.images?.[0],
    })),
    ...featuredProjects.map((p, i) => ({
      type: 'project' as const,
      slug: p.slug,
      title: p.title as Record<string, string>,
      description: p.description as Record<string, string>,
      href: `/projects/${p.slug}`,
      gradient: getGradient(p.slug, 'project', i + solutions.length),
      techStack: p.techStack.slice(0, 3),
      thumbnail: p.thumbnail || p.images?.[0],
    })),
  ];

  return (
    <section className="py-24 lg:py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text mb-4">
              {t.home.portfolio.title}
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {t.home.portfolio.subtitle}
            </p>
          </div>
        </FadeIn>

        {/* Bento Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[280px]">
          {items.map((item, i) => (
            <StaggerItem
              key={item.slug}
              className={i === 0 ? 'md:col-span-2 md:row-span-1 lg:col-span-2 lg:row-span-1' : ''}
            >
              <BentoCard item={item} locale={locale as Locale} isLarge={i === 0} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn>
          <div className="text-center mt-12">
            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-2 text-indigo-600 font-semibold text-lg hover:gap-3 transition-all"
            >
              {t.home.portfolio.viewAll}
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function BentoCard({ item, locale, isLarge }: { item: BentoItem; locale: Locale; isLarge: boolean }) {
  return (
    <Link href={item.href} className="block h-full">
      <div className={`group relative h-full rounded-3xl bg-gradient-to-br ${item.gradient} overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl`}>
        {/* Product screenshot */}
        {item.thumbnail && (
          <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
            <Image
              src={item.thumbnail}
              alt=""
              fill
              sizes={isLarge ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
              className="object-cover object-top"
            />
          </div>
        )}

        {/* Decorative elements */}
        {!item.thumbnail && (
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-6 right-6 w-32 h-32 border-2 border-white rounded-full" />
            <div className="absolute -bottom-8 -left-8 w-48 h-48 border-2 border-white rounded-full" />
          </div>
        )}

        {/* Content overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

        <div className={`relative h-full flex flex-col justify-end p-6 ${isLarge ? 'lg:p-8' : ''}`}>
          {/* Type badge */}
          <div className="mb-auto">
            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white/90 text-xs font-medium">
              {item.type === 'product' ? 'Product' : 'Project'}
            </span>
          </div>

          {/* Title & Description */}
          <div>
            <h3 className={`font-bold text-white mb-2 ${isLarge ? 'text-2xl lg:text-3xl' : 'text-xl'}`}>
              {item.title[locale]}
            </h3>
            <p className={`text-white/80 mb-3 ${isLarge ? 'text-base line-clamp-2' : 'text-sm line-clamp-2'}`}>
              {item.description[locale]}
            </p>
            <div className="flex items-center gap-2">
              {item.techStack.map((tech) => (
                <span key={tech} className="text-xs text-white/60">
                  {tech}
                </span>
              ))}
              <svg className="w-4 h-4 text-white/80 ml-auto group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

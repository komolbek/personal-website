'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useLocale } from '@/hooks/useLocale';
import { Project } from '@/types';
import { Button } from '@/components/ui/Button';
import { ExternalLinkIcon } from '@/components/ui/Icons';

export function FourEventDetail({ project }: { project: Project }) {
  const { locale, t } = useLocale();
  const [expandedPanel, setExpandedPanel] = useState<number | null>(0);

  const screenshots = project.images || [];

  const panels = [
    {
      number: 1,
      title: t.projects.challenge,
      content: project.challenge[locale],
      accent: 'border-orange-500',
      bg: 'bg-orange-500',
    },
    {
      number: 2,
      title: t.projects.solution,
      content: project.solution[locale],
      accent: 'border-amber-500',
      bg: 'bg-amber-500',
    },
    {
      number: 3,
      title: t.projects.results,
      content: project.results?.[locale] || '',
      accent: 'border-yellow-500',
      bg: 'bg-yellow-500',
    },
  ].filter((p) => p.content);

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Background decorations - warm orange/amber theme */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/15 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-400/10 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4" />
        <div className="absolute top-1/2 right-1/3 w-[400px] h-[400px] bg-yellow-400/8 rounded-full blur-3xl" />
      </div>

      {/* ============================================ */}
      {/* HERO: Full-width image banner with overlay   */}
      {/* ============================================ */}
      <section className="relative overflow-hidden mb-20">
        {/* Background image */}
        <div className="relative h-[400px] md:h-[500px]">
          {screenshots[0] && (
            <Image
              src={screenshots[0]}
              alt={project.title[locale]}
              fill
              quality={95}
              sizes="100vw"
              className="object-cover"
              priority
            />
          )}
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/30 to-transparent" />

          {/* Content overlay */}
          <div className="absolute inset-0 flex flex-col justify-end">
            <div className="max-w-6xl mx-auto px-4 pb-12 w-full">
              {/* Back link */}
              <Link
                href="/projects"
                className="inline-flex items-center text-sm text-orange-200/80 hover:text-white mb-6 transition-colors group"
              >
                <span className="mr-2 transition-transform group-hover:-translate-x-1">&larr;</span>
                {t.projects.backToProjects}
              </Link>

              <div className="inline-flex items-center gap-2 bg-orange-500/20 backdrop-blur-sm border border-orange-400/30 rounded-full px-4 py-1.5 mb-4">
                <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
                <span className="text-sm text-orange-200 font-medium">
                  {locale === 'ru' ? 'Событийная платформа' : locale === 'uz' ? 'Tadbir platformasi' : 'Event Platform'}
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4 leading-tight">
                {project.title[locale]}
              </h1>

              <p className="text-lg md:text-xl text-gray-200 max-w-2xl leading-relaxed">
                {project.description[locale]}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4">
        {/* ============================================ */}
        {/* SCREENSHOTS: Masonry / staggered grid        */}
        {/* ============================================ */}
        {screenshots.length > 1 && (
          <section className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">
              {locale === 'ru' ? 'Скриншоты' : locale === 'uz' ? 'Skrinshotlar' : 'Screenshots'}
            </h2>

            <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
              {screenshots.slice(1).map((src, index) => {
                // Stagger heights for masonry effect
                const heights = ['h-64', 'h-80', 'h-72', 'h-96', 'h-64', 'h-80'];
                const heightClass = heights[index % heights.length];

                return (
                  <div
                    key={index}
                    className={`relative ${heightClass} rounded-2xl overflow-hidden break-inside-avoid border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 group`}
                  >
                    <Image
                      src={src}
                      alt={`${project.title[locale]} screenshot ${index + 2}`}
                      fill
                      quality={85}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ============================================ */}
        {/* CHALLENGE / SOLUTION / RESULTS: Expandable   */}
        {/* numbered panels                              */}
        {/* ============================================ */}
        <section className="mb-20">
          <div className="max-w-3xl mx-auto space-y-4">
            {panels.map((panel, index) => {
              const isExpanded = expandedPanel === index;

              return (
                <div
                  key={index}
                  className={`rounded-2xl border border-gray-200/60 dark:border-gray-700/60 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm overflow-hidden transition-all duration-300 ${
                    isExpanded ? 'shadow-lg' : 'shadow-sm hover:shadow-md'
                  }`}
                >
                  <button
                    onClick={() => setExpandedPanel(isExpanded ? null : index)}
                    className="w-full flex items-center gap-5 p-6 text-left"
                  >
                    {/* Large number */}
                    <div
                      className={`flex-shrink-0 w-14 h-14 rounded-2xl ${panel.bg} flex items-center justify-center shadow-lg`}
                    >
                      <span className="text-2xl font-black text-white">
                        {panel.number}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="flex-1 text-xl font-bold text-gray-900 dark:text-white">
                      {panel.title}
                    </h3>

                    {/* Chevron */}
                    <svg
                      className={`w-6 h-6 text-gray-400 transition-transform duration-300 flex-shrink-0 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>

                  {/* Expandable content */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className={`px-6 pb-6 pl-[5.75rem] border-t border-gray-100 dark:border-gray-700/50 pt-4`}>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                        {panel.content}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ============================================ */}
        {/* TECH STACK: Horizontal scrolling strip       */}
        {/* ============================================ */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-8">
            {t.projects.techStack}
          </h2>

          <div className="relative">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white dark:from-gray-950 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white dark:from-gray-950 to-transparent z-10 pointer-events-none" />

            <div className="flex gap-4 overflow-x-auto pb-4 px-6 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-orange-300 dark:scrollbar-thumb-orange-600">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="flex-shrink-0 inline-flex items-center px-6 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 text-orange-700 dark:text-orange-300 border border-orange-200/60 dark:border-orange-700/40 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* DEMO BUTTON                                  */}
        {/* ============================================ */}
        {project.links?.demo && (
          <section className="mb-20">
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-2xl p-8 md:p-12 border border-orange-200/50 dark:border-orange-700/30">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {locale === 'ru'
                      ? 'Попробуйте демо'
                      : locale === 'uz'
                        ? 'Demoni sinab ko\'ring'
                        : 'Try the Demo'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {locale === 'ru'
                      ? 'Посмотрите платформу в действии с нашим живым демо.'
                      : locale === 'uz'
                        ? 'Jonli demo orqali platformani ko\'ring.'
                        : 'See the platform in action with our live demo.'}
                  </p>
                </div>

                <div className="flex justify-center md:justify-end">
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white font-semibold rounded-full transition-all duration-300 shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/30"
                  >
                    <ExternalLinkIcon className="w-5 h-5" />
                    {t.projects.links.website || 'View Demo'}
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ============================================ */}
        {/* BOTTOM CTA                                   */}
        {/* ============================================ */}
        <section className="mb-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-500 p-10 md:p-16 text-center">
            {/* Decorative pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 left-8 w-36 h-36 border-2 border-white rounded-full" />
              <div className="absolute bottom-4 right-12 w-24 h-24 border-2 border-white rounded-full" />
              <div className="absolute top-1/3 right-1/4 w-16 h-16 border-2 border-white rounded-full" />
            </div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {locale === 'ru'
                  ? 'Заинтересовал проект?'
                  : locale === 'uz'
                    ? 'Loyiha qiziqtirdimi?'
                    : 'Interested in this project?'}
              </h2>
              <p className="text-orange-100 mb-8 max-w-lg mx-auto">
                {locale === 'ru'
                  ? 'Свяжитесь с нами для бесплатной консультации'
                  : locale === 'uz'
                    ? 'Bepul maslahat uchun biz bilan bog\'laning'
                    : 'Get in touch for a free consultation'}
              </p>
              <Button
                href="/contact"
                variant="secondary"
                size="lg"
                className="bg-white text-orange-700 hover:bg-gray-100 shadow-lg shadow-black/20"
              >
                {t.common.contactUs}
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

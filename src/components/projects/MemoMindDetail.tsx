'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useLocale } from '@/hooks/useLocale';
import { Project } from '@/types';
import { Button } from '@/components/ui/Button';
import { AppleIcon } from '@/components/ui/Icons';

const screenshotPaths = [
  '/projects/memomind/screenshot-1.png',
  '/projects/memomind/screenshot-2.png',
  '/projects/memomind/screenshot-3.png',
  '/projects/memomind/screenshot-4.png',
  '/projects/memomind/screenshot-5.png',
  '/projects/memomind/screenshot-6.png',
  '/projects/memomind/screenshot-7.png',
];

export function MemoMindDetail({ project }: { project: Project }) {
  const { locale, t } = useLocale();
  const [activeIndex, setActiveIndex] = useState(0);

  const screenshots =
    project.images && project.images.length > 0
      ? project.images
      : screenshotPaths;

  return (
    <div className="min-h-screen bg-slate-950">
      {/* ============================================ */}
      {/* HERO: Dark gradient with phone mockup       */}
      {/* ============================================ */}
      <section className="relative overflow-hidden pt-24 pb-20">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-950" />
        {/* Decorative orbs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl" />
        <div className="absolute top-40 right-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4">
          {/* Back link */}
          <Link
            href="/projects"
            className="inline-flex items-center text-sm text-violet-300/70 hover:text-violet-200 mb-10 transition-colors group"
          >
            <span className="mr-2 transition-transform group-hover:-translate-x-1">&larr;</span>
            {t.projects.backToProjects}
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div>
              <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
                <span className="w-2 h-2 bg-violet-400 rounded-full animate-pulse" />
                <span className="text-sm text-violet-300 font-medium">AI-Powered Notes</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                  {project.title[locale]}
                </span>
              </h1>

              <p className="text-lg md:text-xl text-slate-400 leading-relaxed mb-8 max-w-lg">
                {project.description[locale]}
              </p>

              {/* App Store button */}
              {project.links?.appStore && (
                <a
                  href={project.links.appStore}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-white text-slate-900 font-semibold rounded-2xl px-7 py-4 text-lg hover:bg-slate-100 transition-colors shadow-lg shadow-violet-500/20"
                >
                  <AppleIcon className="w-6 h-6" />
                  {t.projects.links.appStore}
                </a>
              )}
            </div>

            {/* Right: Phone mockup */}
            <div className="flex justify-center">
              <div className="relative">
                {/* Phone frame */}
                <div className="relative w-[280px] md:w-[320px] rounded-[3rem] border-[8px] border-slate-700 bg-slate-800 shadow-2xl shadow-violet-500/20 overflow-hidden">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-700 rounded-b-2xl z-10" />
                  {/* Screenshot */}
                  <div className="aspect-[9/19.5] relative">
                    <Image
                      src={screenshots[0] || screenshotPaths[0]}
                      alt={project.title[locale]}
                      fill
                      quality={95}
                      sizes="320px"
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
                {/* Glow behind phone */}
                <div className="absolute -inset-8 bg-violet-500/20 rounded-full blur-3xl -z-10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SCREENSHOTS: Carousel with dot navigation   */}
      {/* ============================================ */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            {locale === 'ru' ? 'Скриншоты' : locale === 'uz' ? 'Skrinshotlar' : 'Screenshots'}
          </h2>

          {/* Large active image */}
          <div className="relative mb-8 rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl shadow-violet-500/10 max-w-3xl mx-auto">
            <Image
              src={screenshots[activeIndex] || screenshots[0]}
              alt={`${project.title[locale]} screenshot ${activeIndex + 1}`}
              width={1200}
              height={800}
              quality={90}
              sizes="(max-width: 1024px) 100vw, 768px"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Dot navigation */}
          <div className="flex items-center justify-center gap-3">
            {screenshots.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`transition-all duration-300 rounded-full ${
                  activeIndex === index
                    ? 'w-8 h-3 bg-violet-500 shadow-lg shadow-violet-500/50'
                    : 'w-3 h-3 bg-slate-600 hover:bg-slate-500'
                }`}
                aria-label={`Screenshot ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* CHALLENGE / SOLUTION / RESULTS: Magazine     */}
      {/* ============================================ */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          {/* Challenge: full width */}
          <div className="mb-10 p-8 md:p-10 bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700/50">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-1.5 h-full min-h-[60px] bg-red-500 rounded-full self-stretch" />
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {t.projects.challenge}
                </h3>
                <p className="text-slate-300 leading-relaxed text-lg">
                  {project.challenge[locale]}
                </p>
              </div>
            </div>
          </div>

          {/* Solution + Results: side by side */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Solution */}
            <div className="p-8 bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700/50">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-1.5 min-h-[60px] bg-violet-500 rounded-full self-stretch" />
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {t.projects.solution}
                  </h3>
                  <p className="text-slate-300 leading-relaxed">
                    {project.solution[locale]}
                  </p>
                </div>
              </div>
            </div>

            {/* Results */}
            {project.results && (
              <div className="p-8 bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700/50">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-1.5 min-h-[60px] bg-emerald-500 rounded-full self-stretch" />
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {t.projects.results}
                    </h3>
                    <p className="text-slate-300 leading-relaxed">
                      {project.results[locale]}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* TECH STACK: Glowing pills on dark bg         */}
      {/* ============================================ */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-10">
            {t.projects.techStack}
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-semibold bg-violet-500/10 text-violet-300 border border-violet-500/20 shadow-lg shadow-violet-500/5 hover:shadow-violet-500/20 hover:bg-violet-500/20 transition-all duration-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* BOTTOM CTA                                   */}
      {/* ============================================ */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 p-10 md:p-16 text-center">
            {/* Decorative dots pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-6 left-10 w-40 h-40 border-2 border-white rounded-full" />
              <div className="absolute bottom-6 right-10 w-28 h-28 border-2 border-white rounded-full" />
              <div className="absolute top-1/2 left-1/3 w-20 h-20 border-2 border-white rounded-full" />
            </div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {locale === 'ru'
                  ? 'Заинтересовал проект?'
                  : locale === 'uz'
                    ? 'Loyiha qiziqtirdimi?'
                    : 'Interested in this project?'}
              </h2>
              <p className="text-violet-100 mb-8 max-w-lg mx-auto">
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
                className="bg-white text-violet-700 hover:bg-slate-100 shadow-lg shadow-black/20"
              >
                {t.common.contactUs}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

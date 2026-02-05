'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useLocale } from '@/hooks/useLocale';
import { Project } from '@/types';
import { Button } from '@/components/ui/Button';
import { ExternalLinkIcon } from '@/components/ui/Icons';

const howItWorksSteps: Record<string, { title: string; description: string }[]> = {
  en: [
    { title: 'Describe Requirements', description: 'Tell the AI about your exhibition stand needs, dimensions, and brand guidelines.' },
    { title: 'AI Generates Designs', description: 'Our AI creates multiple unique stand designs tailored to your specifications.' },
    { title: 'Select & Get Quote', description: 'Choose your favorite design and receive an instant production quote.' },
  ],
  ru: [
    { title: 'Опишите требования', description: 'Расскажите ИИ о ваших потребностях, размерах и бренд-гайдлайнах.' },
    { title: 'ИИ создаёт дизайн', description: 'Наш ИИ создаёт уникальные дизайны стендов по вашим спецификациям.' },
    { title: 'Выберите и получите расчёт', description: 'Выберите понравившийся дизайн и получите мгновенный расчёт стоимости.' },
  ],
  uz: [
    { title: 'Talablarni tavsiflang', description: 'Sun\'iy intellektga ko\'rgazma stendi ehtiyojlaringiz haqida ayting.' },
    { title: 'AI dizayn yaratadi', description: 'Bizning AI sizning xususiyatlaringizga mos noyob dizaynlar yaratadi.' },
    { title: 'Tanlang va narx oling', description: 'O\'zingizga yoqqan dizaynni tanlang va tezkor narx taklifi oling.' },
  ],
};

export function StandAIDetail({ project }: { project: Project }) {
  const { locale, t } = useLocale();
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);

  const screenshots = project.images || [];
  const steps = howItWorksSteps[locale] || howItWorksSteps.en;

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Background decorations - cyan/teal futuristic theme */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-br from-cyan-500/10 via-teal-400/5 to-slate-500/10 dark:from-cyan-500/5 dark:via-teal-400/3 dark:to-slate-500/5" />
        <div className="absolute top-32 right-20 w-80 h-80 bg-cyan-400/15 rounded-full blur-3xl" />
        <div className="absolute top-60 left-10 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-10 w-64 h-64 bg-cyan-300/8 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4">
        {/* Back link */}
        <Link
          href="/projects"
          className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 mb-8 transition-colors group"
        >
          <span className="mr-2 transition-transform group-hover:-translate-x-1">&larr;</span>
          {t.projects.backToProjects}
        </Link>

        {/* ============================================ */}
        {/* HERO: Split layout with geometric accents    */}
        {/* ============================================ */}
        <section className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-24">
          {/* Left: Text with geometric decorations */}
          <div className="relative">
            {/* Geometric decorations */}
            <div className="absolute -top-8 -left-8 w-24 h-24 border-2 border-cyan-500/20 rotate-45 rounded-lg" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 border-2 border-teal-500/15 rotate-12 rounded-lg" />
            <div className="absolute top-1/2 -right-6 w-12 h-12 bg-cyan-500/10 rotate-45 rounded-sm" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                <span className="text-sm text-cyan-600 dark:text-cyan-400 font-medium">
                  {locale === 'ru' ? 'ИИ-решение' : locale === 'uz' ? 'AI yechim' : 'AI-Powered'}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-cyan-600 via-teal-500 to-cyan-400 bg-clip-text text-transparent">
                  {project.title[locale]}
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-8 max-w-lg">
                {project.description[locale]}
              </p>

              {/* Demo button */}
              {project.links?.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-teal-500 hover:from-cyan-700 hover:to-teal-600 text-white font-semibold rounded-full px-8 py-4 text-lg transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/30"
                >
                  <ExternalLinkIcon className="w-5 h-5" />
                  {t.projects.links.website || 'View Demo'}
                </a>
              )}
            </div>
          </div>

          {/* Right: Floating screenshot with glow */}
          <div className="relative flex justify-center">
            {screenshots[0] && (
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute -inset-6 bg-cyan-500/20 rounded-3xl blur-2xl" />
                <div className="absolute -inset-3 bg-teal-400/10 rounded-2xl blur-xl" />

                {/* Screenshot */}
                <div className="relative rounded-2xl overflow-hidden border border-cyan-500/20 shadow-2xl shadow-cyan-500/10">
                  <Image
                    src={screenshots[0]}
                    alt={project.title[locale]}
                    width={1200}
                    height={800}
                    quality={95}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>

                {/* Corner accents */}
                <div className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-cyan-400/40 rounded-tr-lg" />
                <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 border-cyan-400/40 rounded-bl-lg" />
              </div>
            )}
          </div>
        </section>

        {/* ============================================ */}
        {/* HOW IT WORKS: 3-step horizontal flow         */}
        {/* ============================================ */}
        <section className="mb-24">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-4">
            {locale === 'ru' ? 'Как это работает' : locale === 'uz' ? 'Qanday ishlaydi' : 'How It Works'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-14 max-w-xl mx-auto">
            {locale === 'ru'
              ? 'Три простых шага до вашего идеального стенда'
              : locale === 'uz'
                ? 'Mukammal stendingizga uch oddiy qadam'
                : 'Three simple steps to your perfect exhibition stand'}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Connecting arrows between cards (desktop only) */}
            <div className="hidden md:flex absolute top-1/2 left-[33.33%] -translate-y-1/2 -translate-x-1/2 z-10">
              <svg className="w-8 h-8 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>
            <div className="hidden md:flex absolute top-1/2 left-[66.66%] -translate-y-1/2 -translate-x-1/2 z-10">
              <svg className="w-8 h-8 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>

            {steps.map((step, index) => (
              <div
                key={index}
                className="relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/60 dark:border-gray-700/60 hover:border-cyan-300 dark:hover:border-cyan-600 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 text-center group"
              >
                {/* Large step number */}
                <div className="text-7xl font-black text-cyan-500/15 dark:text-cyan-400/10 absolute top-4 right-6 select-none pointer-events-none">
                  {index + 1}
                </div>

                {/* Step circle */}
                <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-cyan-500/25 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-bold text-white">{index + 1}</span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 relative z-10">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed relative z-10">
                  {step.description}
                </p>

                {/* Mobile arrow between steps */}
                {index < steps.length - 1 && (
                  <div className="md:hidden flex justify-center mt-6">
                    <svg className="w-6 h-6 text-cyan-400 rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ============================================ */}
        {/* SCREENSHOTS: 2x2 grid with hover zoom        */}
        {/* ============================================ */}
        {screenshots.length > 1 && (
          <section className="mb-24">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">
              {locale === 'ru' ? 'Скриншоты' : locale === 'uz' ? 'Skrinshotlar' : 'Screenshots'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {screenshots.slice(0, 4).map((src, index) => (
                <div
                  key={index}
                  className="relative aspect-video rounded-2xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50 shadow-lg cursor-pointer group"
                  onMouseEnter={() => setHoveredImage(index)}
                  onMouseLeave={() => setHoveredImage(null)}
                >
                  <Image
                    src={src}
                    alt={`${project.title[locale]} screenshot ${index + 1}`}
                    fill
                    quality={90}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className={`object-cover transition-transform duration-500 ${
                      hoveredImage === index ? 'scale-110' : 'scale-100'
                    }`}
                  />
                  {/* Hover overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-cyan-900/40 to-transparent transition-opacity duration-300 ${
                      hoveredImage === index ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                  {/* Image number badge */}
                  <div className="absolute top-3 left-3 bg-cyan-500/80 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-lg">
                    {index + 1}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ============================================ */}
        {/* CHALLENGE / SOLUTION / RESULTS: Timeline      */}
        {/* ============================================ */}
        <section className="mb-24">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-14">
            {locale === 'ru' ? 'Процесс разработки' : locale === 'uz' ? 'Ishlab chiqish jarayoni' : 'Development Journey'}
          </h2>

          <div className="relative max-w-3xl mx-auto">
            {/* Vertical timeline line */}
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-teal-500 to-emerald-500" />

            <div className="space-y-12">
              {/* Challenge */}
              <div className="relative flex gap-6 md:gap-8">
                {/* Timeline dot */}
                <div className="flex-shrink-0 relative z-10">
                  <div className="w-12 md:w-16 h-12 md:h-16 rounded-full bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center shadow-lg shadow-red-500/25">
                    <span className="text-white font-bold text-sm md:text-base">01</span>
                  </div>
                </div>
                {/* Content */}
                <div className="flex-1 pb-2">
                  <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
                    <span className="text-xs font-semibold text-red-500 uppercase tracking-wider mb-2 block">
                      {t.projects.challenge}
                    </span>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {project.challenge[locale]}
                    </p>
                  </div>
                </div>
              </div>

              {/* Solution */}
              <div className="relative flex gap-6 md:gap-8">
                <div className="flex-shrink-0 relative z-10">
                  <div className="w-12 md:w-16 h-12 md:h-16 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center shadow-lg shadow-cyan-500/25">
                    <span className="text-white font-bold text-sm md:text-base">02</span>
                  </div>
                </div>
                <div className="flex-1 pb-2">
                  <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
                    <span className="text-xs font-semibold text-cyan-500 uppercase tracking-wider mb-2 block">
                      {t.projects.solution}
                    </span>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {project.solution[locale]}
                    </p>
                  </div>
                </div>
              </div>

              {/* Results */}
              {project.results && (
                <div className="relative flex gap-6 md:gap-8">
                  <div className="flex-shrink-0 relative z-10">
                    <div className="w-12 md:w-16 h-12 md:h-16 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center shadow-lg shadow-emerald-500/25">
                      <span className="text-white font-bold text-sm md:text-base">03</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
                      <span className="text-xs font-semibold text-emerald-500 uppercase tracking-wider mb-2 block">
                        {t.projects.results}
                      </span>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
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
        {/* TECH STACK: Colored cards in flex wrap        */}
        {/* ============================================ */}
        <section className="mb-24">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-10">
            {t.projects.techStack}
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {project.techStack.map((tech, index) => {
              const cardColors = [
                'from-cyan-500/10 to-cyan-600/5 border-cyan-300/30 dark:border-cyan-600/30 text-cyan-700 dark:text-cyan-300',
                'from-teal-500/10 to-teal-600/5 border-teal-300/30 dark:border-teal-600/30 text-teal-700 dark:text-teal-300',
                'from-emerald-500/10 to-emerald-600/5 border-emerald-300/30 dark:border-emerald-600/30 text-emerald-700 dark:text-emerald-300',
                'from-sky-500/10 to-sky-600/5 border-sky-300/30 dark:border-sky-600/30 text-sky-700 dark:text-sky-300',
                'from-indigo-500/10 to-indigo-600/5 border-indigo-300/30 dark:border-indigo-600/30 text-indigo-700 dark:text-indigo-300',
              ];
              const colorClass = cardColors[index % cardColors.length];

              return (
                <div
                  key={tech}
                  className={`px-6 py-3 rounded-xl bg-gradient-to-br ${colorClass} border font-semibold text-sm backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5`}
                >
                  {tech}
                </div>
              );
            })}
          </div>
        </section>

        {/* ============================================ */}
        {/* BOTTOM CTA                                   */}
        {/* ============================================ */}
        <section className="mb-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-600 via-teal-500 to-cyan-600 p-10 md:p-16 text-center">
            {/* Geometric decorations */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-6 left-10 w-32 h-32 border-2 border-white rotate-45 rounded-lg" />
              <div className="absolute bottom-6 right-10 w-24 h-24 border-2 border-white rotate-12 rounded-lg" />
              <div className="absolute top-1/2 right-1/3 w-16 h-16 border-2 border-white -rotate-12 rounded-sm" />
            </div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {locale === 'ru'
                  ? 'Заинтересовал проект?'
                  : locale === 'uz'
                    ? 'Loyiha qiziqtirdimi?'
                    : 'Interested in this project?'}
              </h2>
              <p className="text-cyan-100 mb-8 max-w-lg mx-auto">
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
                className="bg-white text-cyan-700 hover:bg-gray-100 shadow-lg shadow-black/20"
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

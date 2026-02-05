'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useLocale } from '@/hooks/useLocale';
import { Solution } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { CheckCircleIcon, ArrowRightIcon, ExternalLinkIcon } from '@/components/ui/Icons';

type PlatformTab = 'mobile' | 'admin';

const tabLabels: Record<PlatformTab, Record<string, string>> = {
  mobile: { en: 'Mobile App', ru: 'Мобильное приложение', uz: 'Mobil ilova' },
  admin: { en: 'Admin Panel', ru: 'Админ-панель', uz: 'Admin panel' },
};

const tabScreenshots: Record<PlatformTab, string[]> = {
  mobile: [
    '/products/talimx/screenshot-1.png',
    '/products/talimx/screenshot-2.png',
    '/products/talimx/screenshot-3.png',
    '/products/talimx/screenshot-4.png',
  ],
  admin: [
    '/products/talimx/screenshot-5.png',
    '/products/talimx/screenshot-6.png',
    '/products/talimx/screenshot-7.png',
    '/products/talimx/screenshot-8.png',
    '/products/talimx/screenshot-9.png',
    '/products/talimx/screenshot-10.png',
    '/products/talimx/screenshot-11.png',
  ],
};

const statCards = {
  en: ['Web + Mobile', 'Multi-language', 'Free Trial'],
  ru: ['Веб + Мобайл', 'Мультиязычность', 'Бесплатный пробный период'],
  uz: ['Veb + Mobil', 'Ko\'p tilli', 'Bepul sinov'],
};

const sectionLabels = {
  platformOverview: { en: 'Platform Overview', ru: 'Обзор платформы', uz: 'Platforma sharhi' },
  features: { en: 'Features', ru: 'Возможности', uz: 'Imkoniyatlar' },
  benefits: { en: 'Benefits', ru: 'Преимущества', uz: 'Afzalliklar' },
  techStack: { en: 'Tech Stack', ru: 'Технологии', uz: 'Texnologiyalar' },
  pricing: { en: 'Pricing', ru: 'Стоимость', uz: 'Narxlar' },
  links: { en: 'Get Started', ru: 'Начать', uz: 'Boshlash' },
  visitTalimX: { en: 'Visit TalimX', ru: 'Перейти на TalimX', uz: 'TalimX ga o\'tish' },
  adminPanel: { en: 'Admin Panel', ru: 'Админ-панель', uz: 'Admin panel' },
  contactUs: { en: 'Contact Us', ru: 'Связаться', uz: 'Bog\'lanish' },
  startTrial: { en: 'Start Free Trial', ru: 'Начать бесплатный период', uz: 'Bepul sinov boshlash' },
};

const benefitGradients = [
  'from-amber-50 to-amber-100/50 dark:from-amber-900/20 dark:to-amber-800/10 border-l-amber-400',
  'from-emerald-50 to-emerald-100/50 dark:from-emerald-900/20 dark:to-emerald-800/10 border-l-emerald-400',
  'from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/10 border-l-blue-400',
  'from-purple-50 to-purple-100/50 dark:from-purple-900/20 dark:to-purple-800/10 border-l-purple-400',
];

const featureBorderColors = [
  'border-l-amber-400',
  'border-l-orange-400',
  'border-l-emerald-400',
  'border-l-teal-400',
  'border-l-blue-400',
  'border-l-indigo-400',
  'border-l-purple-400',
  'border-l-pink-400',
];

const techStackLayers = [
  { label: 'Frontend', color: 'from-amber-500 to-orange-500' },
  { label: 'Mobile', color: 'from-emerald-500 to-teal-500' },
  { label: 'Backend', color: 'from-blue-500 to-indigo-500' },
  { label: 'Database', color: 'from-purple-500 to-pink-500' },
];

export function TalimXDetail({ solution }: { solution: Solution }) {
  const { locale, t } = useLocale();
  const [activeTab, setActiveTab] = useState<PlatformTab>('mobile');
  const [expandedFeature, setExpandedFeature] = useState<number | null>(0);

  const features = solution.features[locale];
  const benefits = solution.benefits[locale];
  const leftFeatures = features.slice(0, Math.ceil(features.length / 2));
  const rightFeatures = features.slice(Math.ceil(features.length / 2));

  const techMapping: Record<string, number> = {
    'Next.js': 0,
    'React': 0,
    'TypeScript': 0,
    'React Native': 1,
    'Node.js': 2,
    'Prisma': 2,
    'PostgreSQL': 3,
  };

  const groupedTech: string[][] = [[], [], [], []];
  solution.technologies.forEach((tech) => {
    const layerIndex = techMapping[tech] ?? 0;
    groupedTech[layerIndex].push(tech);
  });

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      {/* Background - warm amber/orange + indigo gradient */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-br from-amber-500/15 via-orange-400/10 to-indigo-500/15 dark:from-amber-500/8 dark:via-orange-400/5 dark:to-indigo-500/8" />
        <div className="absolute top-40 right-20 w-80 h-80 bg-amber-400/20 rounded-full blur-3xl" />
        <div className="absolute top-60 left-10 w-64 h-64 bg-indigo-500/15 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-40 w-72 h-72 bg-orange-400/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Back link */}
        <Link
          href="/solutions"
          className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 mb-8 transition-colors"
        >
          <ArrowRightIcon className="w-4 h-4 mr-1 rotate-180" />
          {t.solutions.backToSolutions}
        </Link>

        {/* ─── HERO SECTION ─── */}
        <section className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4">
            <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-indigo-600 bg-clip-text text-transparent animate-gradient-x bg-[length:200%_auto]">
              {solution.title[locale]}
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed mb-10">
            {solution.shortDescription[locale]}
          </p>

          {/* Stat cards row */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {statCards[locale]?.map((stat, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 px-6 py-3 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-amber-200/50 dark:border-amber-700/30 shadow-sm"
              >
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500" />
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {stat}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ─── PLATFORM OVERVIEW (Tabbed) ─── */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            {sectionLabels.platformOverview[locale]}
          </h2>

          {/* Tab buttons */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-gray-100 dark:bg-gray-800 rounded-2xl p-1.5 gap-1">
              {(Object.keys(tabLabels) as PlatformTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    activeTab === tab
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {tabLabels[tab][locale]}
                </button>
              ))}
            </div>
          </div>

          {/* Tab content - screenshot grid */}
          <div className={`grid gap-4 ${
            activeTab === 'mobile'
              ? 'grid-cols-2 md:grid-cols-4 max-w-3xl mx-auto'
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`}>
            {tabScreenshots[activeTab].map((src, idx) => (
              <div
                key={`${activeTab}-${idx}`}
                className={`relative rounded-2xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow duration-300 group ${
                  activeTab === 'mobile' ? 'aspect-[9/19.5]' : 'aspect-video'
                }`}
              >
                <Image
                  src={src}
                  alt={`${solution.title[locale]} ${tabLabels[activeTab][locale]} screenshot ${idx + 1}`}
                  fill
                  quality={90}
                  sizes={activeTab === 'mobile' ? '(max-width: 768px) 50vw, 25vw' : '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'}
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </section>

        {/* ─── FEATURES (Accordion in two columns) ─── */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            {t.solutions.features}
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Left column */}
            <div className="space-y-3">
              {leftFeatures.map((feature, idx) => {
                const globalIdx = idx;
                const isExpanded = expandedFeature === globalIdx;
                return (
                  <button
                    key={globalIdx}
                    onClick={() =>
                      setExpandedFeature(isExpanded ? null : globalIdx)
                    }
                    className={`w-full text-left p-4 rounded-xl border-l-4 ${
                      featureBorderColors[globalIdx % featureBorderColors.length]
                    } bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 hover:shadow-md ${
                      isExpanded ? 'shadow-md' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-sm font-bold">
                          {globalIdx + 1}
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white text-sm">
                          {feature}
                        </span>
                      </div>
                      <svg
                        className={`w-4 h-4 text-gray-400 transition-transform duration-300 flex-shrink-0 ml-2 ${
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
                    </div>
                    {isExpanded && (
                      <div className="mt-3 ml-11 text-sm text-gray-600 dark:text-gray-400">
                        <CheckCircleIcon className="w-4 h-4 inline mr-1 text-green-500" />
                        {solution.fullDescription[locale].slice(0, 120)}...
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right column */}
            <div className="space-y-3">
              {rightFeatures.map((feature, idx) => {
                const globalIdx = idx + leftFeatures.length;
                const isExpanded = expandedFeature === globalIdx;
                return (
                  <button
                    key={globalIdx}
                    onClick={() =>
                      setExpandedFeature(isExpanded ? null : globalIdx)
                    }
                    className={`w-full text-left p-4 rounded-xl border-l-4 ${
                      featureBorderColors[globalIdx % featureBorderColors.length]
                    } bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 hover:shadow-md ${
                      isExpanded ? 'shadow-md' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-sm font-bold">
                          {globalIdx + 1}
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white text-sm">
                          {feature}
                        </span>
                      </div>
                      <svg
                        className={`w-4 h-4 text-gray-400 transition-transform duration-300 flex-shrink-0 ml-2 ${
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
                    </div>
                    {isExpanded && (
                      <div className="mt-3 ml-11 text-sm text-gray-600 dark:text-gray-400">
                        <CheckCircleIcon className="w-4 h-4 inline mr-1 text-green-500" />
                        {solution.fullDescription[locale].slice(0, 120)}...
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── BENEFITS (Horizontal stacked cards) ─── */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            {t.solutions.benefits}
          </h2>

          <div className="space-y-4">
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-5 p-6 rounded-2xl bg-gradient-to-r ${
                  benefitGradients[idx % benefitGradients.length]
                } border-l-4 transition-all duration-300 hover:translate-x-1`}
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/80 dark:bg-gray-900/50 flex items-center justify-center shadow-sm">
                  <ArrowRightIcon className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ─── TECH STACK (Visual stack diagram) ─── */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            {t.solutions.technologies}
          </h2>

          <div className="max-w-2xl mx-auto space-y-3">
            {techStackLayers.map((layer, layerIdx) => {
              const techs = groupedTech[layerIdx];
              if (techs.length === 0) return null;
              return (
                <div
                  key={layer.label}
                  className="relative overflow-hidden rounded-2xl"
                >
                  {/* Layer background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${layer.color} opacity-10 dark:opacity-20`}
                  />
                  <div className="relative flex items-center justify-between px-6 py-4">
                    <span className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-24">
                      {layer.label}
                    </span>
                    <div className="flex flex-wrap gap-2 justify-end">
                      {techs.map((tech) => (
                        <Badge key={tech} variant="primary" size="md">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  {/* Connector line (not on last) */}
                  {layerIdx < techStackLayers.length - 1 && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-3 bg-gray-300 dark:bg-gray-600" />
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ─── PRICING CARD ─── */}
        {solution.pricing && (
          <section className="mb-20 flex justify-center">
            <div className="relative max-w-lg w-full">
              {/* Gradient border effect */}
              <div className="absolute -inset-[2px] bg-gradient-to-r from-amber-400 via-orange-500 to-indigo-500 rounded-3xl opacity-75 blur-sm" />
              <div className="absolute -inset-[2px] bg-gradient-to-r from-amber-400 via-orange-500 to-indigo-500 rounded-3xl" />

              <div className="relative bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-10 text-center">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {sectionLabels.pricing[locale]}
                </h3>
                <div className="w-12 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full mx-auto mb-6" />
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                  {solution.pricing[locale]}
                </p>
                <Button
                  href="https://talimx.uz"
                  variant="primary"
                  size="lg"
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg shadow-amber-500/25"
                >
                  {sectionLabels.startTrial[locale]}
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* ─── LINKS SECTION ─── */}
        <section className="mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              href="https://talimx.uz"
              variant="primary"
              size="lg"
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg shadow-amber-500/25"
            >
              {sectionLabels.visitTalimX[locale]}
              <ExternalLinkIcon className="w-5 h-5 ml-2" />
            </Button>

            <Button
              href="https://admin.talimx.uz/login"
              variant="outline"
              size="lg"
              className="border-amber-500 dark:border-amber-400 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20"
            >
              {sectionLabels.adminPanel[locale]}
              <ExternalLinkIcon className="w-5 h-5 ml-2" />
            </Button>

            <Button href="/contact" variant="secondary" size="lg">
              {sectionLabels.contactUs[locale]}
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { useLocale } from '@/hooks/useLocale';
import {
  ZapIcon,
  ShieldIcon,
  UsersIcon,
  TargetIcon,
  ArrowRightIcon,
} from '@/components/ui/Icons';
import {
  FadeIn,
  SlideInLeft,
  SlideInRight,
  StaggerContainer,
  StaggerItem,
  CountUp,
} from '@/components/ui/AnimatedSection';

const valueIcons = {
  innovation: ZapIcon,
  quality: ShieldIcon,
  transparency: UsersIcon,
  partnership: TargetIcon,
};

export function AboutPageClient() {
  const { t } = useLocale();

  const values = [
    { key: 'innovation', icon: valueIcons.innovation },
    { key: 'quality', icon: valueIcons.quality },
    { key: 'transparency', icon: valueIcons.transparency },
    { key: 'partnership', icon: valueIcons.partnership },
  ] as const;

  const stats = [
    { value: 5, suffix: '+', label: t.about.stats.years },
    { value: 50, suffix: '+', label: t.about.stats.projects },
    { value: 30, suffix: '+', label: t.about.stats.clients },
    { value: 15, suffix: '+', label: t.about.stats.technologies },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      {/* Background decorations */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-40 -left-40 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-40 -right-40 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Page Header */}
        <FadeIn>
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">
              {t.about.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              {t.about.subtitle}
            </p>
          </div>
        </FadeIn>

        {/* Stats Row */}
        <FadeIn delay={0.2}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="text-center p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50"
              >
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        <div className="space-y-16">
          {/* Mission Section */}
          <SlideInLeft>
            <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-500/10 to-pink-500/10 border border-indigo-500/20">
              <h2 className="text-2xl font-bold mb-4 gradient-text">
                {t.about.mission.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                {t.about.mission.text}
              </p>
            </div>
          </SlideInLeft>

          {/* Story Section */}
          <SlideInRight>
            <div>
              <h2 className="text-2xl font-bold mb-4 gradient-text">
                {t.about.story.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                {t.about.story.text}
              </p>
            </div>
          </SlideInRight>

          {/* Our Approach */}
          <FadeIn>
            <div>
              <h2 className="text-2xl font-bold mb-8 text-center gradient-text">
                {t.about.approach.title}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {t.about.approach.items.map((item: { title: string; desc: string }, i: number) => (
                  <div
                    key={i}
                    className="relative p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-pink-600 flex items-center justify-center text-white font-bold text-sm mb-4">
                      {i + 1}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Values */}
          <div>
            <FadeIn>
              <h2 className="text-2xl font-bold mb-8 text-center gradient-text">
                {t.about.values.title}
              </h2>
            </FadeIn>
            <StaggerContainer className="grid sm:grid-cols-2 gap-6">
              {values.map((value) => {
                const Icon = value.icon;
                const valueData = t.about.values[value.key];
                return (
                  <StaggerItem key={value.key}>
                    <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 card-hover">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-pink-500/20 flex items-center justify-center mb-4 text-indigo-600 dark:text-indigo-400">
                        <Icon className="w-7 h-7" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{valueData.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {valueData.desc}
                      </p>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>

          {/* Team */}
          <FadeIn>
            <div className="text-center p-8 rounded-3xl bg-gradient-to-br from-indigo-500/5 to-pink-500/5 border border-indigo-500/10">
              <h2 className="text-2xl font-bold mb-4 gradient-text">
                {t.about.team.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                {t.about.team.subtitle}
              </p>
            </div>
          </FadeIn>

          {/* CTA */}
          <FadeIn>
            <div className="text-center pt-8">
              <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg">
                {t.about.cta}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white font-medium rounded-full transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-0.5"
              >
                {t.common.contactUs}
                <ArrowRightIcon className="w-5 h-5" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}

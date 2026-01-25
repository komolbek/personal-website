'use client';

import { useLocale } from '@/hooks/useLocale';
import { companyStats } from '@/config/site';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { StatsCounter } from '@/components/ui/StatsCounter';
import { UsersIcon, CodeIcon, ZapIcon, ShieldIcon } from '@/components/ui/Icons';


export function WhyChooseUs() {
  const { t } = useLocale();

  const stats = [
    { value: companyStats.projects, label: t.home.whyUs.stats.projects, suffix: '+' },
    { value: companyStats.clients, label: t.home.whyUs.stats.clients, suffix: '+' },
    { value: companyStats.years, label: t.home.whyUs.stats.years, suffix: '+' },
    { value: companyStats.satisfaction, label: t.home.whyUs.stats.satisfaction, suffix: '%' },
  ];

  const features = [
    { key: 'expertise', icon: UsersIcon },
    { key: 'technology', icon: CodeIcon },
    { key: 'agile', icon: ZapIcon },
    { key: 'support', icon: ShieldIcon },
  ] as const;

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title={t.home.whyUs.title}
          subtitle={t.home.whyUs.subtitle}
        />

        {/* Stats */}
        <div className="mt-12 mb-16">
          <StatsCounter stats={stats} />
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            const featureData = t.home.whyUs.features[feature.key];
            return (
              <div
                key={feature.key}
                className="text-center p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-indigo-500/10 to-pink-500/10 flex items-center justify-center">
                  <IconComponent className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {featureData.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {featureData.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

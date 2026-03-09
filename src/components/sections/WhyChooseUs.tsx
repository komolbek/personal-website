'use client';

import { useLocale } from '@/hooks/useLocale';
import { companyStats } from '@/config/site';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { UsersIcon, CodeIcon, ZapIcon, ShieldIcon } from '@/components/ui/Icons';
import { FadeIn, StaggerContainer, StaggerItem, CountUp } from '@/components/ui/AnimatedSection';

export function WhyChooseUs() {
  const { t } = useLocale();

  const features = [
    { key: 'expertise', icon: UsersIcon },
    { key: 'technology', icon: CodeIcon },
    { key: 'agile', icon: ZapIcon },
    { key: 'support', icon: ShieldIcon },
  ] as const;

  const stats = companyStats;

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <SectionHeading
            title={t.home.whyUs.title}
            subtitle={t.home.whyUs.subtitle}
          />
        </FadeIn>

        {/* Stats Row */}
        <FadeIn delay={0.2}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 mb-12">
            {[
              { value: stats.projects, suffix: '+', label: t.home.whyUs.stats.projects },
              { value: stats.clients, suffix: '+', label: t.home.whyUs.stats.clients },
              { value: stats.years, suffix: '+', label: t.home.whyUs.stats.years },
              { value: stats.satisfaction, suffix: '%', label: t.home.whyUs.stats.satisfaction },
            ].map((stat, i) => (
              <div key={i} className="text-center p-4">
                <div className="text-3xl md:text-4xl font-bold gradient-text">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Features Grid */}
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            const featureData = t.home.whyUs.features[feature.key];
            return (
              <StaggerItem key={feature.key}>
                <div className="text-center p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 h-full">
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
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}

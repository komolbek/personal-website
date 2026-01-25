'use client';

import Link from 'next/link';
import { useLocale } from '@/hooks/useLocale';
import { StatCounter } from '@/components/ui/StatsCounter';
import {
  ZapIcon,
  ShieldIcon,
  UsersIcon,
  TargetIcon,
  ArrowRightIcon,
} from '@/components/ui/Icons';

interface StatData {
  key: string;
  value: number;
  suffix: string;
  label_en: string;
  label_ru: string;
  label_uz: string;
}

interface AboutPageClientProps {
  stats: StatData[];
}

const valueIcons = {
  innovation: ZapIcon,
  quality: ShieldIcon,
  transparency: UsersIcon,
  partnership: TargetIcon,
};

export function AboutPageClient({ stats }: AboutPageClientProps) {
  const { locale, t } = useLocale();

  const values = [
    { key: 'innovation', icon: valueIcons.innovation },
    { key: 'quality', icon: valueIcons.quality },
    { key: 'transparency', icon: valueIcons.transparency },
    { key: 'partnership', icon: valueIcons.partnership },
  ] as const;

  const getStatLabel = (stat: StatData) => {
    switch (locale) {
      case 'ru':
        return stat.label_ru;
      case 'uz':
        return stat.label_uz;
      default:
        return stat.label_en;
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      {/* Background decorations */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-40 -left-40 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-40 -right-40 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">
            {t.about.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            {t.about.subtitle}
          </p>
        </div>

        <div className="space-y-16">
          {/* Mission Section */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-500/10 to-pink-500/10 border border-indigo-500/20">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              {t.about.mission.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
              {t.about.mission.text}
            </p>
          </div>

          {/* Stats - Dynamic from database */}
          {stats.length > 0 && (
            <div className={`grid gap-6 ${stats.length <= 3 ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-2 sm:grid-cols-4'}`}>
              {stats.map((stat) => (
                <div
                  key={stat.key}
                  className="text-center p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 card-hover"
                >
                  <StatCounter
                    end={stat.value}
                    suffix={stat.suffix}
                    className="text-3xl font-bold gradient-text mb-1"
                  />
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {getStatLabel(stat)}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Story Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              {t.about.story.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
              {t.about.story.text}
            </p>
          </div>

          {/* Values */}
          <div>
            <h2 className="text-2xl font-bold mb-8 text-center gradient-text">
              {t.about.values.title}
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {values.map((value) => {
                const Icon = value.icon;
                const valueData = t.about.values[value.key];
                return (
                  <div
                    key={value.key}
                    className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 card-hover"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-pink-500/20 flex items-center justify-center mb-4 text-indigo-600 dark:text-indigo-400">
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{valueData.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {valueData.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA */}
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
        </div>
      </div>
    </div>
  );
}

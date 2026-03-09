'use client';

import { useLocale } from '@/hooks/useLocale';
import { siteConfig } from '@/config/site';
import { TelegramIcon } from '@/components/ui/Icons';
import { FadeIn, ScaleIn } from '@/components/ui/AnimatedSection';

export default function BlogPage() {
  const { t } = useLocale();

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      {/* Background decorations */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-40 right-20 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-20 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">
              {t.blog.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              {t.blog.subtitle}
            </p>
          </div>
        </FadeIn>

        <ScaleIn delay={0.2}>
          <div className="text-center p-12 md:p-16 rounded-3xl bg-gradient-to-br from-indigo-500/10 to-pink-500/10 border border-indigo-500/20">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-indigo-600 to-pink-600 flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>

            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              {t.blog.comingSoon}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 max-w-lg mx-auto">
              {t.blog.comingSoonDesc}
            </p>

            <a
              href={`https://t.me/${siteConfig.telegram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white font-medium rounded-full transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-0.5"
            >
              <TelegramIcon className="w-5 h-5" />
              {t.blog.followTelegram}
            </a>
          </div>
        </ScaleIn>
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from '@/hooks/useLocale';
import { App } from '@/types';
import { AppleIcon, PlayStoreIcon, ExternalLinkIcon } from '@/components/ui/Icons';

interface AppDetailProps {
  app: App;
}

export function AppDetail({ app }: AppDetailProps) {
  const { t, locale } = useLocale();

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      {/* Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-3xl opacity-30"
          style={{
            background: app.color
              ? `radial-gradient(circle, ${app.color}40 0%, transparent 70%)`
              : 'radial-gradient(circle, #6366f140 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <Link
          href="/apps"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors mb-8"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {t.apps.backToApps}
        </Link>

        {/* App Header */}
        <div className="flex flex-col sm:flex-row items-start gap-6 mb-12">
          {/* App Icon */}
          <div
            className="w-28 h-28 rounded-3xl shadow-2xl flex items-center justify-center overflow-hidden flex-shrink-0"
            style={{
              background: app.color
                ? `linear-gradient(135deg, ${app.color}20 0%, ${app.color}40 100%)`
                : 'linear-gradient(135deg, #6366f120 0%, #6366f140 100%)',
            }}
          >
            {app.icon ? (
              <Image
                src={app.icon}
                alt={app.name}
                width={112}
                height={112}
                className="w-full h-full object-cover"
              />
            ) : (
              <span
                className="text-5xl font-bold"
                style={{ color: app.color || '#6366f1' }}
              >
                {app.name[0]}
              </span>
            )}
          </div>

          {/* App Info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl sm:text-4xl font-bold">{app.name}</h1>
              {app.featured && (
                <span className="px-3 py-1 bg-amber-500 text-white text-xs font-medium rounded-full">
                  Featured
                </span>
              )}
            </div>
            <span
              className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-4"
              style={{
                backgroundColor: app.color ? `${app.color}15` : '#6366f115',
                color: app.color || '#6366f1',
              }}
            >
              {app.category}
            </span>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {app.description[locale]}
            </p>
          </div>
        </div>

        {/* Download Buttons */}
        <div className="flex flex-wrap gap-4 mb-12">
          {app.appStoreUrl && (
            <a
              href={app.appStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-4 bg-black text-white rounded-2xl hover:bg-gray-800 transition-all hover:scale-105 shadow-lg"
            >
              <AppleIcon className="w-8 h-8" />
              <div className="text-left">
                <div className="text-xs opacity-80">{t.apps.downloadOn}</div>
                <div className="font-semibold">{t.apps.appStore}</div>
              </div>
            </a>
          )}
          {app.playStoreUrl && (
            <a
              href={app.playStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl hover:from-green-600 hover:to-emerald-700 transition-all hover:scale-105 shadow-lg"
            >
              <PlayStoreIcon className="w-8 h-8" />
              <div className="text-left">
                <div className="text-xs opacity-80">{t.apps.downloadOn}</div>
                <div className="font-semibold">{t.apps.playStore}</div>
              </div>
            </a>
          )}
          {app.webUrl && (
            <a
              href={app.webUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-4 border-2 border-gray-200 dark:border-gray-700 rounded-2xl hover:border-indigo-500 transition-all hover:scale-105"
            >
              <ExternalLinkIcon className="w-6 h-6" />
              <div className="font-semibold">{t.apps.visitWeb}</div>
            </a>
          )}
        </div>

        {/* Long Description */}
        {app.longDescription && (
          <div className="mb-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              {app.longDescription[locale]}
            </p>
          </div>
        )}

        {/* Features */}
        {app.features && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 gradient-text">{t.apps.features}</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {app.features[locale].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50"
                >
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{
                      backgroundColor: app.color ? `${app.color}20` : '#6366f120',
                    }}
                  >
                    <svg
                      className="w-4 h-4"
                      style={{ color: app.color || '#6366f1' }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Screenshots */}
        {app.screenshots && app.screenshots.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6 gradient-text">Screenshots</h2>
            <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4">
              {app.screenshots.map((screenshot, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-64 h-[450px] rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-lg"
                >
                  <Image
                    src={screenshot}
                    alt={`${app.name} screenshot ${index + 1}`}
                    width={256}
                    height={450}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

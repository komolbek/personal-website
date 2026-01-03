'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from '@/hooks/useLocale';
import { apps } from '@/config/site';

export default function AppsPage() {
  const { t, locale } = useLocale();

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      {/* Background decorations */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">
            {t.apps.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            {t.apps.subtitle}
          </p>
        </div>

        {/* Apps Grid */}
        {apps.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {apps.map((app) => (
              <Link
                key={app.id}
                href={`/apps/${app.id}`}
                className="group block"
              >
                <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-3xl overflow-hidden card-hover border border-gray-200/50 dark:border-gray-700/50">
                  {/* App Header with gradient background */}
                  <div
                    className="h-32 relative flex items-center justify-center"
                    style={{
                      background: app.color
                        ? `linear-gradient(135deg, ${app.color}20 0%, ${app.color}40 100%)`
                        : 'linear-gradient(135deg, #6366f120 0%, #6366f140 100%)',
                    }}
                  >
                    {/* App Icon */}
                    <div className="w-20 h-20 rounded-2xl bg-white dark:bg-gray-800 shadow-xl flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-300">
                      {app.icon ? (
                        <Image
                          src={app.icon}
                          alt={app.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span
                          className="text-3xl font-bold"
                          style={{ color: app.color || '#6366f1' }}
                        >
                          {app.name[0]}
                        </span>
                      )}
                    </div>

                    {/* Featured badge */}
                    {app.featured && (
                      <div className="absolute top-4 right-4 px-3 py-1 bg-amber-500 text-white text-xs font-medium rounded-full">
                        Featured
                      </div>
                    )}
                  </div>

                  {/* App Info */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {app.name}
                      </h3>
                      <span className="text-xs px-2 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                        {app.category}
                      </span>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4">
                      {app.description[locale]}
                    </p>

                    {/* View button */}
                    <div className="flex items-center text-indigo-600 dark:text-indigo-400 text-sm font-medium">
                      <span>View Details</span>
                      <svg
                        className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-indigo-500/10 flex items-center justify-center">
              <svg className="w-12 h-12 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-xl">
              {t.apps.noApps}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

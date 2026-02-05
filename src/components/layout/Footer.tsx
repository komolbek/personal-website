'use client';

import Link from 'next/link';
import { useLocale } from '@/hooks/useLocale';
import { siteConfig } from '@/config/site';
import { solutions } from '@/config/solutions';
import { HeartIcon } from '@/components/ui/Icons';

export function Footer() {
  const { locale, t } = useLocale();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-indigo-500/10 bg-[var(--background)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="text-xl font-bold gradient-text">
              {siteConfig.name}
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 leading-relaxed">
              {t.footer.description}
            </p>
          </div>

          {/* Products Links */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              {t.footer.services}
            </h3>
            <ul className="space-y-2">
              {solutions.map((solution) => (
                <li key={solution.slug}>
                  <Link
                    href={`/solutions/${solution.slug}`}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    {solution.title[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              {t.footer.company}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  {t.nav.projects}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              {t.footer.legal}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/legal/privacy"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  {t.footer.privacy}
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/terms"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  {t.footer.terms}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-indigo-500/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {currentYear} {siteConfig.name}. {t.footer.rights}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
            {t.footer.madeWith}
            <HeartIcon className="w-4 h-4 text-pink-500 mx-1" />
            in Uzbekistan
          </p>
        </div>
      </div>
    </footer>
  );
}

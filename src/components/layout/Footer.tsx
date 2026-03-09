'use client';

import Link from 'next/link';
import { useLocale } from '@/hooks/useLocale';
import { siteConfig } from '@/config/site';
import { solutions } from '@/config/solutions';
import { TelegramIcon, InstagramIcon, MailIcon, PhoneIcon } from '@/components/ui/Icons';

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
            <p className="text-sm text-gray-500 mt-3 leading-relaxed">
              {t.footer.aboutBlurb}
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-4">
              <a
                href={`https://t.me/${siteConfig.telegram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-600 hover:bg-indigo-500/20 transition-colors"
                aria-label="Telegram"
              >
                <TelegramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/necto__uz/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-600 hover:bg-indigo-500/20 transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="w-9 h-9 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-600 hover:bg-indigo-500/20 transition-colors"
                aria-label="Email"
              >
                <MailIcon className="w-4 h-4" />
              </a>
              <a
                href={`tel:${siteConfig.phone}`}
                className="w-9 h-9 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-600 hover:bg-indigo-500/20 transition-colors"
                aria-label="Phone"
              >
                <PhoneIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Products Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">
              {t.footer.services}
            </h3>
            <ul className="space-y-2">
              {solutions.map((solution) => (
                <li key={solution.slug}>
                  <Link
                    href={`/solutions/${solution.slug}`}
                    className="text-sm text-gray-600 hover:text-indigo-600 transition-colors"
                  >
                    {solution.title[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">
              {t.footer.company}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/services"
                  className="text-sm text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  {t.nav.services}
                </Link>
              </li>
              <li>
                <Link
                  href="/portfolio"
                  className="text-sm text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  {t.nav.portfolio}
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  {t.footer.blog}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">
              {t.footer.contact}
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="text-sm text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-sm text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://t.me/${siteConfig.telegram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  @{siteConfig.telegram}
                </a>
              </li>
              <li className="pt-2">
                <Link
                  href="/legal/privacy"
                  className="text-xs text-gray-500 hover:text-indigo-600 transition-colors"
                >
                  {t.footer.privacy}
                </Link>
                <span className="text-xs text-gray-400 mx-2">|</span>
                <Link
                  href="/legal/terms"
                  className="text-xs text-gray-500 hover:text-indigo-600 transition-colors"
                >
                  {t.footer.terms}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-indigo-500/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} {siteConfig.name}. {t.footer.rights}
          </p>
          <p className="text-sm text-gray-500">
            {t.footer.createdBy}
          </p>
        </div>
      </div>
    </footer>
  );
}

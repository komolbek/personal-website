'use client';

import Link from 'next/link';
import { useLocale } from '@/hooks/useLocale';
import { socialLinks } from '@/config/site';
import { GithubIcon, LinkedInIcon, InstagramIcon, TelegramIcon, HeartIcon } from '@/components/ui/Icons';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  github: GithubIcon,
  linkedin: LinkedInIcon,
  instagram: InstagramIcon,
  telegram: TelegramIcon,
};

export function Footer() {
  const { t } = useLocale();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-indigo-500/10 bg-[var(--background)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Logo and tagline */}
          <div>
            <Link href="/" className="text-2xl font-bold gradient-text">
              KI
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Mobile App Developer
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex justify-center gap-6">
            <Link href="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              {t.nav.home}
            </Link>
            <Link href="/apps" className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              {t.nav.apps}
            </Link>
            <Link href="/about" className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              {t.nav.about}
            </Link>
            <Link href="/contact" className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              {t.nav.contact}
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex justify-end items-center gap-3">
            {socialLinks.map((link) => {
              const Icon = iconMap[link.icon];
              return Icon ? (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-indigo-500/10 hover:bg-indigo-500/20 flex items-center justify-center transition-all hover:scale-110"
                  aria-label={link.platform}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ) : null;
            })}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-8 border-t border-indigo-500/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {currentYear} Komolbek Ibragimov. {t.footer.rights}
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

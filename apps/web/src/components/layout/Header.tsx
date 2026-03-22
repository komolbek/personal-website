'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from '@/hooks/useLocale';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { MenuIcon, CloseIcon } from '@/components/ui/Icons';
import { siteConfig } from '@/config/site';

const navItems = [
  { key: 'home', href: '/' },
  { key: 'services', href: '/services' },
  { key: 'portfolio', href: '/portfolio' },
  { key: 'blog', href: '/blog' },
  { key: 'contact', href: '/contact' },
] as const;

export function Header() {
  const { t } = useLocale();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href === '/portfolio') {
      return pathname.startsWith('/portfolio') ||
        pathname.startsWith('/solutions') ||
        pathname.startsWith('/projects');
    }
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMenuOpen
          ? 'bg-[var(--background)] backdrop-blur-md shadow-lg shadow-indigo-500/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="font-bold text-lg sm:text-xl gradient-text hover:opacity-80 transition-opacity flex-shrink-0"
          >
            {siteConfig.name}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                aria-current={isActive(item.href) ? 'page' : undefined}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive(item.href)
                    ? 'bg-indigo-500/10 text-indigo-600'
                    : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-500/5'
                }`}
              >
                {t.nav[item.key]}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-1 sm:gap-4">
            {/* Desktop CTA */}
            <Link
              href="/contact"
              className="hidden lg:inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white text-sm font-medium rounded-full transition-all duration-300 shadow-md shadow-indigo-500/25 hover:shadow-lg hover:shadow-indigo-500/30"
            >
              {t.common.contactUs}
            </Link>

            <LanguageSwitcher />

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-indigo-500/10 transition-colors flex-shrink-0"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <CloseIcon className="w-6 h-6" />
              ) : (
                <MenuIcon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="lg:hidden overflow-hidden border-t border-indigo-500/10"
              aria-label="Mobile navigation"
            >
              <div className="py-4 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    className={`block py-3 px-4 rounded-lg transition-colors text-base ${
                      isActive(item.href)
                        ? 'bg-indigo-500/10 text-indigo-600 font-medium'
                        : 'text-gray-600 hover:bg-indigo-500/5'
                    }`}
                  >
                    {t.nav[item.key]}
                  </Link>
                ))}
                {/* Mobile CTA */}
                <Link
                  href="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="block mt-3 mx-4 py-3 text-center bg-gradient-to-r from-indigo-600 to-pink-600 text-white text-sm font-medium rounded-full shadow-md"
                >
                  {t.common.contactUs}
                </Link>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

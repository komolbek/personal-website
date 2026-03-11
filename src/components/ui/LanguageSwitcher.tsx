'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale } from '@/hooks/useLocale';
import { Locale } from '@/types';
import { siteConfig } from '@/config/site';
import { GlobeIcon, ChevronDownIcon } from './Icons';

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (newLocale: Locale) => {
    setLocale(newLocale);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <GlobeIcon className="w-5 h-5 flex-shrink-0" />
        <span className="hidden sm:inline text-sm">{t.language[locale]}</span>
        <ChevronDownIcon className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 py-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          {siteConfig.locales.map((loc) => (
            <button
              key={loc}
              onClick={() => handleSelect(loc)}
              className={`w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors ${
                locale === loc ? 'text-blue-600 font-medium' : ''
              }`}
            >
              {t.language[loc]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

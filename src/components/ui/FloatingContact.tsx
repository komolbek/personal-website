'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/config/site';
import { TelegramIcon, PhoneIcon } from '@/components/ui/Icons';

export function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Contact form link */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ duration: 0.2, delay: 0.1 }}
            >
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-full shadow-lg shadow-gray-200/50 border border-gray-100 text-gray-700 hover:text-indigo-600 hover:border-indigo-200 transition-colors text-sm font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="hidden sm:inline">Contact</span>
              </Link>
            </motion.div>

            {/* Phone */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ duration: 0.2, delay: 0.05 }}
            >
              <a
                href={`tel:${siteConfig.phone}`}
                className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-full shadow-lg shadow-gray-200/50 border border-gray-100 text-gray-700 hover:text-indigo-600 hover:border-indigo-200 transition-colors text-sm font-medium"
              >
                <PhoneIcon className="w-4 h-4" />
                <span className="hidden sm:inline">{siteConfig.phone}</span>
              </a>
            </motion.div>

            {/* Telegram */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <a
                href={`https://t.me/${siteConfig.telegram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-full shadow-lg shadow-gray-200/50 border border-gray-100 text-gray-700 hover:text-blue-500 hover:border-blue-200 transition-colors text-sm font-medium"
              >
                <TelegramIcon className="w-4 h-4" />
                <span className="hidden sm:inline">Telegram</span>
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main FAB button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 bg-gradient-to-r from-indigo-600 to-pink-600 rounded-full shadow-lg shadow-indigo-500/30 flex items-center justify-center text-white transition-transform"
        aria-label="Contact options"
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          )}
        </motion.div>
      </motion.button>
    </div>
  );
}

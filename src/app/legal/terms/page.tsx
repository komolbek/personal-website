'use client';

import Link from 'next/link';
import { useLocale } from '@/hooks/useLocale';
import { siteConfig } from '@/config/site';

export default function TermsPage() {
  const { t } = useLocale();

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-8 transition-colors"
        >
          ← {t.common.backToHome}
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          <span className="gradient-text">{t.legal.terms.title}</span>
        </h1>

        <p className="text-gray-500 dark:text-gray-400 mb-8">
          {t.legal.terms.lastUpdated}: January 2025
        </p>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Agreement to Terms
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              By accessing or using the services provided by {siteConfig.name}, you agree to be bound
              by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Services
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {siteConfig.name} provides software development services including but not limited to:
              business automation, custom CRM development, website development, e-commerce solutions,
              mobile application development, and AI integration services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Intellectual Property
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              All content, features, and functionality on our website are owned by {siteConfig.name}
              and are protected by international copyright, trademark, and other intellectual property laws.
              Upon full payment, clients receive ownership of custom-developed solutions as specified in
              individual project agreements.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Project Agreements
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Individual projects are governed by separate project agreements that specify:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
              <li>Scope of work and deliverables</li>
              <li>Timeline and milestones</li>
              <li>Payment terms and conditions</li>
              <li>Intellectual property rights</li>
              <li>Confidentiality requirements</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Limitation of Liability
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {siteConfig.name} shall not be liable for any indirect, incidental, special, consequential,
              or punitive damages resulting from your use of our services. Our total liability shall not
              exceed the amount paid for the specific services in question.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Confidentiality
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              We treat all client information and project details as confidential. We will not disclose
              any confidential information to third parties without your explicit consent, except as
              required by law.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Modifications
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              We reserve the right to modify these Terms of Service at any time. Changes will be
              effective immediately upon posting to our website. Your continued use of our services
              after any modifications indicates your acceptance of the updated terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Governing Law
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              These Terms of Service shall be governed by and construed in accordance with the laws
              of Uzbekistan, without regard to its conflict of law provisions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Contact Us
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              If you have any questions about these Terms of Service, please contact us at:{' '}
              <a href={`mailto:${siteConfig.email}`} className="text-indigo-600 dark:text-indigo-400 hover:underline">
                {siteConfig.email}
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

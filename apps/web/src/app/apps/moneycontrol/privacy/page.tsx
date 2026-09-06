'use client';

import Link from 'next/link';

export default function MoneyControlPrivacyPage() {
  return (
    <div className="min-h-screen pt-10 pb-16 px-4">
      {/* Background decorations */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Back link */}
        <Link
          href="/apps/moneycontrol"
          className="inline-flex items-center text-emerald-600 hover:underline mb-8"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Money Control
        </Link>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4 text-ink">
            Privacy Policy
          </h1>
          <p className="text-ink-muted">
            Money Control App - Last updated: January 2025
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div className="bg-paper backdrop-blur-sm rounded-2xl p-8 border border-line">

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-ink">
                Introduction
              </h2>
              <p className="text-ink-muted mb-4">
                Money Control (&quot;we&quot;, &quot;our&quot;, or &quot;the app&quot;) is committed to protecting your privacy.
                This Privacy Policy explains how we handle your information when you use our iOS application.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-ink">
                Data Collection and Storage
              </h2>
              <p className="text-ink-muted mb-4">
                <strong className="text-ink">Money Control stores all your data locally on your device.</strong>
                We do not collect, transmit, or store any of your personal data on external servers.
              </p>
              <p className="text-ink-muted mb-4">
                The app stores the following information locally on your device:
              </p>
              <ul className="list-disc list-inside text-ink-muted space-y-2">
                <li>Debt records (amounts, names, notes, dates)</li>
                <li>App preferences and settings</li>
                <li>Subscription status (managed by Apple)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-ink">
                Third-Party Services
              </h2>
              <p className="text-ink-muted mb-4">
                The app uses the following third-party services:
              </p>
              <ul className="list-disc list-inside text-ink-muted space-y-2">
                <li>
                  <strong className="text-ink">Apple StoreKit:</strong> For processing in-app purchases and subscriptions.
                  Purchase data is handled by Apple according to their privacy policy.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-ink">
                Data Security
              </h2>
              <p className="text-ink-muted">
                Your data remains on your device and is protected by your device&apos;s security features
                (passcode, Face ID, Touch ID). We do not have access to your data.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-ink">
                Data Deletion
              </h2>
              <p className="text-ink-muted">
                You can delete all your data at any time by uninstalling the app from your device.
                Since all data is stored locally, uninstalling the app will permanently remove all your information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-ink">
                Children&apos;s Privacy
              </h2>
              <p className="text-ink-muted">
                Our app does not knowingly collect information from children under 13.
                The app is designed for general audiences.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-ink">
                Changes to This Policy
              </h2>
              <p className="text-ink-muted">
                We may update this Privacy Policy from time to time. We will notify you of any changes
                by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-ink">
                Contact Us
              </h2>
              <p className="text-ink-muted">
                If you have any questions about this Privacy Policy, please contact us at:{' '}
                <a
                  href="mailto:kamol.developer@gmail.com"
                  className="text-emerald-600 hover:underline"
                >
                  kamol.developer@gmail.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

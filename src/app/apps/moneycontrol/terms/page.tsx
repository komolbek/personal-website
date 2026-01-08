'use client';

import Link from 'next/link';

export default function MoneyControlTermsPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      {/* Background decorations */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Back link */}
        <Link
          href="/apps/moneycontrol"
          className="inline-flex items-center text-emerald-600 dark:text-emerald-400 hover:underline mb-8"
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
          <h1 className="text-4xl font-bold mb-4 gradient-text">
            Terms of Use
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Money Control App - Last updated: January 2025
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50">

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                Agreement to Terms
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                By downloading, installing, or using Money Control (&quot;the App&quot;), you agree to be bound by these
                Terms of Use. If you do not agree to these terms, please do not use the App.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                Description of Service
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Money Control is a personal debt tracking application that helps you manage debts you owe
                and debts owed to you. The App allows you to record, track, and manage payments with
                multi-currency support. The App offers both free and premium subscription tiers.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                Subscriptions and Payments
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Money Control offers auto-renewable subscriptions to unlock premium features:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 mb-4">
                <li><strong className="text-gray-900 dark:text-white">Monthly Premium:</strong> Billed monthly</li>
                <li><strong className="text-gray-900 dark:text-white">Yearly Premium:</strong> Billed annually</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                <strong className="text-gray-900 dark:text-white">Auto-Renewal:</strong> Your subscription will automatically
                renew unless auto-renew is turned off at least 24 hours before the end of the current billing period.
                Your account will be charged for renewal within 24 hours prior to the end of the current period.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                <strong className="text-gray-900 dark:text-white">Managing Subscriptions:</strong> You can manage or cancel
                your subscription at any time through your Apple ID account settings. Go to Settings &gt; [Your Name] &gt;
                Subscriptions on your iOS device.
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                <strong className="text-gray-900 dark:text-white">Payment:</strong> Payment will be charged to your Apple ID
                account at confirmation of purchase. All payments are processed by Apple and subject to Apple&apos;s terms and conditions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                Free Trial
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                If a free trial is offered, any unused portion of the free trial period will be forfeited when you
                purchase a subscription. Free trial eligibility is determined by Apple and may be limited to one
                trial per Apple ID.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                User Conduct
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                You agree to use the App only for lawful purposes. You agree not to:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
                <li>Attempt to reverse engineer, decompile, or disassemble the App</li>
                <li>Use the App for any fraudulent or illegal purposes</li>
                <li>Interfere with or disrupt the App&apos;s services or servers</li>
                <li>Violate any applicable laws or regulations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                Intellectual Property
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                The App, including its design, features, and content, is owned by Komolbek Ibragimov and is protected
                by copyright and other intellectual property laws. You are granted a limited, non-exclusive,
                non-transferable license to use the App for personal, non-commercial purposes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                Your Data
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                You retain ownership of any debt records, payment history, and other content you create using
                the App. All your data is stored locally on your device. We do not collect, transmit, or store
                your personal financial data on external servers.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                Disclaimer of Warranties
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                The App is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, either express or
                implied. We do not guarantee that the App will be error-free, uninterrupted, or free from viruses
                or other harmful components. The App is a personal tracking tool and should not be relied upon
                as the sole record for financial or legal matters.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                Limitation of Liability
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                To the maximum extent permitted by law, we shall not be liable for any indirect, incidental,
                special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred
                directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting
                from your use of the App.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                Termination
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                We reserve the right to terminate or suspend your access to the App at any time, without prior
                notice, for conduct that we believe violates these Terms of Use or is harmful to other users,
                us, or third parties, or for any other reason at our sole discretion.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                Changes to Terms
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                We may modify these Terms of Use at any time. We will notify you of any material changes by
                posting the new Terms on this page and updating the &quot;Last updated&quot; date. Your continued use
                of the App after such changes constitutes your acceptance of the new Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                Governing Law
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                These Terms of Use shall be governed by and construed in accordance with applicable laws,
                without regard to conflict of law principles.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                Contact Us
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                If you have any questions about these Terms of Use, please contact us at:{' '}
                <a
                  href="mailto:kamol.developer@gmail.com"
                  className="text-emerald-600 dark:text-emerald-400 hover:underline"
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

'use client';

import Link from 'next/link';

export default function MemoMindTermsPage() {
  return (
    <div className="min-h-screen pt-10 pb-16 px-4">
      {/* Background decorations */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Back link */}
        <Link
          href="/apps/memomind"
          className="inline-flex items-center text-blue-600 hover:underline mb-8"
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
          Back to MemoMind
        </Link>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4 text-ink">
            Terms of Use
          </h1>
          <p className="text-ink-muted">
            MemoMind App - Last updated: January 2025
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div className="bg-paper backdrop-blur-sm rounded-2xl p-8 border border-line">

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-ink">
                Agreement to Terms
              </h2>
              <p className="text-ink-muted mb-4">
                By downloading, installing, or using MemoMind (&quot;the App&quot;), you agree to be bound by these
                Terms of Use. If you do not agree to these terms, please do not use the App.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-ink">
                Description of Service
              </h2>
              <p className="text-ink-muted mb-4">
                MemoMind is a voice memo application that allows you to record audio, transcribe it using
                speech recognition, and generate AI-powered summaries, key points, and action items.
                The App offers both free and premium subscription tiers.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-ink">
                Subscriptions and Payments
              </h2>
              <p className="text-ink-muted mb-4">
                MemoMind offers auto-renewable subscriptions to unlock premium features:
              </p>
              <ul className="list-disc list-inside text-ink-muted space-y-2 mb-4">
                <li><strong className="text-ink">Monthly Premium:</strong> Billed monthly</li>
                <li><strong className="text-ink">Yearly Premium:</strong> Billed annually</li>
              </ul>
              <p className="text-ink-muted mb-4">
                <strong className="text-ink">Auto-Renewal:</strong> Your subscription will automatically
                renew unless auto-renew is turned off at least 24 hours before the end of the current billing period.
                Your account will be charged for renewal within 24 hours prior to the end of the current period.
              </p>
              <p className="text-ink-muted mb-4">
                <strong className="text-ink">Managing Subscriptions:</strong> You can manage or cancel
                your subscription at any time through your Apple ID account settings. Go to Settings &gt; [Your Name] &gt;
                Subscriptions on your iOS device.
              </p>
              <p className="text-ink-muted">
                <strong className="text-ink">Payment:</strong> Payment will be charged to your Apple ID
                account at confirmation of purchase. All payments are processed by Apple and subject to Apple&apos;s terms and conditions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-ink">
                Free Trial
              </h2>
              <p className="text-ink-muted">
                If a free trial is offered, any unused portion of the free trial period will be forfeited when you
                purchase a subscription. Free trial eligibility is determined by Apple and may be limited to one
                trial per Apple ID.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-ink">
                User Conduct
              </h2>
              <p className="text-ink-muted mb-4">
                You agree to use the App only for lawful purposes. You agree not to:
              </p>
              <ul className="list-disc list-inside text-ink-muted space-y-2">
                <li>Use the App to record conversations without proper consent where required by law</li>
                <li>Attempt to reverse engineer, decompile, or disassemble the App</li>
                <li>Use the App to transmit harmful, illegal, or offensive content</li>
                <li>Interfere with or disrupt the App&apos;s services or servers</li>
                <li>Violate any applicable laws or regulations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-ink">
                Intellectual Property
              </h2>
              <p className="text-ink-muted">
                The App, including its design, features, and content, is owned by Necto Automations and is protected
                by copyright and other intellectual property laws. You are granted a limited, non-exclusive,
                non-transferable license to use the App for personal, non-commercial purposes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-ink">
                Your Content
              </h2>
              <p className="text-ink-muted">
                You retain ownership of any voice recordings, transcriptions, and other content you create using
                the App. Your content is stored locally on your device. When content is sent to our servers for
                AI processing, it is used solely for that purpose and is not retained after processing.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-ink">
                Disclaimer of Warranties
              </h2>
              <p className="text-ink-muted">
                The App is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, either express or
                implied. We do not guarantee that the App will be error-free, uninterrupted, or free from viruses
                or other harmful components. AI-generated summaries and transcriptions may contain errors and
                should not be relied upon for critical decisions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-ink">
                Limitation of Liability
              </h2>
              <p className="text-ink-muted">
                To the maximum extent permitted by law, we shall not be liable for any indirect, incidental,
                special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred
                directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting
                from your use of the App.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-ink">
                Termination
              </h2>
              <p className="text-ink-muted">
                We reserve the right to terminate or suspend your access to the App at any time, without prior
                notice, for conduct that we believe violates these Terms of Use or is harmful to other users,
                us, or third parties, or for any other reason at our sole discretion.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-ink">
                Changes to Terms
              </h2>
              <p className="text-ink-muted">
                We may modify these Terms of Use at any time. We will notify you of any material changes by
                posting the new Terms on this page and updating the &quot;Last updated&quot; date. Your continued use
                of the App after such changes constitutes your acceptance of the new Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-ink">
                Governing Law
              </h2>
              <p className="text-ink-muted">
                These Terms of Use shall be governed by and construed in accordance with applicable laws,
                without regard to conflict of law principles.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-ink">
                Contact Us
              </h2>
              <p className="text-ink-muted">
                If you have any questions about these Terms of Use, please contact us at:{' '}
                <a
                  href="mailto:kamol.developer@gmail.com"
                  className="text-blue-600 hover:underline"
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

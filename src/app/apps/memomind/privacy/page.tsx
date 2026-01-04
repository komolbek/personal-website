'use client';

import Link from 'next/link';

export default function MemoMindPrivacyPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      {/* Background decorations */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Back link */}
        <Link
          href="/apps/memomind"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-8"
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
          <h1 className="text-4xl font-bold mb-4 gradient-text">
            Privacy Policy
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            MemoMind App - Last updated: January 2025
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50">

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                Introduction
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                MemoMind (&quot;we&quot;, &quot;our&quot;, or &quot;the app&quot;) is committed to protecting your privacy.
                This Privacy Policy explains how we handle your information when you use our iOS application
                for voice memo recording and AI-powered summarization.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                Data Collection and Storage
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                <strong className="text-gray-900 dark:text-white">MemoMind stores most of your data locally on your device.</strong>
                Your voice recordings, transcriptions, and memos are stored on your device and are not uploaded to our servers
                for storage purposes.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                The app stores the following information locally on your device:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
                <li>Voice memo recordings (audio files)</li>
                <li>Transcribed text from your recordings</li>
                <li>AI-generated summaries, key points, and action items</li>
                <li>Tags and organizational data</li>
                <li>App preferences and settings</li>
                <li>Subscription status (managed by Apple)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                AI Processing
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                To provide AI-powered summarization features, your transcribed text is sent to our secure backend
                server for processing. This data is:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
                <li>Transmitted securely using HTTPS encryption</li>
                <li>Processed only to generate summaries, key points, and action items</li>
                <li>Not stored on our servers after processing is complete</li>
                <li>Not used to train AI models or for any other purpose</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-400 mt-4">
                We use third-party AI services (Groq) to process your transcripts. These services process your
                data according to their respective privacy policies but do not retain your data after processing.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                Speech Recognition
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                MemoMind uses Apple&apos;s on-device speech recognition for transcription. This processing
                happens entirely on your device and your audio is not sent to Apple&apos;s servers when
                on-device recognition is available.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                Third-Party Services
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                The app uses the following third-party services:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
                <li>
                  <strong className="text-gray-900 dark:text-white">Apple Speech Recognition:</strong> For on-device
                  transcription of your voice recordings.
                </li>
                <li>
                  <strong className="text-gray-900 dark:text-white">Groq AI:</strong> For processing transcripts
                  and generating summaries. Data is not retained after processing.
                </li>
                <li>
                  <strong className="text-gray-900 dark:text-white">Apple StoreKit:</strong> For processing in-app
                  purchases and subscriptions. Purchase data is handled by Apple according to their privacy policy.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                Data Security
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Your locally stored data is protected by your device&apos;s security features
                (passcode, Face ID, Touch ID). All data transmitted to our servers for AI processing
                is encrypted using industry-standard HTTPS encryption. We do not have access to your
                stored memos or recordings.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                Microphone Permission
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                MemoMind requires microphone access to record voice memos. This permission is only used
                when you actively choose to record a memo. We do not access your microphone in the background
                or for any other purpose.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                Data Deletion
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                You can delete individual memos at any time within the app. To delete all your data,
                uninstall the app from your device. Since most data is stored locally, uninstalling
                the app will permanently remove all your recordings, transcripts, and memos.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                Children&apos;s Privacy
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Our app does not knowingly collect information from children under 13.
                The app is designed for general audiences.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                Changes to This Policy
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                We may update this Privacy Policy from time to time. We will notify you of any changes
                by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                Contact Us
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                If you have any questions about this Privacy Policy, please contact us at:{' '}
                <a
                  href="mailto:kamol.developer@gmail.com"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
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

import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  const session = await getSession();

  if (!session) {
    redirect('/admin/login');
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Configure your website settings
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Admin Account
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-500 dark:text-gray-400">Email</label>
            <p className="text-gray-900 dark:text-white">{session.email}</p>
          </div>
          <div>
            <label className="block text-sm text-gray-500 dark:text-gray-400">Name</label>
            <p className="text-gray-900 dark:text-white">{session.name}</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mt-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Database Information
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          This website uses PostgreSQL database for storing dynamic content.
          Make sure your DATABASE_URL environment variable is properly configured.
        </p>
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <code className="text-sm text-gray-600 dark:text-gray-300">
            DATABASE_URL=postgresql://user:password@host:5432/database
          </code>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mt-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Quick Links
        </h2>
        <div className="flex flex-wrap gap-4">
          <a
            href="/"
            target="_blank"
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            View Website →
          </a>
          <a
            href="/contact"
            target="_blank"
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Contact Page →
          </a>
        </div>
      </div>
    </div>
  );
}

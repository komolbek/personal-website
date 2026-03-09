import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import bcrypt from 'bcryptjs';

export const dynamic = 'force-dynamic';

async function updateProfile(formData: FormData) {
  'use server';

  const session = await getSession();
  if (!session) return;

  const name = formData.get('name') as string;
  const email = formData.get('email') as string;

  await prisma.adminUser.update({
    where: { email: session.email },
    data: { name, email },
  });

  revalidatePath('/admin/settings');
  redirect('/admin/settings?success=profile_updated');
}

async function changePassword(formData: FormData) {
  'use server';

  const session = await getSession();
  if (!session) return;

  const currentPassword = formData.get('currentPassword') as string;
  const newPassword = formData.get('newPassword') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  if (newPassword !== confirmPassword) {
    redirect('/admin/settings?error=passwords_dont_match');
  }

  const user = await prisma.adminUser.findUnique({
    where: { email: session.email },
  });

  if (!user) {
    redirect('/admin/settings?error=user_not_found');
  }

  const isValid = await bcrypt.compare(currentPassword, user.password);

  if (!isValid) {
    redirect('/admin/settings?error=invalid_password');
  }

  const hashedPassword = await bcrypt.hash(newPassword, 12);

  await prisma.adminUser.update({
    where: { email: session.email },
    data: { password: hashedPassword },
  });

  redirect('/admin/settings?success=password_changed');
}

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; success?: string }>;
}) {
  const session = await getSession();

  if (!session) {
    redirect('/admin/login');
  }

  const { error, success } = await searchParams;

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

      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-sm text-red-700 dark:text-red-400">
            {error === 'invalid_password' && 'Current password is incorrect.'}
            {error === 'passwords_dont_match' && 'New passwords do not match.'}
            {error === 'user_not_found' && 'User not found.'}
          </p>
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <p className="text-sm text-green-700 dark:text-green-400">
            {success === 'profile_updated' && 'Profile updated successfully.'}
            {success === 'password_changed' && 'Password changed successfully.'}
          </p>
        </div>
      )}

      {/* Profile Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Profile
        </h2>
        <form action={updateProfile} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              required
              defaultValue={session.name}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              defaultValue={session.email}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>

      {/* Password Change Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mt-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Change Password
        </h2>
        <form action={changePassword} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Current Password
            </label>
            <input
              type="password"
              name="currentPassword"
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
            >
              Change Password
            </button>
          </div>
        </form>
      </div>

      {/* Quick Links */}
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

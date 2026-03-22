import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import bcrypt from 'bcryptjs';

export const dynamic = 'force-dynamic';

async function getAllSettings(): Promise<Record<string, string>> {
  try {
    const settings = await prisma.siteSetting.findMany();
    const result: Record<string, string> = {};
    for (const s of settings) {
      result[s.key] = s.value;
    }
    return result;
  } catch {
    return {};
  }
}

async function saveSettings(formData: FormData) {
  'use server';

  const session = await getSession();
  if (!session) return;

  const entries = Array.from(formData.entries());
  for (const [key, value] of entries) {
    if (key.startsWith('setting_')) {
      const settingKey = key.replace('setting_', '');
      const val = value as string;
      await prisma.siteSetting.upsert({
        where: { key: settingKey },
        create: { key: settingKey, value: val },
        update: { value: val },
      });
    }
  }

  revalidatePath('/');
  revalidatePath('/contact');
  revalidatePath('/settings');
  redirect('/settings?success=settings_saved');
}

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

  revalidatePath('/settings');
  redirect('/settings?success=profile_updated');
}

async function changePassword(formData: FormData) {
  'use server';

  const session = await getSession();
  if (!session) return;

  const currentPassword = formData.get('currentPassword') as string;
  const newPassword = formData.get('newPassword') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  if (newPassword !== confirmPassword) {
    redirect('/settings?error=passwords_dont_match');
  }

  const user = await prisma.adminUser.findUnique({
    where: { email: session.email },
  });

  if (!user) {
    redirect('/settings?error=user_not_found');
  }

  const isValid = await bcrypt.compare(currentPassword, user.password);

  if (!isValid) {
    redirect('/settings?error=invalid_password');
  }

  const hashedPassword = await bcrypt.hash(newPassword, 12);

  await prisma.adminUser.update({
    where: { email: session.email },
    data: { password: hashedPassword },
  });

  redirect('/settings?success=password_changed');
}

function SettingField({ label, settingKey, value, type = 'text', placeholder }: {
  label: string;
  settingKey: string;
  value: string;
  type?: 'text' | 'textarea';
  placeholder?: string;
}) {
  const cls = 'w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500';

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
      {type === 'textarea' ? (
        <textarea name={`setting_${settingKey}`} defaultValue={value} rows={3} placeholder={placeholder} className={cls + ' resize-none'} />
      ) : (
        <input type="text" name={`setting_${settingKey}`} defaultValue={value} placeholder={placeholder} className={cls} />
      )}
    </div>
  );
}

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; success?: string }>;
}) {
  const session = await getSession();
  if (!session) redirect('/login');

  const { error, success } = await searchParams;
  const settings = await getAllSettings();
  const s = (key: string) => settings[key] || '';

  const inputClass = 'w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white';

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">Configure your website content and account</p>
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
            {success === 'settings_saved' && 'Site settings saved successfully.'}
          </p>
        </div>
      )}

      {/* Hero Section Settings */}
      <form action={saveSettings} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Hero Section</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Override homepage hero. Leave empty to use default locale text.</p>
        <div className="grid md:grid-cols-3 gap-4">
          <SettingField label="Title (EN)" settingKey="hero.title_en" value={s('hero.title_en')} />
          <SettingField label="Title (RU)" settingKey="hero.title_ru" value={s('hero.title_ru')} />
          <SettingField label="Title (UZ)" settingKey="hero.title_uz" value={s('hero.title_uz')} />
          <SettingField label="Subtitle (EN)" settingKey="hero.subtitle_en" value={s('hero.subtitle_en')} type="textarea" />
          <SettingField label="Subtitle (RU)" settingKey="hero.subtitle_ru" value={s('hero.subtitle_ru')} type="textarea" />
          <SettingField label="Subtitle (UZ)" settingKey="hero.subtitle_uz" value={s('hero.subtitle_uz')} type="textarea" />
        </div>
        <div className="mt-4">
          <button type="submit" className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors">Save Hero Settings</button>
        </div>
      </form>

      {/* CTA Section Settings */}
      <form action={saveSettings} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">CTA Section</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Override the call-to-action section on the homepage.</p>
        <div className="grid md:grid-cols-3 gap-4">
          <SettingField label="Title (EN)" settingKey="cta.title_en" value={s('cta.title_en')} />
          <SettingField label="Title (RU)" settingKey="cta.title_ru" value={s('cta.title_ru')} />
          <SettingField label="Title (UZ)" settingKey="cta.title_uz" value={s('cta.title_uz')} />
          <SettingField label="Subtitle (EN)" settingKey="cta.subtitle_en" value={s('cta.subtitle_en')} type="textarea" />
          <SettingField label="Subtitle (RU)" settingKey="cta.subtitle_ru" value={s('cta.subtitle_ru')} type="textarea" />
          <SettingField label="Subtitle (UZ)" settingKey="cta.subtitle_uz" value={s('cta.subtitle_uz')} type="textarea" />
        </div>
        <div className="mt-4">
          <button type="submit" className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors">Save CTA Settings</button>
        </div>
      </form>

      {/* SEO Settings */}
      <form action={saveSettings} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">SEO</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Site-wide metadata overrides.</p>
        <div className="grid md:grid-cols-2 gap-4">
          <SettingField label="Site Title" settingKey="seo.title" value={s('seo.title')} placeholder="Necto Automations" />
          <SettingField label="Meta Description" settingKey="seo.description" value={s('seo.description')} type="textarea" placeholder="Custom software development..." />
        </div>
        <div className="mt-4">
          <button type="submit" className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors">Save SEO Settings</button>
        </div>
      </form>

      {/* Profile Section */}
      <form action={updateProfile} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Profile</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
            <input type="text" name="name" required defaultValue={session.name} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
            <input type="email" name="email" required defaultValue={session.email} className={inputClass} />
          </div>
          <button type="submit" className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors">Save Profile</button>
        </div>
      </form>

      {/* Password Change */}
      <form action={changePassword} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Change Password</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Password</label>
            <input type="password" name="currentPassword" required className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">New Password</label>
            <input type="password" name="newPassword" required className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Confirm New Password</label>
            <input type="password" name="confirmPassword" required className={inputClass} />
          </div>
          <button type="submit" className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors">Change Password</button>
        </div>
      </form>

      {/* Quick Links */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h2>
        <div className="flex flex-wrap gap-4">
          <a href="/" target="_blank" className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">View Website &rarr;</a>
          <a href="/contact" target="_blank" className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Contact Page &rarr;</a>
        </div>
      </div>
    </div>
  );
}

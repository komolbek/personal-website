import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

async function createPartner(formData: FormData) {
  'use server';

  const session = await getSession();
  if (!session) return;

  const name = formData.get('name') as string;
  const logo = formData.get('logo') as string;
  const website = formData.get('website') as string;
  const desc_en = formData.get('desc_en') as string;
  const desc_ru = formData.get('desc_ru') as string;
  const desc_uz = formData.get('desc_uz') as string;
  const featured = formData.get('featured') === 'on';
  const order = parseInt(formData.get('order') as string) || 0;

  await prisma.partner.create({
    data: {
      name,
      logo: logo || '/partners/default.svg',
      website: website || null,
      desc_en: desc_en || null,
      desc_ru: desc_ru || null,
      desc_uz: desc_uz || null,
      featured,
      order,
      isVisible: true,
    },
  });

  revalidatePath('/admin/partners');
  revalidatePath('/');
  revalidatePath('/partners');
  redirect('/admin/partners');
}

export default async function NewPartnerPage() {
  const session = await getSession();

  if (!session) {
    redirect('/admin/login');
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Add New Partner
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Add a new trusted partner to your website
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <form action={createPartner} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Company Name *
              </label>
              <input
                type="text"
                name="name"
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Company Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Logo URL
              </label>
              <input
                type="text"
                name="logo"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="/partners/company-logo.svg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Website URL
              </label>
              <input
                type="url"
                name="website"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="https://company.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Display Order
              </label>
              <input
                type="number"
                name="order"
                defaultValue={0}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description (English)
            </label>
            <textarea
              name="desc_en"
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Brief description of the partner company"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description (Russian)
            </label>
            <textarea
              name="desc_ru"
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Краткое описание компании-партнера"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description (Uzbek)
            </label>
            <textarea
              name="desc_uz"
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Hamkor kompaniyaning qisqacha tavsifi"
            />
          </div>

          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="featured"
                className="rounded border-gray-300 dark:border-gray-600 text-indigo-600"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Feature this partner on the homepage
              </span>
            </label>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
            >
              Create Partner
            </button>
            <a
              href="/admin/partners"
              className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

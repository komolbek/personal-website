import { getSession } from '@/lib/auth';
import { redirect, notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { TranslateButton } from '@/components/admin/TranslateButton';

export const dynamic = 'force-dynamic';

async function updatePartner(formData: FormData) {
  'use server';

  const session = await getSession();
  if (!session) return;

  const id = formData.get('id') as string;
  const name = formData.get('name') as string;
  const logo = formData.get('logo') as string;
  const website = formData.get('website') as string;
  const desc_en = formData.get('desc_en') as string;
  const desc_ru = formData.get('desc_ru') as string;
  const desc_uz = formData.get('desc_uz') as string;
  const featured = formData.get('featured') === 'on';
  const order = parseInt(formData.get('order') as string) || 0;
  const isVisible = formData.get('isVisible') === 'on';

  await prisma.partner.update({
    where: { id },
    data: {
      name,
      logo: logo || '/partners/default.svg',
      website: website || null,
      desc_en: desc_en || null,
      desc_ru: desc_ru || null,
      desc_uz: desc_uz || null,
      featured,
      order,
      isVisible,
    },
  });

  revalidatePath('/admin/partners');
  revalidatePath('/');
  revalidatePath('/partners');
  redirect('/admin/partners');
}

export default async function EditPartnerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getSession();

  if (!session) {
    redirect('/admin/login');
  }

  const { id } = await params;

  const partner = await prisma.partner.findUnique({
    where: { id },
  });

  if (!partner) {
    notFound();
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Edit Partner
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Update partner information
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <form action={updatePartner} className="space-y-6">
          <input type="hidden" name="id" value={partner.id} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Company Name *
              </label>
              <input
                type="text"
                name="name"
                required
                defaultValue={partner.name}
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
                defaultValue={partner.logo}
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
                defaultValue={partner.website || ''}
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
                defaultValue={partner.order}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Descriptions</h3>
            <TranslateButton fields={[{ ruId: 'partner_desc_ru', enId: 'partner_desc_en', uzId: 'partner_desc_uz' }]} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description (Russian) - primary
            </label>
            <textarea
              name="desc_ru"
              id="partner_desc_ru"
              rows={2}
              defaultValue={partner.desc_ru || ''}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Краткое описание компании-партнера"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description (English)
            </label>
            <textarea
              name="desc_en"
              id="partner_desc_en"
              rows={2}
              defaultValue={partner.desc_en || ''}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Brief description of the partner company"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description (Uzbek)
            </label>
            <textarea
              name="desc_uz"
              id="partner_desc_uz"
              rows={2}
              defaultValue={partner.desc_uz || ''}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Hamkor kompaniyaning qisqacha tavsifi"
            />
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="featured"
                defaultChecked={partner.featured}
                className="rounded border-gray-300 dark:border-gray-600 text-indigo-600"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Feature this partner on the homepage
              </span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isVisible"
                defaultChecked={partner.isVisible}
                className="rounded border-gray-300 dark:border-gray-600 text-indigo-600"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Visible on the website
              </span>
            </label>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
            >
              Update Partner
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

import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { ConfirmButton } from '@/components/admin/ConfirmButton';
import { TranslateButton } from '@/components/admin/TranslateButton';

export const dynamic = 'force-dynamic';

interface CompanyStat {
  id: string;
  key: string;
  value: number;
  suffix: string | null;
  label_en: string;
  label_ru: string | null;
  label_uz: string | null;
  isVisible: boolean;
  order: number;
}

async function getStats(): Promise<CompanyStat[]> {
  try {
    return await prisma.companyStat.findMany({
      orderBy: { order: 'asc' },
    });
  } catch {
    return [];
  }
}

async function updateStat(formData: FormData) {
  'use server';

  const session = await getSession();
  if (!session) return;

  const id = formData.get('id') as string;
  const value = parseInt(formData.get('value') as string);
  const label_en = formData.get('label_en') as string;
  const label_ru = formData.get('label_ru') as string;
  const label_uz = formData.get('label_uz') as string;
  const suffix = formData.get('suffix') as string;
  const isVisible = formData.get('isVisible') === 'true';

  await prisma.companyStat.update({
    where: { id },
    data: { value, label_en, label_ru, label_uz, suffix, isVisible },
  });

  revalidatePath('/admin/stats');
  revalidatePath('/');
  revalidatePath('/about');
}

async function createStat(formData: FormData) {
  'use server';

  const session = await getSession();
  if (!session) return;

  const key = formData.get('key') as string;
  const value = parseInt(formData.get('value') as string);
  const label_en = formData.get('label_en') as string;
  const label_ru = formData.get('label_ru') as string;
  const label_uz = formData.get('label_uz') as string;
  const suffix = (formData.get('suffix') as string) || '+';
  const order = parseInt(formData.get('order') as string) || 0;

  await prisma.companyStat.create({
    data: { key, value, label_en, label_ru, label_uz, suffix, order, isVisible: true },
  });

  revalidatePath('/admin/stats');
  revalidatePath('/');
  revalidatePath('/about');
}

async function deleteStat(formData: FormData) {
  'use server';

  const session = await getSession();
  if (!session) return;

  const id = formData.get('id') as string;

  await prisma.companyStat.delete({ where: { id } });

  revalidatePath('/admin/stats');
  revalidatePath('/');
  revalidatePath('/about');
}

export default async function StatsPage() {
  const session = await getSession();

  if (!session) {
    redirect('/admin/login');
  }

  const stats = await getStats();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Company Statistics
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage the statistics displayed on your website
        </p>
      </div>

      {/* Existing Stats */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Current Statistics
        </h2>

        {stats.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">
            No statistics configured yet. Add your first stat below.
          </p>
        ) : (
          <div className="space-y-4">
            {stats.map((stat) => (
              <div key={stat.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <form action={updateStat}>
                  <input type="hidden" name="id" value={stat.id} />

                  <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
                    <div>
                      <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Key</label>
                      <div className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded text-sm text-gray-600 dark:text-gray-300">
                        {stat.key}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Value</label>
                      <input
                        type="number"
                        name="value"
                        defaultValue={stat.value}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Suffix</label>
                      <input
                        type="text"
                        name="suffix"
                        defaultValue={stat.suffix || ''}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Label (RU)</label>
                      <input
                        type="text"
                        name="label_ru"
                        id={`stat_${stat.id}_label_ru`}
                        defaultValue={stat.label_ru || ''}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Label (EN)</label>
                      <input
                        type="text"
                        name="label_en"
                        id={`stat_${stat.id}_label_en`}
                        defaultValue={stat.label_en}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Label (UZ)</label>
                      <input
                        type="text"
                        name="label_uz"
                        id={`stat_${stat.id}_label_uz`}
                        defaultValue={stat.label_uz || ''}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="isVisible"
                          value="true"
                          defaultChecked={stat.isVisible}
                          className="rounded border-gray-300 dark:border-gray-600 text-indigo-600"
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Visible</span>
                      </label>
                      <TranslateButton
                        fields={[{
                          ruId: `stat_${stat.id}_label_ru`,
                          enId: `stat_${stat.id}_label_en`,
                          uzId: `stat_${stat.id}_label_uz`,
                        }]}
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-lg transition-colors"
                    >
                      Save
                    </button>
                  </div>
                </form>

                {/* Delete form - separate from update form */}
                <div className="flex justify-end mt-2">
                  <form action={deleteStat}>
                    <input type="hidden" name="id" value={stat.id} />
                    <ConfirmButton
                      className="px-3 py-1.5 text-xs text-red-600 hover:text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      message="Are you sure you want to delete this stat? This cannot be undone."
                      title="Delete Statistic"
                    >
                      Delete
                    </ConfirmButton>
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add New Stat */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Add New Statistic
          </h2>
          <TranslateButton
            fields={[{
              ruId: 'new_stat_label_ru',
              enId: 'new_stat_label_en',
              uzId: 'new_stat_label_uz',
            }]}
          />
        </div>

        <form action={createStat} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Key (unique identifier)
              </label>
              <input
                type="text"
                name="key"
                required
                placeholder="e.g., years, projects, clients"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Value
              </label>
              <input
                type="number"
                name="value"
                required
                placeholder="50"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Suffix
              </label>
              <input
                type="text"
                name="suffix"
                defaultValue="+"
                placeholder="+, %, etc."
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Label (Russian) - primary
              </label>
              <input
                type="text"
                name="label_ru"
                id="new_stat_label_ru"
                required
                placeholder="Лет в бизнесе"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Label (English)
              </label>
              <input
                type="text"
                name="label_en"
                id="new_stat_label_en"
                required
                placeholder="Years in Business"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Label (Uzbek)
              </label>
              <input
                type="text"
                name="label_uz"
                id="new_stat_label_uz"
                required
                placeholder="Yil biznesda"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Display Order
            </label>
            <input
              type="number"
              name="order"
              defaultValue={stats.length + 1}
              className="w-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
          >
            Add Statistic
          </button>
        </form>
      </div>
    </div>
  );
}

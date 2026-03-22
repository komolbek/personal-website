import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { TranslateButton } from '@/components/admin/TranslateButton';

export const dynamic = 'force-dynamic';

async function createFeedback(formData: FormData) {
  'use server';

  const session = await getSession();
  if (!session) return;

  const authorName = formData.get('authorName') as string;
  const authorEmail = formData.get('authorEmail') as string;
  const position_en = formData.get('position_en') as string;
  const position_ru = formData.get('position_ru') as string;
  const position_uz = formData.get('position_uz') as string;
  const quote_en = formData.get('quote_en') as string;
  const quote_ru = formData.get('quote_ru') as string;
  const quote_uz = formData.get('quote_uz') as string;
  const rating = parseInt(formData.get('rating') as string) || 5;
  const featured = formData.get('featured') === 'on';

  await prisma.feedback.create({
    data: {
      authorName,
      authorEmail: authorEmail || null,
      position_en: position_en || null,
      position_ru: position_ru || null,
      position_uz: position_uz || null,
      quote_en: quote_en || '',
      quote_ru: quote_ru || null,
      quote_uz: quote_uz || null,
      rating,
      status: 'APPROVED',
      featured,
      isVisible: true,
    },
  });

  revalidatePath('/feedback');
  revalidatePath('/');
  revalidatePath('/partners');
  redirect('/feedback');
}

export default async function NewFeedbackPage() {
  const session = await getSession();
  if (!session) redirect('/login');

  const inputClass = 'w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500';

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Add Review
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manually create a review (will be auto-approved)
          </p>
        </div>
        <a
          href="/feedback"
          className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          &larr; Back
        </a>
      </div>

      <form action={createFeedback} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 space-y-6">
        {/* Author Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Author Name *
          </label>
          <input type="text" name="authorName" required className={inputClass} />
        </div>

        {/* Author Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email (optional)
          </label>
          <input type="email" name="authorEmail" className={inputClass} />
        </div>

        {/* Position (EN/RU/UZ) with translate */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Position (EN / RU / UZ)
            </label>
            <TranslateButton fields={[{ enId: 'position_en', ruId: 'position_ru', uzId: 'position_uz' }]} />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <input type="text" name="position_en" id="position_en" placeholder="EN: CEO at Company" className={inputClass} />
            <input type="text" name="position_ru" id="position_ru" placeholder="RU" className={inputClass} />
            <input type="text" name="position_uz" id="position_uz" placeholder="UZ" className={inputClass} />
          </div>
        </div>

        {/* Quote (EN/RU/UZ) with translate */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Review Text (EN / RU / UZ) *
            </label>
            <TranslateButton fields={[{ enId: 'quote_en', ruId: 'quote_ru', uzId: 'quote_uz' }]} />
          </div>
          <div className="space-y-3">
            <textarea name="quote_en" id="quote_en" required rows={3} placeholder="EN (required)" className={inputClass + ' resize-none'} />
            <textarea name="quote_ru" id="quote_ru" rows={3} placeholder="RU" className={inputClass + ' resize-none'} />
            <textarea name="quote_uz" id="quote_uz" rows={3} placeholder="UZ" className={inputClass + ' resize-none'} />
          </div>
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Rating
          </label>
          <select name="rating" defaultValue="5" className={inputClass}>
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>
                {'★'.repeat(r)}{'☆'.repeat(5 - r)} ({r})
              </option>
            ))}
          </select>
        </div>

        {/* Featured */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="featured"
            id="featured"
            className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
          />
          <label htmlFor="featured" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Featured (show prominently on the website)
          </label>
        </div>

        {/* Submit */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
          >
            Create Review
          </button>
          <a
            href="/feedback"
            className="px-6 py-2.5 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors"
          >
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}

import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

interface FeedbackItem {
  id: string;
  authorName: string;
  authorEmail: string | null;
  position_en: string | null;
  position_ru: string | null;
  position_uz: string | null;
  quote_en: string | null;
  quote_ru: string | null;
  quote_uz: string | null;
  rating: number | null;
  avatar: string | null;
  featured: boolean;
  isVisible: boolean;
  status: string;
  partnerId: string | null;
  createdAt: Date;
  updatedAt: Date;
  partner: { name: string; logo: string | null } | null;
}

async function getFeedback(): Promise<FeedbackItem[]> {
  try {
    return await prisma.feedback.findMany({
      orderBy: { createdAt: 'desc' },
      include: { partner: true },
    });
  } catch {
    return [];
  }
}

async function updateFeedbackStatus(formData: FormData) {
  'use server';

  const session = await getSession();
  if (!session) return;

  const id = formData.get('id') as string;
  const status = formData.get('status') as 'PENDING' | 'APPROVED' | 'REJECTED';

  await prisma.feedback.update({
    where: { id },
    data: { status },
  });

  revalidatePath('/admin/feedback');
  revalidatePath('/');
  revalidatePath('/partners');
}

async function toggleFeatured(formData: FormData) {
  'use server';

  const session = await getSession();
  if (!session) return;

  const id = formData.get('id') as string;
  const featured = formData.get('featured') === 'true';

  await prisma.feedback.update({
    where: { id },
    data: { featured: !featured },
  });

  revalidatePath('/admin/feedback');
  revalidatePath('/');
}

async function deleteFeedback(formData: FormData) {
  'use server';

  const session = await getSession();
  if (!session) return;

  const id = formData.get('id') as string;

  await prisma.feedback.delete({ where: { id } });

  revalidatePath('/admin/feedback');
}

export default async function FeedbackPage() {
  const session = await getSession();

  if (!session) {
    redirect('/admin/login');
  }

  const feedback = await getFeedback();

  const pendingCount = feedback.filter((f) => f.status === 'PENDING').length;
  const approvedCount = feedback.filter((f) => f.status === 'APPROVED').length;
  const rejectedCount = feedback.filter((f) => f.status === 'REJECTED').length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Feedback Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Review and approve customer feedback and testimonials
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-200 dark:border-amber-800">
          <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">{pendingCount}</div>
          <div className="text-sm text-amber-700 dark:text-amber-300">Pending Review</div>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border border-green-200 dark:border-green-800">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">{approvedCount}</div>
          <div className="text-sm text-green-700 dark:text-green-300">Approved</div>
        </div>
        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl border border-red-200 dark:border-red-800">
          <div className="text-2xl font-bold text-red-600 dark:text-red-400">{rejectedCount}</div>
          <div className="text-sm text-red-700 dark:text-red-300">Rejected</div>
        </div>
      </div>

      {/* Feedback List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        {feedback.length === 0 ? (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            No feedback submitted yet. Feedback from your website will appear here.
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {feedback.map((item) => (
              <div key={item.id} className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {item.authorName}
                      </span>
                      {item.position_en && (
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {item.position_en}
                        </span>
                      )}
                      {item.partner && (
                        <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded">
                          {item.partner.name}
                        </span>
                      )}
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      &quot;{item.quote_en}&quot;
                    </p>

                    {item.rating && (
                      <div className="flex gap-1 mb-3">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span key={star} className={star <= item.rating! ? 'text-yellow-400' : 'text-gray-300'}>
                            ★
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                      {item.authorEmail && <span>{item.authorEmail}</span>}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    {/* Status Badge */}
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.status === 'PENDING'
                          ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                          : item.status === 'APPROVED'
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      }`}
                    >
                      {item.status}
                    </span>

                    {/* Featured Badge */}
                    {item.featured && (
                      <span className="px-3 py-1 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 rounded-full text-xs font-medium">
                        Featured
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                  {item.status !== 'APPROVED' && (
                    <form action={updateFeedbackStatus}>
                      <input type="hidden" name="id" value={item.id} />
                      <input type="hidden" name="status" value="APPROVED" />
                      <button
                        type="submit"
                        className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors"
                      >
                        Approve
                      </button>
                    </form>
                  )}

                  {item.status !== 'REJECTED' && (
                    <form action={updateFeedbackStatus}>
                      <input type="hidden" name="id" value={item.id} />
                      <input type="hidden" name="status" value="REJECTED" />
                      <button
                        type="submit"
                        className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-colors"
                      >
                        Reject
                      </button>
                    </form>
                  )}

                  {item.status === 'APPROVED' && (
                    <form action={toggleFeatured}>
                      <input type="hidden" name="id" value={item.id} />
                      <input type="hidden" name="featured" value={item.featured.toString()} />
                      <button
                        type="submit"
                        className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                          item.featured
                            ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                            : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                        }`}
                      >
                        {item.featured ? 'Unfeature' : 'Feature'}
                      </button>
                    </form>
                  )}

                  <form action={deleteFeedback} className="ml-auto">
                    <input type="hidden" name="id" value={item.id} />
                    <button
                      type="submit"
                      className="px-3 py-1.5 text-red-600 hover:text-red-700 dark:text-red-400 text-sm transition-colors"
                      onClick={(e) => {
                        if (!confirm('Are you sure you want to delete this feedback?')) {
                          e.preventDefault();
                        }
                      }}
                    >
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

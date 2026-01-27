import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';

interface Partner {
  id: string;
  name: string;
  logo: string | null;
  website: string | null;
  desc_en: string | null;
  desc_ru: string | null;
  desc_uz: string | null;
  featured: boolean;
  isVisible: boolean;
  order: number;
  _count: { testimonials: number };
}

async function getPartners(): Promise<Partner[]> {
  try {
    return await prisma.partner.findMany({
      orderBy: { order: 'asc' },
      include: { _count: { select: { testimonials: true } } },
    });
  } catch {
    return [];
  }
}

async function deletePartner(formData: FormData) {
  'use server';

  const session = await getSession();
  if (!session) return;

  const id = formData.get('id') as string;

  await prisma.partner.delete({ where: { id } });

  revalidatePath('/admin/partners');
  revalidatePath('/');
  revalidatePath('/partners');
}

async function toggleVisibility(formData: FormData) {
  'use server';

  const session = await getSession();
  if (!session) return;

  const id = formData.get('id') as string;
  const isVisible = formData.get('isVisible') === 'true';

  await prisma.partner.update({
    where: { id },
    data: { isVisible: !isVisible },
  });

  revalidatePath('/admin/partners');
  revalidatePath('/');
  revalidatePath('/partners');
}

async function toggleFeatured(formData: FormData) {
  'use server';

  const session = await getSession();
  if (!session) return;

  const id = formData.get('id') as string;
  const featured = formData.get('featured') === 'true';

  await prisma.partner.update({
    where: { id },
    data: { featured: !featured },
  });

  revalidatePath('/admin/partners');
  revalidatePath('/');
}

export default async function PartnersPage() {
  const session = await getSession();

  if (!session) {
    redirect('/admin/login');
  }

  const partners = await getPartners();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Partners
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your trusted partners and their testimonials
          </p>
        </div>
        <Link
          href="/admin/partners/new"
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
        >
          Add Partner
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        {partners.length === 0 ? (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            No partners added yet.{' '}
            <Link href="/admin/partners/new" className="text-indigo-600 dark:text-indigo-400 hover:underline">
              Add your first partner
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {partners.map((partner) => (
              <div key={partner.id} className="p-6 flex items-center gap-6">
                {/* Logo */}
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                  {partner.logo ? (
                    <img src={partner.logo} alt={partner.name} className="w-full h-full object-contain p-2" />
                  ) : (
                    <span className="text-2xl text-gray-400">🏢</span>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                      {partner.name}
                    </h3>
                    {partner.featured && (
                      <span className="px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs rounded">
                        Featured
                      </span>
                    )}
                    {!partner.isVisible && (
                      <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs rounded">
                        Hidden
                      </span>
                    )}
                  </div>
                  {partner.desc_en && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {partner.desc_en}
                    </p>
                  )}
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                    <span>{partner._count.testimonials} testimonials</span>
                    {partner.website && (
                      <a href={partner.website} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600">
                        {partner.website}
                      </a>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <form action={toggleFeatured}>
                    <input type="hidden" name="id" value={partner.id} />
                    <input type="hidden" name="featured" value={partner.featured.toString()} />
                    <button
                      type="submit"
                      className={`p-2 rounded-lg transition-colors ${
                        partner.featured
                          ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20'
                          : 'text-gray-400 hover:text-indigo-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                      title={partner.featured ? 'Unfeature' : 'Feature'}
                    >
                      ⭐
                    </button>
                  </form>

                  <form action={toggleVisibility}>
                    <input type="hidden" name="id" value={partner.id} />
                    <input type="hidden" name="isVisible" value={partner.isVisible.toString()} />
                    <button
                      type="submit"
                      className={`p-2 rounded-lg transition-colors ${
                        partner.isVisible
                          ? 'text-green-600 bg-green-50 dark:bg-green-900/20'
                          : 'text-gray-400 hover:text-green-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                      title={partner.isVisible ? 'Hide' : 'Show'}
                    >
                      {partner.isVisible ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </form>

                  <Link
                    href={`/admin/partners/${partner.id}`}
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    title="Edit"
                  >
                    ✏️
                  </Link>

                  <form action={deletePartner}>
                    <input type="hidden" name="id" value={partner.id} />
                    <button
                      type="submit"
                      className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      title="Delete"
                      onClick={(e) => {
                        if (!confirm('Are you sure you want to delete this partner?')) {
                          e.preventDefault();
                        }
                      }}
                    >
                      🗑️
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

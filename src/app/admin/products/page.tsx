import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';

interface Product {
  id: string;
  slug: string;
  icon: string;
  title_en: string;
  title_ru: string;
  title_uz: string;
  shortDesc_en: string;
  shortDesc_ru: string;
  shortDesc_uz: string;
  fullDesc_en: string;
  fullDesc_ru: string;
  fullDesc_uz: string;
  features_en: string[];
  features_ru: string[];
  features_uz: string[];
  benefits_en: string[];
  benefits_ru: string[];
  benefits_uz: string[];
  isVisible: boolean;
  order: number;
  _count: { clientProjects: number };
}

async function getProducts(): Promise<Product[]> {
  try {
    return await prisma.product.findMany({
      orderBy: { order: 'asc' },
      include: { _count: { select: { clientProjects: true } } },
    });
  } catch {
    return [];
  }
}

async function deleteProduct(formData: FormData) {
  'use server';

  const session = await getSession();
  if (!session) return;

  const id = formData.get('id') as string;

  await prisma.product.delete({ where: { id } });

  revalidatePath('/admin/products');
  revalidatePath('/');
  revalidatePath('/solutions');
}

async function toggleVisibility(formData: FormData) {
  'use server';

  const session = await getSession();
  if (!session) return;

  const id = formData.get('id') as string;
  const isVisible = formData.get('isVisible') === 'true';

  await prisma.product.update({
    where: { id },
    data: { isVisible: !isVisible },
  });

  revalidatePath('/admin/products');
  revalidatePath('/');
  revalidatePath('/solutions');
}

export default async function ProductsPage() {
  const session = await getSession();

  if (!session) {
    redirect('/admin/login');
  }

  const products = await getProducts();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Products & Solutions
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage the services and solutions you offer
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
        >
          Add Product
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        {products.length === 0 ? (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            No products added yet.{' '}
            <Link href="/admin/products/new" className="text-indigo-600 dark:text-indigo-400 hover:underline">
              Add your first product
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {products.map((product) => (
              <div key={product.id} className="p-6 flex items-center gap-6">
                {/* Icon */}
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">{product.icon || '💼'}</span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                      {product.title_en}
                    </h3>
                    {!product.isVisible && (
                      <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs rounded">
                        Hidden
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {product.shortDesc_en}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                    <span>/{product.slug}</span>
                    <span>{product._count.clientProjects} linked projects</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <form action={toggleVisibility}>
                    <input type="hidden" name="id" value={product.id} />
                    <input type="hidden" name="isVisible" value={product.isVisible.toString()} />
                    <button
                      type="submit"
                      className={`p-2 rounded-lg transition-colors ${
                        product.isVisible
                          ? 'text-green-600 bg-green-50 dark:bg-green-900/20'
                          : 'text-gray-400 hover:text-green-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                      title={product.isVisible ? 'Hide' : 'Show'}
                    >
                      {product.isVisible ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </form>

                  <Link
                    href={`/admin/products/${product.id}`}
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    title="Edit"
                  >
                    ✏️
                  </Link>

                  <form action={deleteProduct}>
                    <input type="hidden" name="id" value={product.id} />
                    <button
                      type="submit"
                      className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      title="Delete"
                      onClick={(e) => {
                        if (!confirm('Are you sure you want to delete this product?')) {
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

import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { CustomSelect } from '@/components/admin/CustomSelect';
import { TranslateButton } from '@/components/admin/TranslateButton';

export const dynamic = 'force-dynamic';

async function updateProduct(formData: FormData) {
  'use server';

  const session = await getSession();
  if (!session) return;

  const id = formData.get('id') as string;
  const slug = formData.get('slug') as string;
  const title_en = formData.get('title_en') as string;
  const title_ru = formData.get('title_ru') as string;
  const title_uz = formData.get('title_uz') as string;
  const shortDesc_en = formData.get('shortDesc_en') as string;
  const shortDesc_ru = formData.get('shortDesc_ru') as string;
  const shortDesc_uz = formData.get('shortDesc_uz') as string;
  const fullDesc_en = formData.get('fullDesc_en') as string;
  const fullDesc_ru = formData.get('fullDesc_ru') as string;
  const fullDesc_uz = formData.get('fullDesc_uz') as string;
  const icon = formData.get('icon') as string;
  const features_en = (formData.get('features_en') as string).split('\n').map(s => s.trim()).filter(Boolean);
  const features_ru = (formData.get('features_ru') as string).split('\n').map(s => s.trim()).filter(Boolean);
  const features_uz = (formData.get('features_uz') as string).split('\n').map(s => s.trim()).filter(Boolean);
  const benefits_en = (formData.get('benefits_en') as string).split('\n').map(s => s.trim()).filter(Boolean);
  const benefits_ru = (formData.get('benefits_ru') as string).split('\n').map(s => s.trim()).filter(Boolean);
  const benefits_uz = (formData.get('benefits_uz') as string).split('\n').map(s => s.trim()).filter(Boolean);
  const order = parseInt(formData.get('order') as string) || 0;
  const isVisible = formData.get('isVisible') === 'on';

  await prisma.product.update({
    where: { id },
    data: {
      slug,
      title_en,
      title_ru,
      title_uz,
      shortDesc_en,
      shortDesc_ru,
      shortDesc_uz,
      fullDesc_en,
      fullDesc_ru,
      fullDesc_uz,
      icon,
      features_en,
      features_ru,
      features_uz,
      benefits_en,
      benefits_ru,
      benefits_uz,
      order,
      isVisible,
    },
  });

  revalidatePath('/products');
  revalidatePath('/');
  revalidatePath('/portfolio');
  revalidatePath('/solutions');
  redirect('/products');
}

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    redirect('/products');
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Edit Product
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Update product details for &ldquo;{product.title_en}&rdquo;
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <form action={updateProduct} className="space-y-6">
          <input type="hidden" name="id" value={product.id} />

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Slug
            </label>
            <input
              type="text"
              name="slug"
              defaultValue={product.slug}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="product-slug"
            />
          </div>

          {/* Titles */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 uppercase tracking-wide">Titles</h3>
              <TranslateButton fields={[{ ruId: 'prod_title_ru', enId: 'prod_title_en', uzId: 'prod_title_uz' }]} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Title (Russian) - primary *
                </label>
                <input
                  type="text"
                  name="title_ru"
                  id="prod_title_ru"
                  required
                  defaultValue={product.title_ru}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Название продукта на русском"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Title (EN)
                </label>
                <input
                  type="text"
                  name="title_en"
                  id="prod_title_en"
                  defaultValue={product.title_en}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Product title in English"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Title (Uzbek)
                </label>
                <input
                  type="text"
                  name="title_uz"
                  id="prod_title_uz"
                  defaultValue={product.title_uz}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Mahsulot nomi o'zbek tilida"
                />
              </div>
            </div>
          </div>

          {/* Icon and Order */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Icon *
              </label>
              <CustomSelect
                name="icon"
                required
                defaultValue={product.icon}
                options={[
                  { value: 'crm', label: 'CRM' },
                  { value: 'automation', label: 'Automation' },
                  { value: 'website', label: 'Website' },
                  { value: 'ecommerce', label: 'E-Commerce' },
                  { value: 'mobile', label: 'Mobile' },
                  { value: 'ai', label: 'AI' },
                ]}
                placeholder="Select an icon..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Display Order
              </label>
              <input
                type="number"
                name="order"
                defaultValue={product.order}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          {/* Short Descriptions */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 uppercase tracking-wide">Short Descriptions</h3>
              <TranslateButton fields={[{ ruId: 'prod_shortDesc_ru', enId: 'prod_shortDesc_en', uzId: 'prod_shortDesc_uz' }]} />
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Short Description (Russian) - primary *
                </label>
                <textarea
                  name="shortDesc_ru"
                  id="prod_shortDesc_ru"
                  required
                  rows={2}
                  defaultValue={product.shortDesc_ru}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Краткое описание на русском"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Short Description (EN)
                </label>
                <textarea
                  name="shortDesc_en"
                  id="prod_shortDesc_en"
                  rows={2}
                  defaultValue={product.shortDesc_en}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Brief description in English"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Short Description (Uzbek)
                </label>
                <textarea
                  name="shortDesc_uz"
                  id="prod_shortDesc_uz"
                  rows={2}
                  defaultValue={product.shortDesc_uz}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Qisqa tavsif o'zbek tilida"
                />
              </div>
            </div>
          </div>

          {/* Full Descriptions */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 uppercase tracking-wide">Full Descriptions</h3>
              <TranslateButton fields={[{ ruId: 'prod_fullDesc_ru', enId: 'prod_fullDesc_en', uzId: 'prod_fullDesc_uz' }]} />
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Description (Russian) - primary
                </label>
                <textarea
                  name="fullDesc_ru"
                  id="prod_fullDesc_ru"
                  rows={4}
                  defaultValue={product.fullDesc_ru}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Подробное описание на русском"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Description (EN)
                </label>
                <textarea
                  name="fullDesc_en"
                  id="prod_fullDesc_en"
                  rows={4}
                  defaultValue={product.fullDesc_en}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Detailed description in English"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Description (Uzbek)
                </label>
                <textarea
                  name="fullDesc_uz"
                  id="prod_fullDesc_uz"
                  rows={4}
                  defaultValue={product.fullDesc_uz}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Batafsil tavsif o'zbek tilida"
                />
              </div>
            </div>
          </div>

          {/* Features */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 uppercase tracking-wide">Features</h3>
              <TranslateButton fields={[{ ruId: 'prod_features_ru', enId: 'prod_features_en', uzId: 'prod_features_uz' }]} />
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Features (Russian) - primary - one per line
                </label>
                <textarea
                  name="features_ru"
                  id="prod_features_ru"
                  rows={4}
                  defaultValue={product.features_ru.join('\n')}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder={"Функция 1\nФункция 2\nФункция 3"}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Features (EN) - one per line
                </label>
                <textarea
                  name="features_en"
                  id="prod_features_en"
                  rows={4}
                  defaultValue={product.features_en.join('\n')}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder={"Feature 1\nFeature 2\nFeature 3"}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Features (Uzbek) - one per line
                </label>
                <textarea
                  name="features_uz"
                  id="prod_features_uz"
                  rows={4}
                  defaultValue={product.features_uz.join('\n')}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder={"Xususiyat 1\nXususiyat 2\nXususiyat 3"}
                />
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 uppercase tracking-wide">Benefits</h3>
              <TranslateButton fields={[{ ruId: 'prod_benefits_ru', enId: 'prod_benefits_en', uzId: 'prod_benefits_uz' }]} />
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Benefits (Russian) - primary - one per line
                </label>
                <textarea
                  name="benefits_ru"
                  id="prod_benefits_ru"
                  rows={4}
                  defaultValue={product.benefits_ru.join('\n')}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder={"Преимущество 1\nПреимущество 2\nПреимущество 3"}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Benefits (EN) - one per line
                </label>
                <textarea
                  name="benefits_en"
                  id="prod_benefits_en"
                  rows={4}
                  defaultValue={product.benefits_en.join('\n')}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder={"Benefit 1\nBenefit 2\nBenefit 3"}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Benefits (Uzbek) - one per line
                </label>
                <textarea
                  name="benefits_uz"
                  id="prod_benefits_uz"
                  rows={4}
                  defaultValue={product.benefits_uz.join('\n')}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder={"Foyda 1\nFoyda 2\nFoyda 3"}
                />
              </div>
            </div>
          </div>

          {/* Visibility */}
          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isVisible"
                defaultChecked={product.isVisible}
                className="rounded border-gray-300 dark:border-gray-600 text-indigo-600"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Visible on the website
              </span>
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
            >
              Update Product
            </button>
            <a
              href="/products"
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

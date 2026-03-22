import { getSession } from '@/lib/auth';
import { redirect, notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { CustomSelect } from '@/components/admin/CustomSelect';
import { ImageUploader } from '@/components/admin/ImageUploader';
import { TranslateButton } from '@/components/admin/TranslateButton';

export const dynamic = 'force-dynamic';

async function updateProject(formData: FormData) {
  'use server';

  const session = await getSession();
  if (!session) return;

  const id = formData.get('id') as string;
  const slug = formData.get('slug') as string;
  const title_en = formData.get('title_en') as string;
  const title_ru = formData.get('title_ru') as string;
  const title_uz = formData.get('title_uz') as string;
  const clientName = formData.get('clientName') as string;
  const clientLogo = formData.get('clientLogo') as string;
  const category = formData.get('category') as string;
  const desc_en = formData.get('desc_en') as string;
  const desc_ru = formData.get('desc_ru') as string;
  const desc_uz = formData.get('desc_uz') as string;
  const challenge_en = formData.get('challenge_en') as string;
  const challenge_ru = formData.get('challenge_ru') as string;
  const challenge_uz = formData.get('challenge_uz') as string;
  const solution_en = formData.get('solution_en') as string;
  const solution_ru = formData.get('solution_ru') as string;
  const solution_uz = formData.get('solution_uz') as string;
  const results_en = formData.get('results_en') as string;
  const results_ru = formData.get('results_ru') as string;
  const results_uz = formData.get('results_uz') as string;
  const imagesRaw = formData.get('images') as string;
  const thumbnail = formData.get('thumbnail') as string;
  const appStoreUrl = formData.get('appStoreUrl') as string;
  const playStoreUrl = formData.get('playStoreUrl') as string;
  const websiteUrl = formData.get('websiteUrl') as string;
  const completedDateStr = formData.get('completedDate') as string;
  const featured = formData.get('featured') === 'on';
  const order = parseInt(formData.get('order') as string) || 0;
  const productId = formData.get('productId') as string;

  const images = imagesRaw
    ? imagesRaw.split('\n').map((s) => s.trim()).filter(Boolean)
    : [];

  await prisma.clientProject.update({
    where: { id },
    data: {
      slug,
      title_en,
      title_ru,
      title_uz,
      clientName: clientName || null,
      clientLogo: clientLogo || null,
      category,
      desc_en,
      desc_ru,
      desc_uz,
      challenge_en,
      challenge_ru,
      challenge_uz,
      solution_en,
      solution_ru,
      solution_uz,
      results_en: results_en || null,
      results_ru: results_ru || null,
      results_uz: results_uz || null,
      images,
      thumbnail,
      appStoreUrl: appStoreUrl || null,
      playStoreUrl: playStoreUrl || null,
      websiteUrl: websiteUrl || null,
      completedDate: completedDateStr ? new Date(completedDateStr) : null,
      featured,
      order,
      productId: productId || null,
    },
  });

  revalidatePath('/projects');
  revalidatePath('/');
  revalidatePath('/portfolio');
  revalidatePath('/projects');
  redirect('/projects');
}

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  const { id } = await params;

  const project = await prisma.clientProject.findUnique({
    where: { id },
  });

  if (!project) {
    notFound();
  }

  const products = await prisma.product.findMany({
    select: { id: true, title_en: true },
    orderBy: { order: 'asc' },
  });

  const completedDateValue = project.completedDate
    ? project.completedDate.toISOString().split('T')[0]
    : '';

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Edit Project
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Update project details for &ldquo;{project.title_en}&rdquo;
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <form action={updateProject} className="space-y-8">
          <input type="hidden" name="id" value={project.id} />

          {/* Section 1: Basic Info */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Basic Info
              </h2>
              <TranslateButton
                fields={[
                  { ruId: 'proj_title_ru', enId: 'proj_title_en', uzId: 'proj_title_uz' },
                ]}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Slug *
                </label>
                <input
                  type="text"
                  name="slug"
                  required
                  defaultValue={project.slug}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="project-slug"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Title (Russian — primary) *
                </label>
                <input
                  type="text"
                  name="title_ru"
                  id="proj_title_ru"
                  required
                  defaultValue={project.title_ru}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Название проекта"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Title (English) *
                </label>
                <input
                  type="text"
                  name="title_en"
                  id="proj_title_en"
                  required
                  defaultValue={project.title_en}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Project Title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Title (Uzbek) *
                </label>
                <input
                  type="text"
                  name="title_uz"
                  id="proj_title_uz"
                  required
                  defaultValue={project.title_uz}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Loyiha nomi"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Client Info */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Client Info
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Client Name
                </label>
                <input
                  type="text"
                  name="clientName"
                  defaultValue={project.clientName || ''}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Client Company Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Client Logo URL
                </label>
                <input
                  type="text"
                  name="clientLogo"
                  defaultValue={project.clientLogo || ''}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="https://example.com/logo.svg"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Category & Product */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Category & Product
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category *
                </label>
                <CustomSelect
                  name="category"
                  required
                  defaultValue={project.category}
                  options={[
                    { value: 'mobile', label: 'Mobile' },
                    { value: 'website', label: 'Website' },
                    { value: 'crm', label: 'CRM' },
                    { value: 'ai', label: 'AI' },
                    { value: 'ecommerce', label: 'E-commerce' },
                    { value: 'event', label: 'Event' },
                    { value: 'saas', label: 'SaaS' },
                  ]}
                  placeholder="Select a category"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Linked Product
                </label>
                <CustomSelect
                  name="productId"
                  defaultValue={project.productId || ''}
                  options={products.map((p) => ({ value: p.id, label: p.title_en }))}
                  placeholder="None"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Descriptions */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Descriptions
              </h2>
              <TranslateButton
                fields={[
                  { ruId: 'proj_desc_ru', enId: 'proj_desc_en', uzId: 'proj_desc_uz' },
                ]}
              />
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description (Russian — primary) *
                </label>
                <textarea
                  name="desc_ru"
                  id="proj_desc_ru"
                  required
                  rows={3}
                  defaultValue={project.desc_ru}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Описание проекта на русском"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description (English) *
                </label>
                <textarea
                  name="desc_en"
                  id="proj_desc_en"
                  required
                  rows={3}
                  defaultValue={project.desc_en}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Project description in English"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description (Uzbek) *
                </label>
                <textarea
                  name="desc_uz"
                  id="proj_desc_uz"
                  required
                  rows={3}
                  defaultValue={project.desc_uz}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Loyiha tavsifi o'zbek tilida"
                />
              </div>
            </div>
          </div>

          {/* Section 4b: Challenges */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Challenges
              </h2>
              <TranslateButton
                fields={[
                  { ruId: 'proj_challenge_ru', enId: 'proj_challenge_en', uzId: 'proj_challenge_uz' },
                ]}
              />
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Challenge (Russian — primary) *
                </label>
                <textarea
                  name="challenge_ru"
                  id="proj_challenge_ru"
                  required
                  rows={3}
                  defaultValue={project.challenge_ru}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="С какой проблемой столкнулся клиент?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Challenge (English) *
                </label>
                <textarea
                  name="challenge_en"
                  id="proj_challenge_en"
                  required
                  rows={3}
                  defaultValue={project.challenge_en}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="What challenge did the client face?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Challenge (Uzbek) *
                </label>
                <textarea
                  name="challenge_uz"
                  id="proj_challenge_uz"
                  required
                  rows={3}
                  defaultValue={project.challenge_uz}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Mijoz qanday muammoga duch keldi?"
                />
              </div>
            </div>
          </div>

          {/* Section 4c: Solutions */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Solutions
              </h2>
              <TranslateButton
                fields={[
                  { ruId: 'proj_solution_ru', enId: 'proj_solution_en', uzId: 'proj_solution_uz' },
                ]}
              />
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Solution (Russian — primary) *
                </label>
                <textarea
                  name="solution_ru"
                  id="proj_solution_ru"
                  required
                  rows={3}
                  defaultValue={project.solution_ru}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Как вы решили проблему?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Solution (English) *
                </label>
                <textarea
                  name="solution_en"
                  id="proj_solution_en"
                  required
                  rows={3}
                  defaultValue={project.solution_en}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="How did you solve the challenge?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Solution (Uzbek) *
                </label>
                <textarea
                  name="solution_uz"
                  id="proj_solution_uz"
                  required
                  rows={3}
                  defaultValue={project.solution_uz}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Muammoni qanday hal qildingiz?"
                />
              </div>
            </div>
          </div>

          {/* Section 4d: Results */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Results
              </h2>
              <TranslateButton
                fields={[
                  { ruId: 'proj_results_ru', enId: 'proj_results_en', uzId: 'proj_results_uz' },
                ]}
              />
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Results (Russian — primary)
                </label>
                <textarea
                  name="results_ru"
                  id="proj_results_ru"
                  rows={3}
                  defaultValue={project.results_ru || ''}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Какие результаты были достигнуты?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Results (English)
                </label>
                <textarea
                  name="results_en"
                  id="proj_results_en"
                  rows={3}
                  defaultValue={project.results_en || ''}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="What results were achieved?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Results (Uzbek)
                </label>
                <textarea
                  name="results_uz"
                  id="proj_results_uz"
                  rows={3}
                  defaultValue={project.results_uz || ''}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Qanday natijalar erishildi?"
                />
              </div>
            </div>
          </div>

          {/* Section 5: Media */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Media
            </h2>
            <div className="space-y-6">
              <ImageUploader
                name="thumbnail"
                defaultValue={project.thumbnail}
                label="Thumbnail *"
              />

              <ImageUploader
                name="images"
                multiple
                defaultValue={project.images.join('\n')}
                label="Project Images"
              />
            </div>
          </div>

          {/* Section 6: Links */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Links
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  App Store URL
                </label>
                <input
                  type="url"
                  name="appStoreUrl"
                  defaultValue={project.appStoreUrl || ''}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="https://apps.apple.com/..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Play Store URL
                </label>
                <input
                  type="url"
                  name="playStoreUrl"
                  defaultValue={project.playStoreUrl || ''}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="https://play.google.com/..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Website URL
                </label>
                <input
                  type="url"
                  name="websiteUrl"
                  defaultValue={project.websiteUrl || ''}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="https://project-website.com"
                />
              </div>
            </div>
          </div>

          {/* Section 7: Settings */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Settings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Completed Date
                </label>
                <input
                  type="date"
                  name="completedDate"
                  defaultValue={completedDateValue}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Display Order
                </label>
                <input
                  type="number"
                  name="order"
                  defaultValue={project.order}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="featured"
                    defaultChecked={project.featured}
                    className="rounded border-gray-300 dark:border-gray-600 text-indigo-600"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Feature this project on the homepage
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
            >
              Update Project
            </button>
            <a
              href="/projects"
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

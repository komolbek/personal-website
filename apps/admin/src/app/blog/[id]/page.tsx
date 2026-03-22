import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { TranslateButton } from '@/components/admin/TranslateButton';
import { ImageUploader } from '@/components/admin/ImageUploader';

export const dynamic = 'force-dynamic';

async function updateBlogPost(formData: FormData) {
  'use server';

  const session = await getSession();
  if (!session) return;

  const id = formData.get('id') as string;
  const slug = formData.get('slug') as string;
  const title_en = formData.get('title_en') as string;
  const title_ru = formData.get('title_ru') as string;
  const title_uz = formData.get('title_uz') as string;
  const excerpt_en = formData.get('excerpt_en') as string;
  const excerpt_ru = formData.get('excerpt_ru') as string;
  const excerpt_uz = formData.get('excerpt_uz') as string;
  const content_en = formData.get('content_en') as string;
  const content_ru = formData.get('content_ru') as string;
  const content_uz = formData.get('content_uz') as string;
  const thumbnail = formData.get('thumbnail') as string;
  const category = formData.get('category') as string;
  const author = formData.get('author') as string;
  const featured = formData.get('featured') === 'on';
  const isVisible = formData.get('isVisible') === 'on';
  const order = parseInt(formData.get('order') as string) || 0;

  await prisma.blogPost.update({
    where: { id },
    data: {
      slug,
      title_en,
      title_ru,
      title_uz,
      excerpt_en,
      excerpt_ru,
      excerpt_uz,
      content_en,
      content_ru,
      content_uz,
      thumbnail,
      category,
      author,
      featured,
      isVisible,
      order,
    },
  });

  revalidatePath('/blog');
  revalidatePath('/');
  revalidatePath('/blog');
  redirect('/blog');
}

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  const { id } = await params;

  const post = await prisma.blogPost.findUnique({
    where: { id },
  });

  if (!post) {
    redirect('/blog');
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Edit Blog Post
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Update blog post &ldquo;{post.title_ru}&rdquo;
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <form action={updateBlogPost} className="space-y-6">
          <input type="hidden" name="id" value={post.id} />

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Slug *
            </label>
            <input
              type="text"
              name="slug"
              required
              defaultValue={post.slug}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="my-blog-post"
            />
          </div>

          {/* Titles */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 uppercase tracking-wide">Titles</h3>
              <TranslateButton fields={[{ ruId: 'blog_title_ru', enId: 'blog_title_en', uzId: 'blog_title_uz' }]} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Title (Russian) - primary *
                </label>
                <input
                  type="text"
                  name="title_ru"
                  id="blog_title_ru"
                  required
                  defaultValue={post.title_ru}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Заголовок на русском"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Title (EN)
                </label>
                <input
                  type="text"
                  name="title_en"
                  id="blog_title_en"
                  defaultValue={post.title_en}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Title in English"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Title (Uzbek)
                </label>
                <input
                  type="text"
                  name="title_uz"
                  id="blog_title_uz"
                  defaultValue={post.title_uz}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Sarlavha o'zbek tilida"
                />
              </div>
            </div>
          </div>

          {/* Thumbnail and Meta */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <ImageUploader name="thumbnail" label="Thumbnail" defaultValue={post.thumbnail} />
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  required
                  defaultValue={post.category}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="news">News</option>
                  <option value="tutorial">Tutorial</option>
                  <option value="case-study">Case Study</option>
                  <option value="update">Update</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Author
                </label>
                <input
                  type="text"
                  name="author"
                  defaultValue={post.author}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Author name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Display Order
                </label>
                <input
                  type="number"
                  name="order"
                  defaultValue={post.order}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Excerpts */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 uppercase tracking-wide">Excerpts</h3>
              <TranslateButton fields={[{ ruId: 'blog_excerpt_ru', enId: 'blog_excerpt_en', uzId: 'blog_excerpt_uz' }]} />
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Excerpt (Russian) - primary
                </label>
                <textarea
                  name="excerpt_ru"
                  id="blog_excerpt_ru"
                  rows={2}
                  defaultValue={post.excerpt_ru}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Краткое описание статьи"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Excerpt (EN)
                </label>
                <textarea
                  name="excerpt_en"
                  id="blog_excerpt_en"
                  rows={2}
                  defaultValue={post.excerpt_en}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Brief article description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Excerpt (Uzbek)
                </label>
                <textarea
                  name="excerpt_uz"
                  id="blog_excerpt_uz"
                  rows={2}
                  defaultValue={post.excerpt_uz}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Maqola haqida qisqa tavsif"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 uppercase tracking-wide">Content (Markdown)</h3>
              <TranslateButton fields={[{ ruId: 'blog_content_ru', enId: 'blog_content_en', uzId: 'blog_content_uz' }]} />
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Content (Russian) - primary *
                </label>
                <textarea
                  name="content_ru"
                  id="blog_content_ru"
                  required
                  rows={10}
                  defaultValue={post.content_ru}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm"
                  placeholder="Содержание статьи в формате Markdown..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Content (EN)
                </label>
                <textarea
                  name="content_en"
                  id="blog_content_en"
                  rows={10}
                  defaultValue={post.content_en}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm"
                  placeholder="Article content in Markdown..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Content (Uzbek)
                </label>
                <textarea
                  name="content_uz"
                  id="blog_content_uz"
                  rows={10}
                  defaultValue={post.content_uz}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm"
                  placeholder="Maqola matni Markdown formatida..."
                />
              </div>
            </div>
          </div>

          {/* Checkboxes */}
          <div className="space-y-3">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="featured"
                defaultChecked={post.featured}
                className="rounded border-gray-300 dark:border-gray-600 text-indigo-600"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Featured post
              </span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isVisible"
                defaultChecked={post.isVisible}
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
              Update Blog Post
            </button>
            <a
              href="/blog"
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

import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import { ConfirmButton } from '@/components/admin/ConfirmButton';

export const dynamic = 'force-dynamic';

interface BlogPost {
  id: string;
  slug: string;
  title_en: string;
  title_ru: string;
  title_uz: string;
  excerpt_ru: string;
  thumbnail: string;
  category: string;
  author: string;
  featured: boolean;
  isVisible: boolean;
  order: number;
  publishedAt: Date;
}

async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    return await prisma.blogPost.findMany({
      orderBy: { order: 'asc' },
    });
  } catch {
    return [];
  }
}

async function deleteBlogPost(formData: FormData) {
  'use server';

  const session = await getSession();
  if (!session) return;

  const id = formData.get('id') as string;

  await prisma.blogPost.delete({ where: { id } });

  revalidatePath('/blog');
  revalidatePath('/');
  revalidatePath('/blog');
}

async function toggleVisibility(formData: FormData) {
  'use server';

  const session = await getSession();
  if (!session) return;

  const id = formData.get('id') as string;
  const isVisible = formData.get('isVisible') === 'true';

  await prisma.blogPost.update({
    where: { id },
    data: { isVisible: !isVisible },
  });

  revalidatePath('/blog');
  revalidatePath('/');
  revalidatePath('/blog');
}

async function toggleFeatured(formData: FormData) {
  'use server';

  const session = await getSession();
  if (!session) return;

  const id = formData.get('id') as string;
  const featured = formData.get('featured') === 'true';

  await prisma.blogPost.update({
    where: { id },
    data: { featured: !featured },
  });

  revalidatePath('/blog');
  revalidatePath('/');
  revalidatePath('/blog');
}

export default async function BlogPage() {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  const posts = await getBlogPosts();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Blog Posts
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your blog articles and news
          </p>
        </div>
        <Link
          href="/blog/new"
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
        >
          Add Blog Post
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        {posts.length === 0 ? (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            No blog posts added yet.{' '}
            <Link href="/blog/new" className="text-indigo-600 dark:text-indigo-400 hover:underline">
              Add your first blog post
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {posts.map((post) => (
              <div key={post.id} className="p-6 flex items-center gap-6">
                {/* Thumbnail */}
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {post.thumbnail ? (
                    <img src={post.thumbnail} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                      {post.title_ru}
                    </h3>
                    {post.featured && (
                      <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs rounded">
                        Featured
                      </span>
                    )}
                    {!post.isVisible && (
                      <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs rounded">
                        Hidden
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {post.excerpt_ru || 'No excerpt'}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                    <span>/{post.slug}</span>
                    <span className="capitalize">{post.category}</span>
                    <span>{post.author}</span>
                    <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <form action={toggleFeatured}>
                    <input type="hidden" name="id" value={post.id} />
                    <input type="hidden" name="featured" value={post.featured.toString()} />
                    <button
                      type="submit"
                      className={`p-2 rounded-lg transition-colors ${
                        post.featured
                          ? 'text-amber-600 bg-amber-50 dark:bg-amber-900/20'
                          : 'text-gray-400 hover:text-amber-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                      title={post.featured ? 'Unfeature' : 'Feature'}
                    >
                      <svg className="w-4 h-4" fill={post.featured ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    </button>
                  </form>

                  <form action={toggleVisibility}>
                    <input type="hidden" name="id" value={post.id} />
                    <input type="hidden" name="isVisible" value={post.isVisible.toString()} />
                    <button
                      type="submit"
                      className={`p-2 rounded-lg transition-colors ${
                        post.isVisible
                          ? 'text-green-600 bg-green-50 dark:bg-green-900/20'
                          : 'text-gray-400 hover:text-green-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                      title={post.isVisible ? 'Hide' : 'Show'}
                    >
                      {post.isVisible ? <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg> : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>}
                    </button>
                  </form>

                  <Link
                    href={`/blog/${post.id}`}
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    title="Edit"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  </Link>

                  <form action={deleteBlogPost}>
                    <input type="hidden" name="id" value={post.id} />
                    <ConfirmButton
                      className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      title="Delete"
                      message="Are you sure you want to delete this blog post?"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                    </ConfirmButton>
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

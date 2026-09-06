'use client';

import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useLocale } from '@/hooks/useLocale';

interface BlogPost {
  id: string;
  slug: string;
  title_en: string;
  title_ru: string;
  title_uz: string;
  excerpt_en: string;
  excerpt_ru: string;
  excerpt_uz: string;
  content_en: string;
  content_ru: string;
  content_uz: string;
  thumbnail: string;
  category: string;
  author: string;
  featured: boolean;
  publishedAt: Date;
}

interface BlogPostClientProps {
  post: BlogPost;
}

const categoryColors: Record<string, string> = {
  news: 'bg-blue-100 text-blue-700',
  tutorial: 'bg-green-100 text-green-700',
  'case-study': 'bg-purple-100 text-purple-700',
  update: 'bg-amber-100 text-amber-700',
};

export function BlogPostClient({ post }: BlogPostClientProps) {
  const { locale, t } = useLocale();

  const getLocalized = (en: string, ru: string, uz: string) => {
    if (locale === 'ru') return ru || en;
    if (locale === 'uz') return uz || en;
    return en;
  };

  const title = getLocalized(post.title_en, post.title_ru, post.title_uz);
  const content = getLocalized(post.content_en, post.content_ru, post.content_uz);

  const categoryLabel = (cat: string) => {
    const categories = t.blog.categories as Record<string, string> | undefined;
    return categories?.[cat] || cat;
  };

  return (
    <div className="min-h-screen pt-10 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="reveal">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition-colors mb-8"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t.blog.backToBlog}
          </Link>

          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[post.category] || 'bg-gray-100 text-gray-700'}`}>
                {categoryLabel(post.category)}
              </span>
              <span className="text-sm text-gray-400">
                {t.blog.publishedOn}{' '}
                {new Date(post.publishedAt).toLocaleDateString(
                  locale === 'ru' ? 'ru-RU' : locale === 'uz' ? 'uz-UZ' : 'en-US',
                  { year: 'numeric', month: 'long', day: 'numeric' }
                )}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {title}
            </h1>

            {post.author && (
              <p className="text-gray-500">
                {t.blog.byAuthor} <span className="font-medium text-gray-700">{post.author}</span>
              </p>
            )}
          </div>

          {/* Thumbnail */}
          {post.thumbnail && (
            <div className="rounded-2xl overflow-hidden mb-10">
              <img
                src={post.thumbnail}
                alt={title}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          {/* Markdown content */}
          <article className="prose prose-lg prose-gray max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-code:text-indigo-600 prose-code:before:content-none prose-code:after:content-none prose-blockquote:border-indigo-500 prose-blockquote:text-gray-600">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          </article>

          {/* Back to blog */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white font-medium rounded-full transition-all duration-300 shadow-lg shadow-indigo-500/25"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {t.blog.allPosts}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

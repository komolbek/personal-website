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
            className="inline-flex items-center gap-2 text-sm text-ink-faint hover:text-indigo-600 transition-colors mb-8"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t.blog.backToBlog}
          </Link>

          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[post.category] || 'bg-paper-alt text-ink-muted'}`}>
                {categoryLabel(post.category)}
              </span>
              <span className="text-sm text-ink-faint">
                {t.blog.publishedOn}{' '}
                {new Date(post.publishedAt).toLocaleDateString(
                  locale === 'ru' ? 'ru-RU' : locale === 'uz' ? 'uz-UZ' : 'en-US',
                  { year: 'numeric', month: 'long', day: 'numeric' }
                )}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ink mb-4">
              {title}
            </h1>

            {post.author && (
              <p className="text-ink-faint">
                {t.blog.byAuthor} <span className="font-medium text-ink-muted">{post.author}</span>
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
          <article className="prose prose-lg prose-gray max-w-none prose-headings:font-bold prose-headings:text-ink prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl prose-pre:bg-ink prose-pre:text-paper prose-code:text-indigo-600 prose-code:before:content-none prose-code:after:content-none prose-blockquote:border-indigo-500 prose-blockquote:text-ink-muted">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          </article>

          {/* Back to blog */}
          <div className="mt-16 pt-8 border-t border-line">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-ink font-semibold rounded-[9px] hover:opacity-90 transition-opacity"
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

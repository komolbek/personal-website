'use client';

import Link from 'next/link';
import { useLocale } from '@/hooks/useLocale';
import { siteConfig } from '@/config/site';
import { TelegramIcon } from '@/components/ui/Icons';

interface BlogPost {
  id: string;
  slug: string;
  title_en: string;
  title_ru: string;
  title_uz: string;
  excerpt_en: string;
  excerpt_ru: string;
  excerpt_uz: string;
  thumbnail: string;
  category: string;
  author: string;
  featured: boolean;
  publishedAt: Date;
}

interface BlogListClientProps {
  posts: BlogPost[];
}

const categoryColors: Record<string, string> = {
  news: 'bg-blue-100 text-blue-700',
  tutorial: 'bg-green-100 text-green-700',
  'case-study': 'bg-purple-100 text-purple-700',
  update: 'bg-amber-100 text-amber-700',
};

export function BlogListClient({ posts }: BlogListClientProps) {
  const { locale, t } = useLocale();

  const getLocalized = (en: string, ru: string, uz: string) => {
    if (locale === 'ru') return ru || en;
    if (locale === 'uz') return uz || en;
    return en;
  };

  const categoryLabel = (cat: string) => {
    const categories = t.blog.categories as Record<string, string> | undefined;
    return categories?.[cat] || cat;
  };

  if (posts.length === 0) {
    return (
      <div className="min-h-screen pt-10 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="reveal">
            <div className="text-center mb-16">
              <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-ink">
                {t.blog.title}
              </h1>
              <p className="text-ink-muted text-lg max-w-2xl mx-auto">
                {t.blog.subtitle}
              </p>
            </div>
          </div>

          <div className="reveal">
            <div className="text-center p-12 md:p-16 rounded-3xl bg-accent-soft border border-accent-line mb-12">
              <h2 className="text-2xl font-bold mb-4 text-ink">
                {t.blog.noPostsYet}
              </h2>
              <p className="text-ink-muted text-lg mb-8 max-w-lg mx-auto">
                {t.blog.noPostsYetDesc}
              </p>
              <a
                href={`https://t.me/${siteConfig.telegram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-accent-ink font-semibold rounded-[9px] hover:opacity-90 transition-opacity"
              >
                <TelegramIcon className="w-5 h-5" />
                {t.blog.followTelegram}
              </a>
            </div>
          </div>

          {/* Coming Soon Topics */}
          <div className="reveal">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-xl font-semibold text-ink mb-6 text-center">
                {locale === 'ru' ? 'Скоро на блоге' : locale === 'uz' ? 'Tez kunda blogda' : 'Coming Soon'}
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    en: 'How CRM Systems Transform Legal Practice in Uzbekistan',
                    ru: 'Как CRM-системы преобразуют юридическую практику в Узбекистане',
                    uz: "CRM tizimlar O'zbekistonda yuridik amaliyotni qanday o'zgartirmoqda",
                    cat: 'case-study',
                  },
                  {
                    en: 'Business Automation: When to Build vs Buy',
                    ru: 'Автоматизация бизнеса: когда создавать, а когда покупать',
                    uz: "Biznes avtomatlashtirish: qachon qurish, qachon sotib olish",
                    cat: 'tutorial',
                  },
                  {
                    en: 'AI-Powered Solutions for Uzbek Businesses',
                    ru: 'AI-решения для бизнеса в Узбекистане',
                    uz: "O'zbek bizneslari uchun AI yechimlar",
                    cat: 'news',
                  },
                  {
                    en: 'Digital Transformation Guide for Education Centers',
                    ru: 'Руководство по цифровой трансформации для учебных центров',
                    uz: "Ta'lim markazlari uchun raqamli transformatsiya qo'llanmasi",
                    cat: 'tutorial',
                  },
                ].map((topic, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 rounded-2xl bg-paper border border-line"
                  >
                    <span className={`shrink-0 mt-0.5 px-2 py-0.5 rounded-full text-xs font-medium ${categoryColors[topic.cat] || 'bg-paper-alt text-ink-muted'}`}>
                      {(t.blog.categories as Record<string, string>)?.[topic.cat] || topic.cat}
                    </span>
                    <span className="text-sm text-ink-muted">
                      {locale === 'ru' ? topic.ru : locale === 'uz' ? topic.uz : topic.en}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-10 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="reveal">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-ink">
              {t.blog.title}
            </h1>
            <p className="text-ink-muted text-lg max-w-2xl mx-auto">
              {t.blog.subtitle}
            </p>
          </div>
        </div>

        <div className="reveal grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post.id}>
              <Link href={`/blog/${post.slug}`} className="block h-full">
                <div className="group h-full rounded-3xl bg-paper backdrop-blur-sm border border-line overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10">
                  {/* Thumbnail or gradient header */}
                  {post.thumbnail ? (
                    <div className="h-48 bg-paper-alt overflow-hidden">
                      <img
                        src={post.thumbnail}
                        alt={getLocalized(post.title_en, post.title_ru, post.title_uz)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="h-48 bg-accent-soft flex items-center justify-center">
                      <svg className="w-12 h-12 text-accent/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      </svg>
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColors[post.category] || 'bg-paper-alt text-ink-muted'}`}>
                        {categoryLabel(post.category)}
                      </span>
                      <span className="text-xs text-ink-faint">
                        {new Date(post.publishedAt).toLocaleDateString(locale === 'ru' ? 'ru-RU' : locale === 'uz' ? 'uz-UZ' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </span>
                    </div>

                    <h2 className="text-lg font-bold text-ink mb-2 group-hover:text-indigo-600 transition-colors line-clamp-2">
                      {getLocalized(post.title_en, post.title_ru, post.title_uz)}
                    </h2>

                    <p className="text-ink-muted text-sm line-clamp-3 mb-4">
                      {getLocalized(post.excerpt_en, post.excerpt_ru, post.excerpt_uz)}
                    </p>

                    {post.author && (
                      <p className="text-xs text-ink-faint">
                        {t.blog.byAuthor} {post.author}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

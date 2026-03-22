import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { BlogListClient } from './BlogListClient';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Блог — Автоматизация бизнеса и технологии',
  description: 'Статьи об автоматизации бизнеса, технологических трендах и цифровой трансформации в Узбекистане. Business automation & tech insights.',
  alternates: {
    canonical: `${siteConfig.url}/blog`,
  },
};

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { isVisible: true },
    orderBy: [{ featured: 'desc' }, { publishedAt: 'desc' }],
  }).catch(() => []);

  return <BlogListClient posts={posts} />;
}

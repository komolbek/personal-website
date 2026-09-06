import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { BlogListClient } from './BlogListClient';
import { siteConfig } from '@/config/site';

// Content for this page lives in the database and is edited in
// admin.necto.uz. Without this the page is baked at build time, so an edit
// made in the admin never reaches the live site until someone redeploys.
// Sixty seconds keeps the prerendered speed and makes edits show up on their
// own.
export const revalidate = 60;

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

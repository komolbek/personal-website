import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { BlogListClient } from './BlogListClient';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Blog - Business Automation & Tech Insights | Necto Automations',
  description: 'Articles about business automation, technology trends, and digital transformation in Uzbekistan.',
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

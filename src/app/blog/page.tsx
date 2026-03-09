import { prisma } from '@/lib/prisma';
import { BlogListClient } from './BlogListClient';

export const metadata = {
  title: 'Blog',
  description: 'Articles about business automation, technology trends, and digital transformation',
};

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { isVisible: true },
    orderBy: [{ featured: 'desc' }, { publishedAt: 'desc' }],
  }).catch(() => []);

  return <BlogListClient posts={posts} />;
}

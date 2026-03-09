import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { BlogPostClient } from './BlogPostClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug } }).catch(() => null);

  if (!post) return { title: 'Post Not Found' };

  return {
    title: post.title_ru || post.title_en,
    description: post.excerpt_ru || post.excerpt_en,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug, isVisible: true },
  }).catch(() => null);

  if (!post) notFound();

  return <BlogPostClient post={post} />;
}

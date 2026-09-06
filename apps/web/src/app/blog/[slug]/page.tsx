import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { BlogPostClient } from './BlogPostClient';

// Content for this page lives in the database and is edited in
// admin.necto.uz. Without this the page is baked at build time, so an edit
// made in the admin never reaches the live site until someone redeploys.
// Sixty seconds keeps the prerendered speed and makes edits show up on their
// own.
export const revalidate = 60;

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

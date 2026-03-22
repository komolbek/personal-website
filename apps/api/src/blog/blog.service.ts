import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service.js';

@Injectable()
export class BlogService {
  constructor(private readonly db: DatabaseService) {}

  async findAll() {
    return this.db.blogPost.findMany({
      orderBy: { order: 'asc' },
    });
  }

  async findBySlug(slug: string) {
    const post = await this.db.blogPost.findUnique({ where: { slug } });
    if (!post) throw new NotFoundException('Blog post not found');
    return post;
  }

  async findOne(id: string) {
    const post = await this.db.blogPost.findUnique({ where: { id } });
    if (!post) throw new NotFoundException('Blog post not found');
    return post;
  }

  async create(data: {
    slug: string;
    title_en: string;
    title_ru: string;
    title_uz: string;
    excerpt_en?: string;
    excerpt_ru?: string;
    excerpt_uz?: string;
    content_en: string;
    content_ru: string;
    content_uz: string;
    thumbnail?: string;
    category?: string;
    author?: string;
    featured?: boolean;
    isVisible?: boolean;
    order?: number;
  }) {
    return this.db.blogPost.create({ data });
  }

  async update(id: string, data: Record<string, any>) {
    await this.findOne(id);
    return this.db.blogPost.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.db.blogPost.delete({ where: { id } });
  }

  async toggleVisibility(id: string) {
    const post = await this.findOne(id);
    return this.db.blogPost.update({
      where: { id },
      data: { isVisible: !post.isVisible },
    });
  }

  async toggleFeatured(id: string) {
    const post = await this.findOne(id);
    return this.db.blogPost.update({
      where: { id },
      data: { featured: !post.featured },
    });
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service.js';

@Injectable()
export class ProductsService {
  constructor(private readonly db: DatabaseService) {}

  async findAll() {
    return this.db.product.findMany({
      orderBy: { order: 'asc' },
      include: { _count: { select: { clientProjects: true } } },
    });
  }

  async findOne(id: string) {
    const product = await this.db.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async create(data: {
    slug: string;
    title_en: string;
    title_ru: string;
    title_uz: string;
    shortDesc_en: string;
    shortDesc_ru: string;
    shortDesc_uz: string;
    fullDesc_en: string;
    fullDesc_ru: string;
    fullDesc_uz: string;
    icon: string;
    features_en?: string[];
    features_ru?: string[];
    features_uz?: string[];
    benefits_en?: string[];
    benefits_ru?: string[];
    benefits_uz?: string[];
    order?: number;
    isVisible?: boolean;
  }) {
    return this.db.product.create({ data });
  }

  async update(id: string, data: Record<string, any>) {
    await this.findOne(id);
    return this.db.product.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.db.product.delete({ where: { id } });
  }

  async toggleVisibility(id: string) {
    const product = await this.findOne(id);
    return this.db.product.update({
      where: { id },
      data: { isVisible: !product.isVisible },
    });
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service.js';

@Injectable()
export class ProjectsService {
  constructor(private readonly db: DatabaseService) {}

  async findAll() {
    return this.db.clientProject.findMany({
      orderBy: { order: 'asc' },
      include: { product: true },
    });
  }

  async findOne(id: string) {
    const project = await this.db.clientProject.findUnique({
      where: { id },
      include: { product: true },
    });
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  async create(data: {
    slug: string;
    title_en: string;
    title_ru: string;
    title_uz: string;
    clientName?: string;
    clientLogo?: string;
    category: string;
    desc_en: string;
    desc_ru: string;
    desc_uz: string;
    challenge_en: string;
    challenge_ru: string;
    challenge_uz: string;
    solution_en: string;
    solution_ru: string;
    solution_uz: string;
    results_en?: string;
    results_ru?: string;
    results_uz?: string;
    images?: string[];
    thumbnail: string;
    appStoreUrl?: string;
    playStoreUrl?: string;
    websiteUrl?: string;
    completedDate?: string;
    featured?: boolean;
    order?: number;
    productId?: string;
    isVisible?: boolean;
  }) {
    const { completedDate, ...rest } = data;
    return this.db.clientProject.create({
      data: {
        ...rest,
        completedDate: completedDate ? new Date(completedDate) : undefined,
      },
    });
  }

  async update(id: string, data: Record<string, any>) {
    await this.findOne(id);
    const { completedDate, ...rest } = data;
    return this.db.clientProject.update({
      where: { id },
      data: {
        ...rest,
        ...(completedDate !== undefined
          ? { completedDate: completedDate ? new Date(completedDate) : null }
          : {}),
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.db.clientProject.delete({ where: { id } });
  }

  async toggleVisibility(id: string) {
    const project = await this.findOne(id);
    return this.db.clientProject.update({
      where: { id },
      data: { isVisible: !project.isVisible },
    });
  }

  async toggleFeatured(id: string) {
    const project = await this.findOne(id);
    return this.db.clientProject.update({
      where: { id },
      data: { featured: !project.featured },
    });
  }
}

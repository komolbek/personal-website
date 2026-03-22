import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service.js';

@Injectable()
export class PartnersService {
  constructor(private readonly db: DatabaseService) {}

  async findAll() {
    return this.db.partner.findMany({
      orderBy: { order: 'asc' },
      include: { _count: { select: { testimonials: true } } },
    });
  }

  async findPublic() {
    return this.db.partner.findMany({
      where: { isVisible: true },
      orderBy: { order: 'asc' },
      include: {
        testimonials: {
          where: { status: 'APPROVED', isVisible: true },
        },
      },
    });
  }

  async findOne(id: string) {
    const partner = await this.db.partner.findUnique({
      where: { id },
      include: { testimonials: true },
    });
    if (!partner) throw new NotFoundException('Partner not found');
    return partner;
  }

  async create(data: {
    name: string;
    logo: string;
    website?: string;
    desc_en?: string;
    desc_ru?: string;
    desc_uz?: string;
    featured?: boolean;
    order?: number;
    isVisible?: boolean;
  }) {
    return this.db.partner.create({ data });
  }

  async update(id: string, data: Record<string, any>) {
    await this.findOne(id);
    return this.db.partner.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.db.partner.delete({ where: { id } });
  }

  async toggleVisibility(id: string) {
    const partner = await this.findOne(id);
    return this.db.partner.update({
      where: { id },
      data: { isVisible: !partner.isVisible },
    });
  }

  async toggleFeatured(id: string) {
    const partner = await this.findOne(id);
    return this.db.partner.update({
      where: { id },
      data: { featured: !partner.featured },
    });
  }
}

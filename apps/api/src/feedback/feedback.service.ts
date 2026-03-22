import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service.js';

@Injectable()
export class FeedbackService {
  constructor(private readonly db: DatabaseService) {}

  async findAll() {
    return this.db.feedback.findMany({
      orderBy: { createdAt: 'desc' },
      include: { partner: true },
    });
  }

  async findPublic() {
    return this.db.feedback.findMany({
      where: { status: 'APPROVED', isVisible: true },
      orderBy: { createdAt: 'desc' },
      include: { partner: true },
    });
  }

  async findOne(id: string) {
    const feedback = await this.db.feedback.findUnique({
      where: { id },
      include: { partner: true },
    });
    if (!feedback) throw new NotFoundException('Feedback not found');
    return feedback;
  }

  async create(data: {
    authorName: string;
    authorEmail?: string;
    position_en?: string;
    position_ru?: string;
    position_uz?: string;
    quote_en: string;
    quote_ru?: string;
    quote_uz?: string;
    rating?: number;
    status?: 'PENDING' | 'APPROVED' | 'REJECTED';
    featured?: boolean;
    isVisible?: boolean;
    partnerId?: string;
  }) {
    return this.db.feedback.create({ data });
  }

  async updateStatus(id: string, status: 'PENDING' | 'APPROVED' | 'REJECTED') {
    await this.findOne(id);
    return this.db.feedback.update({
      where: { id },
      data: { status },
    });
  }

  async toggleFeatured(id: string) {
    const feedback = await this.findOne(id);
    return this.db.feedback.update({
      where: { id },
      data: { featured: !feedback.featured },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.db.feedback.delete({ where: { id } });
  }
}

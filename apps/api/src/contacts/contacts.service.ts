import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service.js';

@Injectable()
export class ContactsService {
  constructor(private readonly db: DatabaseService) {}

  async findAll() {
    return this.db.contactSubmission.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(data: {
    name: string;
    email?: string;
    phone: string;
    company?: string;
    service?: string;
    budget?: string;
    message: string;
  }) {
    return this.db.contactSubmission.create({
      data: {
        ...data,
        source: 'web',
      },
    });
  }

  async markAsRead(id: string) {
    const submission = await this.db.contactSubmission.findUnique({ where: { id } });
    if (!submission) throw new NotFoundException('Contact submission not found');
    return this.db.contactSubmission.update({
      where: { id },
      data: { isRead: true },
    });
  }

  async remove(id: string) {
    const submission = await this.db.contactSubmission.findUnique({ where: { id } });
    if (!submission) throw new NotFoundException('Contact submission not found');
    return this.db.contactSubmission.delete({ where: { id } });
  }
}

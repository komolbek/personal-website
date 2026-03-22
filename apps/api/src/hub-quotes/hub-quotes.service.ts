import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service.js';

@Injectable()
export class HubQuotesService {
  constructor(private readonly db: DatabaseService) {}

  // ── Quotes ──

  async findAllQuotes(projectId?: string) {
    return this.db.hubQuote.findMany({
      where: projectId ? { projectId } : undefined,
      orderBy: { createdAt: 'desc' },
      include: { project: true, contact: true },
    });
  }

  async findOneQuote(id: string) {
    const quote = await this.db.hubQuote.findUnique({
      where: { id },
      include: { project: true, contact: true },
    });
    if (!quote) throw new NotFoundException('Quote not found');
    return quote;
  }

  async createQuote(data: {
    projectId?: string;
    contactId?: string;
    clientName: string;
    clientPhone?: string;
    items: any[];
    currency?: string;
    discountPercent?: number;
    notes?: string;
  }) {
    const basePrice = data.items.reduce(
      (sum: number, item: any) => sum + (item.price || 0),
      0,
    );
    const discountPercent = data.discountPercent || 0;
    const totalPrice = basePrice * (1 - discountPercent / 100);

    return this.db.hubQuote.create({
      data: {
        projectId: data.projectId || null,
        contactId: data.contactId || null,
        clientName: data.clientName,
        clientPhone: data.clientPhone || null,
        items: data.items,
        basePrice,
        totalPrice,
        currency: (data.currency as any) || 'USD',
        discountPercent: discountPercent || null,
        notes: data.notes || null,
        validUntil: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      },
    });
  }

  async updateQuoteStatus(id: string, status: string) {
    await this.findOneQuote(id);
    return this.db.hubQuote.update({
      where: { id },
      data: { status: status as any },
    });
  }

  async removeQuote(id: string) {
    await this.findOneQuote(id);
    return this.db.hubQuote.delete({ where: { id } });
  }

  // ── Contracts ──

  async findAllContracts(projectId?: string) {
    return this.db.hubContract.findMany({
      where: projectId ? { projectId } : undefined,
      orderBy: { createdAt: 'desc' },
      include: { project: true },
    });
  }

  async findOneContract(id: string) {
    const contract = await this.db.hubContract.findUnique({
      where: { id },
      include: { project: true },
    });
    if (!contract) throw new NotFoundException('Contract not found');
    return contract;
  }

  async createContract(data: {
    projectId: string;
    clientName: string;
    clientContact?: string;
    scopeDescription?: string;
    totalPrice: number;
    currency?: string;
    paymentTerms?: string;
    startDate?: string;
    deadline?: string;
  }) {
    return this.db.hubContract.create({
      data: {
        projectId: data.projectId,
        clientName: data.clientName,
        clientContact: data.clientContact || null,
        scopeDescription: data.scopeDescription || null,
        totalPrice: data.totalPrice,
        currency: (data.currency as any) || 'USD',
        paymentTerms: data.paymentTerms || null,
        startDate: data.startDate ? new Date(data.startDate) : null,
        deadline: data.deadline ? new Date(data.deadline) : null,
      },
    });
  }

  async updateContractStatus(id: string, status: string) {
    await this.findOneContract(id);
    const updateData: any = { status };
    if (status === 'SIGNED') {
      updateData.signedDate = new Date();
    }
    return this.db.hubContract.update({
      where: { id },
      data: updateData,
    });
  }

  async removeContract(id: string) {
    await this.findOneContract(id);
    return this.db.hubContract.delete({ where: { id } });
  }
}

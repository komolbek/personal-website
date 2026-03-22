import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service.js';

@Injectable()
export class HubClientsService {
  constructor(private readonly db: DatabaseService) {}

  async findAll(productId?: string) {
    return this.db.hubClient.findMany({
      where: productId ? { productId } : undefined,
      orderBy: { createdAt: 'desc' },
      include: { lead: true, product: true },
    });
  }

  async findOne(id: string) {
    const client = await this.db.hubClient.findUnique({
      where: { id },
      include: {
        product: true,
        lead: true,
        payments: { orderBy: { date: 'desc' } },
      },
    });
    if (!client) throw new NotFoundException('Client not found');
    return client;
  }

  async create(data: {
    productId: string;
    name: string;
    contactPerson?: string;
    phone?: string;
    plan?: string;
    monthlyFee?: number;
    currency?: string;
    notes?: string;
  }) {
    return this.db.hubClient.create({
      data: {
        productId: data.productId,
        name: data.name,
        contactPerson: data.contactPerson || null,
        phone: data.phone || null,
        plan: data.plan || null,
        monthlyFee: data.monthlyFee ?? null,
        currency: (data.currency as any) || 'USD',
        startDate: new Date(),
        notes: data.notes || null,
      },
    });
  }

  async update(
    id: string,
    data: {
      name?: string;
      contactPerson?: string;
      phone?: string;
      plan?: string;
      monthlyFee?: number;
      currency?: string;
      paymentStatus?: string;
      notes?: string;
    },
  ) {
    await this.findOne(id);
    return this.db.hubClient.update({
      where: { id },
      data: {
        name: data.name,
        contactPerson: data.contactPerson ?? undefined,
        phone: data.phone ?? undefined,
        plan: data.plan ?? undefined,
        monthlyFee: data.monthlyFee ?? undefined,
        currency: data.currency ? (data.currency as any) : undefined,
        paymentStatus: data.paymentStatus ? (data.paymentStatus as any) : undefined,
        notes: data.notes ?? undefined,
      },
    });
  }

  async recordPayment(
    clientId: string,
    data: {
      amount: number;
      description?: string;
      date?: string;
    },
  ) {
    const client = await this.db.hubClient.findUnique({
      where: { id: clientId },
      include: { product: true },
    });
    if (!client) throw new NotFoundException('Client not found');

    const payment = await this.db.hubPayment.create({
      data: {
        type: 'INCOME',
        amount: data.amount,
        currency: client.currency,
        category: 'PRODUCT_REVENUE',
        productId: client.productId,
        clientId: client.id,
        description:
          data.description ||
          `${client.product.name} - ${client.name} subscription`,
        date: data.date ? new Date(data.date) : new Date(),
      },
    });

    await this.db.hubClient.update({
      where: { id: clientId },
      data: { lastPayment: new Date(), paymentStatus: 'ACTIVE' },
    });

    return payment;
  }

  async deletePayment(paymentId: string) {
    const payment = await this.db.hubPayment.findUnique({ where: { id: paymentId } });
    if (!payment) throw new NotFoundException('Payment not found');
    return this.db.hubPayment.delete({ where: { id: paymentId } });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.db.hubClient.delete({ where: { id } });
  }
}

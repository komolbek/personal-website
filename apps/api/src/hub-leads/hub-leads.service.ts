import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service.js';

@Injectable()
export class HubLeadsService {
  constructor(private readonly db: DatabaseService) {}

  async findAll(productId?: string) {
    return this.db.hubLead.findMany({
      where: productId ? { productId } : undefined,
      orderBy: { createdAt: 'desc' },
      include: { product: true },
    });
  }

  async findOne(id: string) {
    const lead = await this.db.hubLead.findUnique({
      where: { id },
      include: { product: true, client: true },
    });
    if (!lead) throw new NotFoundException('Lead not found');
    return lead;
  }

  async create(data: {
    productId: string;
    name: string;
    contactPerson?: string;
    phone?: string;
    telegram?: string;
    instagram?: string;
    address?: string;
    district?: string;
    source?: string;
    currentSystem?: string;
    notes?: string;
    followUp?: string;
  }) {
    return this.db.hubLead.create({
      data: {
        productId: data.productId,
        name: data.name,
        contactPerson: data.contactPerson || null,
        phone: data.phone || null,
        telegram: data.telegram || null,
        instagram: data.instagram || null,
        address: data.address || null,
        district: data.district || null,
        source: (data.source as any) || 'OTHER',
        currentSystem: data.currentSystem || null,
        status: 'NOT_CONTACTED',
        notes: data.notes || null,
        followUp: data.followUp ? new Date(data.followUp) : null,
      },
    });
  }

  async update(
    id: string,
    data: {
      name?: string;
      contactPerson?: string;
      phone?: string;
      telegram?: string;
      instagram?: string;
      address?: string;
      district?: string;
      source?: string;
      currentSystem?: string;
      notes?: string;
      followUp?: string;
    },
  ) {
    await this.findOne(id);
    return this.db.hubLead.update({
      where: { id },
      data: {
        name: data.name,
        contactPerson: data.contactPerson ?? undefined,
        phone: data.phone ?? undefined,
        telegram: data.telegram ?? undefined,
        instagram: data.instagram ?? undefined,
        address: data.address ?? undefined,
        district: data.district ?? undefined,
        source: data.source ? (data.source as any) : undefined,
        currentSystem: data.currentSystem ?? undefined,
        notes: data.notes ?? undefined,
        followUp: data.followUp !== undefined
          ? (data.followUp ? new Date(data.followUp) : null)
          : undefined,
      },
    });
  }

  async updateStatus(id: string, status: string) {
    const lead = await this.findOne(id);

    const updated = await this.db.hubLead.update({
      where: { id },
      data: { status: status as any, lastContact: new Date() },
    });

    // Auto-create client when lead is signed
    if (status === 'SIGNED') {
      const existingClient = await this.db.hubClient.findUnique({
        where: { leadId: id },
      });
      if (!existingClient) {
        await this.db.hubClient.create({
          data: {
            productId: lead.productId,
            leadId: lead.id,
            name: lead.name,
            contactPerson: lead.contactPerson,
            phone: lead.phone,
          },
        });
      }
    }

    return updated;
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.db.hubLead.delete({ where: { id } });
  }
}

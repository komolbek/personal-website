import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service.js';

@Injectable()
export class HubProjectsService {
  constructor(private readonly db: DatabaseService) {}

  // ── Projects ──

  async findAll() {
    return this.db.hubProject.findMany({
      include: {
        milestones: true,
        payments: { where: { type: 'INCOME' } },
        _count: { select: { quotes: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const project = await this.db.hubProject.findUnique({
      where: { id },
      include: {
        milestones: { orderBy: { dueDate: 'asc' } },
        payments: { orderBy: { date: 'desc' } },
        quotes: { orderBy: { createdAt: 'desc' } },
        contract: true,
      },
    });
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  async create(data: {
    name: string;
    type?: string;
    status?: string;
    clientContact?: string;
    clientPhone?: string;
    totalPrice?: number;
    currency?: string;
    notes?: string;
  }) {
    const project = await this.db.hubProject.create({
      data: {
        name: data.name,
        type: data.type || null,
        status: (data.status as any) || 'LEAD',
        clientContact: data.clientContact || null,
        clientPhone: data.clientPhone || null,
        totalPrice: data.totalPrice ?? null,
        currency: (data.currency as any) || 'USD',
        notes: data.notes || null,
      },
    });

    // Auto-create contact from project client info
    if (data.clientContact) {
      const existing = await this.db.hubContact.findFirst({
        where: { name: data.clientContact },
      });
      if (!existing) {
        await this.db.hubContact.create({
          data: {
            name: data.clientContact,
            phone: data.clientPhone || null,
            type: 'CLIENT',
          },
        });
      }
    }

    return project;
  }

  async update(
    id: string,
    data: {
      name?: string;
      type?: string;
      status?: string;
      clientContact?: string;
      clientPhone?: string;
      totalPrice?: number;
      currency?: string;
      upfrontPercent?: number;
      referralSource?: string;
      referralFeePercent?: number;
      startDate?: string;
      deadline?: string;
      notes?: string;
    },
  ) {
    await this.findOne(id);
    return this.db.hubProject.update({
      where: { id },
      data: {
        name: data.name,
        type: data.type ?? undefined,
        status: data.status ? (data.status as any) : undefined,
        clientContact: data.clientContact ?? undefined,
        clientPhone: data.clientPhone ?? undefined,
        totalPrice: data.totalPrice ?? undefined,
        currency: data.currency ? (data.currency as any) : undefined,
        upfrontPercent: data.upfrontPercent ?? undefined,
        referralSource: data.referralSource ?? undefined,
        referralFeePercent: data.referralFeePercent ?? undefined,
        startDate: data.startDate !== undefined
          ? (data.startDate ? new Date(data.startDate) : null)
          : undefined,
        deadline: data.deadline !== undefined
          ? (data.deadline ? new Date(data.deadline) : null)
          : undefined,
        notes: data.notes ?? undefined,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.db.hubProject.delete({ where: { id } });
  }

  // ── Milestones ──

  async addMilestone(
    projectId: string,
    data: {
      title: string;
      amount: number;
      currency?: string;
      dueDate?: string;
    },
  ) {
    await this.findOne(projectId);
    return this.db.hubProjectMilestone.create({
      data: {
        projectId,
        title: data.title,
        amount: data.amount,
        currency: (data.currency as any) || 'USD',
        dueDate: data.dueDate ? new Date(data.dueDate) : null,
      },
    });
  }

  async updateMilestoneStatus(milestoneId: string, status: string) {
    const milestone = await this.db.hubProjectMilestone.findUnique({
      where: { id: milestoneId },
      include: { project: true },
    });
    if (!milestone) throw new NotFoundException('Milestone not found');

    const updateData: any = { status };

    // Auto-create payment when milestone is marked as PAID
    if (status === 'PAID') {
      updateData.paidDate = new Date();
      await this.db.hubPayment.create({
        data: {
          type: 'INCOME',
          amount: milestone.amount,
          currency: milestone.currency,
          category: 'PROJECT_REVENUE',
          projectId: milestone.projectId,
          milestoneId: milestone.id,
          description: `${milestone.project.name} - ${milestone.title}`,
          date: new Date(),
        },
      });
    }

    return this.db.hubProjectMilestone.update({
      where: { id: milestoneId },
      data: updateData,
    });
  }

  async removeMilestone(milestoneId: string) {
    const milestone = await this.db.hubProjectMilestone.findUnique({
      where: { id: milestoneId },
    });
    if (!milestone) throw new NotFoundException('Milestone not found');
    return this.db.hubProjectMilestone.delete({ where: { id: milestoneId } });
  }

  // ── Payments ──

  async addPayment(
    projectId: string,
    data: {
      type: string;
      amount: number;
      currency?: string;
      category?: string;
      description: string;
      date?: string;
    },
  ) {
    await this.findOne(projectId);
    return this.db.hubPayment.create({
      data: {
        type: data.type as any,
        amount: data.amount,
        currency: (data.currency as any) || 'USD',
        category: (data.category as any) || 'OTHER',
        projectId,
        description: data.description,
        date: data.date ? new Date(data.date) : new Date(),
      },
    });
  }

  async removePayment(paymentId: string) {
    const payment = await this.db.hubPayment.findUnique({
      where: { id: paymentId },
    });
    if (!payment) throw new NotFoundException('Payment not found');
    return this.db.hubPayment.delete({ where: { id: paymentId } });
  }
}

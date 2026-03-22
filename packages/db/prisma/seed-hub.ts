import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Necto Hub database...');

  // 1. Create admin user
  const passwordHash = await bcrypt.hash('admin123', 12);
  const admin = await prisma.hubUser.upsert({
    where: { email: 'admin@necto.uz' },
    update: {},
    create: {
      email: 'admin@necto.uz',
      name: 'Kamoliddin',
      passwordHash,
      role: 'ADMIN',
    },
  });
  console.log('Admin user created:', admin.email);

  // 2. Create products
  const wabi = await prisma.hubProduct.upsert({
    where: { slug: 'wabi' },
    update: {},
    create: {
      name: 'Wabi',
      slug: 'wabi',
      status: 'ACTIVE',
      description: 'Beauty salon CRM — appointment booking, client management, analytics',
    },
  });

  const avtobox = await prisma.hubProduct.upsert({
    where: { slug: 'avtobox' },
    update: {},
    create: {
      name: 'AvtoBox',
      slug: 'avtobox',
      status: 'ACTIVE',
      description: 'Auto service ERP — inventory, orders, CRM for car service businesses',
    },
  });

  await prisma.hubProduct.upsert({
    where: { slug: 'talimx' },
    update: {},
    create: {
      name: 'TalimX',
      slug: 'talimx',
      status: 'PARKED',
      description: 'Educational center management system',
    },
  });

  await prisma.hubProduct.upsert({
    where: { slug: 'yuridix' },
    update: {},
    create: {
      name: 'Yuridix',
      slug: 'yuridix',
      status: 'PARKED',
      description: 'Legal practice management CRM',
    },
  });

  await prisma.hubProduct.upsert({
    where: { slug: 'moneycontrol' },
    update: {},
    create: {
      name: 'MoneyControl',
      slug: 'moneycontrol',
      status: 'PARKED',
      description: 'Personal finance tracking app',
    },
  });

  console.log('Products created');

  // 3. Create projects (find-or-create to avoid duplicates on re-run)
  const findOrCreateProject = async (name: string, data: Parameters<typeof prisma.hubProject.create>[0]['data']) => {
    const existing = await prisma.hubProject.findFirst({ where: { name } });
    if (existing) return existing;
    return prisma.hubProject.create({ data });
  };

  const fourEvent = await findOrCreateProject('4Event', {
    name: '4Event',
    type: 'E-commerce Web App',
    status: 'IN_PROGRESS',
    clientContact: '4Event Team',
    totalPrice: 6000,
    currency: 'USD',
    upfrontPercent: 40,
    notes: 'Event equipment rental e-commerce platform',
  });

  const expoStand = await findOrCreateProject('ExpoStand', {
    name: 'ExpoStand',
    type: 'Web Application',
    status: 'IN_PROGRESS',
    clientContact: 'ExpoStand Team',
    totalPrice: 3000,
    currency: 'USD',
    notes: 'AI exhibition booth designer',
  });

  const avtoboxDelivery = await findOrCreateProject('AvtoBox Delivery', {
    name: 'AvtoBox Delivery',
    type: 'Product Delivery',
    status: 'PAID',
    totalPrice: 2000,
    currency: 'USD',
    notes: 'AvtoBox initial delivery and setup',
  });

  console.log('Projects created');

  // 4. Create milestones (skip if project already has milestones)
  const fourEventMilestones = await prisma.hubProjectMilestone.count({ where: { projectId: fourEvent.id } });
  if (fourEventMilestones === 0) {
    await prisma.hubProjectMilestone.createMany({
      data: [
        { projectId: fourEvent.id, title: '40% Upfront', amount: 2400, currency: 'USD', status: 'PAID', paidDate: new Date('2026-01-15') },
        { projectId: fourEvent.id, title: '30% Mid-delivery', amount: 1800, currency: 'USD', status: 'PENDING' },
        { projectId: fourEvent.id, title: '30% Final delivery', amount: 1800, currency: 'USD', status: 'PENDING' },
      ],
    });
  }

  const expoStandMilestones = await prisma.hubProjectMilestone.count({ where: { projectId: expoStand.id } });
  if (expoStandMilestones === 0) {
    await prisma.hubProjectMilestone.createMany({
      data: [
        { projectId: expoStand.id, title: '50% Upfront', amount: 1500, currency: 'USD', status: 'PENDING' },
        { projectId: expoStand.id, title: '50% On delivery', amount: 1500, currency: 'USD', status: 'PENDING' },
      ],
    });
  }

  console.log('Milestones created');

  // 5. Create payments (skip if project already has payments)
  const fourEventPayments = await prisma.hubPayment.count({ where: { projectId: fourEvent.id } });
  if (fourEventPayments === 0) {
    await prisma.hubPayment.createMany({
      data: [
        {
          type: 'INCOME',
          amount: 2400,
          currency: 'USD',
          category: 'PROJECT_REVENUE',
          projectId: fourEvent.id,
          description: '4Event - 40% upfront payment',
          date: new Date('2026-01-15'),
        },
        {
          type: 'INCOME',
          amount: 1400,
          currency: 'USD',
          category: 'PROJECT_REVENUE',
          projectId: fourEvent.id,
          description: '4Event - additional work payment',
          date: new Date('2026-02-10'),
        },
      ],
    });
  }

  const avtoboxPayments = await prisma.hubPayment.count({ where: { projectId: avtoboxDelivery.id } });
  if (avtoboxPayments === 0) {
    await prisma.hubPayment.createMany({
      data: [
        {
          type: 'INCOME',
          amount: 2000,
          currency: 'USD',
          category: 'PROJECT_REVENUE',
          projectId: avtoboxDelivery.id,
          description: 'AvtoBox delivery - full payment',
          date: new Date('2025-12-20'),
        },
      ],
    });
  }

  console.log('Payments created');

  // 6. Create Wabi lead (Zenn) — skip if exists
  const existingLead = await prisma.hubLead.findFirst({ where: { name: 'Zenn', productId: wabi.id } });
  if (!existingLead) {
    await prisma.hubLead.create({
      data: {
        productId: wabi.id,
        name: 'Zenn',
        source: 'INSTAGRAM',
        status: 'CONTACTED',
        notes: 'Beauty salon interested in CRM',
      },
    });
  }

  // 7. Create Wabi client (Seven) — skip if exists
  const existingClient = await prisma.hubClient.findFirst({ where: { name: 'Seven', productId: wabi.id } });
  if (!existingClient) {
    await prisma.hubClient.create({
      data: {
        productId: wabi.id,
        name: 'Seven',
        plan: 'Basic',
        monthlyFee: 275000,
        currency: 'UZS',
        paymentStatus: 'ACTIVE',
        startDate: new Date('2026-01-01'),
        lastPayment: new Date('2026-03-01'),
        notes: 'Beauty salon, ~250-300K UZS/month',
      },
    });
  }

  console.log('Leads and clients created');

  console.log('Seed complete!');
  console.log('\nLogin credentials:');
  console.log('  Email: admin@necto.uz');
  console.log('  Password: admin123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

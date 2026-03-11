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

  // 3. Create projects
  const fourEvent = await prisma.hubProject.create({
    data: {
      name: '4Event',
      type: 'E-commerce Web App',
      status: 'IN_PROGRESS',
      clientContact: '4Event Team',
      totalPrice: 6000,
      currency: 'USD',
      upfrontPercent: 40,
      notes: 'Event equipment rental e-commerce platform',
    },
  });

  const expoStand = await prisma.hubProject.create({
    data: {
      name: 'ExpoStand',
      type: 'Web Application',
      status: 'IN_PROGRESS',
      clientContact: 'ExpoStand Team',
      totalPrice: 3000,
      currency: 'USD',
      notes: 'AI exhibition booth designer',
    },
  });

  const avtoboxDelivery = await prisma.hubProject.create({
    data: {
      name: 'AvtoBox Delivery',
      type: 'Product Delivery',
      status: 'PAID',
      totalPrice: 2000,
      currency: 'USD',
      notes: 'AvtoBox initial delivery and setup',
    },
  });

  console.log('Projects created');

  // 4. Create milestones for 4Event (40/30/30 split)
  await prisma.hubProjectMilestone.createMany({
    data: [
      { projectId: fourEvent.id, title: '40% Upfront', amount: 2400, currency: 'USD', status: 'PAID', paidDate: new Date('2026-01-15') },
      { projectId: fourEvent.id, title: '30% Mid-delivery', amount: 1800, currency: 'USD', status: 'PENDING' },
      { projectId: fourEvent.id, title: '30% Final delivery', amount: 1800, currency: 'USD', status: 'PENDING' },
    ],
  });

  // ExpoStand milestones (50/50)
  await prisma.hubProjectMilestone.createMany({
    data: [
      { projectId: expoStand.id, title: '50% Upfront', amount: 1500, currency: 'USD', status: 'PENDING' },
      { projectId: expoStand.id, title: '50% On delivery', amount: 1500, currency: 'USD', status: 'PENDING' },
    ],
  });

  console.log('Milestones created');

  // 5. Create payments
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
        amount: 2000,
        currency: 'USD',
        category: 'PROJECT_REVENUE',
        projectId: avtoboxDelivery.id,
        description: 'AvtoBox delivery - full payment',
        date: new Date('2025-12-20'),
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

  console.log('Payments created');

  // 6. Create Wabi lead (Zenn)
  await prisma.hubLead.create({
    data: {
      productId: wabi.id,
      name: 'Zenn',
      source: 'INSTAGRAM',
      status: 'CONTACTED',
      notes: 'Beauty salon interested in CRM',
    },
  });

  // 7. Create Wabi client (Seven)
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

  console.log('Leads and clients created');

  // 8. Seed pricing configs
  const pricingData = [
    // Websites
    { projectType: 'website', itemName: 'Base: Single page, responsive, deployed', itemType: 'BASE' as const, price: 400, sortOrder: 0 },
    { projectType: 'website', itemName: 'Additional page (per page)', itemType: 'FEATURE' as const, price: 80, sortOrder: 1 },
    { projectType: 'website', itemName: 'CMS / admin panel', itemType: 'FEATURE' as const, price: 300, sortOrder: 2 },
    { projectType: 'website', itemName: 'Multi-language support (per language)', itemType: 'FEATURE' as const, price: 150, sortOrder: 3 },
    { projectType: 'website', itemName: 'Contact form with Telegram notification', itemType: 'FEATURE' as const, price: 50, sortOrder: 4 },
    // Web Apps
    { projectType: 'webapp', itemName: 'Base: Auth + 1 CRUD module + basic UI + deployed', itemType: 'BASE' as const, price: 1500, sortOrder: 0 },
    { projectType: 'webapp', itemName: 'Additional CRUD module', itemType: 'FEATURE' as const, price: 400, sortOrder: 1 },
    { projectType: 'webapp', itemName: 'User roles & permissions', itemType: 'FEATURE' as const, price: 300, sortOrder: 2 },
    { projectType: 'webapp', itemName: 'Dashboard with charts & analytics', itemType: 'FEATURE' as const, price: 500, sortOrder: 3 },
    // Telegram Bots
    { projectType: 'telegram_bot', itemName: 'Base: Menu navigation + auto-replies + basic flow', itemType: 'BASE' as const, price: 250, sortOrder: 0 },
    { projectType: 'telegram_bot', itemName: 'Database integration', itemType: 'FEATURE' as const, price: 200, sortOrder: 1 },
    // Mobile
    { projectType: 'mobile', itemName: 'Base: 1 platform, 3 screens, basic API', itemType: 'BASE' as const, price: 2000, sortOrder: 0 },
    { projectType: 'mobile', itemName: 'Cross-platform (add second platform)', itemType: 'FEATURE' as const, price: 1500, sortOrder: 1 },
  ];

  await prisma.hubPricingConfig.createMany({ data: pricingData });

  console.log('Pricing configs created');
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

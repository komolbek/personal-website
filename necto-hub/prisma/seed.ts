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

  // 8. Seed project types and features
  const projectTypesData = [
    {
      name: 'Website / Landing Page',
      basePrice: 400,
      baseDescription: 'Single page, responsive, deployed',
      sortOrder: 0,
      features: [
        { name: 'Additional page', price: 80, supportsQuantity: true, unitLabel: 'page', sortOrder: 0 },
        { name: 'CMS / admin panel', price: 300, supportsQuantity: false, unitLabel: null, sortOrder: 1 },
        { name: 'Multi-language support', price: 150, supportsQuantity: true, unitLabel: 'language', sortOrder: 2 },
        { name: 'Contact form with Telegram notification', price: 50, supportsQuantity: false, unitLabel: null, sortOrder: 3 },
        { name: 'Gallery', price: 100, supportsQuantity: false, unitLabel: null, sortOrder: 4 },
        { name: 'Blog', price: 200, supportsQuantity: false, unitLabel: null, sortOrder: 5 },
        { name: 'Animations', price: 150, supportsQuantity: false, unitLabel: null, sortOrder: 6 },
        { name: 'SEO', price: 100, supportsQuantity: false, unitLabel: null, sortOrder: 7 },
        { name: 'Analytics', price: 50, supportsQuantity: false, unitLabel: null, sortOrder: 8 },
      ],
    },
    {
      name: 'Web Application / SaaS',
      basePrice: 1500,
      baseDescription: 'Auth + 1 CRUD module + basic UI + deployed',
      sortOrder: 1,
      features: [
        { name: 'Additional CRUD module', price: 400, supportsQuantity: true, unitLabel: null, sortOrder: 0 },
        { name: 'User roles & permissions', price: 300, supportsQuantity: false, unitLabel: null, sortOrder: 1 },
        { name: 'Dashboard with charts & analytics', price: 500, supportsQuantity: false, unitLabel: null, sortOrder: 2 },
        { name: 'PDF / Excel reports', price: 300, supportsQuantity: false, unitLabel: null, sortOrder: 3 },
        { name: 'Telegram bot integration', price: 400, supportsQuantity: false, unitLabel: null, sortOrder: 4 },
        { name: 'Email notifications', price: 200, supportsQuantity: false, unitLabel: null, sortOrder: 5 },
        { name: 'File uploads', price: 200, supportsQuantity: false, unitLabel: null, sortOrder: 6 },
        { name: 'Search & filtering', price: 200, supportsQuantity: false, unitLabel: null, sortOrder: 7 },
        { name: 'Multi-language support', price: 200, supportsQuantity: true, unitLabel: 'language', sortOrder: 8 },
        { name: 'Multi-tenant SaaS', price: 800, supportsQuantity: false, unitLabel: null, sortOrder: 9 },
        { name: 'API layer', price: 500, supportsQuantity: false, unitLabel: null, sortOrder: 10 },
      ],
    },
    {
      name: 'Telegram Bot',
      basePrice: 250,
      baseDescription: 'Menu navigation + auto-replies + basic flow',
      sortOrder: 2,
      features: [
        { name: 'Database integration', price: 200, supportsQuantity: false, unitLabel: null, sortOrder: 0 },
        { name: 'Booking flow', price: 300, supportsQuantity: false, unitLabel: null, sortOrder: 1 },
        { name: 'Order / catalog flow', price: 350, supportsQuantity: false, unitLabel: null, sortOrder: 2 },
        { name: 'Admin notifications', price: 100, supportsQuantity: false, unitLabel: null, sortOrder: 3 },
        { name: 'Web admin panel', price: 500, supportsQuantity: false, unitLabel: null, sortOrder: 4 },
        { name: 'Multi-language support', price: 150, supportsQuantity: true, unitLabel: 'language', sortOrder: 5 },
        { name: 'Analytics', price: 200, supportsQuantity: false, unitLabel: null, sortOrder: 6 },
      ],
    },
    {
      name: 'Mobile Application',
      basePrice: 2000,
      baseDescription: '1 platform, 3 screens, basic API',
      sortOrder: 3,
      features: [
        { name: 'Cross-platform (add second platform)', price: 1500, supportsQuantity: false, unitLabel: null, sortOrder: 0 },
        { name: 'Additional screen', price: 200, supportsQuantity: true, unitLabel: 'screen', sortOrder: 1 },
        { name: 'Push notifications', price: 300, supportsQuantity: false, unitLabel: null, sortOrder: 2 },
        { name: 'Auth system', price: 400, supportsQuantity: false, unitLabel: null, sortOrder: 3 },
        { name: 'Offline mode', price: 400, supportsQuantity: false, unitLabel: null, sortOrder: 4 },
        { name: 'Camera integration', price: 200, supportsQuantity: false, unitLabel: null, sortOrder: 5 },
        { name: 'App Store submission', price: 150, supportsQuantity: true, unitLabel: 'store', sortOrder: 6 },
      ],
    },
  ];

  for (const typeData of projectTypesData) {
    const { features, ...typeFields } = typeData;
    const projectType = await prisma.hubProjectType.upsert({
      where: { name: typeFields.name },
      update: {},
      create: typeFields,
    });
    for (const feature of features) {
      await prisma.hubProjectTypeFeature.upsert({
        where: { projectTypeId_name: { projectTypeId: projectType.id, name: feature.name } },
        update: {},
        create: { ...feature, projectTypeId: projectType.id },
      });
    }
  }

  console.log('Project types and features created');
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

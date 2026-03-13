import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { CalculatorClient } from './CalculatorClient';

export default async function CalculatorPage() {
  const session = await getSession();
  if (!session) redirect('/login');

  const [projectTypes, contacts] = await Promise.all([
    prisma.hubProjectType.findMany({
      where: { isActive: true },
      include: {
        features: {
          where: { isActive: true },
          orderBy: { sortOrder: 'asc' },
        },
      },
      orderBy: { sortOrder: 'asc' },
    }),
    prisma.hubContact.findMany({
      select: { id: true, name: true, phone: true, company: true, type: true },
      orderBy: { name: 'asc' },
    }),
  ]);

  // Serialize for client component
  const serialized = projectTypes.map((pt) => ({
    id: pt.id,
    name: pt.name,
    basePrice: pt.basePrice,
    baseDescription: pt.baseDescription,
    features: pt.features.map((f) => ({
      id: f.id,
      name: f.name,
      price: f.price,
      supportsQuantity: f.supportsQuantity,
      unitLabel: f.unitLabel,
    })),
  }));

  return <CalculatorClient projectTypes={serialized} contacts={contacts} />;
}

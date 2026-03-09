import { prisma } from '@/lib/prisma';
import { dbPartnerToPartner } from '@/lib/transforms';
import { partners as staticPartners, getPartnersWithTestimonials } from '@/config/partners';
import { PartnersContent } from './PartnersContent';

export default async function PartnersPage() {
  const dbPartners = await prisma.partner.findMany({
    where: { isVisible: true },
    orderBy: { order: 'asc' },
    include: {
      testimonials: {
        where: { status: 'APPROVED' },
        orderBy: { createdAt: 'desc' },
      },
    },
  }).catch(() => []);

  const partners = dbPartners.length > 0 ? dbPartners.map(dbPartnerToPartner) : staticPartners;
  const partnersWithTestimonials = dbPartners.length > 0
    ? partners.filter(p => p.testimonial)
    : getPartnersWithTestimonials();

  return <PartnersContent partners={partners} partnersWithTestimonials={partnersWithTestimonials} />;
}

import { Partner } from '@/types';

// Partners are now managed through the admin panel
// This array is kept for backwards compatibility but should remain empty
// Real partners data comes from the database via the admin panel
export const partners: Partner[] = [];

export function getPartnerById(id: string): Partner | undefined {
  return partners.find((p) => p.id === id);
}

export function getFeaturedPartners(): Partner[] {
  return partners.filter((p) => p.featured);
}

export function getPartnersWithTestimonials(): Partner[] {
  return partners.filter((p) => p.testimonial);
}

import { Solution, Project, Partner, Locale } from '@/types';

// Helper to create a locale record from flat DB fields
function localeRecord(en: string, ru: string, uz: string): Record<Locale, string> {
  return { en, ru, uz };
}

function localeRecordOptional(en?: string | null, ru?: string | null, uz?: string | null): Record<Locale, string> | undefined {
  if (!en && !ru && !uz) return undefined;
  return { en: en || '', ru: ru || '', uz: uz || '' };
}

function localeArrayRecord(en: string[], ru: string[], uz: string[]): Record<Locale, string[]> {
  return { en, ru, uz };
}

// Icon mapping from DB product icon field to solution icon type
const validIcons = ['automation', 'crm', 'website', 'ecommerce', 'mobile', 'ai'];

interface DbProduct {
  id: string;
  slug: string;
  title_en: string;
  title_ru: string;
  title_uz: string;
  shortDesc_en: string;
  shortDesc_ru: string;
  shortDesc_uz: string;
  fullDesc_en: string;
  fullDesc_ru: string;
  fullDesc_uz: string;
  icon: string;
  features_en: string[];
  features_ru: string[];
  features_uz: string[];
  benefits_en: string[];
  benefits_ru: string[];
  benefits_uz: string[];
  order: number;
  isVisible: boolean;
}

interface DbClientProject {
  id: string;
  slug: string;
  title_en: string;
  title_ru: string;
  title_uz: string;
  clientName: string | null;
  clientLogo: string | null;
  category: string;
  desc_en: string;
  desc_ru: string;
  desc_uz: string;
  challenge_en: string;
  challenge_ru: string;
  challenge_uz: string;
  solution_en: string;
  solution_ru: string;
  solution_uz: string;
  results_en: string | null;
  results_ru: string | null;
  results_uz: string | null;
  images: string[];
  thumbnail: string;
  appStoreUrl: string | null;
  playStoreUrl: string | null;
  websiteUrl: string | null;
  completedDate: Date | null;
  featured: boolean;
  isVisible: boolean;
  order: number;
  productId: string | null;
}

interface DbPartner {
  id: string;
  name: string;
  logo: string;
  website: string | null;
  desc_en: string | null;
  desc_ru: string | null;
  desc_uz: string | null;
  featured: boolean;
  isVisible: boolean;
  order: number;
  testimonials?: DbFeedback[];
}

interface DbFeedback {
  id: string;
  authorName: string;
  authorEmail: string | null;
  position_en: string | null;
  position_ru: string | null;
  position_uz: string | null;
  avatar: string | null;
  quote_en: string;
  quote_ru: string | null;
  quote_uz: string | null;
  rating: number | null;
  status: string;
  featured: boolean;
}

export type { DbProduct, DbClientProject, DbPartner, DbFeedback };

export function dbProductToSolution(product: DbProduct): Solution {
  return {
    slug: product.slug,
    title: localeRecord(product.title_en, product.title_ru, product.title_uz),
    shortDescription: localeRecord(product.shortDesc_en, product.shortDesc_ru, product.shortDesc_uz),
    fullDescription: localeRecord(product.fullDesc_en, product.fullDesc_ru, product.fullDesc_uz),
    icon: validIcons.includes(product.icon) ? product.icon : 'automation',
    features: localeArrayRecord(product.features_en, product.features_ru, product.features_uz),
    benefits: localeArrayRecord(product.benefits_en, product.benefits_ru, product.benefits_uz),
    technologies: [],
    relatedProjects: [],
    order: product.order,
  };
}

export function dbProjectToProject(project: DbClientProject): Project {
  const links: Project['links'] = {};
  if (project.appStoreUrl) links.appStore = project.appStoreUrl;
  if (project.playStoreUrl) links.playStore = project.playStoreUrl;
  if (project.websiteUrl) links.website = project.websiteUrl;

  return {
    slug: project.slug,
    title: localeRecord(project.title_en, project.title_ru, project.title_uz),
    client: project.clientName || undefined,
    clientLogo: project.clientLogo || undefined,
    category: project.category as Project['category'],
    description: localeRecord(project.desc_en, project.desc_ru, project.desc_uz),
    challenge: localeRecord(project.challenge_en, project.challenge_ru, project.challenge_uz),
    solution: localeRecord(project.solution_en, project.solution_ru, project.solution_uz),
    results: localeRecordOptional(project.results_en, project.results_ru, project.results_uz),
    techStack: [],
    images: project.images,
    thumbnail: project.thumbnail,
    links: Object.keys(links).length > 0 ? links : undefined,
    featured: project.featured,
    completedDate: project.completedDate
      ? project.completedDate.getFullYear().toString()
      : undefined,
    relatedSolutions: [],
  };
}

export function dbPartnerToPartner(partner: DbPartner): Partner {
  const firstTestimonial = partner.testimonials?.[0];

  return {
    id: partner.id,
    name: partner.name,
    logo: partner.logo,
    website: partner.website || undefined,
    description: localeRecordOptional(partner.desc_en, partner.desc_ru, partner.desc_uz),
    testimonial: firstTestimonial
      ? {
          quote: localeRecord(
            firstTestimonial.quote_en,
            firstTestimonial.quote_ru || firstTestimonial.quote_en,
            firstTestimonial.quote_uz || firstTestimonial.quote_en,
          ),
          author: firstTestimonial.authorName,
          position: localeRecord(
            firstTestimonial.position_en || '',
            firstTestimonial.position_ru || '',
            firstTestimonial.position_uz || '',
          ),
          avatar: firstTestimonial.avatar || undefined,
        }
      : undefined,
    featured: partner.featured,
  };
}

export interface TransformedTestimonial {
  quote: Record<Locale, string>;
  author: string;
  role: Record<Locale, string>;
  company: string;
  avatar?: string;
  rating?: number;
}

export function dbFeedbackToTestimonial(feedback: DbFeedback, partnerName?: string): TransformedTestimonial {
  return {
    quote: localeRecord(
      feedback.quote_en,
      feedback.quote_ru || feedback.quote_en,
      feedback.quote_uz || feedback.quote_en,
    ),
    author: feedback.authorName,
    role: localeRecord(
      feedback.position_en || '',
      feedback.position_ru || '',
      feedback.position_uz || '',
    ),
    company: partnerName || '',
    avatar: feedback.avatar || undefined,
    rating: feedback.rating || undefined,
  };
}

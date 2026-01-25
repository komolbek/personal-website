export type Locale = 'en' | 'ru' | 'uz';

export type ProjectCategory = 'mobile' | 'website' | 'crm' | 'ai' | 'ecommerce';

// Legacy App interface - kept for backward compatibility
export interface App {
  id: string;
  name: string;
  description: Record<Locale, string>;
  longDescription?: Record<Locale, string>;
  features?: Record<Locale, string[]>;
  icon: string;
  screenshots?: string[];
  appStoreUrl?: string;
  playStoreUrl?: string;
  webUrl?: string;
  category: string;
  featured?: boolean;
  color?: string;
}

// Solution/Service interface
export interface Solution {
  slug: string;
  title: Record<Locale, string>;
  shortDescription: Record<Locale, string>;
  fullDescription: Record<Locale, string>;
  icon: string;
  features: Record<Locale, string[]>;
  benefits: Record<Locale, string[]>;
  technologies: string[];
  relatedProjects: string[];
  order: number;
}

// Project/Portfolio interface
export interface Project {
  slug: string;
  title: Record<Locale, string>;
  client?: string;
  clientLogo?: string;
  category: ProjectCategory;
  description: Record<Locale, string>;
  challenge: Record<Locale, string>;
  solution: Record<Locale, string>;
  results?: Record<Locale, string>;
  techStack: string[];
  images: string[];
  thumbnail: string;
  links?: {
    appStore?: string;
    playStore?: string;
    website?: string;
  };
  featured: boolean;
  completedDate?: string;
  relatedSolutions: string[];
}

// Partner interface
export interface Partner {
  id: string;
  name: string;
  logo: string;
  website?: string;
  description?: Record<Locale, string>;
  testimonial?: {
    quote: Record<Locale, string>;
    author: string;
    position: Record<Locale, string>;
    avatar?: string;
  };
  featured: boolean;
}

// Company statistics
export interface CompanyStats {
  projects: number;
  clients: number;
  years: number;
  satisfaction: number;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

// Enhanced contact form
export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service?: string;
  budget?: string;
  message: string;
}

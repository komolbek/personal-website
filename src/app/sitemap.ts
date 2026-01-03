import { MetadataRoute } from 'next';
import { apps } from '@/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.komolbek-ibragimov.com';

  const appPages = apps.map((app) => ({
    url: `${baseUrl}/apps/${app.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/apps`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...appPages,
  ];
}

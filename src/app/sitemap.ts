import type { MetadataRoute } from 'next';
import { states } from '@/lib/states';

export default function sitemap(): MetadataRoute.Sitemap {
  // TODO: Replace with actual domain
  const siteUrl = 'https://childsupportcalculator.org';

  const stateRoutes = states.map((state) => ({
    url: `${siteUrl}/${state.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const staticRoutes = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    },
  ];

  return [...staticRoutes, ...stateRoutes];
}

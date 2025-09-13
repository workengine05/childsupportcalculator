import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // TODO: Replace with actual domain
  const siteUrl = 'https://childsupportcalculator.org';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}

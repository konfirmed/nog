import { siteUrl } from '@/lib/site-url';
import { MetadataRoute } from 'next';

const defaultUrl = siteUrl;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/private/'],
      },
    ],
    sitemap: `${defaultUrl}/sitemap.xml`,
  };
}

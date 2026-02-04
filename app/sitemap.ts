import { MetadataRoute } from 'next';
import { supabase } from '@/utils/supabase/client';
import { generateSlug } from '@/lib/slug';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data: names } = await supabase
    .from('names_of_god')
    .select('id, name, language, updated_at');

  const nameEntries: MetadataRoute.Sitemap = (names || []).map((name) => ({
    url: `${defaultUrl}/names/${generateSlug(name.name, name.language)}`,
    lastModified: name.updated_at ? new Date(name.updated_at) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    {
      url: defaultUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${defaultUrl}/names`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${defaultUrl}/graph`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...nameEntries,
  ];
}

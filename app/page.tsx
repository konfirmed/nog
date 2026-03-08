import { Metadata } from 'next';
import { supabase } from '@/utils/supabase/client';
import Home from '@/components/home';
import { BreadcrumbJsonLd } from '@/components/json-ld';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  title: 'NAMES of G_D Across Cultures | Divine Names from Around the World',
  description: 'Explore the sacred names of G_D from Hebrew, Yoruba, Arabic, Greek, and many other languages. Discover meanings, pronunciations, and cultural significance of divine names across world traditions.',
  keywords: ['names of God', 'divine names', 'Hebrew names', 'Yoruba names', 'sacred names', 'religious studies', 'theology', 'comparative religion'],
  alternates: {
    canonical: defaultUrl,
  },
  openGraph: {
    title: 'NAMES of G_D Across Cultures',
    description: 'Explore sacred names of G_D from cultures and languages around the world. Discover meanings, pronunciations, and cultural connections.',
    url: defaultUrl,
    type: 'website',
  },
};

const ITEMS_PER_PAGE = 24;

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const page = Math.max(1, parseInt((params.page as string) || '1', 10));
  const language = (params.language as string) || null;
  const query = (params.q as string) || '';
  const attributes = (params.attributes as string)?.split(',').filter(Boolean) || [];

  // Build server-side query with pagination
  let dbQuery = supabase
    .from('names_of_god')
    .select('id, name, language, meaning, pronunciation, attribute, scripture_refs, context_of_use, divine_personality', { count: 'exact' });

  if (language) {
    dbQuery = dbQuery.eq('language', language);
  }

  if (query) {
    dbQuery = dbQuery.or(
      `name.ilike.%${query}%,meaning.ilike.%${query}%,pronunciation.ilike.%${query}%,language.ilike.%${query}%`
    );
  }

  if (attributes.length > 0) {
    dbQuery = dbQuery.overlaps('attribute', attributes);
  }

  const from = (page - 1) * ITEMS_PER_PAGE;
  const to = from + ITEMS_PER_PAGE - 1;

  const { data, error, count } = await dbQuery
    .order('name')
    .range(from, to);

  // Fetch all unique attributes and languages for filter options
  const { data: allNames } = await supabase
    .from('names_of_god')
    .select('language, attribute');

  const allLanguages = new Set<string>();
  const allAttributes = new Set<string>();
  (allNames || []).forEach((n: any) => {
    allLanguages.add(n.language);
    (n.attribute || []).forEach((attr: string) => allAttributes.add(attr));
  });

  // Fetch a single name for daily devotional using count + offset
  const { count: totalNames } = await supabase
    .from('names_of_god')
    .select('id', { count: 'exact', head: true });

  let todayName = null;
  if (totalNames && totalNames > 0) {
    const dayIndex = new Date().getDate() % totalNames;
    const { data: devotionalData } = await supabase
      .from('names_of_god')
      .select('id, name, language, meaning, pronunciation, attribute, scripture_refs, context_of_use, divine_personality')
      .order('name')
      .range(dayIndex, dayIndex);
    todayName = devotionalData?.[0] || null;
  }

  if (error) {
    console.error('Error fetching names_of_god:', error.message);
    return <p className="text-red-500 p-4">Error loading names.</p>;
  }

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: defaultUrl },
        ]}
      />
      <Home
        names={data || []}
        total={count || 0}
        page={page}
        totalPages={Math.ceil((count || 0) / ITEMS_PER_PAGE)}
        currentLanguage={language}
        currentQuery={query}
        currentAttributes={attributes}
        availableLanguages={Array.from(allLanguages).sort()}
        availableAttributes={Array.from(allAttributes).sort()}
        todayName={todayName}
      />
    </>
  );
}

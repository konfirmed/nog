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

export default async function Page() {
  const { data, error } = await supabase
    .from('names_of_god')
    .select('id, name, language, meaning, pronunciation, attribute, scripture_refs, context_of_use, divine_personality');

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
      <Home names={data || []} />
    </>
  );
}

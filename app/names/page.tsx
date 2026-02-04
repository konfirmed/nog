import { Metadata } from 'next';
import { supabase } from '@/utils/supabase/client';
import Link from 'next/link';
import { CollectionPageJsonLd, BreadcrumbJsonLd } from '@/components/json-ld';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  title: 'All Names of G_D | NAMES of G_D Across Cultures',
  description: 'Browse our comprehensive collection of divine names from cultures and languages around the world, including Hebrew, Yoruba, Arabic, and more.',
  alternates: {
    canonical: `${defaultUrl}/names`,
  },
  openGraph: {
    title: 'All Names of G_D',
    description: 'A comprehensive collection of divine names from cultures and languages around the world.',
    url: `${defaultUrl}/names`,
    type: 'website',
  },
};

export default async function NamesIndexPage() {
  const { data, error } = await supabase
    .from('names_of_god')
    .select('id, name');

  if (error) {
    console.error('Error fetching names:', error);
    return <p className="p-4 text-red-500">Error loading list.</p>;
  }

  return (
    <>
      <CollectionPageJsonLd />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: defaultUrl },
          { name: 'Names', url: `${defaultUrl}/names` },
        ]}
      />
      <main className="p-4">
        <h1 className="text-2xl font-bold mb-4">All NAMES of G_D</h1>
        <ul className="list-disc ml-4">
          {data?.map((n) => (
            <li key={n.id} className="my-1">
              <Link href={`/names/${n.id}`} className="text-blue-600 hover:underline">
                {n.name}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}

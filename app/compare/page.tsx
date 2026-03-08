import { Metadata } from 'next';
import { supabase } from '@/utils/supabase/client';
import { CompareClient } from '@/components/compare-client';
import { BreadcrumbJsonLd } from '@/components/json-ld';

export const dynamic = 'force-dynamic';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  title: 'Compare Divine Names | NAMES of G_D',
  description: 'Compare names of G_D side by side across different cultures and languages. Discover similarities and differences in divine attributes, meanings, and cultural contexts.',
};

export default async function ComparePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const ids = ((params.ids as string) || '').split(',').filter(Boolean);

  // Fetch all names for the picker (lightweight: id, name, language)
  const { data: allNames } = await supabase
    .from('names_of_god')
    .select('id, name, language')
    .order('name');

  // Fetch full data for selected names
  let selectedNames: any[] = [];
  if (ids.length > 0) {
    const { data } = await supabase
      .from('names_of_god')
      .select('*')
      .in('id', ids);
    selectedNames = data || [];
  }

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: defaultUrl },
          { name: 'Compare', url: `${defaultUrl}/compare` },
        ]}
      />
      <CompareClient
        allNames={allNames || []}
        selectedNames={selectedNames}
        selectedIds={ids}
      />
    </>
  );
}

import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { supabase } from '@/utils/supabase/client';
import Link from 'next/link';
import { ScriptureList } from '@/components/scripture-verse';

export const dynamic = 'force-dynamic';
import { MiniRelationshipGraph } from '@/components/mini-relationship-graph';
import { EtymologyBreakdownDisplay } from '@/components/etymology-breakdown';
import { NamePageJsonLd, BreadcrumbJsonLd } from '@/components/json-ld';
import { isUUID, generateSlug, findBySlug } from '@/lib/slug';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

async function getNameData(idOrSlug: string) {
  if (isUUID(idOrSlug)) {
    const { data, error } = await supabase
      .from('names_of_god')
      .select('*')
      .eq('id', idOrSlug)
      .single();
    if (error || !data) return null;
    return data;
  }

  const { data: allNamesForSlug } = await supabase
    .from('names_of_god')
    .select('id, name, language');

  if (!allNamesForSlug) return null;

  const match = findBySlug(allNamesForSlug, idOrSlug);
  if (!match) return null;

  const { data, error } = await supabase
    .from('names_of_god')
    .select('*')
    .eq('id', match.id)
    .single();

  if (error || !data) return null;
  return data;
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id: idOrSlug } = await params;
  const data = await getNameData(idOrSlug);

  if (!data) {
    return {
      title: 'Name Not Found',
    };
  }

  const slug = generateSlug(data.name, data.language);
  const canonicalUrl = `${defaultUrl}/names/${slug}`;
  const language = data.language.charAt(0).toUpperCase() + data.language.slice(1);

  return {
    title: `${data.name} - ${language} Name of G_D | NAMES of G_D`,
    description: `${data.name} (${data.pronunciation || data.name}) means "${data.meaning}" in ${language}. ${data.attribute?.length ? `Associated with: ${data.attribute.slice(0, 3).join(", ")}.` : ""}`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${data.name} - Divine Name in ${language}`,
      description: `Discover the meaning and significance of ${data.name}, a ${language} name of G_D meaning "${data.meaning}".`,
      url: canonicalUrl,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${data.name} - ${language} Name of G_D`,
      description: `${data.name} means "${data.meaning}" in ${language}.`,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id: idOrSlug } = await params;

  const data = await getNameData(idOrSlug);
  if (!data) return notFound();

  const actualId = data.id;
  const slug = generateSlug(data.name, data.language);
  const language = data.language.charAt(0).toUpperCase() + data.language.slice(1);

  // Fetch related names for the list
  let related: any[] = [];
  if (data.related_names?.length) {
    const { data: relatedData } = await supabase
      .from('names_of_god')
      .select('id, name, language')
      .in('id', data.related_names);
    related = relatedData || [];
  }

  // Fetch all names for the relationship graph
  const { data: allNames } = await supabase
    .from('names_of_god')
    .select('id, name, language, meaning, related_names');

  return (
    <>
      <NamePageJsonLd
        name={data.name}
        meaning={data.meaning}
        language={language}
        pronunciation={data.pronunciation}
        attributes={data.attribute}
        slug={slug}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: defaultUrl },
          { name: 'Names', url: `${defaultUrl}/names` },
          { name: data.name, url: `${defaultUrl}/names/${slug}` },
        ]}
      />
      <main className="p-6 max-w-3xl mx-auto">
        <div className="mb-6">
          <Link
            href="/"
            className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
          >
            ← Back to Home
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-2">{data.name}</h1>
        <p className="text-gray-700 dark:text-gray-400 italic">{data.pronunciation}</p>
        <p className="mt-2 text-lg">Meaning: {data.meaning}</p>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Language: {language}
        </p>

      {/* Etymology breakdown for Yoruba names */}
      <EtymologyBreakdownDisplay name={data.name} language={data.language} />

      <div className="mt-4">
        <h2 className="font-semibold">Attributes:</h2>
        <ul className="list-disc ml-5 text-sm text-gray-800 dark:text-gray-300">
          {data.attribute?.map((attr: string) => <li key={attr}>{attr}</li>)}
        </ul>
      </div>

      <div className="mt-4">
        <h2 className="font-semibold mb-2">Scripture References:</h2>
        <ScriptureList references={data.scripture_refs || []} />
      </div>

      <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        <p><strong>Context of Use:</strong> {data.context_of_use}</p>
        <p><strong>Divine Personality:</strong> {data.divine_personality}</p>
        {data.notes && <p><strong>Notes:</strong> {data.notes}</p>}
      </div>

      {allNames && allNames.length > 0 && (
        <div className="mt-8">
          <MiniRelationshipGraph
            names={allNames}
            centerId={actualId}
            centerName={data.name}
          />
        </div>
      )}

      {related.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Related Names</h2>
          <ul className="list-disc ml-5 text-sm text-indigo-600 dark:text-indigo-400">
            {related.map((rel: any) => (
              <li key={rel.id}>
                <Link
                  href={`/names/${generateSlug(rel.name, rel.language)}`}
                  className="hover:underline"
                >
                  {rel.name} <span className="text-gray-500 dark:text-gray-400">({rel.language})</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      </main>
    </>
  );
}

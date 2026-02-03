import { notFound } from 'next/navigation';
import { supabase } from '@/utils/supabase/client';
import Link from 'next/link';
import { ScriptureList } from '@/components/scripture-verse';
import { MiniRelationshipGraph } from '@/components/mini-relationship-graph';
import { EtymologyBreakdownDisplay } from '@/components/etymology-breakdown';
import { isUUID, generateSlug, findBySlug } from '@/lib/slug';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id: idOrSlug } = await params;

  let data: any = null;
  let actualId: string = idOrSlug;

  if (isUUID(idOrSlug)) {
    // Fetch directly by UUID
    const { data: result, error } = await supabase
      .from('names_of_god')
      .select('*')
      .eq('id', idOrSlug)
      .single();

    if (error || !result) return notFound();
    data = result;
    actualId = result.id;
  } else {
    // It's a slug - need to find the matching name
    const { data: allNamesForSlug } = await supabase
      .from('names_of_god')
      .select('id, name, language');

    if (!allNamesForSlug) return notFound();

    const match = findBySlug(allNamesForSlug, idOrSlug);
    if (!match) return notFound();

    // Now fetch the full data
    const { data: result, error } = await supabase
      .from('names_of_god')
      .select('*')
      .eq('id', match.id)
      .single();

    if (error || !result) return notFound();
    data = result;
    actualId = result.id;
  }

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
        Language: {data.language.charAt(0).toUpperCase() + data.language.slice(1)}
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
  );
}

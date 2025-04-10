import { notFound } from 'next/navigation';
import { supabase } from '@/utils/supabase/client';
import Link from 'next/link';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const { data, error } = await supabase
    .from('names_of_god')
    .select('*')
    .eq('id', id)
    .single();

  if (!data || error) return notFound();

  let related: any[] = [];
  if (data.related_names?.length) {
    const { data: relatedData } = await supabase
      .from('names_of_god')
      .select('id, name, language')
      .in('id', data.related_names);
    related = relatedData || [];
  }

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{data.name}</h1>
      <p className="text-gray-700 italic">{data.pronunciation}</p>
      <p className="mt-2 text-lg">Meaning: {data.meaning}</p>
      <p className="mt-1 text-sm">Language: {data.language}</p>

      <div className="mt-4">
        <h2 className="font-semibold">Attributes:</h2>
        <ul className="list-disc ml-5 text-sm text-gray-800">
          {data.attribute?.map((attr: string) => <li key={attr}>{attr}</li>)}
        </ul>
      </div>

      <div className="mt-4">
        <h2 className="font-semibold">Scripture References:</h2>
        <ul className="list-disc ml-5 text-sm text-blue-600">
          {data.scripture_refs?.map((ref: string) => <li key={ref}>{ref}</li>)}
        </ul>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <p><strong>Context of Use:</strong> {data.context_of_use}</p>
        <p><strong>Divine Personality:</strong> {data.divine_personality}</p>
        <p><strong>Notes:</strong> {data.notes}</p>
      </div>

      {related.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Related Names</h2>
          <ul className="list-disc ml-5 text-sm text-indigo-600">
            {related.map((rel: any) => (
              <li key={rel.id}>
                <Link href={`/names/${rel.id}`} className="hover:underline">
                  {rel.name} <span className="text-gray-500">({rel.language})</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}

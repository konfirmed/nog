import { supabase } from '@/utils/supabase/client';
import Link from 'next/link';

export default async function NamesIndexPage() {
  const { data, error } = await supabase
    .from('names_of_god')
    .select('id, name');

  if (error) {
    console.error('Error fetching names:', error);
    return <p className="p-4 text-red-500">Error loading list.</p>;
  }

  return (
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
  );
}

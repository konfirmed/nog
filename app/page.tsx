import { supabase } from '@/utils/supabase/client'; // use the anon key client
import Home from '@/components/home';

export default async function Page() {
  const { data, error } = await supabase
    .from('names_of_god')
    .select('id, name, language, meaning, pronunciation, attribute, scripture_refs, context_of_use, divine_personality');

  if (error) {
    console.error('Error fetching names_of_god:', error.message);
    return <p className="text-red-500 p-4">Error loading names.</p>;
  }

  return <Home names={data || []} />;
}

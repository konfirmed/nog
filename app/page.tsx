import { createClient } from '@/utils/supabase/server';
import Home from '@/components/home';

export default async function Page() {
  const supabase = await createClient();
  const { data, error } = await supabase.from('names_of_god').select('id, name, language, meaning, pronunciation');

  return <Home names={data || []} />;
}

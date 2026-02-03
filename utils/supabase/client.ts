import { createClient } from '@supabase/supabase-js';

// Simple lazy initialization without Proxy
let _client: ReturnType<typeof createClient> | null = null;

function getClient() {
  if (!_client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key) {
      throw new Error('Supabase environment variables are not configured');
    }

    _client = createClient(url, key);
  }
  return _client;
}

// Export object with methods that lazily initialize
export const supabase = {
  from: (table: string) => getClient().from(table),
  auth: {
    get getSession() { return getClient().auth.getSession.bind(getClient().auth); },
    get getUser() { return getClient().auth.getUser.bind(getClient().auth); },
  },
  rpc: (fn: string, params?: Record<string, unknown>) => getClient().rpc(fn, params as any),
};

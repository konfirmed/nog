import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase/client';
import { idFromIdentifier } from '@/lib/slug';

export const dynamic = 'force-dynamic';

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: identifier } = await params;
  const id = idFromIdentifier(identifier);
  if (!id) return NextResponse.json({ error: 'Invalid name identifier' }, { status: 400 });
  try {
    const { data, error } = await supabase.from('names_of_god').select('*').eq('id', id).maybeSingle();
    if (error) {
      console.error('Name lookup failed:', error.message);
      return NextResponse.json({ error: 'Name lookup failed' }, { status: 500 });
    }
    if (!data) return NextResponse.json({ error: 'Name not found' }, { status: 404 });
    return NextResponse.json(data);
  } catch (error) {
    console.error('Name lookup failed:', error);
    return NextResponse.json({ error: 'Name lookup failed' }, { status: 500 });
  }
}

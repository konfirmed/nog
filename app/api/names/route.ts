import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase/client';

const ITEMS_PER_PAGE = 24;

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
  const language = searchParams.get('language') || null;
  const query = searchParams.get('q') || '';
  const attributes = searchParams.get('attributes')?.split(',').filter(Boolean) || [];

  // Build query
  let dbQuery = supabase
    .from('names_of_god')
    .select('id, name, language, meaning, pronunciation, attribute, scripture_refs, context_of_use, divine_personality', { count: 'exact' });

  // Language filter
  if (language) {
    dbQuery = dbQuery.eq('language', language);
  }

  // Text search across name, meaning, pronunciation
  if (query) {
    dbQuery = dbQuery.or(
      `name.ilike.%${query}%,meaning.ilike.%${query}%,pronunciation.ilike.%${query}%,language.ilike.%${query}%`
    );
  }

  // Attribute filter - use overlaps for array column
  if (attributes.length > 0) {
    dbQuery = dbQuery.overlaps('attribute', attributes);
  }

  // Pagination
  const from = (page - 1) * ITEMS_PER_PAGE;
  const to = from + ITEMS_PER_PAGE - 1;

  const { data, error, count } = await dbQuery
    .order('name')
    .range(from, to);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    names: data || [],
    total: count || 0,
    page,
    totalPages: Math.ceil((count || 0) / ITEMS_PER_PAGE),
    perPage: ITEMS_PER_PAGE,
  });
}

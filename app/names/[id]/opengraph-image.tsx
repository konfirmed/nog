import { ImageResponse } from 'next/og';
import { supabase } from '@/utils/supabase/client';
import { isUUID, findBySlug } from '@/lib/slug';

export const runtime = 'edge';
export const alt = 'Name of G_D';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

async function getNameData(idOrSlug: string) {
  if (isUUID(idOrSlug)) {
    const { data } = await supabase
      .from('names_of_god')
      .select('name, meaning, language, pronunciation')
      .eq('id', idOrSlug)
      .single();
    return data;
  }

  const { data: allNames } = await supabase
    .from('names_of_god')
    .select('id, name, language');

  if (!allNames) return null;

  const match = findBySlug(allNames, idOrSlug);
  if (!match) return null;

  const { data } = await supabase
    .from('names_of_god')
    .select('name, meaning, language, pronunciation')
    .eq('id', match.id)
    .single();

  return data;
}

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getNameData(id);

  if (!data) {
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#ffffff',
            fontSize: 48,
            color: '#1a1a1a',
          }}
        >
          Name Not Found
        </div>
      ),
      { ...size }
    );
  }

  const language = data.language.charAt(0).toUpperCase() + data.language.slice(1);

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ffffff',
          backgroundImage:
            'radial-gradient(circle at 20% 20%, #f0f4ff 0%, transparent 50%), radial-gradient(circle at 80% 80%, #fff0f5 0%, transparent 50%)',
          padding: 60,
        }}
      >
        {/* Language badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#3b82f6',
            color: '#ffffff',
            fontSize: 24,
            fontWeight: 600,
            padding: '12px 32px',
            borderRadius: 50,
            marginBottom: 40,
          }}
        >
          {language}
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: 96,
            fontWeight: 700,
            color: '#1a1a1a',
            textAlign: 'center',
            lineHeight: 1.1,
            marginBottom: 20,
          }}
        >
          {data.name}
        </div>

        {/* Pronunciation */}
        {data.pronunciation && (
          <div
            style={{
              fontSize: 32,
              color: '#666666',
              fontStyle: 'italic',
              marginBottom: 30,
            }}
          >
            {data.pronunciation}
          </div>
        )}

        {/* Meaning */}
        <div
          style={{
            fontSize: 36,
            color: '#374151',
            textAlign: 'center',
            maxWidth: 900,
            lineHeight: 1.4,
          }}
        >
          &ldquo;{data.meaning}&rdquo;
        </div>

        {/* Site branding */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            fontSize: 24,
            color: '#9ca3af',
          }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="50" cy="50" r="42" stroke="#9ca3af" strokeWidth="3" fill="none" />
            <ellipse cx="50" cy="50" rx="42" ry="16" stroke="#9ca3af" strokeWidth="2" fill="none" />
            <ellipse cx="50" cy="50" rx="16" ry="42" stroke="#9ca3af" strokeWidth="2" fill="none" />
            <circle cx="50" cy="50" r="6" fill="#9ca3af" />
          </svg>
          <span>NAMES of G_D Across Cultures</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

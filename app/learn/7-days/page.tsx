import type { Metadata } from 'next';
import { LearningJourney } from '@/components/learning-journey';
import { getLearningLesson } from '@/lib/learning-journey';
import { siteUrl } from '@/lib/site-url';
import { supabase } from '@/utils/supabase/client';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

type Props = { searchParams: Promise<{ day?: string | string[] }> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;
  const day = typeof params.day === 'string' ? params.day : '1';
  const lesson = getLearningLesson(day);
  const url = siteUrl + '/learn/7-days' + (lesson && lesson.day !== 1 ? '?day=' + lesson.day : '');
  return {
    title: lesson ? 'Day ' + lesson.day + ': ' + lesson.theme + ' | Seven Names in Seven Days | NAMES of G_D' : 'Seven Names in Seven Days',
    description: 'A free seven-day Bible learning journey exploring God’s names and titles, Scripture, reflection and recall.',
    alternates: { canonical: url },
    robots: { index: !!lesson, follow: true },
    openGraph: {
      title: lesson ? 'Day ' + lesson.day + ': ' + lesson.name + ' | NAMES of G_D' : 'Seven Names in Seven Days',
      description: 'Read, reflect and remember the names and attributes of God in seven short lessons.',
      url,
      type: 'article',
    },
    twitter: { card: 'summary_large_image' },
  };
}

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;
  const lesson = getLearningLesson(typeof params.day === 'string' ? params.day : '1');
  if (!lesson) notFound();

  const { data, error } = await supabase
    .from('names_of_god')
    .select('id, name, language, pronunciation, audio_url')
    .eq('name', lesson.name)
    .eq('language', lesson.language)
    .limit(2);

  if (error) console.error('Learning catalogue lookup failed:', error.message);
  // Never assume identity when multiple catalogue entries share a name.
  const catalogue = !error && data?.length === 1 ? data[0] : null;

  return <LearningJourney key={lesson.day} lesson={lesson} catalogue={catalogue} />;
}

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AudioPlayer } from '@/components/audio-player';
import { namePath } from '@/lib/slug';
import {
  LEARNING_LESSONS,
  LEARNING_PROGRESS_KEY,
  readLearningProgress,
  writeLearningProgress,
  type LearningLesson,
  type LearningQuestion,
} from '@/lib/learning-journey';

type CatalogueEntry = {
  id: string;
  name: string;
  language: string;
  pronunciation: string | null;
  audio_url: string | null;
};

function KnowledgeCheck({
  checkId,
  title,
  question,
  onCorrect,
}: {
  checkId: string;
  title: string;
  question: LearningQuestion;
  onCorrect: () => void;
}) {
  const [selected, setSelected] = useState('');
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(false);

  return (
    <fieldset className="rounded-2xl border border-border bg-background p-5 space-y-4">
      <legend className="px-1 text-sm font-semibold text-foreground">{title}</legend>
      <p className="font-medium">{question.prompt}</p>
      <div className="space-y-2">
        {question.choices.map((choice, index) => (
          <label
            key={choice}
            htmlFor={checkId + '-' + index}
            className={'flex items-start gap-3 rounded-xl border p-3 text-sm cursor-pointer transition-colors ' +
              (selected === choice ? 'border-emerald-600 bg-emerald-50 text-slate-900 dark:bg-emerald-950/30 dark:text-white' : 'border-border hover:bg-muted')}
          >
            <input
              type="radio"
              id={checkId + '-' + index}
              name={checkId}
              value={choice}
              checked={selected === choice}
              disabled={correct}
              onChange={() => { setSelected(choice); setChecked(false); }}
              className="mt-0.5 accent-emerald-700"
            />
            <span>{choice}</span>
          </label>
        ))}
      </div>
      <button
        type="button"
        disabled={!selected || correct}
        onClick={() => {
          setChecked(true);
          if (selected === question.answer) {
            setCorrect(true);
            onCorrect();
          }
        }}
        className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-slate-950"
      >
        {correct ? 'Correct' : 'Check answer'}
      </button>
      {checked && (
        <p role="status" className={'text-sm ' + (correct ? 'text-emerald-700 dark:text-emerald-400' : 'text-amber-700 dark:text-amber-300')}>
          {correct ? question.explanation : 'Not quite. Revisit the passage and try another answer.'}
        </p>
      )}
    </fieldset>
  );
}

export function LearningJourney({
  lesson,
  catalogue,
}: {
  lesson: LearningLesson;
  catalogue: CatalogueEntry | null;
}) {
  const [completed, setCompleted] = useState<number[]>([]);
  const [ready, setReady] = useState(false);
  const [recallCorrect, setRecallCorrect] = useState(false);
  const [lessonCorrect, setLessonCorrect] = useState(false);
  const [copyStatus, setCopyStatus] = useState('');

  useEffect(() => {
    try {
      setCompleted(readLearningProgress(window.localStorage.getItem(LEARNING_PROGRESS_KEY)));
    } catch {
      setCompleted([]);
    }
    setReady(true);
  }, []);

  const isCompleted = completed.includes(lesson.day);
  const canComplete = lessonCorrect && (!lesson.recall || recallCorrect);
  const completedCount = completed.length;
  const nextLesson = LEARNING_LESSONS[lesson.day] || null;
  const currentUrl = lesson.day === 1 ? '/learn/7-days' : '/learn/7-days?day=' + lesson.day;

  function completeLesson() {
    if (!canComplete || !ready) return;
    const updated = [...completed, lesson.day];
    setCompleted(updated);
    try {
      window.localStorage.setItem(LEARNING_PROGRESS_KEY, writeLearningProgress(updated));
    } catch {
      // Browsers with disabled storage can still complete this visit.
    }
  }

  async function copyLessonLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopyStatus('Lesson link copied.');
    } catch {
      setCopyStatus('Copy the page address to share this lesson.');
    }
  }

  return (
    <main className="w-full space-y-8">
      <header className="rounded-3xl bg-slate-950 px-6 py-8 text-white sm:px-10 sm:py-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">NAMES of G_D · Guided learning</p>
        <h1 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
          Seven names. Seven days. A deeper understanding.
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
          Discover, understand, and remember what names and titles reveal in Scripture and across cultures.
          Free to study, with no account required. Lessons are currently in English.
        </p>
        <div className="mt-6 flex items-center gap-3 text-xs text-slate-300">
          <span>3–5 minutes per lesson</span>
          <span aria-hidden="true">·</span>
          <span>Read · Reflect · Recall</span>
        </div>
      </header>

      <div className="grid gap-7 lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="space-y-4">
          <section className="rounded-2xl border border-border p-4">
            <div className="flex items-center justify-between gap-2 text-sm">
              <h2 className="font-semibold">Your journey</h2>
              <span aria-live="polite" className="text-muted-foreground">
                {ready ? completedCount + ' of 7' : 'Loading'}
              </span>
            </div>
            <div
              role="progressbar"
              aria-label="Lessons completed"
              aria-valuemin={0}
              aria-valuemax={7}
              aria-valuenow={completedCount}
              className="mt-3 h-2 overflow-hidden rounded-full bg-muted"
            >
              <div className="h-full rounded-full bg-emerald-600 transition-all" style={{ width: Math.round(completedCount / 7 * 100) + '%' }} />
            </div>
            <p className="mt-3 text-xs leading-5 text-muted-foreground">
              Completion is saved on this device, not synced to an account. Study at your own pace.
            </p>
          </section>
          <nav aria-label="Seven-day lessons" className="space-y-1">
            {LEARNING_LESSONS.map((item) => {
              const active = item.day === lesson.day;
              const done = completed.includes(item.day);
              return (
                <Link
                  key={item.day}
                  href={item.day === 1 ? '/learn/7-days' : '/learn/7-days?day=' + item.day}
                  aria-current={active ? 'page' : undefined}
                  className={'flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition-colors ' +
                    (active ? 'bg-emerald-50 text-emerald-950 ring-1 ring-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-100 dark:ring-emerald-800' : 'hover:bg-muted')}
                >
                  <span className={'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold ' +
                    (done ? 'bg-emerald-600 text-white' : 'bg-muted text-foreground')}>
                    {done ? '✓' : item.day}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs opacity-70">Day {item.day}</span>
                    <span className="block truncate font-medium">{item.theme}</span>
                  </span>
                </Link>
              );
            })}
          </nav>
        </aside>

        <article className="min-w-0 space-y-7">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
              Day {lesson.day} of 7 · {lesson.theme}
            </p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{lesson.name}</h2>
            <p className="text-xl text-muted-foreground">{lesson.meaning}</p>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-muted px-3 py-1 capitalize">{lesson.language}</span>
              <span className="rounded-full bg-muted px-3 py-1">{lesson.classification}</span>
            </div>
            {catalogue?.pronunciation && (
              <p className="text-sm text-muted-foreground">
                Catalogue pronunciation guide: {catalogue.pronunciation} (approximate)
              </p>
            )}
            {catalogue?.audio_url && <AudioPlayer src={catalogue.audio_url} label={'Listen to ' + lesson.name} />}
          </div>

          <section className="space-y-3 rounded-2xl bg-emerald-50 p-5 text-emerald-950 dark:bg-emerald-950/40 dark:text-emerald-50 sm:p-6">
            <h3 className="text-xs font-semibold uppercase tracking-widest">Start with Scripture</h3>
            <a
              href={'https://www.biblegateway.com/passage/?search=' + encodeURIComponent(lesson.scripture) + '&version=WEB'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-lg font-semibold underline underline-offset-4 hover:no-underline"
            >
              Read {lesson.scripture} ↗
            </a>
            <p className="text-sm leading-6">{lesson.story}</p>
          </section>

          <section className="space-y-3">
            <h3 className="text-xl font-semibold">Understand</h3>
            <p className="leading-7 text-foreground/90">{lesson.insight}</p>
            <div className="rounded-xl border-l-4 border-amber-500 bg-amber-50 p-4 text-sm leading-6 text-amber-950 dark:bg-amber-950/20 dark:text-amber-100">
              <strong>Important distinction:</strong> {lesson.distinction}
            </div>
            {catalogue ? (
              <Link href={namePath(catalogue)} className="inline-flex text-sm font-medium text-emerald-700 underline underline-offset-4 dark:text-emerald-400">
                Explore {lesson.name} in the full catalogue
              </Link>
            ) : (
              <p className="text-xs text-muted-foreground">No matching catalogue record is currently available; this standalone lesson remains accessible.</p>
            )}
          </section>

          <section className="rounded-2xl border border-border p-5 sm:p-6">
            <h3 className="text-xl font-semibold">Reflect and practice</h3>
            <p className="mt-3 leading-7">{lesson.reflection}</p>
            <p className="mt-4 text-sm text-muted-foreground"><strong>Try this:</strong> {lesson.practice}</p>
          </section>

          <section className="space-y-4" aria-labelledby="recall-heading">
            <div>
              <h3 id="recall-heading" className="text-xl font-semibold">Remember what you learned</h3>
              <p className="mt-1 text-sm text-muted-foreground">Answer correctly to complete this day. Later lessons revisit earlier learning.</p>
            </div>
            {lesson.recall && (
              <KnowledgeCheck
                checkId={'recall-' + lesson.day}
                title="Recall the previous day"
                question={lesson.recall}
                onCorrect={() => setRecallCorrect(true)}
              />
            )}
            <KnowledgeCheck
              checkId={'lesson-' + lesson.day}
              title="Today's question"
              question={lesson.question}
              onCorrect={() => setLessonCorrect(true)}
            />
            <button
              type="button"
              disabled={!ready || !canComplete || isCompleted}
              onClick={completeLesson}
              className="w-full rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white transition-colors hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isCompleted ? 'Day ' + lesson.day + ' completed' : 'Complete day ' + lesson.day}
            </button>
            {isCompleted && (
              <p role="status" className="text-center text-sm text-emerald-700 dark:text-emerald-400">
                Lesson completed. {completedCount === 7 ? 'You have finished all seven days.' : 'Keep learning and revisiting the names.'}
              </p>
            )}
            {isCompleted && nextLesson && (
              <Link
                href={'/learn/7-days?day=' + nextLesson.day}
                className="block rounded-xl border border-border p-4 text-center text-sm font-semibold hover:bg-muted"
              >
                Continue to day {nextLesson.day}: {nextLesson.theme} →
              </Link>
            )}
            {isCompleted && !nextLesson && (
              <Link href="/" className="block rounded-xl border border-border p-4 text-center text-sm font-semibold hover:bg-muted">
                Explore the full names catalogue →
              </Link>
            )}
          </section>

          <div className="flex flex-wrap items-center gap-3 border-t border-border pt-5">
            <button type="button" onClick={copyLessonLink} className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted">
              Copy lesson link
            </button>
            <a
              href={'https://wa.me/?text=' + encodeURIComponent('Discover ' + lesson.name + ' with NAMES of G_D: ' + 'https://namesofgod.kanmiobasa.com' + currentUrl)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted"
            >
              Share on WhatsApp
            </a>
            <span role="status" className="text-xs text-muted-foreground">{copyStatus}</span>
          </div>
        </article>
      </div>
    </main>
  );
}

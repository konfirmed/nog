'use client';

import { useCallback } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { DailyDevotional } from './daily-devotional';
import { generateSlug } from '@/lib/slug';

// Common attribute categories for quick access
const FEATURED_ATTRIBUTES = [
  'Creator',
  'Healer',
  'Protector',
  'Provider',
  'Savior',
  'Judge',
  'Mercy',
  'Wisdom',
  'Peace',
  'King',
];

// All supported languages with display names
// Ordered in YHWH pattern with Mandarin at the end
const LANGUAGES: Record<string, string> = {
  yoruba: 'Yoruba',           // Y
  hebrew: 'Hebrew',           // H
  welsh: 'Welsh',             // W
  hindi: 'Hindi',             // H
  yiddish: 'Yiddish',         // Y
  hausa: 'Hausa',             // H
  wolof: 'Wolof',             // W
  haitian_creole: 'Haitian Creole', // H
  wu_chinese: 'Wu Chinese',   // W
  mandarin: 'Mandarin',       // (end)
};

const LANGUAGE_ORDER = Object.keys(LANGUAGES);

interface HomeProps {
  names: any[];
  total: number;
  page: number;
  totalPages: number;
  currentLanguage: string | null;
  currentQuery: string;
  currentAttributes: string[];
  availableLanguages: string[];
  availableAttributes: string[];
  todayName: any | null;
}

export default function Home({
  names,
  total,
  page,
  totalPages,
  currentLanguage,
  currentQuery,
  currentAttributes,
  availableLanguages,
  availableAttributes,
  todayName,
}: HomeProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Build URL with updated params
  const buildUrl = useCallback((updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    for (const [key, value] of Object.entries(updates)) {
      if (value === null || value === '') {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    }

    const qs = params.toString();
    return qs ? `/?${qs}` : '/';
  }, [searchParams]);

  const navigate = useCallback((updates: Record<string, string | null>) => {
    router.push(buildUrl(updates));
  }, [router, buildUrl]);

  // Sort languages by YHWH pattern
  const sortedLanguages = [...availableLanguages].sort((a, b) => {
    const indexA = LANGUAGE_ORDER.indexOf(a);
    const indexB = LANGUAGE_ORDER.indexOf(b);
    if (indexA === -1 && indexB === -1) return a.localeCompare(b);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  // Get attributes to display
  const displayedFeatured = FEATURED_ATTRIBUTES.filter((attr) =>
    availableAttributes.includes(attr)
  );

  const speak = (text: string) => {
    if (typeof window !== 'undefined') {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard');
  };

  const toggleAttribute = (attr: string) => {
    const newAttrs = currentAttributes.includes(attr)
      ? currentAttributes.filter((a) => a !== attr)
      : [...currentAttributes, attr];
    navigate({
      attributes: newAttrs.length > 0 ? newAttrs.join(',') : null,
      page: '1',
    });
  };

  return (
    <main>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <h1 className="text-3xl font-bold">NAMES of G_D Across Cultures</h1>
        <div className="flex gap-2">
          <Link
            href="/compare"
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Compare Names
          </Link>
          <Link
            href="/graph"
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="5" cy="12" r="2" strokeWidth="2" />
              <circle cx="19" cy="6" r="2" strokeWidth="2" />
              <circle cx="19" cy="18" r="2" strokeWidth="2" />
              <path strokeLinecap="round" strokeWidth="2" d="M7 12h8m-2-4l4 4m-4 4l4-4" />
            </svg>
            Explore Relationships
          </Link>
        </div>
      </div>

      {todayName && <DailyDevotional name={todayName} />}

      {/* Search */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          navigate({ q: (formData.get('q') as string) || null, page: '1' });
        }}
      >
        <input
          name="q"
          type="text"
          placeholder="Search by name, meaning, pronunciation, or language..."
          defaultValue={currentQuery}
          className="mb-4 w-full md:w-1/2 px-4 py-2 border rounded-lg shadow-sm"
        />
      </form>

      {/* Language filter */}
      <div className="mb-4 flex flex-wrap gap-2">
        <span className="text-sm text-gray-600 dark:text-gray-400 mr-1 self-center">Language:</span>
        {sortedLanguages.map((lang) => (
          <button
            key={lang}
            className={`px-3 py-1 rounded-full border text-sm transition ${
              currentLanguage === lang
                ? 'bg-black text-white dark:bg-white dark:text-black'
                : 'bg-white text-black dark:bg-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            onClick={() =>
              navigate({
                language: currentLanguage === lang ? null : lang,
                page: '1',
              })
            }
          >
            {LANGUAGES[lang] || lang.charAt(0).toUpperCase() + lang.slice(1).replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Attribute filter */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">Find by attribute:</span>
          {currentAttributes.length > 0 && (
            <button
              type="button"
              onClick={() => navigate({ attributes: null, page: '1' })}
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
            >
              Clear all
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {displayedFeatured.map((attr) => (
            <button
              key={attr}
              onClick={() => toggleAttribute(attr)}
              className={`px-3 py-1 rounded-full border text-sm transition ${
                currentAttributes.includes(attr)
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:border-indigo-300'
              }`}
            >
              {attr}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
        Showing {names.length} of {total} names
        {currentAttributes.length > 0 && (
          <span> matching: {currentAttributes.join(', ')}</span>
        )}
      </p>

      {/* Name cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {names.map((n) => (
          <div
            key={n.id}
            className="block p-4 border rounded-xl shadow hover:shadow-lg transition"
          >
            <Link href={`/names/${generateSlug(n.name, n.language)}`}>
              <h2 className="text-xl font-semibold flex items-center gap-2">
                {n.name}
                <span onClick={(e) => { e.preventDefault(); copy(n.name); }} className="cursor-pointer text-xs text-gray-500">📋</span>
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Language: {n.language.charAt(0).toUpperCase() + n.language.slice(1)}</p>
              <p className="text-sm italic dark:text-gray-300">Meaning: {n.meaning}</p>
              {n.attribute?.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {n.attribute.slice(0, 3).map((attr: string) => (
                    <span
                      key={attr}
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        currentAttributes.includes(attr)
                          ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300'
                          : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {attr}
                    </span>
                  ))}
                  {n.attribute.length > 3 && (
                    <span className="text-xs text-gray-400">+{n.attribute.length - 3}</span>
                  )}
                </div>
              )}
            </Link>
            {n.pronunciation && (
              <p className="text-sm italic text-gray-700 flex items-center gap-2 mt-1">
                {n.pronunciation}
                <button onClick={() => speak(n.pronunciation)} className="text-xs text-gray-500">🔊</button>
              </p>
            )}
          </div>
        ))}
      </div>

      {names.length === 0 && (
        <p className="text-sm text-gray-500 mt-6">No names match your search.</p>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          <Link
            href={buildUrl({ page: '1' })}
            className={`px-3 py-1 rounded border text-sm hover:bg-gray-100 dark:hover:bg-gray-800 ${page === 1 ? 'opacity-40 pointer-events-none' : ''}`}
          >
            First
          </Link>
          <Link
            href={buildUrl({ page: String(Math.max(1, page - 1)) })}
            className={`px-3 py-1 rounded border text-sm hover:bg-gray-100 dark:hover:bg-gray-800 ${page === 1 ? 'opacity-40 pointer-events-none' : ''}`}
          >
            Previous
          </Link>

          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum: number;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (page <= 3) {
                pageNum = i + 1;
              } else if (page >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = page - 2 + i;
              }
              return (
                <Link
                  key={pageNum}
                  href={buildUrl({ page: String(pageNum) })}
                  className={`w-8 h-8 rounded text-sm flex items-center justify-center ${
                    page === pageNum
                      ? 'bg-indigo-600 text-white'
                      : 'border hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {pageNum}
                </Link>
              );
            })}
          </div>

          <Link
            href={buildUrl({ page: String(Math.min(totalPages, page + 1)) })}
            className={`px-3 py-1 rounded border text-sm hover:bg-gray-100 dark:hover:bg-gray-800 ${page === totalPages ? 'opacity-40 pointer-events-none' : ''}`}
          >
            Next
          </Link>
          <Link
            href={buildUrl({ page: String(totalPages) })}
            className={`px-3 py-1 rounded border text-sm hover:bg-gray-100 dark:hover:bg-gray-800 ${page === totalPages ? 'opacity-40 pointer-events-none' : ''}`}
          >
            Last
          </Link>

          <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
            Page {page} of {totalPages}
          </span>
        </div>
      )}
    </main>
  );
}

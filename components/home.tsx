'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
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

export default function Home({ names }: { names: any[] }) {
  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState<string | null>(null);
  const [selectedAttributes, setSelectedAttributes] = useState<string[]>([]);
  const [showAllAttributes, setShowAllAttributes] = useState(false);

  // Extract all unique attributes from the data
  const allAttributes = useMemo(() => {
    const attrSet = new Set<string>();
    names.forEach((n) => {
      (n.attribute || []).forEach((attr: string) => attrSet.add(attr));
    });
    return Array.from(attrSet).sort();
  }, [names]);

  // Get attributes to display (featured or all)
  const displayedAttributes = showAllAttributes
    ? allAttributes
    : FEATURED_ATTRIBUTES.filter((attr) => allAttributes.includes(attr));

  const toggleAttribute = (attr: string) => {
    setSelectedAttributes((prev) =>
      prev.includes(attr) ? prev.filter((a) => a !== attr) : [...prev, attr]
    );
  };

  const getTodayName = () => {
    if (names.length === 0) return null;
    const today = new Date().getDate(); // 1 to 31
    const index = today % names.length;
    return names[index];
  };
  
  const todayName = getTodayName();
  

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

  const filtered = names.filter((n) => {
    const matchesLang = language ? n.language === language : true;
    const matchesQuery = [n.name, n.meaning, n.language, n.pronunciation || ''].some((val) =>
      val.toLowerCase().includes(query.toLowerCase())
    );
    const matchesAttribute =
      selectedAttributes.length === 0 ||
      selectedAttributes.some((attr) => (n.attribute || []).includes(attr));
    return matchesLang && matchesQuery && matchesAttribute;
  });

  return (
    <main>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <h1 className="text-3xl font-bold">NAMES of G_D Across Cultures</h1>
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

      {todayName && <DailyDevotional name={todayName} />}


      <input
        type="text"
        placeholder="Search by name, meaning, pronunciation, or language..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mb-4 w-full md:w-1/2 px-4 py-2 border rounded-lg shadow-sm"
      />

      <div className="mb-4 flex flex-wrap gap-2">
        <span className="text-sm text-gray-600 dark:text-gray-400 mr-1 self-center">Language:</span>
        {['yoruba', 'hebrew', 'mandarin'].map((lang) => (
          <button
            key={lang}
            className={`px-3 py-1 rounded-full border text-sm transition ${
              language === lang
                ? 'bg-black text-white dark:bg-white dark:text-black'
                : 'bg-white text-black dark:bg-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            onClick={() => setLanguage(language === lang ? null : lang)}
          >
            {lang.charAt(0).toUpperCase() + lang.slice(1)}
          </button>
        ))}
      </div>

      {/* Attribute Filter */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">Find by attribute:</span>
          {selectedAttributes.length > 0 && (
            <button
              onClick={() => setSelectedAttributes([])}
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
            >
              Clear all
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {displayedAttributes.map((attr) => (
            <button
              key={attr}
              onClick={() => toggleAttribute(attr)}
              className={`px-3 py-1 rounded-full border text-sm transition ${
                selectedAttributes.includes(attr)
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:border-indigo-300'
              }`}
            >
              {attr}
            </button>
          ))}
          {!showAllAttributes && allAttributes.length > displayedAttributes.length && (
            <button
              onClick={() => setShowAllAttributes(true)}
              className="px-3 py-1 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            >
              +{allAttributes.length - displayedAttributes.length} more
            </button>
          )}
          {showAllAttributes && (
            <button
              onClick={() => setShowAllAttributes(false)}
              className="px-3 py-1 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            >
              Show less
            </button>
          )}
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
        Showing {filtered.length} of {names.length} names
        {selectedAttributes.length > 0 && (
          <span> matching: {selectedAttributes.join(', ')}</span>
        )}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((n) => (
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
                        selectedAttributes.includes(attr)
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

      {filtered.length === 0 && (
        <p className="text-sm text-gray-500 mt-6">No names match your search.</p>
      )}
    </main>
  );
}

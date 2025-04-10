'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home({ names }: { names: any[] }) {
  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState<string | null>(null);

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
    return matchesLang && matchesQuery;
  });

  return (
    <main className="p-4">
      <h1 className="text-3xl font-bold mb-4">Names of God Across Cultures</h1>

      <input
        type="text"
        placeholder="Search by name, meaning, pronunciation, or language..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mb-4 w-full md:w-1/2 px-4 py-2 border rounded-lg shadow-sm"
      />

      <div className="mb-6 flex gap-2">
        {['yoruba', 'hebrew', 'mandarin'].map((lang) => (
          <button
            key={lang}
            className={`px-3 py-1 rounded-full border ${language === lang ? 'bg-black text-white' : 'bg-white text-black'}`}
            onClick={() => setLanguage(language === lang ? null : lang)}
          >
            {lang.charAt(0).toUpperCase() + lang.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((n) => (
          <div
            key={n.id}
            className="block p-4 border rounded-xl shadow hover:shadow-lg transition"
          >
            <Link href={`/names/${n.id}`}>
              <h2 className="text-xl font-semibold flex items-center gap-2">
                {n.name}
                <span onClick={(e) => { e.preventDefault(); copy(n.name); }} className="cursor-pointer text-xs text-gray-500">📋</span>
              </h2>
              <p className="text-sm text-gray-600">Language: {n.language}</p>
              <p className="text-sm italic">Meaning: {n.meaning}</p>
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

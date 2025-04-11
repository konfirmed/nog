'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home({ names }: { names: any[] }) {
  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState<string | null>(null);

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
    return matchesLang && matchesQuery;
  });

  return (
    <main>
      <h1 className="text-3xl font-bold mb-4">NAMES of G_D Across Cultures</h1>

      {todayName && (
        <div className="mb-6 p-4 border rounded-xl shadow-lg bg-yellow-50 dark:bg-yellow-900/20">
            <h2 className="text-xl font-bold mb-1">📆 Name of the Day</h2>
            <p className="text-2xl font-serif font-semibold">{todayName.name}</p>
            <p className="italic text-sm text-gray-600 dark:text-gray-400">
            {todayName.pronunciation}
            </p>
            <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
            Meaning: {todayName.meaning}
            </p>
            <p className="text-xs mt-2 text-gray-500 dark:text-gray-400">
            Language: {todayName.language}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
                <button
                    onClick={() => {
                    const url = `/names/${todayName.id}`;
                    navigator.clipboard.writeText(url);
                    alert("Link copied to clipboard!");
                    }}
                    className="text-blue-600 underline"
                >
                    📋 Copy link
                </button>

                <a
                    href={`https://wa.me/?text=Check out this name of G_D: ${todayName.name} (${todayName.meaning}) – https://nog.knfrmd.com/names/${todayName.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 underline"
                >
                    🟢 Share on WhatsApp
                </a>

                <a
                    href={`https://twitter.com/intent/tweet?text=Name%20of%20the%20Day%3A%20${encodeURIComponent(todayName.name)}%20(${encodeURIComponent(todayName.meaning)})%20%F0%9F%8C%90%0Ahttps://nog.knfrmd.com/names/${todayName.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                >
                    🐦 Share on X
                </a>

            </div>
        </div>
    )}


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
              <p className="text-sm text-gray-600">Language: {n.language.charAt(0).toUpperCase() + n.language.slice(1)}</p>
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

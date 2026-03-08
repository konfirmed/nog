'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { generateSlug } from '@/lib/slug';
import { formatLanguage } from '@/lib/languages';

interface CompareClientProps {
  allNames: { id: string; name: string; language: string }[];
  selectedNames: any[];
  selectedIds: string[];
}

export function CompareClient({ allNames, selectedNames, selectedIds }: CompareClientProps) {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [languageFilter, setLanguageFilter] = useState<string | null>(null);

  const filteredPicker = useMemo(() => {
    return allNames.filter((n) => {
      if (selectedIds.includes(n.id)) return false;
      const matchesSearch = !search ||
        n.name.toLowerCase().includes(search.toLowerCase()) ||
        n.language.toLowerCase().includes(search.toLowerCase());
      const matchesLang = !languageFilter || n.language === languageFilter;
      return matchesSearch && matchesLang;
    });
  }, [allNames, selectedIds, search, languageFilter]);

  const availableLanguages = useMemo(() => {
    const langs = new Set(allNames.map((n) => n.language));
    return Array.from(langs).sort();
  }, [allNames]);

  const addName = (id: string) => {
    const newIds = [...selectedIds, id];
    router.push(`/compare?ids=${newIds.join(',')}`);
  };

  const removeName = (id: string) => {
    const newIds = selectedIds.filter((i) => i !== id);
    router.push(newIds.length > 0 ? `/compare?ids=${newIds.join(',')}` : '/compare');
  };

  const clearAll = () => {
    router.push('/compare');
  };

  // Find shared and unique attributes
  const sharedAttributes = useMemo(() => {
    if (selectedNames.length < 2) return [];
    const attrSets = selectedNames.map((n) => new Set(n.attribute || []));
    return Array.from(attrSets[0]).filter((attr) =>
      attrSets.every((set) => set.has(attr))
    ) as string[];
  }, [selectedNames]);

  const COMPARE_FIELDS = [
    { key: 'meaning', label: 'Meaning' },
    { key: 'pronunciation', label: 'Pronunciation' },
    { key: 'language', label: 'Language', format: formatLanguage },
    { key: 'attribute', label: 'Attributes', isArray: true },
    { key: 'scripture_refs', label: 'Scripture References', isArray: true },
    { key: 'context_of_use', label: 'Context of Use' },
    { key: 'divine_personality', label: 'Divine Personality' },
    { key: 'notes', label: 'Notes' },
  ];

  return (
    <main className="w-full">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Compare Names</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Select names to compare side by side
          </p>
        </div>
        <Link
          href="/"
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← Back to Home
        </Link>
      </div>

      {/* Name Picker */}
      <div className="mb-8 p-4 border rounded-xl bg-gray-50 dark:bg-gray-900">
        <h2 className="text-sm font-semibold mb-3">Add names to compare ({selectedIds.length} selected)</h2>

        <div className="flex flex-wrap gap-2 mb-3">
          <input
            type="text"
            placeholder="Search names..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-1.5 border rounded-lg text-sm flex-1 min-w-[200px]"
          />
          <select
            value={languageFilter || ''}
            onChange={(e) => setLanguageFilter(e.target.value || null)}
            className="px-3 py-1.5 border rounded-lg text-sm bg-white dark:bg-gray-800"
          >
            <option value="">All languages</option>
            {availableLanguages.map((lang) => (
              <option key={lang} value={lang}>{formatLanguage(lang)}</option>
            ))}
          </select>
        </div>

        {/* Selected pills */}
        {selectedIds.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {selectedNames.map((n) => (
              <span
                key={n.id}
                className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 rounded-full text-sm"
              >
                {n.name}
                <button
                  onClick={() => removeName(n.id)}
                  className="ml-1 text-indigo-500 hover:text-indigo-700 dark:hover:text-indigo-300"
                >
                  ×
                </button>
              </span>
            ))}
            <button
              onClick={clearAll}
              className="text-xs text-red-500 hover:text-red-700 hover:underline self-center"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Picker list */}
        <div className="max-h-48 overflow-y-auto border rounded-lg bg-white dark:bg-gray-800">
          {filteredPicker.length === 0 ? (
            <p className="p-3 text-sm text-gray-500">No names available</p>
          ) : (
            filteredPicker.map((n) => (
              <button
                key={n.id}
                onClick={() => addName(n.id)}
                className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm border-b last:border-b-0 flex justify-between items-center"
              >
                <span className="font-medium">{n.name}</span>
                <span className="text-xs text-gray-500">{formatLanguage(n.language)}</span>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Comparison Table */}
      {selectedNames.length >= 2 && (
        <>
          {/* Shared attributes highlight */}
          {sharedAttributes.length > 0 && (
            <div className="mb-6 p-4 border rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800">
              <h3 className="text-sm font-semibold text-emerald-800 dark:text-emerald-300 mb-2">
                Shared Attributes ({sharedAttributes.length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {sharedAttributes.map((attr) => (
                  <span
                    key={attr}
                    className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300"
                  >
                    {attr}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Comparison grid */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr>
                  <th className="text-left p-3 border-b bg-gray-50 dark:bg-gray-900 font-semibold w-40 sticky left-0">
                    Field
                  </th>
                  {selectedNames.map((n) => (
                    <th key={n.id} className="text-left p-3 border-b bg-gray-50 dark:bg-gray-900 min-w-[200px]">
                      <Link
                        href={`/names/${generateSlug(n.name, n.language)}`}
                        className="text-indigo-600 dark:text-indigo-400 hover:underline font-bold text-base"
                      >
                        {n.name}
                      </Link>
                      <span className="block text-xs text-gray-500 font-normal mt-0.5">
                        {formatLanguage(n.language)}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARE_FIELDS.map(({ key, label, isArray, format }) => (
                  <tr key={key} className="border-b hover:bg-gray-50 dark:hover:bg-gray-900/50">
                    <td className="p-3 font-medium text-gray-600 dark:text-gray-400 sticky left-0 bg-white dark:bg-gray-950">
                      {label}
                    </td>
                    {selectedNames.map((n) => {
                      const value = n[key];
                      return (
                        <td key={n.id} className="p-3 align-top">
                          {isArray ? (
                            <div className="flex flex-wrap gap-1">
                              {(value || []).map((item: string) => (
                                <span
                                  key={item}
                                  className={`text-xs px-2 py-0.5 rounded-full ${
                                    key === 'attribute' && sharedAttributes.includes(item)
                                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300'
                                      : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                                  }`}
                                >
                                  {item}
                                </span>
                              ))}
                              {(!value || value.length === 0) && (
                                <span className="text-gray-400">—</span>
                              )}
                            </div>
                          ) : (
                            <span>{format ? format(value) : value || <span className="text-gray-400">—</span>}</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {selectedNames.length === 1 && (
        <p className="text-center text-gray-500 dark:text-gray-400 py-8">
          Select at least one more name to start comparing.
        </p>
      )}

      {selectedNames.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400 py-8">
          Use the picker above to select names for comparison.
        </p>
      )}
    </main>
  );
}

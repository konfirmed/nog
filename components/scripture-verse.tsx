"use client";

import { useState } from "react";
import { fetchVerse, type BibleVerse } from "@/lib/bible-api";
import { cn } from "@/lib/utils";

interface ScriptureVerseProps {
  reference: string;
  className?: string;
}

export function ScriptureVerse({ reference, className }: ScriptureVerseProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [verse, setVerse] = useState<BibleVerse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleToggle = async () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);

    // Fetch verse when expanding for the first time
    if (newIsOpen && !verse && !loading && !error) {
      setLoading(true);
      const result = await fetchVerse(reference);
      setLoading(false);

      if (result) {
        setVerse(result);
      } else {
        setError(true);
      }
    }
  };

  return (
    <div className={cn("scripture-verse", className)}>
      <button
        onClick={handleToggle}
        className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline text-left"
      >
        <svg
          className={cn(
            "w-4 h-4 transition-transform",
            isOpen && "rotate-90"
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
        {reference}
      </button>

      {isOpen && (
        <div className="mt-2 ml-6 pl-4 border-l-2 border-blue-200 dark:border-blue-800">
          {loading && (
            <p className="text-sm text-gray-500 dark:text-gray-400 italic animate-pulse">
              Loading verse...
            </p>
          )}

          {error && (
            <p className="text-sm text-red-500 dark:text-red-400">
              Could not load verse.
              <a
                href={`https://www.biblegateway.com/passage/?search=${encodeURIComponent(reference)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 underline"
              >
                View on BibleGateway
              </a>
            </p>
          )}

          {verse && (
            <div className="text-sm">
              <p className="text-gray-700 dark:text-gray-300 italic leading-relaxed">
                "{verse.text}"
              </p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                — {verse.reference} ({verse.translation})
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

interface ScriptureListProps {
  references: string[];
  className?: string;
}

export function ScriptureList({ references, className }: ScriptureListProps) {
  if (!references?.length) return null;

  return (
    <div className={cn("space-y-2", className)}>
      {references.map((ref) => (
        <ScriptureVerse key={ref} reference={ref} />
      ))}
    </div>
  );
}

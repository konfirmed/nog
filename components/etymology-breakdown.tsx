"use client";

import { parseYorubaEtymology, type EtymologyBreakdown } from "@/lib/yoruba-etymology";

interface EtymologyBreakdownProps {
  name: string;
  language: string;
}

const TYPE_COLORS: Record<string, string> = {
  prefix: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  root: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  suffix: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  connector: "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300",
};

export function EtymologyBreakdownDisplay({ name, language }: EtymologyBreakdownProps) {
  // Only show for Yoruba names
  if (language !== "yoruba") return null;

  const etymology = parseYorubaEtymology(name);
  if (!etymology || etymology.parts.length === 0) return null;

  return (
    <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg">
      <h3 className="text-sm font-semibold text-amber-800 dark:text-amber-300 mb-3 flex items-center gap-2">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
        Etymology Breakdown
      </h3>

      {/* Parts breakdown */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        {etymology.parts.map((part, index) => (
          <div key={index} className="flex items-center gap-1">
            <div className="text-center">
              <span
                className={`inline-block px-2 py-1 rounded text-sm font-medium ${TYPE_COLORS[part.type]}`}
              >
                {part.part}
              </span>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{part.meaning}</p>
            </div>
            {index < etymology.parts.length - 1 && (
              <span className="text-gray-400 dark:text-gray-500 mx-1">+</span>
            )}
          </div>
        ))}
      </div>

      {/* Literal meaning */}
      <div className="border-t border-amber-200 dark:border-amber-800 pt-3 mt-3">
        <p className="text-sm">
          <span className="font-medium text-gray-700 dark:text-gray-300">Literal meaning: </span>
          <span className="italic text-gray-600 dark:text-gray-400">
            {etymology.literalMeaning}
          </span>
        </p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mt-3 pt-3 border-t border-amber-200 dark:border-amber-800">
        <span className="text-xs text-gray-500 dark:text-gray-400">Legend:</span>
        <span className={`text-xs px-1.5 py-0.5 rounded ${TYPE_COLORS.prefix}`}>Prefix</span>
        <span className={`text-xs px-1.5 py-0.5 rounded ${TYPE_COLORS.root}`}>Root</span>
        <span className={`text-xs px-1.5 py-0.5 rounded ${TYPE_COLORS.suffix}`}>Suffix</span>
        <span className={`text-xs px-1.5 py-0.5 rounded ${TYPE_COLORS.connector}`}>Connector</span>
      </div>
    </div>
  );
}

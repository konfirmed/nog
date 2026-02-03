"use client";

import { useState } from "react";
import Link from "next/link";
import { ScriptureVerse } from "./scripture-verse";
import { generateSlug } from "@/lib/slug";

interface DevotionalName {
  id: string;
  name: string;
  language: string;
  pronunciation: string;
  meaning: string;
  attribute?: string[];
  scripture_refs?: string[];
  context_of_use?: string;
  divine_personality?: string;
}

interface DailyDevotionalProps {
  name: DevotionalName;
}

// Reflection prompts based on divine personality/attributes
const REFLECTION_PROMPTS: Record<string, string> = {
  Creator: "How does knowing God as Creator change how you view your own life and purpose?",
  Healer: "Where in your life do you need God's healing touch today?",
  Protector: "What fears can you release to the One who guards and defends you?",
  Provider: "How has God provided for you in unexpected ways?",
  Savior: "Take a moment to thank God for His salvation and deliverance in your life.",
  Judge: "How does God's justice bring you comfort in an unjust world?",
  Mercy: "Who in your life needs the mercy you've received from God?",
  Wisdom: "What decision are you facing that needs divine wisdom?",
  Peace: "Where do you need God's peace to rule in your heart today?",
  King: "In what area of your life do you need to surrender to God's kingship?",
  Faithful: "Recall a time when God proved faithful. How does that strengthen your trust today?",
  default: "How does this name of God speak to your current season of life?",
};

function getReflectionPrompt(attributes?: string[], personality?: string): string {
  if (attributes?.length) {
    for (const attr of attributes) {
      if (REFLECTION_PROMPTS[attr]) {
        return REFLECTION_PROMPTS[attr];
      }
    }
  }
  if (personality) {
    const key = Object.keys(REFLECTION_PROMPTS).find((k) =>
      personality.toLowerCase().includes(k.toLowerCase())
    );
    if (key) return REFLECTION_PROMPTS[key];
  }
  return REFLECTION_PROMPTS.default;
}

export function DailyDevotional({ name }: DailyDevotionalProps) {
  const [expanded, setExpanded] = useState(false);

  const reflectionPrompt = getReflectionPrompt(name.attribute, name.divine_personality);
  const slug = generateSlug(name.name, name.language);

  const shareText = `Today's Name of G_D: ${name.name} (${name.meaning})`;
  const shareUrl = `https://nog.knfrmd.com/names/${slug}`;

  return (
    <div className="mb-8 p-5 border-2 border-amber-200 dark:border-amber-800 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-wider text-amber-700 dark:text-amber-400 font-semibold mb-1">
            Daily Devotional
          </p>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 dark:text-white">
            {name.name}
          </h2>
        </div>
        <Link
          href={`/names/${slug}`}
          className="text-xs text-amber-700 dark:text-amber-400 hover:underline whitespace-nowrap"
        >
          View full details →
        </Link>
      </div>

      <p className="text-sm italic text-gray-600 dark:text-gray-400 mt-1">
        {name.pronunciation}
      </p>

      <div className="mt-3 space-y-2">
        <p className="text-lg text-gray-800 dark:text-gray-200">
          <span className="font-medium">Meaning:</span> {name.meaning}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          <span className="font-medium">Language:</span>{" "}
          {name.language.charAt(0).toUpperCase() + name.language.slice(1)}
        </p>
      </div>

      {name.attribute && name.attribute.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {name.attribute.map((attr) => (
            <span
              key={attr}
              className="text-xs px-2 py-1 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200"
            >
              {attr}
            </span>
          ))}
        </div>
      )}

      {/* Expandable section */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-4 text-sm text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1"
      >
        <svg
          className={`w-4 h-4 transition-transform ${expanded ? "rotate-90" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        {expanded ? "Show less" : "Read today's devotional"}
      </button>

      {expanded && (
        <div className="mt-4 space-y-4 border-t border-amber-200 dark:border-amber-800 pt-4">
          {/* Scripture */}
          {name.scripture_refs && name.scripture_refs.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Scripture
              </h3>
              <div className="space-y-2">
                {name.scripture_refs.slice(0, 2).map((ref) => (
                  <ScriptureVerse key={ref} reference={ref} />
                ))}
              </div>
            </div>
          )}

          {/* Context */}
          {name.context_of_use && (
            <div>
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                When to use this name
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{name.context_of_use}</p>
            </div>
          )}

          {/* Divine Personality */}
          {name.divine_personality && (
            <div>
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Divine Character
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{name.divine_personality}</p>
            </div>
          )}

          {/* Reflection */}
          <div className="bg-white/50 dark:bg-black/20 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-amber-800 dark:text-amber-300 mb-2">
              Reflect
            </h3>
            <p className="text-sm italic text-gray-700 dark:text-gray-300">{reflectionPrompt}</p>
          </div>
        </div>
      )}

      {/* Share buttons */}
      <div className="mt-4 pt-3 border-t border-amber-200 dark:border-amber-800 flex flex-wrap items-center gap-3 text-sm">
        <span className="text-gray-500 dark:text-gray-400">Share:</span>
        <button
          onClick={() => {
            navigator.clipboard.writeText(`${shareText} – ${shareUrl}`);
            alert("Copied to clipboard!");
          }}
          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
        >
          Copy
        </button>
        <a
          href={`https://wa.me/?text=${encodeURIComponent(`${shareText} – ${shareUrl}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-600 hover:text-green-700"
        >
          WhatsApp
        </a>
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-600"
        >
          X/Twitter
        </a>
      </div>
    </div>
  );
}

"use client";

import { parseYorubaEtymology, type EtymologyBreakdown } from "@/lib/yoruba-etymology";
import { parseHebrewEtymology } from "@/lib/hebrew-etymology";
import { parseHindiEtymology } from "@/lib/hindi-etymology";
import { parseYiddishEtymology } from "@/lib/yiddish-etymology";
import { parseHausaEtymology } from "@/lib/hausa-etymology";
import { parseWelshEtymology } from "@/lib/welsh-etymology";
import { parseWolofEtymology } from "@/lib/wolof-etymology";
import { parseHaitianCreoleEtymology } from "@/lib/haitian-creole-etymology";
import { parseWuChineseEtymology } from "@/lib/wu-chinese-etymology";
import { parseMandarinEtymology } from "@/lib/mandarin-etymology";
import { useI18n } from "./i18n-provider";

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

// Language-specific colors for the etymology card
const LANGUAGE_COLORS: Record<string, { bg: string; border: string; title: string }> = {
  yoruba: {
    bg: "bg-amber-50 dark:bg-amber-950/30",
    border: "border-amber-200 dark:border-amber-800",
    title: "text-amber-800 dark:text-amber-300",
  },
  hebrew: {
    bg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-200 dark:border-blue-800",
    title: "text-blue-800 dark:text-blue-300",
  },
  hindi: {
    bg: "bg-orange-50 dark:bg-orange-950/30",
    border: "border-orange-200 dark:border-orange-800",
    title: "text-orange-800 dark:text-orange-300",
  },
  yiddish: {
    bg: "bg-indigo-50 dark:bg-indigo-950/30",
    border: "border-indigo-200 dark:border-indigo-800",
    title: "text-indigo-800 dark:text-indigo-300",
  },
  hausa: {
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    border: "border-emerald-200 dark:border-emerald-800",
    title: "text-emerald-800 dark:text-emerald-300",
  },
  welsh: {
    bg: "bg-red-50 dark:bg-red-950/30",
    border: "border-red-200 dark:border-red-800",
    title: "text-red-800 dark:text-red-300",
  },
  wolof: {
    bg: "bg-teal-50 dark:bg-teal-950/30",
    border: "border-teal-200 dark:border-teal-800",
    title: "text-teal-800 dark:text-teal-300",
  },
  haitian_creole: {
    bg: "bg-sky-50 dark:bg-sky-950/30",
    border: "border-sky-200 dark:border-sky-800",
    title: "text-sky-800 dark:text-sky-300",
  },
  wu_chinese: {
    bg: "bg-rose-50 dark:bg-rose-950/30",
    border: "border-rose-200 dark:border-rose-800",
    title: "text-rose-800 dark:text-rose-300",
  },
  mandarin: {
    bg: "bg-yellow-50 dark:bg-yellow-950/30",
    border: "border-yellow-200 dark:border-yellow-800",
    title: "text-yellow-800 dark:text-yellow-300",
  },
};

// Default colors for unknown languages
const DEFAULT_COLORS = {
  bg: "bg-gray-50 dark:bg-gray-950/30",
  border: "border-gray-200 dark:border-gray-800",
  title: "text-gray-800 dark:text-gray-300",
};

/**
 * Get etymology for a name based on its language
 */
function getEtymology(name: string, language: string): EtymologyBreakdown | null {
  const lang = language.toLowerCase();

  switch (lang) {
    case "yoruba":
      return parseYorubaEtymology(name);
    case "hebrew":
      return parseHebrewEtymology(name);
    case "hindi":
      return parseHindiEtymology(name);
    case "yiddish":
      return parseYiddishEtymology(name);
    case "hausa":
      return parseHausaEtymology(name);
    case "welsh":
      return parseWelshEtymology(name);
    case "wolof":
      return parseWolofEtymology(name);
    case "haitian_creole":
    case "haitian creole":
    case "haitiancreole":
      return parseHaitianCreoleEtymology(name);
    case "wu_chinese":
    case "wu chinese":
    case "wuchinese":
    case "wu":
      return parseWuChineseEtymology(name);
    case "mandarin":
      return parseMandarinEtymology(name);
    default:
      return null;
  }
}

/**
 * Get display name for a language
 */
function getLanguageDisplayName(language: string): string {
  const displayNames: Record<string, string> = {
    yoruba: "Yoruba",
    hebrew: "Hebrew",
    hindi: "Hindi",
    yiddish: "Yiddish",
    hausa: "Hausa",
    welsh: "Welsh",
    wolof: "Wolof",
    haitian_creole: "Haitian Creole",
    wu_chinese: "Wu Chinese",
    mandarin: "Mandarin",
  };
  return displayNames[language.toLowerCase()] || language;
}

export function EtymologyBreakdownDisplay({ name, language }: EtymologyBreakdownProps) {
  const { t } = useI18n();
  const etymology = getEtymology(name, language);
  if (!etymology || etymology.parts.length === 0) return null;

  const colors = LANGUAGE_COLORS[language.toLowerCase()] || DEFAULT_COLORS;
  const languageDisplay = getLanguageDisplayName(language);

  return (
    <div className={`mt-6 p-4 ${colors.bg} border ${colors.border} rounded-lg`}>
      <h3 className={`text-sm font-semibold ${colors.title} mb-3 flex items-center gap-2`}>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
        {languageDisplay} {t("etymology.breakdown")}
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
      <div className={`border-t ${colors.border} pt-3 mt-3`}>
        <p className="text-sm">
          <span className="font-medium text-gray-700 dark:text-gray-300">{t("etymology.literalMeaning")} </span>
          <span className="italic text-gray-600 dark:text-gray-400">
            {etymology.literalMeaning}
          </span>
        </p>
      </div>

      {/* Legend */}
      <div className={`flex flex-wrap gap-3 mt-3 pt-3 border-t ${colors.border}`}>
        <span className="text-xs text-gray-500 dark:text-gray-400">{t("etymology.legend")}</span>
        <span className={`text-xs px-1.5 py-0.5 rounded ${TYPE_COLORS.prefix}`}>{t("etymology.prefix")}</span>
        <span className={`text-xs px-1.5 py-0.5 rounded ${TYPE_COLORS.root}`}>{t("etymology.root")}</span>
        <span className={`text-xs px-1.5 py-0.5 rounded ${TYPE_COLORS.suffix}`}>{t("etymology.suffix")}</span>
        <span className={`text-xs px-1.5 py-0.5 rounded ${TYPE_COLORS.connector}`}>{t("etymology.connector")}</span>
      </div>
    </div>
  );
}

"use client";

import { useI18n } from "./i18n-provider";
import { UI_LOCALES, type UILocale } from "@/lib/i18n";

export function LocaleSwitcher() {
  const { locale, setLocale } = useI18n();

  return (
    <select
      value={locale}
      onChange={(e) => setLocale(e.target.value as UILocale)}
      className="text-xs px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-transparent text-gray-600 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500 cursor-pointer"
      aria-label="Select UI language"
    >
      {Object.entries(UI_LOCALES).map(([code, name]) => (
        <option key={code} value={code}>
          {name}
        </option>
      ))}
    </select>
  );
}

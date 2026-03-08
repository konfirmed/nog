"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { type UILocale, type TranslationKey, getTranslation, UI_LOCALES } from "@/lib/i18n";

interface I18nContextType {
  locale: UILocale;
  setLocale: (locale: UILocale) => void;
  t: (key: TranslationKey) => string;
}

const I18nContext = createContext<I18nContextType>({
  locale: "en",
  setLocale: () => {},
  t: (key) => key,
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<UILocale>("en");

  useEffect(() => {
    const stored = localStorage.getItem("ui-locale") as UILocale | null;
    if (stored && stored in UI_LOCALES) {
      setLocaleState(stored);
    }
  }, []);

  const setLocale = useCallback((newLocale: UILocale) => {
    setLocaleState(newLocale);
    localStorage.setItem("ui-locale", newLocale);
  }, []);

  const t = useCallback(
    (key: TranslationKey) => getTranslation(locale, key),
    [locale]
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}

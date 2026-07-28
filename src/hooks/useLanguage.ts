import { useEffect, useState } from "react";
import type { Language } from "../types";

const STORAGE_KEY = "lang";

/**
 * A stored choice wins; otherwise follow the browser locale, defaulting to
 * Spanish for anything that is not English. Unlike the theme this needs no
 * boot script: language does not affect the colours of the first paint.
 */
function readLanguage(fallback: Language): Language {
  let stored: string | null = null;
  // Only the read is guarded, so a blocked storage still lets the browser
  // locale decide instead of silently falling back.
  try {
    stored = localStorage.getItem(STORAGE_KEY);
  } catch {
    // Storage unavailable; fall through to the browser locale.
  }
  if (stored === "es" || stored === "en") return stored;
  return navigator.language?.toLowerCase().startsWith("en") ? "en" : fallback;
}

export function useLanguage(initial: Language = "es") {
  const [lang, setLang] = useState<Language>(() => readLanguage(initial));

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Storage can be unavailable; the choice still applies for this session.
    }
  }, [lang]);

  return { lang, setLang };
}

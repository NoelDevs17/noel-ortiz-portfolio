import { useState } from "react";
import type { Language } from "../types";

export function useLanguage(initial: Language = "es") {
  const [lang, setLang] = useState<Language>(initial);
  return { lang, setLang };
}

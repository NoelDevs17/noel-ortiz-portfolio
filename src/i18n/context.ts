import { createContext, useContext } from "react";
import type { Language, Localized } from "../types";
import type { Ui } from "./translations";

export interface I18nValue {
  lang: Language;
  setLang: (lang: Language) => void;
  /** Diccionario de la interfaz, ya resuelto al idioma activo. */
  t: Ui;
  /**
   * Extrae el idioma activo de un campo del modelo de datos.
   *
   * Es una funcion normal, no un hook: se llama dentro de callbacks de `.map()`
   * por todo el proyecto, y un hook ahi violaria las reglas de hooks.
   */
  pick: <T>(value: Localized<T>) => T;
}

export const I18nContext = createContext<I18nValue | null>(null);

export function useI18n(): I18nValue {
  const value = useContext(I18nContext);
  if (!value) {
    throw new Error("useI18n() requiere que el arbol este dentro de <LanguageProvider>");
  }
  return value;
}

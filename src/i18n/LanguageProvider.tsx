import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { Language, Localized } from "../types";
import { I18nContext } from "./context";
import type { I18nValue } from "./context";
import { ui } from "./translations";

const STORAGE_KEY = "lang";

/**
 * Una eleccion guardada manda; si no la hay, se sigue el idioma del navegador,
 * con espanol por defecto para cualquier cosa que no sea ingles.
 *
 * A diferencia del tema, esto no necesita un script de arranque en el HTML: el
 * idioma no afecta a los colores del primer pintado, asi que no hay parpadeo
 * que evitar.
 */
function readInitialLanguage(fallback: Language = "es"): Language {
  let stored: string | null = null;
  // Solo la lectura va protegida: en modo privado localStorage puede lanzar, y
  // en ese caso el idioma del navegador todavia deberia poder decidir.
  try {
    stored = localStorage.getItem(STORAGE_KEY);
  } catch {
    // Almacenamiento no disponible; se cae al idioma del navegador.
  }
  if (stored === "es" || stored === "en") return stored;
  return navigator.language?.toLowerCase().startsWith("en") ? "en" : fallback;
}

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [lang, setLang] = useState<Language>(() => readInitialLanguage());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // El almacenamiento puede no estar disponible; la eleccion sigue valiendo
      // para esta sesion.
    }
    // El <html lang> debe seguir al idioma real de la pagina: de el dependen
    // los lectores de pantalla para elegir voz y pronunciacion, y el navegador
    // para ofrecer traduccion.
    document.documentElement.lang = lang;
  }, [lang]);

  const pick = useCallback(
    <T,>(value: Localized<T>): T => value[lang],
    [lang],
  );

  const value = useMemo<I18nValue>(
    () => ({ lang, setLang, t: ui[lang], pick }),
    [lang, pick],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

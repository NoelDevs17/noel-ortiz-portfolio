import { useCallback, useEffect, useState } from "react";

export type Theme = "dark" | "light";

const STORAGE_KEY = "theme";

/**
 * Color de fondo por tema. Tiene que coincidir con el script de arranque del
 * index.html, que pinta antes de que exista este modulo.
 */
const PAGE_BG: Record<Theme, string> = {
  dark: "#0b0c0d",
  light: "#f2f0e9",
};

/**
 * Resuelve el tema igual que el script de arranque: una eleccion guardada
 * manda, y si no la hay se usa oscuro salvo que el sistema pida claro
 * explicitamente.
 *
 * La logica esta duplicada a proposito: aquel script corre antes de que este
 * modulo exista, y sin el la pagina se pintaria blanca hasta que React monta.
 * Si cambia una, cambia la otra.
 */
function readTheme(fallback: Theme = "dark"): Theme {
  let stored: string | null = null;
  // Solo la lectura va protegida: en modo privado localStorage puede lanzar, y
  // el pintado tiene que ocurrir igual o vuelve el parpadeo.
  try {
    stored = localStorage.getItem(STORAGE_KEY);
  } catch {
    // Almacenamiento no disponible; decide la preferencia del sistema.
  }
  if (stored === "dark" || stored === "light") return stored;
  return typeof window.matchMedia === "function"
    ? window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark"
    : fallback;
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => readTheme());
  const isDark = theme === "dark";

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // El almacenamiento puede fallar; el tema sigue valiendo esta sesion.
    }

    const root = document.documentElement;
    // La clase es lo que conmuta las variables CSS de index.css.
    root.classList.toggle("light", theme === "light");
    // Mantiene <html> en sintonia con la app, para que la zona de rebote del
    // scroll y los controles nativos no se queden del color anterior.
    root.style.backgroundColor = PAGE_BG[theme];
    root.style.colorScheme = theme;

    // La barra del navegador en movil tambien debe seguir al tema.
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", PAGE_BG[theme]);
  }, [theme]);

  const toggleTheme = useCallback(
    () => setTheme((actual) => (actual === "dark" ? "light" : "dark")),
    [],
  );

  return { theme, isDark, toggleTheme };
}

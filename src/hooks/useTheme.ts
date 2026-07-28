import { useEffect, useState } from "react";
import type { Theme } from "../types";

const STORAGE_KEY = "theme";

/** Page background per theme. Must match the boot script in index.html. */
const PAGE_BG: Record<Theme, string> = {
  dark: "#020617", // slate-950
  light: "#f8fafc", // slate-50
};

/**
 * Resolves the theme exactly like the boot script in index.html: a stored
 * choice wins, otherwise dark unless the OS explicitly asks for light. The
 * logic is duplicated on purpose — that script runs before this module exists,
 * so keep the two in sync.
 */
function readTheme(fallback: Theme): Theme {
  let stored: string | null = null;
  // Only the read is guarded: private mode makes localStorage throw, and the
  // OS preference should still decide in that case.
  try {
    stored = localStorage.getItem(STORAGE_KEY);
  } catch {
    // Storage unavailable; fall through to the media query.
  }
  if (stored === "dark" || stored === "light") return stored;
  return typeof window.matchMedia === "function"
    ? window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark"
    : fallback;
}

export function useTheme(initial: Theme = "dark") {
  const [theme, setTheme] = useState<Theme>(() => readTheme(initial));
  const isDark = theme === "dark";

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Storage can be unavailable; the theme still applies for this session.
    }
    // Keep <html> in step with the app so overscroll areas, form controls and
    // scrollbars match instead of keeping the colour the boot script painted.
    document.documentElement.style.backgroundColor = PAGE_BG[theme];
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  const toggleTheme = () => setTheme(isDark ? "light" : "dark");

  return { theme, isDark, toggleTheme };
}

import { useState } from "react";
import type { Theme } from "../types";

export function useTheme(initial: Theme = "dark") {
  const [theme, setTheme] = useState<Theme>(initial);
  const isDark = theme === "dark";
  const toggleTheme = () => setTheme(isDark ? "light" : "dark");
  return { theme, isDark, toggleTheme };
}

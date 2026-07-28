import { uiTranslations } from "../../constants/translations";
import type { Language } from "../../types";

interface FooterProps {
  lang: Language;
  isDark: boolean;
}

export function Footer({ lang, isDark }: FooterProps) {
  const t = uiTranslations[lang];
  return (
    <footer
      className={`border-t py-6 text-center text-xs font-mono print:hidden transition-all ${
        isDark
          ? "border-slate-900/60 bg-slate-950 text-slate-500"
          : "border-slate-200 bg-white text-slate-600"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2.5">
        <span>{t.footer}</span>
      </div>
    </footer>
  );
}

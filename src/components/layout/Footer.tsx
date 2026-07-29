import { personalInfo } from "../../data";
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
      className={`border-t py-7 print:hidden ${
        isDark
          ? "border-slate-900 bg-slate-950"
          : "border-slate-200 bg-slate-50"
      }`}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="font-mono text-xs text-slate-500">{t.footer}</p>
        <div className="flex items-center gap-5 font-mono text-xs">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noreferrer"
            className={`transition-colors ${
              isDark
                ? "text-slate-400 hover:text-white"
                : "text-slate-600 hover:text-slate-950"
            }`}
          >
            GitHub
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noreferrer"
            className={`transition-colors ${
              isDark
                ? "text-slate-400 hover:text-white"
                : "text-slate-600 hover:text-slate-950"
            }`}
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}

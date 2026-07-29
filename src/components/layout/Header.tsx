import { useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { FileDown, Menu, Moon, Sun, X } from "lucide-react";
import { uiTranslations } from "../../constants/translations";
import { scrollToSection } from "../../utils/scroll";
import type { Language } from "../../types";

interface HeaderProps {
  lang: Language;
  setLang: (lang: Language) => void;
  isDark: boolean;
  toggleTheme: () => void;
}

export function Header({
  lang,
  setLang,
  isDark,
  toggleTheme,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const t = uiTranslations[lang];

  const navItems = [
    { id: "about", label: t.nav.about },
    { id: "experience", label: t.nav.experience },
    { id: "projects", label: t.nav.projects },
    { id: "skills", label: t.nav.skills },
    { id: "education", label: t.nav.education },
    { id: "contact", label: t.nav.contact },
  ];

  const handleNav = (id: string) => {
    setMobileMenuOpen(false);
    scrollToSection(id);
  };

  const surface = isDark
    ? "border-slate-800/70 bg-slate-950/88 text-slate-100"
    : "border-slate-200/80 bg-slate-50/90 text-slate-900";

  return (
    <header
      id="main-nav-bar"
      className={`sticky top-0 z-50 border-b backdrop-blur-xl print:hidden ${surface}`}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6">
        <button
          type="button"
          onClick={() => handleNav("hero")}
          className="group flex items-center gap-3 text-left active:scale-[0.98]"
          aria-label="Noel Ortiz"
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-600 font-mono text-sm font-extrabold text-white transition-transform duration-300 group-hover:-rotate-3">
            &lt;/&gt;
          </span>
          <span className="font-mono text-sm font-semibold tracking-[-0.02em]">
            NOEL_ORTIZ
          </span>
        </button>

        <nav className="hidden items-center gap-5 xl:flex" aria-label="Primary">
          {navItems.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => handleNav(id)}
              className={`whitespace-nowrap font-mono text-[11px] transition-colors ${
                isDark
                  ? "text-slate-400 hover:text-white"
                  : "text-slate-600 hover:text-slate-950"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-2 xl:flex">
          <IconButton
            onClick={toggleTheme}
            label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            isDark={isDark}
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </IconButton>
          <button
            type="button"
            onClick={() => window.print()}
            className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 font-mono text-[11px] font-semibold transition-all active:scale-[0.98] ${
              isDark
                ? "border-slate-800 bg-slate-900/70 text-slate-200 hover:border-blue-500/50 hover:text-white"
                : "border-slate-200 bg-white text-slate-700 hover:border-blue-500/40 hover:text-slate-950"
            }`}
          >
            <FileDown className="h-3.5 w-3.5" />
            <span className="whitespace-nowrap">{t.printResume}</span>
          </button>
          <LangToggle lang={lang} setLang={setLang} isDark={isDark} />
        </div>

        <div className="flex items-center gap-2 xl:hidden">
          <IconButton
            onClick={toggleTheme}
            label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            isDark={isDark}
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </IconButton>
          <LangToggle lang={lang} setLang={setLang} isDark={isDark} compact />
          <IconButton
            onClick={() => setMobileMenuOpen((open) => !open)}
            label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
            isDark={isDark}
            expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </IconButton>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {mobileMenuOpen && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            className={`overflow-hidden border-t xl:hidden ${
              isDark
                ? "border-slate-800 bg-slate-950"
                : "border-slate-200 bg-slate-50"
            }`}
          >
            <nav className="mx-auto grid max-w-7xl gap-1 px-4 py-4 sm:px-6">
              {navItems.map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleNav(id)}
                  className={`rounded-xl px-3 py-3 text-left font-mono text-sm transition-colors ${
                    isDark
                      ? "text-slate-300 hover:bg-slate-900 hover:text-white"
                      : "text-slate-700 hover:bg-white hover:text-slate-950"
                  }`}
                >
                  {label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => {
                  window.print();
                  setMobileMenuOpen(false);
                }}
                className="mt-2 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-3 py-3 font-mono text-sm font-semibold text-white active:scale-[0.98]"
              >
                <FileDown className="h-4 w-4" />
                {t.printResume}
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

interface IconButtonProps {
  children: ReactNode;
  onClick: () => void;
  label: string;
  isDark: boolean;
  expanded?: boolean;
}

function IconButton({
  children,
  onClick,
  label,
  isDark,
  expanded,
}: IconButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-expanded={expanded}
      title={label}
      className={`grid h-9 w-9 place-items-center rounded-xl border transition-all active:scale-[0.96] ${
        isDark
          ? "border-slate-800 bg-slate-900/70 text-slate-300 hover:border-blue-500/50 hover:text-white"
          : "border-slate-200 bg-white text-slate-700 hover:border-blue-500/40 hover:text-slate-950"
      }`}
    >
      {children}
    </button>
  );
}

function LangToggle({
  lang,
  setLang,
  isDark,
  compact = false,
}: {
  lang: Language;
  setLang: (lang: Language) => void;
  isDark: boolean;
  compact?: boolean;
}) {
  return (
    <div
      className={`flex rounded-xl border p-1 ${
        isDark ? "border-slate-800 bg-slate-900/70" : "border-slate-200 bg-white"
      }`}
      aria-label="Language"
    >
      {(["es", "en"] as Language[]).map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => setLang(option)}
          aria-pressed={lang === option}
          className={`${compact ? "px-1.5" : "px-2.5"} rounded-lg py-1 font-mono text-[10px] font-bold uppercase transition-colors ${
            lang === option
              ? "bg-blue-600 text-white"
              : isDark
                ? "text-slate-400 hover:text-white"
                : "text-slate-500 hover:text-slate-950"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

import { useState } from "react";
import { FileDown, Sun, Moon, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { uiTranslations } from "../../constants/translations";
import { scrollToSection } from "../../utils/scroll";
import type { Language } from "../../types";

interface HeaderProps {
  lang: Language;
  setLang: (lang: Language) => void;
  isDark: boolean;
  toggleTheme: () => void;
}

export function Header({ lang, setLang, isDark, toggleTheme }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = uiTranslations[lang];

  const handleNav = (id: string) => {
    setMobileMenuOpen(false);
    scrollToSection(id);
  };

  const navItems: Array<{ id: string; label: string }> = [
    { id: "about", label: t.nav.about },
    { id: "experience", label: t.nav.experience },
    { id: "skills", label: t.nav.skills },
    { id: "education", label: t.nav.education },
    { id: "contact", label: t.nav.contact },
  ];

  const navBtnCls = `text-xs font-mono uppercase tracking-wider transition-colors ${
    isDark ? "text-slate-400 hover:text-slate-200" : "text-slate-600 hover:text-slate-900"
  }`;

  return (
    <header
      id="main-nav-bar"
      className={`sticky top-0 z-50 backdrop-blur-md border-b print:hidden transition-all ${
        isDark
          ? "bg-slate-950/85 border-slate-900"
          : "bg-white/85 border-slate-200 shadow-xs"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          type="button"
          className="flex items-center space-x-3 cursor-pointer text-left"
          onClick={() => handleNav("hero")}
        >
          <span className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center font-mono font-bold text-white shadow-xs">
            &lt;/&gt;
          </span>
          <span className="block">
            <span
              className={`font-mono text-[10px] tracking-wider uppercase block leading-none ${
                isDark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              CV PORTFOLIO
            </span>
            <span
              className={`font-mono text-sm font-semibold block mt-0.5 ${
                isDark ? "text-blue-400" : "text-blue-600"
              }`}
            >
              NOEL_ORTIZ
            </span>
          </span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navItems.map(({ id, label }) => (
            <button key={id} onClick={() => handleNav(id)} className={navBtnCls}>
              {label}
            </button>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg border transition-all ${
              isDark
                ? "bg-slate-900 border-slate-800 text-yellow-400 hover:text-yellow-300"
                : "bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900 shadow-xs"
            }`}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={() => window.print()}
            className={`flex items-center space-x-2 text-xs font-mono px-3 py-1.5 rounded-lg border transition-all ${
              isDark
                ? "border-slate-800 bg-slate-900/60 text-slate-300 hover:text-blue-400 hover:border-blue-500/40"
                : "border-slate-200 bg-white text-slate-700 hover:text-blue-600 hover:border-blue-500/40 shadow-xs"
            }`}
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>{t.printResume}</span>
          </button>

          <LangToggle lang={lang} setLang={setLang} isDark={isDark} size="sm" />
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center space-x-2.5 lg:hidden">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg border transition-all ${
              isDark
                ? "bg-slate-900 border-slate-800 text-yellow-400"
                : "bg-white border-slate-200 text-slate-700 shadow-xs"
            }`}
          >
            {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>

          <LangToggle lang={lang} setLang={setLang} isDark={isDark} size="xs" />

          <button
            onClick={() => setMobileMenuOpen((v) => !v)}
            className={`p-2 rounded-lg border transition-all ${
              isDark
                ? "text-slate-400 hover:text-slate-200 bg-slate-900 border-slate-800"
                : "text-slate-600 hover:text-slate-900 bg-white border-slate-200 shadow-xs"
            }`}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className={`lg:hidden border-t overflow-hidden ${
              isDark
                ? "border-slate-900 bg-slate-950/95"
                : "border-slate-200 bg-white/95 shadow-md"
            }`}
          >
            <div className="px-4 py-4 space-y-3 flex flex-col">
              {navItems.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => handleNav(id)}
                  className={`text-left py-2 text-xs font-mono uppercase tracking-wider ${
                    isDark
                      ? "text-slate-400 hover:text-slate-200"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {label}
                </button>
              ))}
              <div
                className={`pt-2 border-t ${isDark ? "border-slate-900" : "border-slate-100"}`}
              >
                <button
                  onClick={() => {
                    window.print();
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center space-x-1.5 text-xs font-mono ${
                    isDark ? "text-blue-400" : "text-blue-600"
                  }`}
                >
                  <FileDown className="w-3.5 h-3.5" />
                  <span>{t.printResume}</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

interface LangToggleProps {
  lang: Language;
  setLang: (lang: Language) => void;
  isDark: boolean;
  size: "sm" | "xs";
}

function LangToggle({ lang, setLang, isDark, size }: LangToggleProps) {
  const px = size === "sm" ? "px-2 py-1" : "px-2 py-0.5";
  const fontSize = size === "sm" ? "text-[10px]" : "text-[9px]";
  return (
    <div
      className={`p-0.5 rounded-lg border flex items-center ${
        isDark ? "bg-slate-900 border-slate-800" : "bg-slate-100 border-slate-200"
      }`}
    >
      {(["es", "en"] as Language[]).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`${px} ${fontSize} font-mono rounded transition-all uppercase ${
            lang === l
              ? isDark
                ? "bg-blue-500 text-slate-950 font-bold"
                : "bg-blue-600 text-white font-bold"
              : isDark
              ? "text-slate-400"
              : "text-slate-500"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

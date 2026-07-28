import { useState, useEffect, type ReactNode } from "react";
import {
  Mail,
  Github,
  Linkedin,
  Terminal,
  Check,
  Copy,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { uiTranslations } from "../../constants/translations";
import { scrollToSection } from "../../utils/scroll";
import { personalInfo } from "../../data";
import type { Language } from "../../types";

interface HeroProps {
  lang: Language;
  isDark: boolean;
  copiedEmail: boolean;
  onCopyEmail: () => void;
}

export function Hero({
  lang,
  isDark,
  copiedEmail,
  onCopyEmail,
}: HeroProps) {
  const t = uiTranslations[lang];
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % personalInfo.titles[lang].length);
    }, 4000);
    return () => clearInterval(interval);
  }, [lang]);

  return (
    <section
      id="hero"
      className={`relative min-h-[85vh] flex items-center py-16 md:py-24 border-b overflow-hidden print:hidden transition-colors max-w-7xl mx-auto px-4 sm:px-6 ${
        isDark ? "border-slate-900/60" : "border-slate-200"
      }`}
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

        {/* Left: Name + CTA */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          <div className="space-y-3">
            <p
              className={`text-sm font-mono tracking-widest uppercase ${
                isDark ? "text-blue-400" : "text-blue-600 font-semibold"
              }`}
            >
              {t.hero.greeting}
            </p>
            <h1
              className={`text-4xl sm:text-6xl font-bold tracking-tight ${
                isDark ? "text-slate-100" : "text-slate-900"
              }`}
            >
              {personalInfo.name}
            </h1>

            {/* Animated title */}
            <div className="h-10 overflow-hidden flex items-center justify-center lg:justify-start">
              <AnimatePresence mode="wait">
                <motion.div
                  key={titleIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`font-mono text-lg sm:text-2xl font-bold flex items-center gap-2 ${
                    isDark ? "text-blue-400" : "text-blue-600"
                  }`}
                >
                  <Terminal className="w-5 sm:w-6 h-5 sm:h-6 shrink-0" />
                  <span>{personalInfo.titles[lang][titleIndex]}</span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <p
            className={`text-sm sm:text-base max-w-xl mx-auto lg:mx-0 font-medium ${
              isDark ? "text-slate-400" : "text-slate-600"
            }`}
          >
            {t.hero.specialty}
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
            <button
              onClick={() => scrollToSection("experience")}
              className="px-6 py-3 text-xs font-mono font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-md transform hover:-translate-y-0.5 transition-all uppercase tracking-wider"
            >
              {t.hero.ctaWork}
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className={`px-6 py-3 text-xs font-mono font-semibold rounded-xl border transform hover:-translate-y-0.5 transition-all uppercase tracking-wider ${
                isDark
                  ? "border-slate-800 bg-slate-900/60 text-slate-200 hover:text-emerald-400 hover:border-emerald-500/40"
                  : "border-slate-200 bg-white text-slate-700 hover:text-emerald-600 hover:border-emerald-500/40 shadow-xs"
              }`}
            >
              {t.hero.ctaContact}
            </button>
          </div>
        </div>

        {/* Right: Identity card */}
        <div className="lg:col-span-5 flex justify-center">
          <div
            className={`relative w-full max-w-sm border rounded-2xl p-6 shadow-md transition-all ${
              isDark
                ? "bg-slate-900/40 border-slate-800/80"
                : "bg-white border-slate-200 shadow-md"
            }`}
          >
            {/* Decorative window dots */}
            <div className="absolute top-4 right-4 flex space-x-1.5">
              <span className={`w-2.5 h-2.5 rounded-full ${isDark ? "bg-red-500/35" : "bg-red-500/20"}`} />
              <span className={`w-2.5 h-2.5 rounded-full ${isDark ? "bg-yellow-500/35" : "bg-yellow-500/20"}`} />
              <span className={`w-2.5 h-2.5 rounded-full ${isDark ? "bg-emerald-500/35" : "bg-emerald-500/20"}`} />
            </div>

            {/* Avatar */}
            <div className="flex justify-center mb-6 pt-2">
              <div className="w-20 h-20 rounded-2xl bg-blue-600 p-0.5 shadow-sm">
                <div
                  className={`w-full h-full rounded-[14px] flex flex-col items-center justify-center ${
                    isDark ? "bg-slate-950" : "bg-white"
                  }`}
                >
                  <span
                    className={`font-mono text-2xl font-bold ${
                      isDark ? "text-blue-400" : "text-blue-600"
                    }`}
                  >
                    NO
                  </span>
                  <span
                    className={`text-[8px] font-mono tracking-widest mt-0.5 ${
                      isDark ? "text-slate-500" : "text-slate-400"
                    }`}
                  >
                    DEV_LEAD
                  </span>
                </div>
              </div>
            </div>

            <div className="text-center mb-6">
              <h3
                className={`text-lg font-bold ${
                  isDark ? "text-slate-100" : "text-slate-900"
                }`}
              >
                {personalInfo.name}
              </h3>
              <p
                className={`text-xs font-mono mt-1 ${
                  isDark ? "text-slate-400" : "text-slate-500"
                }`}
              >
                {lang === "en" ? "Santo Domingo, DR" : "Santo Domingo, RD"}
              </p>
            </div>

            {/* Clickable contact items */}
            <div className="space-y-3">
              <ContactRow
                icon={<Mail className="w-4 h-4" />}
                label="EMAIL"
                value={personalInfo.email}
                copied={copiedEmail}
                onCopy={onCopyEmail}
                isDark={isDark}
                accentClass={isDark ? "bg-blue-500/10 text-blue-400" : "bg-blue-50 text-blue-600"}
                hoverBorder={isDark ? "hover:border-blue-500/40" : "hover:border-blue-600/40"}
              />
            </div>

            {/* Social links */}
            <div
              className={`flex items-center gap-3 mt-5 pt-5 border-t ${
                isDark ? "border-slate-800" : "border-slate-100"
              }`}
            >
              <SocialLink href={personalInfo.github} label="GitHub" icon={<Github className="w-3.5 h-3.5" />} isDark={isDark} />
              <SocialLink href={personalInfo.linkedin} label="LinkedIn" icon={<Linkedin className="w-3.5 h-3.5" />} isDark={isDark} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface ContactRowProps {
  icon: ReactNode;
  label: string;
  value: string;
  copied: boolean;
  onCopy: () => void;
  isDark: boolean;
  accentClass: string;
  hoverBorder: string;
}

function ContactRow({ icon, label, value, copied, onCopy, isDark, accentClass, hoverBorder }: ContactRowProps) {
  return (
    <button
      type="button"
      onClick={onCopy}
      className={`group w-full text-left flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-all ${
        isDark
          ? `bg-slate-950/50 border-slate-800/50 ${hoverBorder} hover:bg-slate-900/50`
          : `bg-slate-50 border-slate-200 ${hoverBorder} hover:bg-slate-100/50 shadow-xs`
      }`}
    >
      <span className="flex items-center space-x-3 overflow-hidden">
        <span className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${accentClass}`}>
          {icon}
        </span>
        <span className="overflow-hidden">
          <span className="text-[9px] font-mono text-slate-500 block leading-none">{label}</span>
          <span
            className={`text-xs block truncate font-mono mt-0.5 ${
              isDark ? "text-slate-300 group-hover:text-slate-100" : "text-slate-700 group-hover:text-slate-900"
            }`}
          >
            {value}
          </span>
        </span>
      </span>
      <span className={`shrink-0 p-1 ${isDark ? "text-slate-500" : "text-slate-400"}`}>
        {copied ? (
          <Check className="w-4 h-4 text-emerald-500 animate-bounce" />
        ) : (
          <Copy className="w-3.5 h-3.5" />
        )}
      </span>
    </button>
  );
}

interface SocialLinkProps {
  href: string;
  label: string;
  icon: ReactNode;
  isDark: boolean;
}

function SocialLink({ href, label, icon, isDark }: SocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`flex-1 flex items-center justify-center space-x-1.5 py-2 rounded-xl text-xs font-mono transition-all ${
        isDark
          ? "bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-300 hover:text-slate-100"
          : "bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 shadow-xs"
      }`}
    >
      {icon}
      <span>{label}</span>
    </a>
  );
}

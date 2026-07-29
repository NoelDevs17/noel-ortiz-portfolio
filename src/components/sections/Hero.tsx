import { ArrowDownRight, Mail } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { uiTranslations } from "../../constants/translations";
import { personalInfo } from "../../data";
import { scrollToSection } from "../../utils/scroll";
import systemsArchitecture from "../../assets/systems-architecture.webp";
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
  const reduceMotion = useReducedMotion();
  const role =
    lang === "es"
      ? "Líder Técnico y Desarrollador Full Stack"
      : "Tech Lead and Full Stack Developer";

  return (
    <section
      id="hero"
      className={`relative mx-auto grid min-h-[calc(100dvh-72px)] max-w-7xl grid-cols-1 items-center gap-12 overflow-hidden border-b px-4 py-12 print:hidden sm:px-6 md:py-16 lg:grid-cols-12 lg:gap-10 ${
        isDark ? "border-slate-900" : "border-slate-200"
      }`}
    >
      <motion.div
        className="relative z-10 lg:col-span-7"
        initial={reduceMotion ? false : { opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="mb-6 flex items-center gap-3">
          <span
            className={`h-2 w-2 rounded-full ${
              isDark ? "bg-emerald-400" : "bg-emerald-600"
            }`}
            aria-hidden="true"
          />
          <p
            className={`font-mono text-xs ${
              isDark ? "text-slate-400" : "text-slate-600"
            }`}
          >
            {t.hero.available}
          </p>
        </div>

        <h1
          className={`max-w-4xl text-[clamp(3rem,7vw,6.6rem)] font-bold leading-[0.92] tracking-[-0.065em] ${
            isDark ? "text-slate-100" : "text-slate-950"
          }`}
        >
          {personalInfo.name}
          <span
            className={`mt-3 block text-[0.48em] leading-[1.05] tracking-[-0.045em] ${
              isDark ? "text-slate-400" : "text-slate-600"
            }`}
          >
            {role}
          </span>
        </h1>

        <p
          className={`mt-7 max-w-xl text-base leading-relaxed md:text-lg ${
            isDark ? "text-slate-300" : "text-slate-700"
          }`}
        >
          {t.hero.specialty}
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => scrollToSection("experience")}
            className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-blue-600 px-6 font-mono text-sm font-bold text-white transition-all hover:bg-blue-500 active:scale-[0.98]"
          >
            {t.hero.ctaWork}
            <ArrowDownRight className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onCopyEmail}
            className={`inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-xl border px-6 font-mono text-sm font-semibold transition-all active:scale-[0.98] ${
              isDark
                ? "border-slate-700 bg-slate-900/70 text-slate-100 hover:border-blue-500/60"
                : "border-slate-300 bg-white text-slate-900 hover:border-blue-500/50"
            }`}
          >
            <Mail className="h-4 w-4" />
            {copiedEmail ? t.copied : t.copy}
          </button>
        </div>
      </motion.div>

      <motion.figure
        className="relative lg:col-span-5"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.94, x: 30 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className={`relative overflow-hidden rounded-[2rem] border ${
            isDark
              ? "border-slate-800 bg-slate-900"
              : "border-slate-200 bg-slate-100"
          }`}
        >
          <img
            src={systemsArchitecture}
            alt=""
            width="960"
            height="1440"
            fetchPriority="high"
            className="aspect-[4/5] w-full object-cover"
          />
          <div
            className={`absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t ${
              isDark ? "from-slate-950/80" : "from-slate-950/55"
            } to-transparent`}
            aria-hidden="true"
          />
          <figcaption className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
            <p className="max-w-xs font-mono text-xs leading-relaxed text-slate-200">
              {lang === "es"
                ? "Arquitectura clara. Equipos fuertes. Sistemas preparados para crecer."
                : "Clear architecture. Strong teams. Systems prepared to grow."}
            </p>
          </figcaption>
        </div>
      </motion.figure>
    </section>
  );
}

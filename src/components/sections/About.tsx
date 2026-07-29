import { ChevronDown } from "lucide-react";
import { Reveal } from "../motion/Reveal";
import { uiTranslations } from "../../constants/translations";
import { personalInfo } from "../../data";
import type { Language } from "../../types";

interface AboutProps {
  lang: Language;
  isDark: boolean;
}

export function About({ lang, isDark }: AboutProps) {
  const t = uiTranslations[lang];
  const summary = personalInfo.summary[lang];

  return (
    <section
      id="about"
      className={`mx-auto max-w-7xl border-b px-4 py-24 print:hidden sm:px-6 md:py-32 ${
        isDark ? "border-slate-900" : "border-slate-200"
      }`}
    >
      <Reveal>
        <div className="max-w-3xl">
          <h2
            className={`text-4xl font-bold tracking-[-0.04em] sm:text-5xl ${
              isDark ? "text-slate-100" : "text-slate-950"
            }`}
          >
            {t.profile.title}
          </h2>
          <p
            className={`mt-4 max-w-2xl text-base leading-relaxed md:text-lg ${
              isDark ? "text-slate-400" : "text-slate-600"
            }`}
          >
            {t.profile.subtitle}
          </p>
        </div>
      </Reveal>

      <div className="mt-14 grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-5" delay={0.05}>
          <p
            className={`text-xl font-medium leading-relaxed tracking-[-0.02em] md:text-2xl ${
              isDark ? "text-slate-200" : "text-slate-800"
            }`}
          >
            {summary[0]}
          </p>

          <details
            className={`group mt-8 border-t pt-5 ${
              isDark ? "border-slate-800" : "border-slate-300"
            }`}
          >
            <summary
              className={`flex cursor-pointer list-none items-center justify-between gap-4 font-mono text-sm font-semibold ${
                isDark ? "text-slate-300" : "text-slate-700"
              }`}
            >
              {lang === "es" ? "Ver enfoque completo" : "Read the full approach"}
              <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
            </summary>
            <div
              className={`mt-5 space-y-4 text-sm leading-relaxed ${
                isDark ? "text-slate-400" : "text-slate-600"
              }`}
            >
              {summary.slice(1).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </details>
        </Reveal>

        <Reveal className="lg:col-span-7" delay={0.12}>
          <div className="grid grid-flow-dense grid-cols-1 gap-3 md:grid-cols-12">
            {t.profile.values.map((value, index) => {
              const span = index === 0 || index === 3 ? "md:col-span-7" : "md:col-span-5";
              return (
                <article
                  key={value.title}
                  className={`${span} group rounded-2xl border p-6 transition-all duration-300 ${
                    isDark
                      ? "border-slate-800 bg-slate-900/35 hover:border-blue-500/40 hover:bg-slate-900/70"
                      : "border-slate-200 bg-white hover:border-blue-500/35 hover:bg-slate-50"
                  }`}
                >
                  <h3
                    className={`text-lg font-bold tracking-[-0.025em] ${
                      isDark ? "text-slate-100" : "text-slate-950"
                    }`}
                  >
                    {value.title}
                  </h3>
                  <p
                    className={`mt-3 text-sm leading-relaxed ${
                      isDark ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    {value.desc}
                  </p>
                </article>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

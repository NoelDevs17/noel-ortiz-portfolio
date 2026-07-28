import { Terminal } from "lucide-react";
import { uiTranslations } from "../../constants/translations";
import { personalInfo } from "../../data";
import type { Language } from "../../types";

interface AboutProps {
  lang: Language;
  isDark: boolean;
}

export function About({ lang, isDark }: AboutProps) {
  const t = uiTranslations[lang];

  return (
    <section
      id="about"
      className={`py-16 md:py-24 border-b max-w-7xl mx-auto px-4 sm:px-6 transition-all ${
        isDark ? "border-slate-900/60" : "border-slate-200"
      }`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

        {/* Sticky sidebar */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit space-y-4">
          <div
            className={`flex items-center space-x-2 ${
              isDark ? "text-emerald-400" : "text-emerald-600 font-semibold"
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span className="font-mono text-xs uppercase tracking-wider">
              01. {t.nav.about}
            </span>
          </div>
          <h2
            className={`text-3xl font-bold tracking-tight ${
              isDark ? "text-slate-100" : "text-slate-900"
            }`}
          >
            {t.profile.title}
          </h2>
          <p className={`text-xs font-mono ${isDark ? "text-slate-500" : "text-slate-500"}`}>
            {t.profile.subtitle}
          </p>
        </div>

        {/* Content */}
        <div className="lg:col-span-8 space-y-8">

          {/* Summary paragraphs */}
          <div
            className={`space-y-4 text-sm md:text-base leading-relaxed ${
              isDark ? "text-slate-300" : "text-slate-700"
            }`}
          >
            {personalInfo.summary[lang].map((p, idx) => (
              <p
                key={idx}
                className={`border-l-2 pl-4 py-1 transition-all ${
                  isDark
                    ? "border-slate-800 hover:border-emerald-500"
                    : "border-slate-200 hover:border-emerald-600"
                }`}
              >
                {p}
              </p>
            ))}
          </div>

          {/* Architecture values grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            {t.profile.values.map((val, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-xl border transition-all group ${
                  isDark
                    ? "bg-slate-900/40 border-slate-800/60 hover:border-blue-500/30 hover:bg-slate-900/80"
                    : "bg-white border-slate-200 shadow-sm hover:border-blue-600/30 hover:bg-slate-50/40 hover:shadow-xs"
                }`}
              >
                <span
                  className={`font-mono text-[10px] block mb-1 uppercase tracking-widest ${
                    isDark ? "text-blue-400" : "text-blue-600"
                  }`}
                >
                  Philosophy {idx + 1}
                </span>
                <h4
                  className={`text-sm font-bold transition-all mb-2 ${
                    isDark
                      ? "text-slate-100 group-hover:text-emerald-400"
                      : "text-slate-900 group-hover:text-emerald-700"
                  }`}
                >
                  {val.title}
                </h4>
                <p
                  className={`text-xs leading-relaxed ${
                    isDark ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  {val.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Core competency badges */}
          <div className="pt-4 space-y-3">
            <h3
              className={`text-xs font-mono uppercase tracking-widest ${
                isDark ? "text-slate-500" : "text-slate-500"
              }`}
            >
              {t.profile.methodologyTitle}
            </h3>
            <div className="flex flex-wrap gap-2">
              {t.profile.valuesList.map((strength, idx) => (
                <span
                  key={idx}
                  className={`px-3 py-1.5 text-xs font-mono rounded-lg border transition-all ${
                    isDark
                      ? "bg-slate-950 border-slate-900 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/20"
                      : "bg-white border-slate-200 text-slate-600 hover:text-emerald-700 hover:border-emerald-400 hover:shadow-xs"
                  }`}
                >
                  {strength}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

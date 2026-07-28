import { Briefcase, ArrowRight } from "lucide-react";
import { uiTranslations } from "../../constants/translations";
import { experiences } from "../../data";
import type { Language } from "../../types";

interface ExperienceProps {
  lang: Language;
  isDark: boolean;
}

export function Experience({ lang, isDark }: ExperienceProps) {
  const t = uiTranslations[lang];

  return (
    <section
      id="experience"
      className={`py-16 md:py-24 border-b max-w-7xl mx-auto px-4 sm:px-6 transition-all ${
        isDark ? "border-slate-900/60" : "border-slate-200"
      }`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

        {/* Sticky sidebar */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit space-y-4">
          <div
            className={`flex items-center space-x-2 ${
              isDark ? "text-blue-400" : "text-blue-600 font-semibold"
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span className="font-mono text-xs uppercase tracking-wider">
              02. {t.nav.experience}
            </span>
          </div>
          <h2
            className={`text-3xl font-bold tracking-tight ${
              isDark ? "text-slate-100" : "text-slate-900"
            }`}
          >
            {t.experience.title}
          </h2>
          <p className={`text-xs font-mono ${isDark ? "text-slate-500" : "text-slate-500"}`}>
            {t.experience.subtitle}
          </p>
        </div>

        {/* Timeline */}
        <div
          className={`lg:col-span-8 space-y-10 relative border-l pl-4 md:pl-8 ml-2 ${
            isDark ? "border-slate-900" : "border-slate-200"
          }`}
        >
          {experiences.map((exp, idx) => {
            return (
              <div key={idx} className="relative group">
                {/* Timeline bullet */}
                <div
                  className={`absolute -left-[21px] md:-left-[37px] top-1.5 w-3 h-3 rounded-full border-2 group-hover:scale-125 transition-all ${
                    isDark
                      ? "bg-slate-950 border-blue-400"
                      : "bg-white border-blue-600"
                  }`}
                />

                <div
                  className={`p-6 rounded-2xl border transition-all duration-300 ${
                    isDark
                      ? "bg-slate-900/30 border-slate-800/60 group-hover:border-slate-800 hover:bg-slate-900/50"
                      : "bg-white border-slate-200 group-hover:border-slate-300 hover:bg-slate-50/50 shadow-xs"
                  }`}
                >
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                    <div>
                      <span
                        className={`font-mono text-xs font-bold uppercase tracking-wider ${
                          isDark ? "text-blue-400" : "text-blue-600"
                        }`}
                      >
                        {exp.period.replace("Present", t.experience.present)}
                      </span>
                      <h3
                        className={`text-lg font-bold tracking-tight mt-1 ${
                          isDark ? "text-slate-100" : "text-slate-900"
                        }`}
                      >
                        {exp.role[lang]}
                      </h3>
                      <h4
                        className={`text-xs font-mono mt-0.5 ${
                          isDark ? "text-slate-400" : "text-slate-500"
                        }`}
                      >
                        {exp.company}
                      </h4>
                    </div>
                  </div>

                  {/* Highlights */}
                  <ul className="space-y-3">
                    {exp.highlights[lang].map((highlight, hIdx) => (
                      <li
                        key={hIdx}
                        className={`text-xs md:text-sm flex items-start gap-2.5 ${
                          isDark ? "text-slate-300" : "text-slate-700"
                        }`}
                      >
                        <ArrowRight
                          className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${
                            isDark ? "text-blue-400" : "text-blue-600"
                          }`}
                          aria-hidden="true"
                        />
                        <span className="leading-relaxed">{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  {/* References note */}
                  <div
                    className={`mt-6 pt-4 border-t ${
                      isDark ? "border-slate-950" : "border-slate-100"
                    }`}
                  >
                    <p className="text-[11px] font-mono text-slate-500">
                      {t.experience.referencesOnRequest}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { GraduationCap } from "lucide-react";
import { uiTranslations } from "../../constants/translations";
import { educations, certifications } from "../../data";
import type { Language } from "../../types";

interface EducationProps {
  lang: Language;
  isDark: boolean;
}

export function Education({ lang, isDark }: EducationProps) {
  const t = uiTranslations[lang];

  return (
    <section
      id="education"
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
            <GraduationCap className="w-4 h-4" />
            <span className="font-mono text-xs uppercase tracking-wider">
              05. {t.nav.education}
            </span>
          </div>
          <h2
            className={`text-3xl font-bold tracking-tight ${
              isDark ? "text-slate-100" : "text-slate-900"
            }`}
          >
            {t.education.title}
          </h2>
          <p className={`text-xs font-mono ${isDark ? "text-slate-500" : "text-slate-500"}`}>
            {t.education.certsTitle}
          </p>
        </div>

        {/* Content */}
        <div className="lg:col-span-8 space-y-10">

          {/* Academic cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {educations.map((edu, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-2xl border transition-all ${
                  isDark
                    ? "bg-slate-900/10 border-slate-900/40 hover:border-slate-800/40 hover:bg-slate-900/20"
                    : "bg-slate-50/30 border-slate-200/30 shadow-xs hover:border-slate-200/60 hover:bg-white"
                }`}
              >
                <span
                  className={`font-mono text-[10px] font-semibold block mb-1 ${
                    isDark ? "text-blue-400" : "text-blue-600"
                  }`}
                >
                  {edu.period}
                </span>
                <h3
                  className={`text-sm font-semibold font-sans tracking-tight leading-snug ${
                    isDark ? "text-slate-100" : "text-slate-900"
                  }`}
                >
                  {edu.degree[lang]}
                </h3>
                <h4
                  className={`text-xs mt-1 font-mono ${
                    isDark ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  {edu.institution}
                </h4>
                <div
                  className={`mt-4 pt-3.5 border-t flex justify-between items-center text-[10px] font-mono ${
                    isDark ? "border-slate-950" : "border-slate-100"
                  }`}
                >
                  <span className="text-slate-500">{t.education.academicStatus}</span>
                  <span
                    className={`px-2 py-0.5 rounded-lg border ${
                      edu.status.en === "In Progress"
                        ? isDark
                          ? "bg-amber-500/10 border-amber-500/10 text-amber-400"
                          : "bg-amber-50 border-amber-200 text-amber-700"
                        : isDark
                        ? "bg-emerald-500/10 border-emerald-500/10 text-emerald-400"
                        : "bg-emerald-50 border-emerald-200 text-emerald-700"
                    }`}
                  >
                    {edu.status[lang]}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div className="pt-4">
            <h3
              className={`font-mono text-xs font-bold uppercase tracking-widest mb-4 pb-2 border-b flex justify-between items-center ${
                isDark
                  ? "text-blue-400 border-slate-950"
                  : "text-blue-600 border-slate-100"
              }`}
            >
              <span>{t.education.certsTitle}</span>
              <span className="text-[10px] font-normal text-slate-500">
                {certifications.length} total
              </span>
            </h3>

            <div className="grid grid-cols-1 gap-2 max-h-96 overflow-y-auto pr-1">
              {certifications.map((cert, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all ${
                    isDark
                      ? "bg-slate-900/10 border-slate-900/40 hover:border-slate-800/40 hover:bg-slate-900/30"
                      : "bg-slate-50/60 border-slate-200/30 shadow-xs hover:border-slate-300 hover:bg-white"
                  }`}
                >
                  <div>
                    <h4
                      className={`text-xs font-semibold leading-snug ${
                        isDark ? "text-slate-200" : "text-slate-800"
                      }`}
                    >
                      {cert.title}
                    </h4>
                    {cert.institution && (
                      <span
                        className={`text-[10px] font-mono mt-0.5 block ${
                          isDark ? "text-slate-500" : "text-slate-400"
                        }`}
                      >
                        {cert.institution}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-3 font-mono text-[10px] shrink-0">
                    <span className="text-slate-500">{cert.period}</span>
                    {cert.status && (
                      <span
                        className={`px-2 py-0.5 rounded-lg border ${
                          isDark
                            ? "bg-amber-500/15 text-amber-400 border-amber-500/10"
                            : "bg-amber-50 text-amber-700 border-amber-200"
                        }`}
                      >
                        {cert.status[lang]}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

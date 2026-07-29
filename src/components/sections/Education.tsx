import { Reveal } from "../motion/Reveal";
import { uiTranslations } from "../../constants/translations";
import { certifications, educations } from "../../data";
import type { Language } from "../../types";

interface EducationProps {
  lang: Language;
  isDark: boolean;
}

export function Education({ lang, isDark }: EducationProps) {
  const t = uiTranslations[lang];
  const splitIndex = Math.ceil(certifications.length / 2);
  const certificationGroups = [
    certifications.slice(0, splitIndex),
    certifications.slice(splitIndex),
  ];

  return (
    <section
      id="education"
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
            {t.education.title}
          </h2>
          <p
            className={`mt-4 text-base leading-relaxed md:text-lg ${
              isDark ? "text-slate-400" : "text-slate-600"
            }`}
          >
            {t.education.certsTitle}
          </p>
        </div>
      </Reveal>

      <Reveal className="mt-14 grid gap-4 md:grid-cols-2" delay={0.06}>
        {educations.map((education) => {
          const inProgress = education.status.en === "In Progress";
          return (
            <article
              key={education.degree.en}
              className={`rounded-2xl border p-6 ${
                isDark
                  ? "border-slate-800 bg-slate-900/35"
                  : "border-slate-200 bg-white"
              }`}
            >
              <p
                className={`font-mono text-xs font-semibold ${
                  isDark ? "text-blue-400" : "text-blue-700"
                }`}
              >
                {education.period}
              </p>
              <h3
                className={`mt-5 text-xl font-bold tracking-[-0.025em] ${
                  isDark ? "text-slate-100" : "text-slate-950"
                }`}
              >
                {education.degree[lang]}
              </h3>
              <p
                className={`mt-2 font-mono text-xs leading-relaxed ${
                  isDark ? "text-slate-500" : "text-slate-600"
                }`}
              >
                {education.institution}
              </p>
              <p
                className={`mt-6 inline-flex items-center gap-2 font-mono text-xs ${
                  inProgress
                    ? isDark
                      ? "text-amber-400"
                      : "text-amber-700"
                    : isDark
                      ? "text-emerald-400"
                      : "text-emerald-700"
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    inProgress
                      ? isDark
                        ? "bg-amber-400"
                        : "bg-amber-600"
                      : isDark
                        ? "bg-emerald-400"
                        : "bg-emerald-600"
                  }`}
                  aria-hidden="true"
                />
                {education.status[lang]}
              </p>
            </article>
          );
        })}
      </Reveal>

      <Reveal className="mt-16" delay={0.12}>
        <h3
          className={`text-2xl font-bold tracking-[-0.03em] ${
            isDark ? "text-slate-100" : "text-slate-950"
          }`}
        >
          {t.education.certsTitle}
        </h3>

        <div
          className={`mt-8 grid gap-10 border-t pt-8 md:grid-cols-2 md:gap-14 ${
            isDark ? "border-slate-800" : "border-slate-300"
          }`}
        >
          {certificationGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="space-y-7">
              {group.map((certification) => (
                <article key={`${certification.title}-${certification.period}`}>
                  <h4
                    className={`text-sm font-semibold leading-relaxed ${
                      isDark ? "text-slate-200" : "text-slate-900"
                    }`}
                  >
                    {certification.title}
                  </h4>
                  <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-slate-500">
                    <span>{certification.period}</span>
                    {certification.institution && (
                      <span>{certification.institution}</span>
                    )}
                    {certification.status && (
                      <span
                        className={
                          isDark ? "text-amber-400" : "text-amber-700"
                        }
                      >
                        {certification.status[lang]}
                      </span>
                    )}
                  </div>
                </article>
              ))}
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

import { ArrowUpRight } from "lucide-react";
import { Reveal } from "../motion/Reveal";
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
      className={`mx-auto max-w-7xl border-b px-4 py-24 print:hidden sm:px-6 md:py-32 ${
        isDark ? "border-slate-900" : "border-slate-200"
      }`}
    >
      <div className="grid gap-14 lg:grid-cols-12">
        <Reveal className="h-fit lg:sticky lg:top-28 lg:col-span-4">
          <h2
            className={`text-4xl font-bold tracking-[-0.04em] sm:text-5xl ${
              isDark ? "text-slate-100" : "text-slate-950"
            }`}
          >
            {t.experience.title}
          </h2>
          <p
            className={`mt-5 max-w-sm text-base leading-relaxed ${
              isDark ? "text-slate-400" : "text-slate-600"
            }`}
          >
            {t.experience.subtitle}
          </p>
        </Reveal>

        <div className="lg:col-span-8">
          {experiences.map((experience, index) => (
            <Reveal key={experience.company} delay={index * 0.05}>
              <article
                className={`border-t py-10 first:pt-0 ${
                  isDark ? "border-slate-800" : "border-slate-300"
                }`}
              >
                <div className="grid gap-5 md:grid-cols-[10rem_1fr]">
                  <p
                    className={`font-mono text-xs font-semibold ${
                      isDark ? "text-blue-400" : "text-blue-700"
                    }`}
                  >
                    {experience.period.replace("Present", t.experience.present)}
                  </p>
                  <div>
                    <h3
                      className={`text-2xl font-bold tracking-[-0.03em] ${
                        isDark ? "text-slate-100" : "text-slate-950"
                      }`}
                    >
                      {experience.role[lang]}
                    </h3>
                    <p
                      className={`mt-2 max-w-2xl font-mono text-xs leading-relaxed ${
                        isDark ? "text-slate-500" : "text-slate-600"
                      }`}
                    >
                      {experience.company}
                    </p>

                    <div className="mt-7 grid gap-x-8 gap-y-4 md:grid-cols-2">
                      {experience.highlights[lang].map((highlight) => (
                        <p
                          key={highlight}
                          className={`flex items-start gap-3 text-sm leading-relaxed ${
                            isDark ? "text-slate-300" : "text-slate-700"
                          }`}
                        >
                          <ArrowUpRight
                            className={`mt-1 h-3.5 w-3.5 shrink-0 ${
                              isDark ? "text-blue-400" : "text-blue-700"
                            }`}
                            aria-hidden="true"
                          />
                          <span>{highlight}</span>
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}

          <p
            className={`border-t pt-6 font-mono text-xs ${
              isDark
                ? "border-slate-800 text-slate-500"
                : "border-slate-300 text-slate-600"
            }`}
          >
            {t.experience.referencesOnRequest}
          </p>
        </div>
      </div>
    </section>
  );
}

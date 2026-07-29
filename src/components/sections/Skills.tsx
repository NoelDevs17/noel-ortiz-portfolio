import { useState } from "react";
import { Search, X } from "lucide-react";
import { Reveal } from "../motion/Reveal";
import { uiTranslations } from "../../constants/translations";
import { noelTechnologies } from "../../constants/technologies";
import { languages } from "../../data";
import type { Language, TechBadge } from "../../types";

interface SkillsProps {
  lang: Language;
  isDark: boolean;
}

export function Skills({ lang, isDark }: SkillsProps) {
  const t = uiTranslations[lang];
  const [searchQuery, setSearchQuery] = useState("");
  const filteredTechnologies = noelTechnologies.filter((technology) =>
    technology.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );
  const marqueeTechnologies = [...noelTechnologies, ...noelTechnologies];

  return (
    <section
      id="skills"
      className={`mx-auto max-w-7xl border-b py-24 print:hidden md:py-32 ${
        isDark ? "border-slate-900" : "border-slate-200"
      }`}
    >
      <Reveal className="px-4 sm:px-6">
        <div className="max-w-3xl">
          <h2
            className={`text-4xl font-bold tracking-[-0.04em] sm:text-5xl ${
              isDark ? "text-slate-100" : "text-slate-950"
            }`}
          >
            {t.skills.title}
          </h2>
          <p
            className={`mt-4 text-base leading-relaxed md:text-lg ${
              isDark ? "text-slate-400" : "text-slate-600"
            }`}
          >
            {t.skills.subtitle}
          </p>
        </div>
      </Reveal>

      <div
        className={`relative mt-12 overflow-hidden border-y py-4 ${
          isDark ? "border-slate-900" : "border-slate-200"
        }`}
        aria-hidden="true"
      >
        <div className="flex w-max animate-marquee gap-2.5 pr-2.5">
          {marqueeTechnologies.map((technology, index) => (
            <TechPill key={`${technology.name}-${index}`} tech={technology} />
          ))}
        </div>
      </div>

      <div className="px-4 sm:px-6">
        <Reveal className="mt-12" delay={0.08}>
          <div
            className={`rounded-[2rem] border p-6 sm:p-8 ${
              isDark
                ? "border-slate-800 bg-slate-900/35"
                : "border-slate-200 bg-white"
            }`}
          >
            <div className="grid items-end gap-6 md:grid-cols-[1fr_20rem]">
              <div>
                <h3
                  className={`text-2xl font-bold tracking-[-0.03em] ${
                    isDark ? "text-slate-100" : "text-slate-950"
                  }`}
                >
                  {t.skills.allTech}
                </h3>
                <p className="mt-2 font-mono text-xs text-slate-500">
                  {filteredTechnologies.length} {t.skills.found}
                </p>
              </div>

              <label className="relative block">
                <span className="sr-only">{t.skills.searchPlaceholder}</span>
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder={t.skills.searchPlaceholder}
                  className={`w-full rounded-xl border py-3 pl-11 pr-11 font-mono text-xs transition-colors ${
                    isDark
                      ? "border-slate-700 bg-slate-950 text-slate-100 placeholder:text-slate-500"
                      : "border-slate-300 bg-slate-50 text-slate-950 placeholder:text-slate-500"
                  }`}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    aria-label={t.skills.clearSearch}
                    className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-lg text-slate-500 hover:text-blue-500"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </label>
            </div>

            <div className="mt-8 flex flex-wrap gap-2.5">
              {filteredTechnologies.map((technology) => (
                <TechPill key={technology.name} tech={technology} interactive />
              ))}
              {filteredTechnologies.length === 0 && (
                <div className="w-full py-12 text-center">
                  <p
                    className={`font-mono text-sm ${
                      isDark ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    {t.skills.noMatch}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="mt-5 rounded-xl bg-blue-600 px-4 py-2.5 font-mono text-xs font-bold text-white active:scale-[0.98]"
                  >
                    {t.skills.all}
                  </button>
                </div>
              )}
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-8" delay={0.14}>
          <div
            className={`grid gap-4 border-t pt-8 sm:grid-cols-2 ${
              isDark ? "border-slate-800" : "border-slate-300"
            }`}
          >
            {languages[lang].map((language) => (
              <div
                key={language.name}
                className="flex items-baseline justify-between gap-5"
              >
                <h3
                  className={`text-base font-semibold ${
                    isDark ? "text-slate-200" : "text-slate-900"
                  }`}
                >
                  {language.name}
                </h3>
                <p className="text-right font-mono text-[11px] text-slate-500">
                  {language.level}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function TechPill({
  tech,
  interactive = false,
}: {
  tech: TechBadge;
  interactive?: boolean;
}) {
  const Icon = tech.icon;
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 font-mono text-[11px] font-extrabold uppercase tracking-wider ${tech.bg} ${tech.text} ${
        interactive
          ? "transition-transform duration-300 hover:-translate-y-0.5"
          : ""
      }`}
    >
      <Icon className="h-3 w-3 shrink-0" />
      {tech.name}
    </span>
  );
}

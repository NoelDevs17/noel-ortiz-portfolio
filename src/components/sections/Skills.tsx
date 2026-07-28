import { useState } from "react";
import { Code2, Search, Layers } from "lucide-react";
import { uiTranslations } from "../../constants/translations";
import { noelTechnologies } from "../../constants/technologies";
import { languages } from "../../data";
import type { Language } from "../../types";

interface SkillsProps {
  lang: Language;
  isDark: boolean;
}

export function Skills({ lang, isDark }: SkillsProps) {
  const t = uiTranslations[lang];
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTechs = noelTechnologies.filter((tech) =>
    tech.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const tripled = [
    ...noelTechnologies,
    ...noelTechnologies,
    ...noelTechnologies,
  ];
  const tripledReversed = [
    ...[...noelTechnologies].reverse(),
    ...[...noelTechnologies].reverse(),
    ...[...noelTechnologies].reverse(),
  ];

  return (
    <section
      id="skills"
      className={`py-16 md:py-24 border-b max-w-7xl mx-auto px-4 sm:px-6 transition-all ${
        isDark ? "border-slate-900/60" : "border-slate-200"
      }`}
    >
      {/* Section header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div
            className={`flex items-center space-x-2 mb-2 ${
              isDark ? "text-emerald-400" : "text-emerald-600 font-semibold"
            }`}
          >
            <Code2 className="w-4 h-4 animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest">
              03. {t.nav.skills}
            </span>
          </div>
          <h2
            className={`text-3xl sm:text-4xl font-bold tracking-tight ${
              isDark ? "text-slate-100" : "text-slate-900"
            }`}
          >
            {t.skills.title}
          </h2>
          <p
            className={`text-sm mt-2 max-w-xl font-sans ${
              isDark ? "text-slate-400" : "text-slate-500"
            }`}
          >
            {t.skills.subtitle}
          </p>
        </div>
      </div>

      {/* Marquee rows */}
      <div className="relative w-full overflow-hidden mb-12 py-4 space-y-4">
        <div
          className={`absolute top-0 bottom-0 left-0 w-16 sm:w-28 z-20 pointer-events-none bg-gradient-to-r ${
            isDark ? "from-slate-950 to-transparent" : "from-slate-50 to-transparent"
          }`}
        />
        <div
          className={`absolute top-0 bottom-0 right-0 w-16 sm:w-28 z-20 pointer-events-none bg-gradient-to-l ${
            isDark ? "from-slate-950 to-transparent" : "from-slate-50 to-transparent"
          }`}
        />

        <div className="flex w-max gap-3 animate-marquee whitespace-nowrap">
          {tripled.map((tech, idx) => (
            <div
              key={`m1-${idx}`}
              className={`inline-flex items-center px-4 py-2 rounded-full font-mono text-xs font-black uppercase tracking-wider ${tech.bg} ${tech.text} shadow-xs`}
            >
              <span className={`w-2 h-2 rounded-full mr-2 ${tech.dotBg}`} />
              {tech.name}
            </div>
          ))}
        </div>
        <div className="flex w-max gap-3 animate-marquee-reverse whitespace-nowrap">
          {tripledReversed.map((tech, idx) => (
            <div
              key={`m2-${idx}`}
              className={`inline-flex items-center px-4 py-2 rounded-full font-mono text-xs font-black uppercase tracking-wider ${tech.bg} ${tech.text} shadow-xs`}
            >
              <span className={`w-2 h-2 rounded-full mr-2 ${tech.dotBg}`} />
              {tech.name}
            </div>
          ))}
        </div>
      </div>

      {/* Interactive tech card */}
      <div className="space-y-8">
        <div
          className={`relative overflow-hidden rounded-3xl border p-6 sm:p-8 transition-all ${
            isDark
              ? "bg-[#0a0c14] border-slate-900/60 shadow-xl"
              : "bg-white border-slate-200/60 shadow-xs"
          }`}
        >
          {/* Grid pattern overlay */}
          <div
            className={`absolute inset-0 pointer-events-none ${
              isDark ? "opacity-[0.03]" : "opacity-[0.02]"
            }`}
            style={{
              backgroundImage:
                "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* Card header */}
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800/40 mb-8">
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${
                  isDark
                    ? "bg-slate-950/80 border-slate-800/80"
                    : "bg-slate-50 border-slate-200"
                }`}
              >
                <Layers className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <span
                  className={`text-[10px] font-mono font-bold tracking-widest uppercase block ${
                    isDark ? "text-emerald-400" : "text-emerald-600"
                  }`}
                >
                  {t.skills.allTech}
                </span>
                <h3
                  className={`text-xl font-bold tracking-tight ${
                    isDark ? "text-slate-100" : "text-slate-900"
                  }`}
                >
                  {t.skills.title}
                </h3>
              </div>
            </div>

            {/* Search */}
            <div className="relative w-full md:w-80">
              <span
                className={`absolute inset-y-0 left-3.5 flex items-center ${
                  isDark ? "text-slate-500" : "text-slate-400"
                }`}
              >
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.skills.searchPlaceholder}
                className={`w-full pl-10 pr-10 py-2.5 text-xs rounded-full border font-mono transition-all placeholder:text-slate-500 ${
                  isDark
                    ? "bg-slate-950/80 text-slate-200 border-slate-800/80 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/20"
                    : "bg-slate-50/60 text-slate-800 border-slate-200 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600/30 shadow-xs"
                }`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-[13px] text-[11px] font-mono text-slate-500 hover:text-slate-700 transition-colors"
                >
                  ✖
                </button>
              )}
            </div>
          </div>

          {/* Tech pills grid */}
          <div className="relative z-10 flex flex-wrap gap-2.5 sm:gap-3 justify-center md:justify-start">
            {filteredTechs.map((tech, idx) => (
              <div
                key={idx}
                className={`inline-flex items-center px-4 py-2 rounded-full font-mono text-xs font-black uppercase tracking-wider transition-all duration-300 transform hover:scale-[1.03] hover:shadow-sm ${tech.bg} ${tech.text}`}
              >
                <span className={`w-2 h-2 rounded-full mr-2 ${tech.dotBg}`} />
                <span>{tech.name}</span>
              </div>
            ))}

            {filteredTechs.length === 0 && (
              <div className="w-full py-12 text-center">
                <p
                  className={`text-sm font-mono ${
                    isDark ? "text-slate-500" : "text-slate-400"
                  }`}
                >
                  {t.skills.noMatch}
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className={`mt-4 px-4 py-2 rounded-full font-mono text-xs font-bold border transition-colors ${
                    isDark
                      ? "bg-slate-950 border-slate-800 text-slate-300 hover:text-emerald-400 hover:border-emerald-500/30"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-white hover:text-emerald-600"
                  }`}
                >
                  {t.skills.all}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Language proficiency */}
        <div
          className={`p-6 rounded-3xl border transition-all ${
            isDark
              ? "bg-[#0a0c14]/50 border-slate-900/60"
              : "bg-white border-slate-200/50 shadow-xs"
          }`}
        >
          <h4
            className={`font-mono text-xs font-bold uppercase tracking-widest mb-4 pb-2 border-b ${
              isDark
                ? "text-blue-400 border-slate-900/60"
                : "text-blue-600 border-slate-100"
            }`}
          >
            {t.skills.languages}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {languages[lang].map((l, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-2xl border flex items-center justify-between transition-colors ${
                  isDark
                    ? "bg-slate-950/30 border-slate-900/60 hover:border-slate-800/40"
                    : "bg-slate-50/60 border-slate-100 hover:border-slate-200 hover:bg-white"
                }`}
              >
                <span
                  className={`font-sans text-xs font-medium ${
                    isDark ? "text-slate-200" : "text-slate-800"
                  }`}
                >
                  {l.name}
                </span>
                <span
                  className={`font-mono text-[10px] px-2.5 py-0.5 rounded-lg border ${
                    isDark
                      ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/10"
                      : "text-emerald-700 bg-emerald-50 border-emerald-200"
                  }`}
                >
                  {l.level}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


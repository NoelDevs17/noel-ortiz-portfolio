import { uiTranslations } from "../../constants/translations";
import {
  personalInfo,
  skillGroups,
  experiences,
  projects,
  educations,
  languages,
} from "../../data";
import type { Language } from "../../types";

interface PrintOverlayProps {
  lang: Language;
}

/** Displays a profile URL without its protocol prefix. */
function stripProtocol(url: string) {
  return url.replace(/^https?:\/\//, "");
}

export function PrintOverlay({ lang }: PrintOverlayProps) {
  const t = uiTranslations[lang];

  return (
    <div
      id="print-overlay-cv"
      className="hidden print:block text-slate-950 bg-white min-h-screen p-8 text-xs font-sans"
    >
      {/* Header */}
      <div className="border-b-2 border-slate-900 pb-4 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            {personalInfo.name}
          </h1>
          <p className="text-sm font-bold text-slate-700 mt-1 uppercase font-mono">
            {personalInfo.titles[lang].join(" | ")}
          </p>
          <p className="text-xs text-slate-600 mt-0.5">{personalInfo.specialty[lang]}</p>
        </div>
        <div className="text-right text-[10px] font-mono text-slate-700 space-y-1">
          <p>{personalInfo.location}</p>
          <p>{personalInfo.email}</p>
          <p>{stripProtocol(personalInfo.github)}</p>
          <p>{stripProtocol(personalInfo.linkedin)}</p>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-5">
        <h3 className="font-mono text-xs font-bold uppercase border-b border-slate-300 pb-1 text-slate-900">
          {t.print.summary}
        </h3>
        <p className="text-slate-800 mt-2 leading-relaxed">
          {personalInfo.summary[lang].join(" ")}
        </p>
      </div>

      {/* Technical Stack */}
      <div className="mt-5">
        <h3 className="font-mono text-xs font-bold uppercase border-b border-slate-300 pb-1 text-slate-900">
          {t.print.stack}
        </h3>
        <div className="grid grid-cols-2 gap-4 mt-2">
          {skillGroups.map((group, idx) => (
            <div key={idx} className="text-[10px]">
              <strong className="text-slate-800 font-mono block uppercase">
                {group.category[lang]}
              </strong>
              <p className="text-slate-700 mt-0.5">{group.skills.join(", ")}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Work Experience */}
      <div className="mt-5">
        <h3 className="font-mono text-xs font-bold uppercase border-b border-slate-300 pb-1 text-slate-900">
          {t.print.workExperience}
        </h3>
        <div className="space-y-4 mt-2">
          {experiences.map((exp, idx) => (
            <div key={idx} className="page-break-inside-avoid">
              <div className="flex justify-between items-baseline font-bold text-slate-900">
                <span className="text-xs">{exp.role[lang]}</span>
                <span className="text-[10px] font-mono">{exp.period}</span>
              </div>
              <div className="text-[10px] text-slate-600 font-mono mt-0.5">{exp.company}</div>
              <ul className="list-disc pl-4 mt-1.5 space-y-1 text-slate-700 text-[10px]">
                {exp.highlights[lang].map((highlight, hIdx) => (
                  <li key={hIdx}>{highlight}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mt-5 page-break-inside-avoid">
          <h3 className="font-mono text-xs font-bold uppercase border-b border-slate-300 pb-1 text-slate-900">
            {t.print.projects}
          </h3>
          <div className="space-y-2 mt-2">
            {projects.map((project, idx) => (
              <div key={idx} className="text-[10px]">
                <div className="flex justify-between items-baseline">
                  <strong className="text-slate-900 text-xs">{project.name}</strong>
                  {project.period && (
                    <span className="font-mono text-slate-600">{project.period}</span>
                  )}
                </div>
                <p className="text-slate-700 mt-0.5">{project.description[lang]}</p>
                {project.technologies.length > 0 && (
                  <p className="text-slate-600 font-mono mt-0.5">
                    {project.technologies.join(", ")}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education & Languages */}
      <div className="mt-5 grid grid-cols-2 gap-6 page-break-inside-avoid">
        <div>
          <h3 className="font-mono text-xs font-bold uppercase border-b border-slate-300 pb-1 text-slate-900">
            {t.print.education}
          </h3>
          <div className="space-y-2 mt-2">
            {educations.map((edu, idx) => (
              <div key={idx}>
                <p className="font-bold text-slate-800">{edu.degree[lang]}</p>
                <p className="text-[10px] text-slate-600">
                  {edu.institution} ({edu.period})
                </p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-mono text-xs font-bold uppercase border-b border-slate-300 pb-1 text-slate-900">
            {t.print.languages}
          </h3>
          <div className="space-y-1 mt-2 text-[10px]">
            {languages[lang].map((l, idx) => (
              <p key={idx} className="text-slate-800">
                <strong>{l.name}:</strong> {l.level}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import { FolderGit2, Github, ExternalLink } from "lucide-react";
import { uiTranslations } from "../../constants/translations";
import { noelTechnologies } from "../../constants/technologies";
import { projects } from "../../data";
import type { Language, Project } from "../../types";

interface ProjectsProps {
  lang: Language;
  isDark: boolean;
}

export function Projects({ lang, isDark }: ProjectsProps) {
  const t = uiTranslations[lang];

  // Nothing to show until the data lands; rendering an empty section would
  // leave a stray heading and a double border between Experience and Skills.
  if (projects.length === 0) return null;

  return (
    <section
      id="projects"
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
            <FolderGit2 className="w-4 h-4" />
            <span className="font-mono text-xs uppercase tracking-wider">
              03. {t.nav.projects}
            </span>
          </div>
          <h2
            className={`text-3xl font-bold tracking-tight ${
              isDark ? "text-slate-100" : "text-slate-900"
            }`}
          >
            {t.projects.title}
          </h2>
          <p className={`text-xs font-mono ${isDark ? "text-slate-500" : "text-slate-500"}`}>
            {t.projects.subtitle}
          </p>
        </div>

        {/* Project cards */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project, idx) => (
            <ProjectCard key={idx} project={project} lang={lang} isDark={isDark} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: Project;
  lang: Language;
  isDark: boolean;
}

function ProjectCard({ project, lang, isDark }: ProjectCardProps) {
  const t = uiTranslations[lang];
  const inProduction = project.status === "production";

  return (
    <div
      className={`p-6 rounded-2xl border flex flex-col justify-between gap-5 transition-all duration-300 group ${
        isDark
          ? "bg-slate-900/30 border-slate-800/60 hover:border-slate-800 hover:bg-slate-900/50"
          : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 shadow-xs"
      }`}
    >
      <div className="space-y-3">
        {/* Period + status. Without a period the badge keeps its right edge,
            so cards with and without a date still line up in the grid. */}
        <div className="flex items-center justify-between gap-3">
          {project.period ? (
            <span
              className={`font-mono text-xs font-bold uppercase tracking-wider ${
                isDark ? "text-blue-400" : "text-blue-600"
              }`}
            >
              {project.period}
            </span>
          ) : (
            <span aria-hidden="true" />
          )}
          <span
            className={`px-2 py-0.5 rounded-lg border font-mono text-[10px] shrink-0 ${
              inProduction
                ? isDark
                  ? "bg-emerald-500/10 border-emerald-500/10 text-emerald-400"
                  : "bg-emerald-50 border-emerald-200 text-emerald-700"
                : isDark
                ? "bg-amber-500/10 border-amber-500/10 text-amber-400"
                : "bg-amber-50 border-amber-200 text-amber-700"
            }`}
          >
            {inProduction ? t.projects.inProduction : t.projects.inDevelopment}
          </span>
        </div>

        <h3
          className={`text-lg font-bold tracking-tight ${
            isDark ? "text-slate-100" : "text-slate-900"
          }`}
        >
          {project.name}
        </h3>

        <p
          className={`text-xs md:text-sm leading-relaxed ${
            isDark ? "text-slate-300" : "text-slate-700"
          }`}
        >
          {project.description[lang]}
        </p>

        {/* Tech chips */}
        {project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {project.technologies.map((tech, idx) => (
              <TechChip key={idx} name={tech} isDark={isDark} />
            ))}
          </div>
        )}
      </div>

      {/* Links */}
      {(project.repoUrl || project.demoUrl) && (
        <div
          className={`flex items-center gap-3 pt-4 border-t ${
            isDark ? "border-slate-950" : "border-slate-100"
          }`}
        >
          {project.repoUrl && (
            <ProjectLink
              href={project.repoUrl}
              label={t.projects.viewRepo}
              icon={<Github className="w-3.5 h-3.5" />}
              isDark={isDark}
            />
          )}
          {project.demoUrl && (
            <ProjectLink
              href={project.demoUrl}
              label={t.projects.viewDemo}
              icon={<ExternalLink className="w-3.5 h-3.5" />}
              isDark={isDark}
            />
          )}
        </div>
      )}
    </div>
  );
}

/** Ignores case, spaces and punctuation so "TailwindCSS" finds "TAILWIND CSS". */
const normalise = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, "");

/** Uses the official brand colour when the name is known, neutral otherwise. */
function TechChip({ name, isDark }: { name: string; isDark: boolean }) {
  const badge = noelTechnologies.find(
    (tech) => normalise(tech.name) === normalise(name)
  );

  if (!badge) {
    return (
      <span
        className={`px-2.5 py-1 rounded-lg font-mono text-[10px] uppercase tracking-wider border ${
          isDark
            ? "bg-slate-800/40 border-slate-700/50 text-slate-300"
            : "bg-slate-100 border-slate-200 text-slate-600"
        }`}
      >
        {name}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-lg font-mono text-[10px] font-bold uppercase tracking-wider ${badge.bg} ${badge.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${badge.dotBg}`} />
      {badge.name}
    </span>
  );
}

interface ProjectLinkProps {
  href: string;
  label: string;
  icon: React.ReactNode;
  isDark: boolean;
}

function ProjectLink({ href, label, icon, isDark }: ProjectLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center gap-1.5 font-mono text-[11px] transition-colors ${
        isDark
          ? "text-slate-400 hover:text-blue-400"
          : "text-slate-600 hover:text-blue-600"
      }`}
    >
      {icon}
      <span>{label}</span>
    </a>
  );
}

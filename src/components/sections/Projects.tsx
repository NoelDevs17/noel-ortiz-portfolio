import type { ReactNode } from "react";
import { ExternalLink, Github } from "lucide-react";
import { Reveal } from "../motion/Reveal";
import { uiTranslations } from "../../constants/translations";
import { genericTechIcon, noelTechnologies } from "../../constants/technologies";
import { projects } from "../../data";
import quizSystem from "../../assets/quiz-system.webp";
import type { Language, Project } from "../../types";

interface ProjectsProps {
  lang: Language;
  isDark: boolean;
}

export function Projects({ lang, isDark }: ProjectsProps) {
  const t = uiTranslations[lang];

  if (projects.length === 0) return null;

  return (
    <section
      id="projects"
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
            {t.projects.title}
          </h2>
          <p
            className={`mt-4 text-base leading-relaxed md:text-lg ${
              isDark ? "text-slate-400" : "text-slate-600"
            }`}
          >
            {t.projects.subtitle}
          </p>
        </div>
      </Reveal>

      <div className="mt-14 space-y-8">
        {projects.map((project, index) => (
          <ProjectFeature
            key={project.name}
            project={project}
            lang={lang}
            isDark={isDark}
            image={index === 0 ? quizSystem : quizSystem}
          />
        ))}
      </div>
    </section>
  );
}

function ProjectFeature({
  project,
  lang,
  isDark,
  image,
}: {
  project: Project;
  lang: Language;
  isDark: boolean;
  image: string;
}) {
  const t = uiTranslations[lang];
  const inProduction = project.status === "production";

  return (
    <Reveal>
      <article
        className={`group grid overflow-hidden rounded-[2rem] border lg:grid-cols-12 ${
          isDark
            ? "border-slate-800 bg-slate-900/35"
            : "border-slate-200 bg-white"
        }`}
      >
        <div className="overflow-hidden lg:col-span-7">
          <img
            src={image}
            alt={
              lang === "es"
                ? "Visual abstracto de notas convertidas en un sistema de cuestionarios"
                : "Abstract visual of notes transformed into a quiz system"
            }
            width="1440"
            height="960"
            loading="lazy"
            className="aspect-[16/10] h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
          />
        </div>

        <div className="flex flex-col justify-between gap-10 p-7 sm:p-9 lg:col-span-5 lg:p-10">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span
                className={`inline-flex items-center gap-2 font-mono text-xs ${
                  inProduction
                    ? isDark
                      ? "text-emerald-400"
                      : "text-emerald-700"
                    : isDark
                      ? "text-amber-400"
                      : "text-amber-700"
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    inProduction
                      ? isDark
                        ? "bg-emerald-400"
                        : "bg-emerald-600"
                      : isDark
                        ? "bg-amber-400"
                        : "bg-amber-600"
                  }`}
                  aria-hidden="true"
                />
                {inProduction ? t.projects.inProduction : t.projects.inDevelopment}
              </span>
              {project.period && (
                <span className="font-mono text-xs text-slate-500">
                  {project.period}
                </span>
              )}
            </div>

            <h3
              className={`mt-7 text-3xl font-bold tracking-[-0.04em] ${
                isDark ? "text-slate-100" : "text-slate-950"
              }`}
            >
              {project.name}
            </h3>
            <p
              className={`mt-4 text-sm leading-relaxed md:text-base ${
                isDark ? "text-slate-300" : "text-slate-700"
              }`}
            >
              {project.description[lang]}
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              {project.technologies.map((technology) => (
                <TechChip key={technology} name={technology} isDark={isDark} />
              ))}
            </div>
          </div>

          {(project.repoUrl || project.demoUrl) && (
            <div className="flex flex-wrap gap-3">
              {project.repoUrl && (
                <ProjectLink
                  href={project.repoUrl}
                  label={t.projects.viewRepo}
                  icon={<Github className="h-4 w-4" />}
                  isDark={isDark}
                />
              )}
              {project.demoUrl && (
                <ProjectLink
                  href={project.demoUrl}
                  label={t.projects.viewDemo}
                  icon={<ExternalLink className="h-4 w-4" />}
                  isDark={isDark}
                />
              )}
            </div>
          )}
        </div>
      </article>
    </Reveal>
  );
}

function TechChip({ name, isDark }: { name: string; isDark: boolean }) {
  const normalizedName = normalize(name);
  const badge = noelTechnologies.find(
    (technology) => normalize(technology.name) === normalizedName
  );
  const Icon = badge?.icon ?? genericTechIcon;

  if (badge) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider ${badge.bg} ${badge.text}`}
      >
        <Icon className="h-2.5 w-2.5" />
        {badge.name}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider ${
        isDark
          ? "border-slate-700 bg-slate-800/50 text-slate-300"
          : "border-slate-200 bg-slate-100 text-slate-700"
      }`}
    >
      <Icon className="h-2.5 w-2.5" />
      {name}
    </span>
  );
}

function ProjectLink({
  href,
  label,
  icon,
  isDark,
}: {
  href: string;
  label: string;
  icon: ReactNode;
  isDark: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 font-mono text-xs font-semibold transition-all active:scale-[0.98] ${
        isDark
          ? "border-slate-700 text-slate-200 hover:border-blue-500/60"
          : "border-slate-300 text-slate-800 hover:border-blue-500/50"
      }`}
    >
      {icon}
      {label}
    </a>
  );
}

const normalize = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]/g, "");

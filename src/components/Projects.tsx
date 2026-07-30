import { motion } from "framer-motion";
import { FaGithub, FaPlay } from "react-icons/fa";
import SectionHeading from "./SectionHeading";
import {
  PROJECT_CATEGORY,
  PROJECT_STATUS,
  visibleProjects,
} from "../data/portfolioData";
import { useI18n } from "../i18n/context";
import { CONTAINER, SECTION_PADDING } from "../lib/layout";
import { rise } from "../lib/motion";
import { CARD_BUTTON, GHOST_BUTTON, PENDING_BUTTON } from "../lib/styles";
import type { Project } from "../types";

interface ProjectRowProps {
  project: Project;
  index: number;
}

/**
 * Una tarjeta de proyecto.
 *
 * Tres columnas: metadatos, contenido y captura. No es una tarjeta flotante
 * sino una fila de una lista —solo la separa un filete superior— porque el
 * conjunto tiene que leerse como un indice de trabajo, no como un escaparate.
 *
 * El hover es **un solo gesto coordinado**, no cinco efectos sueltos: la fila
 * se vela, la captura crece un 3%, el indice y el titulo se tinen de acento y
 * las vinetas se desplazan 4px. Todo cuelga del mismo `group`, asi que se
 * disparan a la vez desde cualquier punto de la fila.
 */
const ProjectRow = ({ project, index }: ProjectRowProps) => {
  const { t, pick } = useI18n();

  const status = pick(PROJECT_STATUS[project.status]);
  const category = pick(PROJECT_CATEGORY[project.category]);

  // El verde es el acento funcional del DESIGN.md: solo produccion. Cualquier
  // otro estado se queda en texto secundario.
  const statusColor =
    project.status === "production" ? "text-success" : "text-text-secondary";
  const statusDot =
    project.status === "production" ? "bg-success" : "bg-text-secondary";

  return (
    <motion.article
      {...rise(index)}
      itemScope
      itemType="https://schema.org/CreativeWork"
      // Solo el fondo entra en la transicion de la fila: con `transition-colors`
      // el borde y el texto se quedarian a medio camino al cambiar de tema.
      className="group grid grid-cols-1 items-start gap-8 border-t border-line2 py-10 pr-0 transition-[background-color] duration-[350ms] ease-editorial hover:bg-veil lg:grid-cols-[130px_minmax(0,1.15fr)_minmax(260px,0.85fr)] lg:gap-11 lg:pr-6"
    >
      {/* Columna 1 — metadatos */}
      <div>
        <p className="text-[11px] tracking-[0.2em] text-muted transition-colors duration-[350ms] group-hover:text-accent">
          {String(index + 1).padStart(2, "0")}
        </p>
        <p
          className="mt-3.5 text-xs tracking-[0.1em] text-text-secondary"
          itemProp="dateCreated"
        >
          {project.duration}
        </p>
        <p
          className={`mt-2.5 inline-flex items-center gap-[7px] text-[11px] uppercase tracking-[0.14em] ${statusColor}`}
          itemProp="creativeWorkStatus"
        >
          <span
            aria-hidden="true"
            className={`block h-1.5 w-1.5 rounded-full ${statusDot}`}
          />
          {status}
        </p>
        <p
          className="mt-3.5 text-[11px] uppercase tracking-[0.14em] text-muted"
          itemProp="genre"
        >
          {category}
        </p>
      </div>

      {/* Columna 2 — contenido */}
      <div>
        <h3
          className="text-2xl font-bold tracking-[-0.025em] text-text-primary transition-colors duration-300 group-hover:text-accent"
          itemProp="name"
        >
          {project.title}
        </h3>

        <ul
          className="mt-[18px] flex max-w-[620px] flex-col gap-2.5"
          itemProp="description"
        >
          {pick(project.description).map((point, i) => (
            <li
              key={i}
              className="grid grid-cols-[18px_1fr] text-sm font-light leading-[1.7] text-text-secondary transition-transform duration-500 ease-editorial group-hover:translate-x-1"
            >
              <span aria-hidden="true" className="text-muted">
                —
              </span>
              <span className="[text-wrap:pretty]">{point}</span>
            </li>
          ))}
        </ul>

        <ul
          aria-label={t.projects.stackAria}
          className="mt-6 flex flex-wrap gap-2"
        >
          {project.tech.map((tech) => (
            <li
              key={tech}
              itemProp="keywords"
              className="rounded-sm border border-line2 px-3 py-1.5 text-xs tracking-[0.06em] text-text-secondary"
            >
              {tech}
            </li>
          ))}
        </ul>

        {/*
          Los dos botones se pintan SIEMPRE, en par. Sin URL quedan inactivos
          con borde punteado y un `title` que dice que falta el dato; esconder
          el boton diria otra cosa: que el proyecto no tiene repositorio.

          El de demo, cuando esta activo, es el unico elemento de la tarjeta con
          borde y texto de acento: es la accion mas valiosa y tiene que ganar.
        */}
        <div className="mt-[26px] flex flex-wrap items-center gap-3">
          {project.githubLink ? (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noreferrer"
              itemProp="codeRepository"
              className={`${CARD_BUTTON} ${GHOST_BUTTON} border-line text-text-primary`}
            >
              <FaGithub size={13} aria-hidden="true" />
              {t.projects.repo}
            </a>
          ) : (
            <span
              aria-disabled="true"
              title={t.projects.repoPending}
              className={PENDING_BUTTON}
            >
              <FaGithub size={13} aria-hidden="true" />
              {t.projects.repo}
            </span>
          )}

          {project.liveLink ? (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noreferrer"
              itemProp="url"
              className={`${CARD_BUTTON} ${GHOST_BUTTON} border-accent text-accent`}
            >
              <FaPlay size={11} aria-hidden="true" />
              {t.projects.demo}
            </a>
          ) : (
            <span
              aria-disabled="true"
              title={t.projects.demoPending}
              className={PENDING_BUTTON}
            >
              <FaPlay size={11} aria-hidden="true" />
              {t.projects.demo}
            </span>
          )}
        </div>
      </div>

      {/* Columna 3 — captura */}
      <div className="relative aspect-[16/10] w-full overflow-hidden border border-line2">
        <img
          // Sin captura real cae el marcador local: misma proporcion 16:10, asi
          // que sustituirlo por la imagen definitiva no mueve el layout.
          src={project.image ?? "/project-placeholder.svg"}
          alt={project.image ? `${t.projects.shotAlt} ${project.title}` : ""}
          aria-hidden={project.image ? undefined : true}
          width={1280}
          height={800}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-[1100ms] ease-editorial group-hover:scale-[1.03]"
        />
      </div>
    </motion.article>
  );
};

const Projects = () => {
  const { t } = useI18n();

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className={`border-b border-line2 bg-primary-bg ${SECTION_PADDING}`}
    >
      <div className={CONTAINER}>
        <SectionHeading
          section="projects"
          title={t.projects.title}
          id="projects-title"
          className="mb-5"
        />

        <motion.p
          {...rise()}
          className="mb-14 max-w-[620px] text-sm font-light leading-[1.7] text-text-secondary"
        >
          {t.projects.lede}
        </motion.p>

        <div className="flex flex-col">
          {visibleProjects.map((project, index) => (
            <ProjectRow key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

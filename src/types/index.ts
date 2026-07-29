import type { IconType } from "react-icons";

export type Language = "en" | "es";

/**
 * Contenedor de todo texto visible.
 *
 * El conmutador ES/EN no se cablea hasta la Fase E, pero el modelo nace ya con
 * los dos idiomas: rellenar `en` y `es` ahora cuesta lo mismo que rellenar uno
 * solo, y evita migrar el modelo dos veces. `Record` obliga a que existan
 * ambas claves, asi que olvidar una traduccion es un error de compilacion.
 *
 * El parametro permite anidar listas: `Localized<string[]>` es un texto de
 * varios parrafos traducido, no una lista de traducciones.
 */
export type Localized<T = string> = Record<Language, T>;

export interface PersonalInfo {
  /** Sin traducir a proposito: un nombre propio es el mismo en los dos idiomas. */
  name: string;
  /** Titulares profesionales. El Hero los rota con el efecto de escritura. */
  titles: Localized<string[]>;
  /** Linea de especializacion, bajo el titular. */
  specialty: Localized;
  email: string;
  /** Ciudad y pais. Sin direccion postal. */
  location: string;
  linkedin: string;
  github: string;
  /**
   * Ruta al CV en PDF, servido desde `public/`.
   *
   * Vive en el modelo y no cableada en el Navbar: los dos botones (escritorio
   * y movil) leen de aqui, asi que cambiar el nombre del archivo se hace en un
   * solo sitio. En el proyecto original estaba escrita a mano en los dos.
   */
  resumeLink: string;
  /** Resumen profesional en parrafos. El primero hace de entradilla. */
  summary: Localized<string[]>;
  /** Una linea. Reservada para el meta description cuando se genere. */
  shortBio: Localized;
}

export interface EducationEntry {
  institution: string;
  degree: Localized;
  /** Fechas en formato numerico: no necesitan traduccion. */
  duration: string;
  /** Traducible porque "En curso" / "In Progress" cambia. */
  status: Localized;
}

export interface ExperienceEntry {
  role: Localized;
  /** Nombre de la organizacion: sin traducir. */
  organization: string;
  duration: string;
  points: Localized<string[]>;
}

export interface Certification {
  /** Sin traducir: los titulos de los cursos son nombres propios. */
  title: string;
  /** Opcional: no todas las certificaciones registran la entidad. */
  institution?: string;
  duration: string;
  /** Opcional: solo las que siguen en curso lo declaran. */
  status?: Localized;
}

export interface LanguageProficiency {
  name: string;
  level: string;
}

/**
 * Gobierna el color del distintivo del proyecto. `production` es el unico caso
 * que se pinta de verde: es el acento funcional de exito, no decoracion.
 */
export type ProjectStatus = "production" | "in-progress" | "archived";

/**
 * Gobernara los filtros y la etiqueta de la seccion de proyectos.
 * Todavia no lo renderiza nadie.
 */
export type ProjectCategory = "gubernamental" | "producto" | "freelance";

export interface Project {
  /** Nombre propio del proyecto: sin traducir. */
  title: string;
  tech: string[];
  /** Una entrada por punto de la lista. */
  description: Localized<string[]>;
  duration: string;
  status: ProjectStatus;
  category: ProjectCategory;
  githubLink?: string;
  liveLink?: string;
  /** `null` activa el marcador de posicion 800x500. */
  image: string | null;
}

export interface Skill {
  name: string;
  /** Referencia al componente de icono, no un elemento ya construido. */
  icon: IconType;
}

/**
 * Los grupos son una lista y no un objeto de claves fijas: asi anadir o
 * reordenar una categoria es tocar datos, no tocar tipos ni componentes.
 */
export interface SkillGroup {
  category: Localized;
  skills: Skill[];
}

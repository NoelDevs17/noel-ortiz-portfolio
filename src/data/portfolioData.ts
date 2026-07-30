import {
  SiTypescript,
  SiSharp,
  SiAngular,
  SiReactivex,
  SiHtml5,
  SiBootstrap,
  SiTailwindcss,
  SiDotnet,
  SiNestjs,
  SiGit,
  SiGithub,
  SiGitlab,
  SiJira,
} from "react-icons/si";
import { FaDatabase } from "react-icons/fa";
import { TbBoxMultiple } from "react-icons/tb";
import type {
  Certification,
  EducationEntry,
  ExperienceEntry,
  LanguageProficiency,
  Localized,
  PersonalInfo,
  Project,
  ProjectCategory,
  ProjectStatus,
  SkillGroup,
} from "../types";

/**
 * Contenido real, trasladado desde el portafolio anterior de Noel.
 *
 * Los iconos se guardan como referencia al componente (`SiAngular`), no como
 * elemento ya construido, para que este archivo siga siendo TypeScript puro.
 *
 * Simple Icons no publica marcas de Microsoft, asi que SQL Server, Entity
 * Framework, LINQ y Azure DevOps caen en iconos genericos. No es un descuido.
 */

export const personalInfo: PersonalInfo = {
  name: "Noel Ortiz",
  titles: {
    en: ["Full Stack Developer", "Tech Lead", "Angular & .NET Developer"],
    es: [
      "Desarrollador Full Stack",
      "Líder Técnico",
      "Desarrollador Angular & .NET",
    ],
  },
  specialty: {
    en: "Specialist in Government and Banking Solutions",
    es: "Especialista en Soluciones Gubernamentales y Bancarias",
  },
  email: "noelrum17@hotmail.com",
  location: "Santo Domingo, Dominican Republic",
  linkedin: "https://linkedin.com/in/noelortizsanchez",
  github: "https://github.com/NoelDevs17",
  // Archivo estatico en public/. Se mantiene a mano: ver DESIGN.md.
  resumeLink: "/cv-noel-ortiz.pdf",
  summary: {
    en: [
      "Tech Leader with experience leading strategic projects in the government and banking sectors, specialized in designing scalable architectures and strengthening development teams through best practices and continuous improvement.",
      "I guide teams in implementing SOLID principles and patterns such as Repository, Unit of Work, and Strategy, applied in modular solutions under Clean Architecture and Modular Monolithic approaches. I lead the definition of coding standards, code reviews, use of linters, and pair programming sessions to ensure quality, maintainability, and automated testing.",
      "I have worked on building modern systems with Angular and .NET in their latest versions, promoting a solid technical culture, clear documentation (wikis, diagrams), and tools like Azure DevOps and Jira to automate CI/CD, manage versions, and provide traceability in agile environments (Scrum).",
      "I actively participate in requirements analysis and gathering alongside government and banking stakeholders, translating business needs into robust technical solutions, always maintaining a balance between performance, simplicity, and scalability.",
    ],
    es: [
      "Líder Técnico con experiencia dirigiendo proyectos estratégicos en los sectores gubernamental y bancario, especializado en diseñar arquitecturas escalables y fortalecer equipos de desarrollo a través de mejores prácticas y mejora continua.",
      "Guío a equipos en la implementación de principios SOLID y patrones como Repository (Repositorio), Unit of Work (Unidad de Trabajo) y Strategy (Estrategia), aplicados en soluciones modulares bajo enfoques de Arquitectura Limpia (Clean Architecture) y Monolitos Modulares. Lidero la definición de estándares de codificación, revisiones de código (code reviews), uso de linters y sesiones de programación en pareja para garantizar la calidad, mantenibilidad y pruebas automatizadas.",
      "He trabajado en la construcción de sistemas modernos con Angular y .NET en sus últimas versiones, promoviendo una sólida cultura técnica, documentación clara (wikis, diagramas) y herramientas como Azure DevOps y Jira para automatizar CI/CD, gestionar versiones y proporcionar trazabilidad en entornos ágiles (Scrum).",
      "Participo activamente en el análisis y levantamiento de requerimientos junto a partes interesadas del gobierno y la banca, traduciendo necesidades de negocio en soluciones técnicas robustas, manteniendo siempre un equilibrio entre rendimiento, simplicidad y escalabilidad.",
    ],
  },
  shortBio: {
    en: "Tech Lead and Full Stack Developer building scalable Angular and .NET systems for government and banking.",
    es: "Líder Técnico y Desarrollador Full Stack que construye sistemas escalables en Angular y .NET para gobierno y banca.",
  },
};

export const skillGroups: SkillGroup[] = [
  {
    category: { en: "Programming Languages", es: "Lenguajes de Programación" },
    skills: [
      { name: "TypeScript", icon: SiTypescript },
      { name: "C#", icon: SiSharp },
      { name: "SQL", icon: FaDatabase },
    ],
  },
  {
    category: { en: "Frontend Technologies", es: "Tecnologías Frontend" },
    skills: [
      { name: "Angular", icon: SiAngular },
      { name: "RxJS", icon: SiReactivex },
      { name: "HTML5", icon: SiHtml5 },
      { name: "Bootstrap", icon: SiBootstrap },
      { name: "TailwindCSS", icon: SiTailwindcss },
    ],
  },
  {
    category: { en: "Backend & Databases", es: "Backend y Bases de Datos" },
    skills: [
      { name: ".NET Core", icon: SiDotnet },
      { name: "NestJs", icon: SiNestjs },
      { name: "Entity Framework", icon: FaDatabase },
      { name: "SQL Server", icon: FaDatabase },
      { name: "Linq", icon: FaDatabase },
    ],
  },
  {
    category: { en: "Tools & DevOps", es: "Herramientas y DevOps" },
    skills: [
      { name: "Azure DevOps", icon: TbBoxMultiple },
      { name: "Git", icon: SiGit },
      { name: "GitHub", icon: SiGithub },
      { name: "GitLab", icon: SiGitlab },
      { name: "Jira", icon: SiJira },
    ],
  },
];

export const experience: ExperienceEntry[] = [
  {
    role: {
      en: "Full Stack Developer & Tech Lead",
      es: "Líder Técnico & Desarrollador Full Stack",
    },
    organization:
      "Ministry of Public Administration (MAP) / Ministerio de Administración Pública",
    duration: "03/2025 - Present",
    points: {
      en: [
        "Lead the development of a new system using modern technologies such as Angular and .NET in their latest versions.",
        "Implement and promote development best practices based on SOLID principles.",
        "Guide the team in implementing patterns such as Repository, Unit of Work, and Strategy.",
        "Architect systems using approaches like Modular Monolithic and Clean Architecture.",
        "Conduct code reviews to ensure quality, performance, and adherence to coding standards.",
        "Collaborate closely with stakeholders and product owners to define technical specifications.",
        "Lead the use of architectural patterns to decouple data logic, facilitate automated testing, and integrate multiple databases per module in a modular architecture.",
      ],
      es: [
        "Liderar el desarrollo de un nuevo sistema utilizando tecnologías modernas como Angular y .NET en sus últimas versiones.",
        "Implementar y promover mejores prácticas de desarrollo basadas en los principios SOLID.",
        "Guiar al equipo en la implementación de patrones de diseño como Repository, Unit of Work y Strategy.",
        "Arquitecturar sistemas utilizando enfoques de Monolitos Modulares y Arquitectura Limpia (Clean Architecture).",
        "Realizar revisiones de código (code reviews) para asegurar la calidad, el rendimiento y la adherencia a estándares.",
        "Colaborar estrechamente con las partes interesadas (stakeholders) para definir especificaciones técnicas.",
        "Liderar el uso de estos patrones para desacoplar la lógica de datos, facilitar las pruebas automatizadas e integrar múltiples bases de datos por módulo en una arquitectura modular.",
      ],
    },
  },
  {
    role: {
      en: "Programmer Analyst",
      es: "Analista Programador",
    },
    organization:
      "Ministry of Economy, Planning and Development (MEPYD) / Ministerio de Economía, Planificación y Desarrollo",
    duration: "05/2022 - 02/2025",
    points: {
      en: [
        "Performed requirements gathering and analysis for major ministry software projects.",
        "Collaborated with cross-functional teams to define technical requirements aligned with institutional objectives.",
        "Worked in an agile setting under Scrum methodology using Azure DevOps for task and project management.",
        "Implemented and promoted code quality standards in the department, improving maintainability and development speed.",
        "Utilized Angular, JavaScript, TypeScript, TailwindCSS, CSS, HTML, Entity Framework, .NET Core, and SQL Server to design and deploy scalable solutions.",
      ],
      es: [
        "Realizar el análisis y levantamiento de requerimientos para proyectos de software clave del ministerio.",
        "Colaborar con equipos multidisciplinarios para definir especificaciones técnicas alineadas con los objetivos institucionales.",
        "Trabajar en un entorno ágil bajo la metodología Scrum utilizando Azure DevOps para la gestión del proyecto.",
        "Implementar y promover mejores prácticas de desarrollo en el departamento, mejorando la eficiencia y calidad del código.",
        "Utilizar tecnologías como Angular, JavaScript, TypeScript, TailwindCSS, CSS, HTML, Entity Framework, .NET Core y SQL Server para desarrollar soluciones eficaces y escalables que soportan las necesidades del ministerio.",
      ],
    },
  },
  {
    role: {
      en: "Systems Analyst",
      es: "Analista de Sistemas",
    },
    organization:
      "Reserve Bank of the Dominican Republic (BanReservas) / Banco de Reservas",
    duration: "12/2021 - 04/2022",
    points: {
      en: [
        "Investigated and resolved technical issues and maintained applications oriented towards distributed environments for ATM administration systems.",
        "Managed programs and troubleshooting protocols to ensure high availability of distributed banking services.",
      ],
      es: [
        "Resolución de problemas y gestión de programas orientados a sistemas distribuidos para la administración y gestión de cajeros automáticos (ATMs).",
        "Garantizar la alta disponibilidad y correcto funcionamiento de los sistemas bancarios distribuidos.",
      ],
    },
  },
];

export const education: EducationEntry[] = [
  {
    degree: { en: "Software Engineering", es: "Ingeniería de Software" },
    institution: "University of the Caribbean (UNICARIBE)",
    duration: "03/2025 - Present",
    status: { en: "In Progress", es: "En Curso" },
  },
  {
    degree: {
      en: "Software Development Technologist",
      es: "Tecnólogo en Desarrollo de Software",
    },
    institution: "Technological Institute of the Americas (ITLA)",
    duration: "01/2018 - 08/2022",
    status: { en: "Completed", es: "Completado" },
  },
];

export const certifications: Certification[] = [
  {
    title:
      "Develop Microservices on .NET 8 using ASP.NET Web API, Docker, RabbitMQ, MassTransit, gRPC, Yarp Gateway, Redis, SqlServer",
    institution: "ITLA",
    duration: "07/2025 - Present",
    status: { en: "In Progress", es: "En Curso" },
  },
  { title: "DIPLOMA IN SQL SERVER PROGRAMMING", duration: "07/2024 - 09/2024" },
  { title: "C#.Net Intermediate", duration: "04/2024 - 09/2024" },
  { title: "Introduction to Entity Framework Core 6", duration: "04/2023 - 07/2023" },
  { title: "JavaScript Array Manipulation Course", duration: "08/2023" },
  { title: "REST API Consumption with Angular Course", duration: "03/2023" },
  { title: "Angular: Components and Services Course", duration: "02/2023" },
  { title: "Angular Basics Course", duration: "01/2023" },
  {
    title: "JavaScript Full-Course From Beginner to Professional",
    duration: "12/2021 - 04/2022",
  },
  {
    title: "Git, GitHub and GitLab: Use of Code Repositories",
    duration: "12/2021 - 04/2022",
  },
  { title: "SQL Fundamentals Course", duration: "02/2019 - 03/2019" },
];

export const languages: Localized<LanguageProficiency[]> = {
  en: [
    { name: "Spanish", level: "Native or Bilingual Proficiency" },
    { name: "English", level: "Professional Working Proficiency" },
  ],
  es: [
    { name: "Español", level: "Competencia nativa o bilingüe" },
    { name: "Inglés", level: "Competencia profesional completa" },
  ],
};

/**
 * Proyectos.
 *
 * Vacio a proposito: la seccion no se publica hasta que haya contenido real.
 * En cuanto se anada aqui una entrada con titulo de verdad, la seccion y su
 * enlace en la navegacion vuelven solos, sin tocar ningun componente.
 *
 * `Projects.tsx` ya implementa la tarjeta completa del rediseno, incluidos los
 * estados pendientes: un proyecto sin `githubLink` o sin `liveLink` pinta el
 * boton con borde punteado en vez de esconderlo, y sin `image` cae en el
 * marcador de posicion. Es decir, se puede anadir una entrada aqui sin tener
 * todavia captura ni URLs, y la tarjeta lo declara en lugar de mentir.
 *
 * Forma de una entrada:
 *
 *   {
 *     slug: "sistema-map",              // clave estable; nombra la captura
 *     title: "Sistema institucional — MAP",
 *     duration: "2025 —",
 *     status: "production",             // production | in-progress | archived
 *     category: "gubernamental",        // gubernamental | producto | freelance
 *     tech: ["Angular", ".NET 8"],
 *     description: { es: [...], en: [...] },   // 3-4 vinetas: contexto,
 *                                              // tu aporte, resultado medible
 *     githubLink: "https://…",          // opcional
 *     liveLink: "https://…",            // opcional
 *     image: "/projects/sistema-map.png",      // 16:10, o null
 *   }
 */
export const projects: Project[] = [];

/**
 * Etiquetas de `status` y `category`.
 *
 * Viven aqui y no en `i18n/translations.ts` porque su clave es el propio tipo
 * del modelo: `Record<ProjectStatus, …>` obliga a que anadir un estado nuevo
 * al tipo sea un error de compilacion hasta que se le escriba su rotulo en los
 * dos idiomas. Desde translations.ts esa garantia se perderia.
 */
export const PROJECT_STATUS: Record<ProjectStatus, Localized> = {
  production: { es: "En producción", en: "In production" },
  "in-progress": { es: "En curso", en: "In progress" },
  archived: { es: "Archivado", en: "Archived" },
};

export const PROJECT_CATEGORY: Record<ProjectCategory, Localized> = {
  gubernamental: { es: "Gubernamental", en: "Government" },
  producto: { es: "Producto", en: "Product" },
  freelance: { es: "Freelance", en: "Freelance" },
};

/** Un proyecto es un marcador mientras su titulo empiece por "TODO". */
const esMarcador = (proyecto: Project) =>
  proyecto.title.trim().toUpperCase().startsWith("TODO");

/**
 * Los unicos proyectos que llegan a pintarse. Filtrar aqui, y no en el
 * componente, evita que un marcador olvidado se publique por descuido.
 */
export const visibleProjects = projects.filter((p) => !esMarcador(p));

/** Gobierna si la seccion existe y si aparece su enlace en la navegacion. */
export const hasProjects = visibleProjects.length > 0;

/**
 * Fecha de inicio del empleo mas antiguo, leida de `duration`.
 *
 * Las duraciones se escriben "MM/AAAA - MM/AAAA" en todo el archivo. Se lee la
 * primera mitad y se ordena; si alguna entrada no encajara en el formato, se
 * ignora en vez de romper la pagina.
 */
function inicioDeCarrera(): Date | null {
  const inicios = experience
    .map((e) => /^(\d{2})\/(\d{4})/.exec(e.duration))
    .filter((m): m is RegExpExecArray => m !== null)
    // El indice 1 y 2 existen si el patron caso, pero `noUncheckedIndexedAccess`
    // no lo sabe: `Number(undefined)` seria NaN, asi que se da un respaldo.
    .map((m) => new Date(Number(m[2] ?? 0), Number(m[1] ?? 1) - 1, 1))
    .sort((a, b) => a.getTime() - b.getTime());
  return inicios[0] ?? null;
}

/** Anos completos desde el primer empleo. Se recalcula solo cada ano. */
function anosEnProduccion(): number {
  const inicio = inicioDeCarrera();
  if (!inicio) return 0;
  const ahora = new Date();
  const meses =
    (ahora.getFullYear() - inicio.getFullYear()) * 12 +
    (ahora.getMonth() - inicio.getMonth());
  return Math.max(0, Math.floor(meses / 12));
}

export interface Stat {
  /** El texto que se cuenta. El sufijo no numerico se preserva ("4+"). */
  value: string;
  label: Localized;
}

/**
 * Las tres cifras de "Sobre mi".
 *
 * Se derivan del propio modelo y no se escriben a mano: anadir una
 * certificacion o un empleo actualiza la cifra sin que nadie tenga que
 * acordarse. Una cifra escrita a mano es una cifra que se queda vieja.
 */
export const stats: Stat[] = [
  {
    value: `${anosEnProduccion()}+`,
    label: { es: "Años en producción", en: "Years in production" },
  },
  {
    value: String(experience.length),
    label: { es: "Instituciones", en: "Institutions" },
  },
  {
    value: String(certifications.length),
    label: { es: "Certificaciones", en: "Certifications" },
  },
];

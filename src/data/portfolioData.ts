import {
  SiTypescript,
  SiSharp,
  SiPhp,
  SiAngular,
  SiReact,
  SiNextdotjs,
  SiReactivex,
  SiHtml5,
  SiBootstrap,
  SiTailwindcss,
  SiWordpress,
  SiDotnet,
  SiNestjs,
  SiPostgresql,
  SiGit,
  SiGithub,
  SiGitlab,
  SiJira,
  SiVercel,
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
    en: "Specialist in scalable architectures and technical leadership",
    es: "Especialista en arquitecturas escalables y liderazgo técnico",
  },
  email: "noel.ortizdev@gmail.com",
  location: "Santo Domingo, Dominican Republic",
  linkedin: "https://linkedin.com/in/noelortizsanchez",
  github: "https://github.com/NoelDevs17",
  // Archivo estatico en public/. Se mantiene a mano: ver DESIGN.md.
  resumeLink: "/cv-noel-ortiz.pdf",
  /*
   * Orden por prioridad, no cronologico. El indice 0 es la entradilla del Hero;
   * el resto (indices 1..n) alimenta la seccion "Sobre mi" mediante slice(1).
   *
   * De arriba a abajo: primero la trayectoria amplia (analisis, levantamiento
   * de requerimientos, liderazgo) y el freelance; el detalle tecnico —SOLID,
   * patrones, code reviews, y la construccion de sistemas— queda al final, para
   * que lo tecnico no encabece la narrativa.
   */
  summary: {
    en: [
      "Tech Leader with experience directing strategic software projects, specialized in designing scalable architectures and strengthening development teams through best practices and continuous improvement.",
      "Software developer with experience leading development teams and taking part in requirements gathering alongside stakeholders, translating business needs into robust technical solutions balanced between performance, simplicity, and scalability.",
      "Additional experience as a freelance full stack developer, working directly with clients to build and maintain web applications —from WordPress and PHP to React and Next.js— accompanying each project from requirements gathering through to deployment.",
      "Hands-on work applying SOLID principles and patterns such as Repository, Unit of Work, and Strategy in modular solutions under Clean Architecture and Modular Monolithic approaches, along with coding standards, code reviews, linting, and pair programming to ensure quality, maintainability, and automated testing.",
      "A track record building modern systems with Angular and .NET in their latest versions, fostering a solid technical culture, clear documentation (wikis, diagrams), and tools like Azure DevOps and Jira to automate CI/CD, manage versions, and provide traceability in agile environments (Scrum).",
    ],
    es: [
      "Líder Técnico con experiencia dirigiendo proyectos estratégicos de software, especializado en diseñar arquitecturas escalables y fortalecer equipos de desarrollo a través de mejores prácticas y mejora continua.",
      "Desarrollador de software con experiencia liderando equipos de desarrollo y participando en el levantamiento de requerimientos junto a las partes interesadas, traduciendo las necesidades del negocio en soluciones técnicas robustas y equilibradas entre rendimiento, simplicidad y escalabilidad.",
      "Experiencia adicional como desarrollador full stack freelance, trabajando directamente con clientes en el desarrollo y mantenimiento de aplicaciones web —desde WordPress y PHP hasta React y Next.js— acompañando cada proyecto desde el levantamiento de requerimientos hasta el despliegue.",
      "Trabajo directo aplicando principios SOLID y patrones como Repository (Repositorio), Unit of Work (Unidad de Trabajo) y Strategy (Estrategia) en soluciones modulares bajo enfoques de Arquitectura Limpia (Clean Architecture) y Monolitos Modulares, junto con estándares de codificación, revisiones de código (code reviews), uso de linters y programación en pareja para garantizar calidad, mantenibilidad y pruebas automatizadas.",
      "Trayectoria construyendo sistemas modernos con Angular y .NET en sus últimas versiones, impulsando una sólida cultura técnica, documentación clara (wikis, diagramas) y herramientas como Azure DevOps y Jira para automatizar CI/CD, gestionar versiones y proporcionar trazabilidad en entornos ágiles (Scrum).",
    ],
  },
  shortBio: {
    en: "Tech Lead and Full Stack Developer building scalable systems with Angular and .NET.",
    es: "Líder Técnico y Desarrollador Full Stack que construye sistemas escalables con Angular y .NET.",
  },
};

export const skillGroups: SkillGroup[] = [
  {
    category: { en: "Programming Languages", es: "Lenguajes de Programación" },
    skills: [
      { name: "TypeScript", icon: SiTypescript },
      { name: "C#", icon: SiSharp },
      { name: "PHP", icon: SiPhp },
      { name: "SQL", icon: FaDatabase },
    ],
  },
  {
    category: { en: "Frontend Technologies", es: "Tecnologías Frontend" },
    skills: [
      { name: "Angular", icon: SiAngular },
      { name: "React", icon: SiReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "RxJS", icon: SiReactivex },
      { name: "HTML5", icon: SiHtml5 },
      { name: "Bootstrap", icon: SiBootstrap },
      { name: "TailwindCSS", icon: SiTailwindcss },
      { name: "WordPress", icon: SiWordpress },
    ],
  },
  {
    category: { en: "Backend & Databases", es: "Backend y Bases de Datos" },
    skills: [
      { name: ".NET Core", icon: SiDotnet },
      { name: "NestJs", icon: SiNestjs },
      { name: "Entity Framework", icon: FaDatabase },
      { name: "SQL Server", icon: FaDatabase },
      { name: "PostgreSQL", icon: SiPostgresql },
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
      { name: "Vercel", icon: SiVercel },
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
    // Nombre propio oficial: siempre en espanol, como el resto de instituciones.
    organization: "Ministerio de Administración Pública (MAP)",
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
      en: "Full Stack Developer",
      es: "Desarrollador Full Stack",
    },
    organization: "Freelance",
    duration: "2025 - 2026",
    points: {
      en: [
        "Full stack development of applications for clients, owning both the frontend and the backend, from initial design through to production deployment.",
        "Built sites and applications in PHP with WordPress, along with modern applications using React and Next.js deployed on Vercel.",
        "Worked on both greenfield projects built from scratch and the maintenance and evolution of applications already in production.",
        "Supported the Project Manager (PM) in requirements-gathering meetings directly with clients, translating their needs into technical solutions.",
      ],
      es: [
        "Desarrollo full stack de aplicaciones para clientes, asumiendo tanto el frontend como el backend, desde el diseño inicial hasta el despliegue en producción.",
        "Construcción de sitios y aplicaciones en PHP con WordPress, además de aplicaciones modernas con React y Next.js desplegadas en Vercel.",
        "Trabajo tanto en proyectos nuevos desde cero como en el mantenimiento y evolución de aplicaciones ya en producción.",
        "Acompañamiento a la Project Manager (PM) en reuniones de levantamiento de requerimientos directamente con los clientes, traduciendo sus necesidades en soluciones técnicas.",
      ],
    },
  },
  {
    role: {
      en: "Programmer Analyst",
      es: "Analista Programador",
    },
    organization: "Ministerio de Economía, Planificación y Desarrollo (MEPYD)",
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
    organization: "Banco de Reservas de la República Dominicana (BanReservas)",
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
    institution: "Universidad del Caribe (UNICARIBE)",
    duration: "03/2025 - Present",
    status: { en: "In Progress", es: "En Curso" },
  },
  {
    degree: {
      en: "Software Development Technologist",
      es: "Tecnólogo en Desarrollo de Software",
    },
    institution: "Instituto Tecnológico de las Américas (ITLA)",
    duration: "01/2018 - 08/2022",
    status: { en: "Completed", es: "Completado" },
  },
];

export const certifications: Certification[] = [
  {
    title:
      "Develop Microservices on .NET 8 using ASP.NET Web API, Docker, RabbitMQ, MassTransit, gRPC, Yarp Gateway, Redis, SqlServer",
    institution: "ITLA",
  },
  { title: "DIPLOMA IN SQL SERVER PROGRAMMING" },
  { title: "C#.Net Intermediate" },
  { title: "Introduction to Entity Framework Core 6" },
  { title: "JavaScript Array Manipulation Course" },
  { title: "REST API Consumption with Angular Course" },
  { title: "Angular: Components and Services Course" },
  { title: "Angular Basics Course" },
  { title: "JavaScript Full-Course From Beginner to Professional" },
  { title: "Git, GitHub and GitLab: Use of Code Repositories" },
  { title: "SQL Fundamentals Course" },
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
 * ⚠️ CONTENIDO DE EJEMPLO. Las descripciones de las tres entradas son
 * plantillas que indican QUE escribir —contexto, tu aporte, resultado
 * medible—, no texto final. Las sustituye Noel. Lo mismo con las capturas y
 * con las URLs que faltan.
 *
 * Estan aqui, y no en un array vacio, para que la seccion se vea y se pueda
 * revisar el diseno con contenido de verdad delante. En cuanto haya textos
 * definitivos, se reescriben estas mismas entradas y no hay que tocar ningun
 * componente.
 *
 * La tarjeta ya soporta los estados pendientes, asi que una entrada incompleta
 * no rompe nada: sin `githubLink` o sin `liveLink` el boton sale punteado e
 * inactivo en vez de esconderse, y sin `image` cae en el marcador de posicion
 * 16:10. Los dos primeros proyectos ejercen ese caso; el tercero, el contrario.
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
 *     description: { es: [...], en: [...] },   // 3-4 vinetas
 *     githubLink: "https://…",          // opcional
 *     liveLink: "https://…",            // opcional
 *     image: "/projects/sistema-map.png",      // 16:10, o null
 *   }
 */
export const projects: Project[] = [
  {
    slug: "sistema-map",
    title: "Sistema institucional — MAP",
    duration: "2025 —",
    status: "production",
    category: "gubernamental",
    tech: [
      "Angular",
      ".NET 8",
      "SQL Server",
      "Clean Architecture",
      "Azure DevOps",
    ],
    description: {
      es: [
        "Escribe aquí de qué trata el proyecto: el problema institucional que resuelve y a quién sirve.",
        "Tu papel y las decisiones de arquitectura que tomaste (monolito modular, capas, patrones).",
        "El resultado medible: tiempos, volumen de trámites, cobertura de pruebas, despliegues por semana.",
      ],
      en: [
        "Write what the project is about: the institutional problem it solves and who it serves.",
        "Your role and the architecture decisions you made (modular monolith, layers, patterns).",
        "The measurable outcome: cycle times, volume, test coverage, deploys per week.",
      ],
    },
    image: null,
  },
  {
    slug: "plataforma-mepyd",
    title: "Plataforma de gestión — MEPYD",
    duration: "2022 — 2025",
    status: "production",
    category: "gubernamental",
    tech: ["Angular", ".NET Core", "Entity Framework", "TailwindCSS", "Scrum"],
    description: {
      es: [
        "Describe el alcance funcional en una frase: módulos, usuarios internos, integraciones.",
        "Cuenta el trabajo de análisis y levantamiento de requerimientos junto a las áreas.",
        "Cierra con lo que dejaste instalado: estándares de código, documentación, CI/CD.",
      ],
      en: [
        "Describe the functional scope in one line: modules, internal users, integrations.",
        "Explain the requirements analysis work done alongside the business areas.",
        "Close with what you left behind: coding standards, documentation, CI/CD.",
      ],
    },
    image: null,
  },
  {
    slug: "nuevo-proyecto",
    title: "Nuevo proyecto",
    duration: "2026",
    status: "in-progress",
    category: "producto",
    tech: ["NestJs", "TypeScript", "PostgreSQL"],
    description: {
      es: [
        "Duplica esta entrada para cada proyecto nuevo: título, fechas, estado y categoría a la izquierda.",
        "Tres o cuatro líneas máximo por proyecto — contexto, tu aporte, resultado.",
        "Añade la captura en public/projects/ y los enlaces de repositorio o demo.",
      ],
      en: [
        "Duplicate this entry for every new project: title, dates, status and category on the left.",
        "Three or four lines max per project — context, your contribution, outcome.",
        "Add the screenshot in public/projects/ and the repository or demo links.",
      ],
    },
    githubLink: "https://github.com/NoelDevs17",
    liveLink: "https://noel.aleftavsoft.com/",
    image: null,
  },
];

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

import type {
  PersonalInfo,
  SkillGroup,
  Experience,
  Project,
  Education,
  Certification,
  LanguageProficiency,
} from "./types";

export type { PersonalInfo, SkillGroup, Experience, Project, Education, Certification, LanguageProficiency };

export const personalInfo: PersonalInfo = {
  name: "Noel Ortiz",
  titles: {
    en: ["Full Stack Developer", "Tech Lead", "Angular & .NET Developer"],
    es: ["Desarrollador Full Stack", "Líder Técnico", "Desarrollador Angular & .NET"],
  },
  specialty: {
    en: "Specialist in Government and Banking Solutions",
    es: "Especialista en Soluciones Gubernamentales y Bancarias",
  },
  email: "noelrum17@hotmail.com",
  location: "Santo Domingo, Dominican Republic",
  github: "https://github.com/NoelDevs17",
  linkedin: "https://linkedin.com/in/noelortizsanchez",
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
};

export const skillGroups: SkillGroup[] = [
  {
    category: { en: "Programming Languages", es: "Lenguajes de Programación" },
    skills: ["TypeScript", "C#", "SQL"],
  },
  {
    category: { en: "Frontend Technologies", es: "Tecnologías Frontend" },
    skills: ["Angular", "RxJS", "HTML5", "Bootstrap", "TailwindCSS"],
  },
  {
    category: { en: "Backend & Databases", es: "Backend y Bases de Datos" },
    skills: [".NET Core", "NestJs", "Entity Framework", "SQL Server", "Linq"],
  },
  {
    category: { en: "Tools & DevOps", es: "Herramientas y DevOps" },
    skills: ["Azure DevOps", "Git", "GitHub", "GitLab", "Jira"],
  },
];

export const experiences: Experience[] = [
  {
    role: {
      en: "Full Stack Developer & Tech Lead",
      es: "Líder Técnico & Desarrollador Full Stack",
    },
    company: "Ministry of Public Administration (MAP) / Ministerio de Administración Pública",
    period: "03/2025 - Present",
    highlights: {
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
    company:
      "Ministry of Economy, Planning and Development (MEPYD) / Ministerio de Economía, Planificación y Desarrollo",
    period: "05/2022 - 02/2025",
    highlights: {
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
    company:
      "Reserve Bank of the Dominican Republic (BanReservas) / Banco de Reservas",
    period: "12/2021 - 04/2022",
    highlights: {
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

export const projects: Project[] = [
  {
    name: "Ponte Pa' Lo Tuyo",
    description: {
      en: "Web app that turns class notes into AI-generated multiple-choice quizzes. .NET 8 backend built on Clean Architecture, React front end, and sign-in by email or Google.",
      es: "Aplicación web que convierte apuntes de clase en cuestionarios de opción múltiple generados con IA. Backend en .NET 8 con Clean Architecture, frontend en React y autenticación con correo o Google.",
    },
    technologies: [".NET Core", "React", "TypeScript", "PostgreSQL", "TailwindCSS"],
    status: "production",
    // Sin periodo ni enlaces: añádelos aquí cuando haya repo o demo pública.
  },
];

export const educations: Education[] = [
  {
    degree: { en: "Software Engineering", es: "Ingeniería de Software" },
    institution: "University of the Caribbean (UNICARIBE)",
    period: "03/2025 - Present",
    status: { en: "In Progress", es: "En Curso" },
  },
  {
    degree: {
      en: "Software Development Technologist",
      es: "Tecnólogo en Desarrollo de Software",
    },
    institution: "Technological Institute of the Americas (ITLA)",
    period: "01/2018 - 08/2022",
    status: { en: "Completed", es: "Completado" },
  },
];

export const certifications: Certification[] = [
  {
    title:
      "Develop Microservices on .NET 8 using ASP.NET Web API, Docker, RabbitMQ, MassTransit, gRPC, Yarp Gateway, Redis, SqlServer",
    institution: "ITLA",
    period: "07/2025 - Present",
    status: { en: "In Progress", es: "En Curso" },
  },
  { title: "DIPLOMA IN SQL SERVER PROGRAMMING", period: "07/2024 - 09/2024" },
  { title: "C#.Net Intermediate", period: "04/2024 - 09/2024" },
  { title: "Introduction to Entity Framework Core 6", period: "04/2023 - 07/2023" },
  { title: "JavaScript Array Manipulation Course", period: "08/2023" },
  { title: "REST API Consumption with Angular Course", period: "03/2023" },
  { title: "Angular: Components and Services Course", period: "02/2023" },
  { title: "Angular Basics Course", period: "01/2023" },
  {
    title: "JavaScript Full-Course From Beginner to Professional",
    period: "12/2021 - 04/2022",
  },
  {
    title: "Git, GitHub and GitLab: Use of Code Repositories",
    period: "12/2021 - 04/2022",
  },
  { title: "SQL Fundamentals Course", period: "02/2019 - 03/2019" },
];

export const languages: Record<"en" | "es", LanguageProficiency[]> = {
  en: [
    { name: "Spanish", level: "Native or Bilingual Proficiency" },
    { name: "English", level: "Professional Working Proficiency" },
  ],
  es: [
    { name: "Español", level: "Competencia nativa o bilingüe" },
    { name: "Inglés", level: "Competencia profesional completa" },
  ],
};

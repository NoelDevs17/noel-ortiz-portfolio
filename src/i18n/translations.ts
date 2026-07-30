import type { Language } from "../types";

/**
 * Diccionario de la interfaz.
 *
 * Aqui vive solo el texto de la *interfaz*: rotulos, titulos de seccion y
 * etiquetas. El *contenido* (experiencia, formacion, resumen) vive en
 * `data/portfolioData.ts`, que ya guarda sus dos idiomas.
 *
 * El espanol se define primero y su forma se convierte en el tipo `Ui`. El
 * ingles se declara `Ui`, asi que **olvidar una clave es un error de
 * compilacion**, no un hueco que aparece en la pagina.
 */
const es = {
  nav: {
    aria: "Navegación principal",
    about: "Sobre mí",
    skills: "Stack",
    projects: "Proyectos",
    experience: "Trayectoria",
    contact: "Contacto",
    goHome: "Ir al inicio",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    resume: "CV",
    resumeAria: "Descargar el currículum en PDF",
    langSelector: "Selector de idioma",
    langSpanish: "Cambiar a español",
    langEnglish: "Cambiar a inglés",
    toLight: "Cambiar a tema claro",
    toDark: "Cambiar a tema oscuro",
    /** Rotulo de la barra de progreso de lectura, para lectores de pantalla. */
    progress: "Progreso de lectura",
  },
  hero: {
    greeting: "Hola, me llamo",
    cta: "Hablemos",
    /** Rotulos de la columna de metadatos (<dl>). */
    metaBase: "Base",
    metaFocus: "Enfoque",
    metaFocusValue: "Gobierno y banca",
    metaStatus: "Estado",
    metaStatusValue: "Abierto a oportunidades",
    marqueeAria: "Tecnologías del stack",
  },
  about: {
    title: "Sobre mí",
    education: "Formación",
    languages: "Idiomas",
  },
  skills: {
    title: "Stack",
  },
  projects: {
    title: "Proyectos",
    lede: "Trabajo seleccionado. Cada entrada es un proyecto: contexto, decisiones técnicas y resultado.",
    repo: "Repositorio",
    demo: "Ver demo",
    /**
     * Los botones no desaparecen cuando falta la URL: se pintan inactivos con
     * borde punteado y este `title` explica por que. Un boton ausente parece un
     * proyecto sin repositorio; uno punteado dice que el dato esta pendiente.
     */
    repoPending: "Repositorio pendiente: añade la URL en githubLink",
    demoPending: "Demo pendiente: añade la URL en liveLink",
    /**
     * Prefijo del `alt` de la captura. Solo se usa cuando hay imagen real: el
     * marcador de posicion es decorativo y va con `alt` vacio, porque anunciar
     * "imagen de relleno" no le sirve a nadie.
     */
    shotAlt: "Captura de",
    stackAria: "Stack del proyecto",
  },
  experience: {
    title: "Trayectoria",
    /** Fin abierto de un empleo o certificación en curso. */
    present: "Actualidad",
    certifications: "Certificaciones",
  },
  contact: {
    title: "Contacto",
    body: "Estoy abierto a nuevas oportunidades y mi bandeja de entrada siempre está disponible. Si tienes una pregunta o simplemente quieres saludar, haré lo posible por responderte.",
    cvLabel: "CV (PDF)",
  },
  footer: {
    rights: "Todos los derechos reservados",
  },
  scrollTop: "Volver arriba",
};

/** La forma del diccionario la fija el espanol. */
export type Ui = typeof es;

const en: Ui = {
  nav: {
    aria: "Primary navigation",
    about: "About",
    skills: "Stack",
    projects: "Projects",
    experience: "Track record",
    contact: "Contact",
    goHome: "Go to top",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    resume: "CV",
    resumeAria: "Download résumé as PDF",
    langSelector: "Language selector",
    langSpanish: "Switch to Spanish",
    langEnglish: "Switch to English",
    toLight: "Switch to light theme",
    toDark: "Switch to dark theme",
    progress: "Reading progress",
  },
  hero: {
    greeting: "Hi, my name is",
    cta: "Get in touch",
    metaBase: "Based in",
    metaFocus: "Focus",
    metaFocusValue: "Government & banking",
    metaStatus: "Status",
    metaStatusValue: "Open to opportunities",
    marqueeAria: "Stack technologies",
  },
  about: {
    title: "About",
    education: "Education",
    languages: "Languages",
  },
  skills: {
    title: "Stack",
  },
  projects: {
    title: "Projects",
    lede: "Selected work. Each entry is one project: context, technical decisions and outcome.",
    repo: "Repository",
    demo: "Live demo",
    repoPending: "Repository pending: add the URL in githubLink",
    demoPending: "Demo pending: add the URL in liveLink",
    shotAlt: "Screenshot of",
    stackAria: "Project stack",
  },
  experience: {
    title: "Track record",
    present: "Present",
    certifications: "Certifications",
  },
  contact: {
    title: "Contact",
    body: "I am currently open to new opportunities and my inbox is always open. Whether you have a question or just want to say hi, I'll do my best to get back to you.",
    cvLabel: "Resume (PDF)",
  },
  footer: {
    rights: "All rights reserved",
  },
  scrollTop: "Scroll to top",
};

export const ui: Record<Language, Ui> = { es, en };

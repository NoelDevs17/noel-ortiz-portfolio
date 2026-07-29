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
    skills: "Tecnologías",
    projects: "Proyectos",
    experience: "Experiencia",
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
  },
  hero: {
    greeting: "Hola, me llamo",
  },
  about: {
    title: "Sobre mí",
    greeting: "¡Hola!",
    education: "Formación académica",
    certifications: "Certificaciones",
    languages: "Idiomas",
  },
  skills: {
    title: "Tecnologías con las que trabajo",
  },
  projects: {
    title: "Algunas cosas que he construido",
    featured: "Proyecto destacado",
    repo: "Repositorio",
    demo: "Ver demo",
  },
  experience: {
    title: "Experiencia",
  },
  contact: {
    kicker: "¿Y ahora qué?",
    title: "Hablemos",
    body: "Estoy abierto a nuevas oportunidades y mi bandeja de entrada siempre está disponible. Si tienes una pregunta o simplemente quieres saludar, haré lo posible por responderte.",
    cta: "Escríbeme",
  },
  footer: {
    builtWith: "Diseñado y construido con",
    by: "por",
    rights: "Todos los derechos reservados.",
  },
  scrollTop: "Volver arriba",
};

/** La forma del diccionario la fija el espanol. */
export type Ui = typeof es;

const en: Ui = {
  nav: {
    aria: "Primary navigation",
    about: "About",
    skills: "Skills",
    projects: "Projects",
    experience: "Experience",
    contact: "Contact",
    goHome: "Go to top",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    resume: "RESUME",
    resumeAria: "Download résumé as PDF",
    langSelector: "Language selector",
    langSpanish: "Switch to Spanish",
    langEnglish: "Switch to English",
    toLight: "Switch to light theme",
    toDark: "Switch to dark theme",
  },
  hero: {
    greeting: "Hi, my name is",
  },
  about: {
    title: "About Me",
    greeting: "Hello!",
    education: "Education History",
    certifications: "Certifications",
    languages: "Languages",
  },
  skills: {
    title: "Technologies I Work With",
  },
  projects: {
    title: "Some Things I've Built",
    featured: "Featured Project",
    repo: "Repository",
    demo: "Live Demo",
  },
  experience: {
    title: "Experience",
  },
  contact: {
    kicker: "What's Next?",
    title: "Get In Touch",
    body: "I am currently open to new opportunities and my inbox is always open. Whether you have a question or just want to say hi, I'll do my best to get back to you.",
    cta: "Say Hello",
  },
  footer: {
    builtWith: "Designed and built with",
    by: "by",
    rights: "All rights reserved.",
  },
  scrollTop: "Scroll to top",
};

export const ui: Record<Language, Ui> = { es, en };

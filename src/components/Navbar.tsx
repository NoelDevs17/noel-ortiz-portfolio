import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaMoon, FaSun } from "react-icons/fa";
import { hasProjects, personalInfo } from "../data/portfolioData";
import { useI18n } from "../i18n/context";
import { useTheme } from "../hooks/useTheme";
import type { Language } from "../types";

/**
 * El id de la seccion es fijo; el rotulo sale del diccionario. Asi cambiar de
 * idioma no rompe los anclajes ni el desplazamiento.
 */
const navSections = [
  "about",
  "skills",
  "projects",
  "experience",
  "contact",
] as const;

interface LanguageSwitchProps {
  lang: Language;
  setLang: (lang: Language) => void;
  labels: {
    langSelector: string;
    langSpanish: string;
    langEnglish: string;
  };
}

/**
 * Selector de idioma.
 *
 * Son dos <button> de verdad, asi que entran en el orden de tabulacion y
 * responden a Enter y espacio sin cablear nada. `role="group"` con etiqueta
 * hace que un lector de pantalla anuncie para que sirve el par, y
 * `aria-pressed` cual esta activo: el color por si solo no lo comunica.
 */
const LanguageSwitch = ({ lang, setLang, labels }: LanguageSwitchProps) => (
  <div
    role="group"
    aria-label={labels.langSelector}
    className="flex items-center gap-0.5 rounded border border-hairline p-0.5"
  >
    {(["es", "en"] as const).map((code) => (
      <button
        key={code}
        type="button"
        onClick={() => setLang(code)}
        aria-pressed={lang === code}
        /*
          WCAG 2.5.3: el nombre accesible antepone el texto visible ("ES"),
          porque "Switch to Spanish" no lo contiene y el control por voz no
          podria activarlo diciendo lo unico que se ve.
        */
        aria-label={`${code.toUpperCase()} — ${code === "es" ? labels.langSpanish : labels.langEnglish}`}
        className={`rounded-sm px-2.5 py-1 font-mono text-xs font-bold uppercase transition-colors ${
          lang === code
            ? "bg-accent text-primary-bg"
            : "text-text-secondary hover:text-accent"
        }`}
      >
        {code}
      </button>
    ))}
  </div>
);

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
  labels: { toLight: string; toDark: string };
}

/**
 * Conmutador de tema.
 *
 * Un icono solo no dice nada a un lector de pantalla, asi que lleva
 * aria-label. La etiqueta describe la ACCION ("cambiar a tema claro"), no el
 * estado actual: es lo que va a ocurrir al pulsarlo.
 */
const ThemeToggle = ({ isDark, onToggle, labels }: ThemeToggleProps) => (
  <button
    type="button"
    onClick={onToggle}
    aria-label={isDark ? labels.toLight : labels.toDark}
    className="grid h-8 w-8 place-items-center rounded border border-hairline text-text-secondary transition-colors hover:border-accent hover:text-accent"
  >
    {isDark ? <FaSun size={14} /> : <FaMoon size={14} />}
  </button>
);

const Navbar = () => {
  const { t, lang, setLang } = useI18n();
  const { isDark, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Sin proyectos publicados el enlace desaparece: llevaria a un ancla que no
  // existe en el documento.
  const navLinks = navSections
    .filter((id) => id !== "projects" || hasProjects)
    .map((id) => ({ to: id, name: t.nav[id] }));

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // El acceso por indice puede ser `undefined` con `noUncheckedIndexedAccess`,
  // asi que se cae al nombre completo si no hubiera espacios.
  const firstName = personalInfo.name.split(" ")[0] ?? personalInfo.name;

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      aria-label={t.nav.aria}
      className={`fixed top-4 left-0 right-0 z-50 mx-auto w-[95%] max-w-6xl rounded-md transition-all duration-300 ${
        scrolled
          ? "bg-secondary-bg/20 backdrop-blur-lg border border-hairline shadow-lg shadow-black/5" // Increased translucency (20%)
          : "bg-transparent backdrop-blur-none border-transparent"
      }`}
    >
      <div className="px-6 h-16 flex justify-between items-center">
        {/*
          Logo - Scrolls to Top

          El `href` no es decorativo: react-scroll renderiza un <a> pelado, sin
          href ni tabindex, y un ancla sin href no entra en el orden de
          tabulacion. Sin esto, toda la navegacion era inalcanzable con teclado.
          Ademas devuelve el comportamiento propio de un enlace: Enter, menu
          contextual y abrir en pestana nueva.
        */}
        <Link
          to="hero"
          href="#hero"
          smooth={true}
          duration={500}
          offset={-100}
          /*
            WCAG 2.5.3 (Label in Name): el nombre accesible tiene que contener
            el texto visible. El rotulo era solo "Ir al inicio", asi que quien
            usa control por voz y dice "Noel" —lo unico que ve— no activaba el
            enlace. Se antepone el nombre visible.
          */
          aria-label={`${firstName} — ${t.nav.goHome}`}
          className="cursor-pointer text-2xl font-bold font-mono tracking-tighter text-accent hover:scale-105 transition-transform"
        >
          &lt;{firstName} /&gt;
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center space-x-8 h-full">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              href={`#${link.to}`}
              smooth={true}
              duration={500}
              offset={-100} // Adjusts for the fixed navbar height
              className="relative text-lg cursor-pointer text-base font-medium text-text-secondary hover:text-accent transition-colors group flex items-center h-full"
            >
              {link.name}
              <span className="absolute bottom-4 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
          <LanguageSwitch lang={lang} setLang={setLang} labels={t.nav} />

          <ThemeToggle isDark={isDark} onToggle={toggleTheme} labels={t.nav} />

          {/*
            El CV es un PDF estatico que se mantiene a mano. La ruta sale del
            modelo de datos y no cableada aqui, para que los dos botones
            (escritorio y movil) no puedan desincronizarse.
          */}
          <a
            href={personalInfo.resumeLink}
            download
            target="_blank"
            rel="noopener"
            aria-label={`${t.nav.resume} — ${t.nav.resumeAria}`}
            className="px-5 py-2 text-md font-mono font-bold text-accent border border-accent rounded hover:bg-accent hover:text-primary-bg transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-accent/20"
          >
            {t.nav.resume}
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="lg:hidden text-text-primary flex items-center"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label={isOpen ? t.nav.closeMenu : t.nav.openMenu}
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            id="mobile-navigation"
            className="lg:hidden bg-secondary-bg/95 backdrop-blur-xl border-t border-hairline overflow-hidden rounded-b-md"
          >
            <div className="flex flex-col items-center py-6 space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  href={`#${link.to}`}
                  smooth={true}
                  duration={500}
                  offset={-100}
                  className="cursor-pointer text-lg text-text-primary hover:text-accent font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <a
                href={personalInfo.resumeLink}
                download
                target="_blank"
                rel="noopener"
                aria-label={`${t.nav.resume} — ${t.nav.resumeAria}`}
                onClick={() => setIsOpen(false)}
                className="px-8 py-3 text-sm font-bold text-accent border border-accent rounded hover:bg-accent hover:text-primary-bg transition-colors"
              >
                {t.nav.resume}
              </a>

              <LanguageSwitch lang={lang} setLang={setLang} labels={t.nav} />

              <ThemeToggle isDark={isDark} onToggle={toggleTheme} labels={t.nav} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;

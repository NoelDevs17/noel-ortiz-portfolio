import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { FaBars, FaMoon, FaSun, FaTimes } from "react-icons/fa";
import { personalInfo } from "../data/portfolioData";
import { useI18n } from "../i18n/context";
import { useTheme } from "../hooks/useTheme";
import { CONTAINER } from "../lib/layout";
import { SECTIONS, sectionNumber } from "../lib/sections";
import { GHOST_BUTTON } from "../lib/styles";
import type { Language } from "../types";

/**
 * Seccion visible en este momento.
 *
 * La banda de deteccion esta centrada en la pantalla —se descarta el 20% de
 * arriba y el 60% de abajo— para que la marca cambie cuando una seccion ocupa
 * el centro de la mirada, y no en cuanto asoma por el borde inferior.
 */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { threshold: 0.2, rootMargin: "-20% 0px -60% 0px" },
    );

    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
    // `ids` se reconstruye en cada render, asi que se compara por contenido.
  }, [ids.join(",")]); // eslint-disable-line react-hooks/exhaustive-deps

  return active;
}

interface LanguageSwitchProps {
  lang: Language;
  setLang: (lang: Language) => void;
  labels: { langSelector: string; langSpanish: string; langEnglish: string };
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
    className="flex rounded-sm border border-line"
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
        className={`px-[9px] py-[5px] text-[11px] font-bold uppercase tracking-[0.1em] transition-colors ${
          lang === code
            ? "bg-accent text-primary-bg"
            : "text-text-secondary hover:text-text-primary"
        }`}
      >
        {code}
      </button>
    ))}
  </div>
);

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: (event: MouseEvent<HTMLButtonElement>) => void;
  labels: { toLight: string; toDark: string };
}

/**
 * Conmutador de tema.
 *
 * Un icono solo no dice nada a un lector de pantalla, asi que lleva
 * aria-label. La etiqueta describe la ACCION ("cambiar a tema claro"), no el
 * estado actual: es lo que va a ocurrir al pulsarlo.
 *
 * El evento se pasa entero al hook porque la transicion de tema necesita saber
 * desde que punto de la pantalla abrir el circulo.
 */
const ThemeToggle = ({ isDark, onToggle, labels }: ThemeToggleProps) => (
  <button
    type="button"
    onClick={onToggle}
    aria-label={isDark ? labels.toLight : labels.toDark}
    className="grid h-7 w-7 place-items-center rounded-sm border border-line text-text-secondary transition-colors hover:border-accent hover:text-accent"
  >
    {isDark ? <FaSun size={12} /> : <FaMoon size={12} />}
  </button>
);

const Navbar = () => {
  const { t, lang, setLang } = useI18n();
  const { isDark, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  /*
    El indice no es decoracion: es la misma numeracion que encabeza cada
    seccion, y es lo que convierte la navegacion en un indice del documento. Sale
    de `SECTIONS`, que ya excluye las secciones sin publicar, asi que el enlace y
    su numero aparecen y desaparecen juntos.
  */
  const active = useActiveSection([...SECTIONS]);

  // Barra de progreso de lectura. `useScroll` ya entrega el valor normalizado,
  // asi que se enchufa directo al scaleX sin calcular nada a mano.
  const { scrollYProgress } = useScroll();

  // El acceso por indice puede ser `undefined` con `noUncheckedIndexedAccess`,
  // asi que se cae al nombre completo si no hubiera espacios.
  const firstName = personalInfo.name.split(" ")[0] ?? personalInfo.name;

  const cvButton = `${GHOST_BUTTON} rounded-sm border border-line px-[18px] py-2 text-xs font-bold uppercase tracking-[0.12em] text-text-primary`;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line2 bg-primary-bg/[0.78] backdrop-blur-[14px]">
      <div className={`${CONTAINER} flex h-[68px] items-center justify-between gap-8`}>
        <a
          href="#hero"
          aria-label={`${firstName} — ${t.nav.goHome}`}
          className="text-[15px] font-bold tracking-[-0.02em] text-text-primary"
        >
          &lt;{firstName} <span className="text-accent">/</span>&gt;
        </a>

        <nav
          aria-label={t.nav.aria}
          className="hidden items-center gap-5 text-xs uppercase tracking-[0.14em] lg:flex xl:gap-7"
        >
          {SECTIONS.map((id) => {
            const isActive = active === id;
            return (
              <a
                key={id}
                href={`#${id}`}
                aria-current={isActive ? "true" : undefined}
                className={`group flex items-baseline gap-[7px] whitespace-nowrap transition-colors duration-[250ms] ${
                  isActive
                    ? "text-text-primary"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`text-[10px] transition-colors duration-[250ms] ${
                    isActive ? "text-accent" : "text-muted group-hover:text-accent"
                  }`}
                >
                  {sectionNumber(id)}
                </span>
                {t.nav[id]}
              </a>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2.5 lg:flex">
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
            className={cvButton}
          >
            {t.nav.resume} ↓
          </a>
        </div>

        <button
          type="button"
          className="text-text-primary lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label={isOpen ? t.nav.closeMenu : t.nav.openMenu}
        >
          {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/*
        Barra de progreso de lectura: el filete inferior de la cabecera, que
        crece de izquierda a derecha. Es decorativa —el mismo dato esta en la
        barra de desplazamiento del navegador— y por eso va oculta a lectores.
      */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
        className="h-px w-full bg-accent"
      />

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            id="mobile-navigation"
            aria-label={t.nav.aria}
            className="overflow-hidden border-t border-line2 bg-secondary-bg/95 backdrop-blur-xl lg:hidden"
          >
            <div className={`${CONTAINER} flex flex-col gap-5 py-6`}>
              {SECTIONS.map((id) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setIsOpen(false)}
                  className="flex items-baseline gap-[7px] text-xs uppercase tracking-[0.14em] text-text-secondary"
                >
                  <span aria-hidden="true" className="text-[10px] text-accent">
                    {sectionNumber(id)}
                  </span>
                  {t.nav[id]}
                </a>
              ))}

              <div className="flex items-center gap-2.5 pt-2">
                <LanguageSwitch lang={lang} setLang={setLang} labels={t.nav} />
                <ThemeToggle
                  isDark={isDark}
                  onToggle={toggleTheme}
                  labels={t.nav}
                />
                <a
                  href={personalInfo.resumeLink}
                  download
                  target="_blank"
                  rel="noopener"
                  aria-label={`${t.nav.resume} — ${t.nav.resumeAria}`}
                  onClick={() => setIsOpen(false)}
                  className={cvButton}
                >
                  {t.nav.resume} ↓
                </a>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;

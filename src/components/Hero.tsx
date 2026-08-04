import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import type { MotionValue } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Marquee from "./Marquee";
import RevealLines from "./RevealLines";
import { personalInfo } from "../data/portfolioData";
import { useI18n } from "../i18n/context";
import { CONTAINER } from "../lib/layout";
import { EASE } from "../lib/motion";
import { GHOST_BUTTON } from "../lib/styles";

/**
 * Parallax por capas atado al scroll.
 *
 * El multiplicador `k` es el que separa una capa de otra: el nombre sube mas
 * rapido que el parrafo, los metadatos bajan. El desplazamiento se congela
 * pasada vez y media la altura de la ventana —mas alla el Hero ya no se ve y
 * seguir calculando solo mueve pixeles fuera de pantalla.
 */
const useParallax = (scrollY: MotionValue<number>, k: number, enabled: boolean) =>
  useTransform(scrollY, (y) =>
    enabled ? Math.min(y, window.innerHeight * 1.3) * k : 0,
  );

/**
 * Cursor del terminal.
 *
 * El parpadeo es **irregular** a proposito: entre 380 y 640 ms encendido, entre
 * 520 y 860 apagado. Un `animation: blink 1s infinite` se reconoce al instante
 * como una animacion; esto se lee como alguien que esta escribiendo. Vive en su
 * propio componente para que el temporizador no repinte el Hero entero.
 */
const Caret = () => {
  const prefersReducedMotion = useReducedMotion();
  const [on, setOn] = useState(true);

  useEffect(() => {
    if (prefersReducedMotion) return;
    let timer: number;
    const blink = (visible: boolean) => {
      timer = window.setTimeout(
        () => {
          setOn(!visible);
          blink(!visible);
        },
        visible ? 380 + Math.random() * 260 : 520 + Math.random() * 340,
      );
    };
    blink(true);
    return () => window.clearTimeout(timer);
  }, [prefersReducedMotion]);

  return (
    <span aria-hidden="true" className={`text-accent ${on ? "" : "opacity-0"}`}>
      _
    </span>
  );
};

interface TypewriterProps {
  texts: string[];
}

/**
 * Rotacion de titulares con efecto de escritura.
 *
 * 78 ms por caracter al escribir, 38 al borrar y 1800 de pausa al completar la
 * frase. Se reinicia entero cuando cambia `texts`, que es lo que ocurre al
 * cambiar de idioma: seguir borrando en espanol una frase que ya esta en ingles
 * se ve mal.
 *
 * Con movimiento reducido no se programa ningun temporizador y se pinta el
 * primer titular completo: el contenido no se pierde, solo deja de moverse.
 */
const Typewriter = ({ texts }: TypewriterProps) => {
  const [{ index, sub, reverse }, setPhase] = useState({
    index: 0,
    sub: 0,
    reverse: false,
  });
  const prefersReducedMotion = useReducedMotion();

  // El reinicio al cambiar de idioma lo garantiza key={lang} en el padre, que
  // remonta el componente entero desde cero. Por eso aqui no hace falta ningun
  // efecto de reset: el remonte ya arranca con {index:0, sub:0, reverse:false}.
  useEffect(() => {
    if (prefersReducedMotion) return;

    // `noUncheckedIndexedAccess` obliga a comprobarlo, y ademas cubre el caso
    // de una lista vacia.
    const current = texts[index % texts.length];
    if (current === undefined) return;

    if (sub === current.length && !reverse) {
      const pause = window.setTimeout(
        () => setPhase((p) => ({ ...p, reverse: true })),
        1800,
      );
      return () => window.clearTimeout(pause);
    }

    if (sub === 0 && reverse) {
      setPhase({ index: (index + 1) % texts.length, sub: 0, reverse: false });
      return;
    }

    const step = window.setTimeout(
      () => setPhase((p) => ({ ...p, sub: p.sub + (p.reverse ? -1 : 1) })),
      reverse ? 38 : 78,
    );
    return () => window.clearTimeout(step);
  }, [texts, index, sub, reverse, prefersReducedMotion]);

  const first = texts[0] ?? "";
  if (prefersReducedMotion) return <span>{first}</span>;

  return (
    <span>
      {(texts[index % texts.length] ?? "").substring(0, sub)}
      <Caret />
    </span>
  );
};

const Hero = () => {
  const { t, pick, lang } = useI18n();
  const prefersReducedMotion = useReducedMotion();
  const motionOn = !prefersReducedMotion;

  const { scrollY } = useScroll();

  // Un multiplicador por capa. El signo decide si sube o baja con el scroll.
  const yGreeting = useParallax(scrollY, -0.03, motionOn);
  const yName = useParallax(scrollY, -0.14, motionOn);
  const yTyped = useParallax(scrollY, -0.08, motionOn);
  const yIntro = useParallax(scrollY, -0.05, motionOn);
  const yActions = useParallax(scrollY, -0.04, motionOn);
  const yMeta = useParallax(scrollY, 0.07, motionOn);
  const yGlowScroll = useParallax(scrollY, 0.24, motionOn);
  const yGridScroll = useParallax(scrollY, 0.08, motionOn);

  /*
    Reaccion al puntero. Los valores crudos van de -1 a 1 (posicion relativa al
    centro de la ventana) y pasan por un muelle antes de tocar el DOM: pegado al
    cursor se sentiria nervioso, y ese retraso es justo lo que lo hace parecer
    peso y no seguimiento.
  */
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const spring = { stiffness: 50, damping: 20, mass: 1 } as const;
  const px = useSpring(pointerX, spring);
  const py = useSpring(pointerY, spring);

  const nameX = useTransform(px, (v) => (motionOn ? v * 9 : 0));
  const nameRotate = useTransform(px, (v) => (motionOn ? v * 0.35 : 0));
  const glowX = useTransform(px, (v) => (motionOn ? v * -46 : 0));
  const glowY = useTransform([py, yGlowScroll], ([p, s]: number[]) =>
    motionOn ? (p ?? 0) * -32 + (s ?? 0) : 0,
  );
  const gridX = useTransform(px, (v) => (motionOn ? v * 14 : 0));
  const gridY = useTransform([py, yGridScroll], ([p, s]: number[]) =>
    motionOn ? (p ?? 0) * 10 + (s ?? 0) : 0,
  );

  useEffect(() => {
    if (!motionOn) return;
    const onMove = (event: globalThis.PointerEvent) => {
      pointerX.set((event.clientX / window.innerWidth - 0.5) * 2);
      pointerY.set((event.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [motionOn, pointerX, pointerY]);

  /*
    Iman del CTA: el boton se acerca al cursor mientras esta encima y vuelve a
    su sitio al salir. Dos transiciones distintas a proposito —casi instantanea
    al seguir, larga y frenada al volver—, que es lo que da la sensacion de
    goma. Se anima el MotionValue directamente para no repintar en cada pixel.
  */
  const magnetX = useMotionValue(0);
  const magnetY = useMotionValue(0);
  const magnetRef = useRef<HTMLAnchorElement>(null);

  const onMagnetMove = (event: ReactPointerEvent<HTMLAnchorElement>) => {
    if (!motionOn) return;
    const box = magnetRef.current?.getBoundingClientRect();
    if (!box) return;
    const follow = { duration: 0.12, ease: "linear" } as const;
    animate(magnetX, (event.clientX - (box.left + box.width / 2)) * 0.28, follow);
    animate(magnetY, (event.clientY - (box.top + box.height / 2)) * 0.34, follow);
  };

  const onMagnetLeave = () => {
    if (!motionOn) return;
    const back = { duration: 0.5, ease: EASE } as const;
    animate(magnetX, 0, back);
    animate(magnetY, 0, back);
  };

  const intro = pick(personalInfo.summary)[0] ?? "";

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col justify-end overflow-hidden bg-primary-bg pt-[140px]"
    >
      {/* Resplandor: deriva propia de 18s, mas parallax, mas puntero. */}
      <motion.div
        aria-hidden="true"
        style={{ x: glowX, y: glowY }}
        className="pointer-events-none absolute -top-[120px] -right-20 h-[520px] w-[520px]"
      >
        <div className="h-full w-full animate-drift rounded-full bg-accent/[0.16] blur-[130px]" />
      </motion.div>

      {/* Rejilla enmascarada. El degradado vive en .hero-grid (index.css). */}
      <motion.div
        aria-hidden="true"
        style={{ x: gridX, y: gridY }}
        className="hero-grid pointer-events-none absolute inset-x-0 -top-[60px] bottom-0 opacity-50"
      />

      <div className={`${CONTAINER} relative z-[2]`}>
        <div className="grid grid-cols-1 items-end gap-16 lg:grid-cols-[1fr_300px]">
          <div>
            {/* Saludo: la linea se dibuja, no aparece. */}
            <motion.div
              style={{ y: yGreeting }}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
              className="mb-9 flex items-center gap-4"
            >
              <motion.span
                aria-hidden="true"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.1, delay: 0.15, ease: EASE }}
                style={{ transformOrigin: "left" }}
                className="block h-px w-14 bg-accent"
              />
              <span className="text-xs uppercase tracking-[0.24em] text-text-secondary">
                {t.hero.greeting}
              </span>
            </motion.div>

            {/*
              El nombre en dos lineas. Cada una sube desde su propio recorte, y
              el punto final va en acento: es el unico signo de puntuacion del
              titular y hace de firma.
            */}
            <motion.h1
              style={{ y: yName, x: nameX, rotate: nameRotate }}
              className="text-[clamp(56px,8.6vw,128px)] font-bold leading-[0.9] tracking-[-0.055em] text-text-primary [transform-origin:left_center]"
            >
              <span className="block overflow-hidden pb-[0.02em]">
                <motion.span
                  className="block"
                  initial={{ y: "115%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.15, ease: EASE }}
                >
                  Noel
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-[0.02em]">
                <motion.span
                  className="block"
                  initial={{ y: "115%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.28, ease: EASE }}
                >
                  Ortiz<span className="text-accent">.</span>
                </motion.span>
              </span>
            </motion.h1>

            {/*
              Linea de terminal. El alto es fijo para que la rotacion de
              titulares no empuje el parrafo de abajo en cada letra.
            */}
            <motion.div
              style={{ y: yTyped }}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
              className="mt-8 flex h-[34px] items-baseline gap-3.5"
            >
              <span
                aria-hidden="true"
                className="text-[13px] tracking-[0.1em] text-muted"
              >
                ~$
              </span>
              <h2 className="text-[clamp(18px,2.2vw,26px)] font-medium text-text-secondary">
                {/*
                  key={lang}: al cambiar de idioma se remonta el Typewriter
                  desde cero, en vez de intentar reiniciar su estado interno
                  (que se quedaba borrando la frase anterior en el otro idioma).
                */}
                <Typewriter key={lang} texts={pick(personalInfo.titles)} />
              </h2>
            </motion.div>

            {/* Solo la entradilla; el resto del resumen vive en Sobre mi. */}
            <motion.div style={{ y: yIntro }}>
              <RevealLines
                text={intro}
                delay={0.6}
                className="mt-10 max-w-[640px] text-base font-light leading-[1.75] text-text-secondary [text-wrap:pretty]"
              />
            </motion.div>

            <motion.div
              style={{ y: yActions }}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
              className="mt-11 flex items-center gap-7"
            >
              <motion.a
                ref={magnetRef}
                href="#contact"
                onPointerMove={onMagnetMove}
                onPointerLeave={onMagnetLeave}
                style={{ x: magnetX, y: magnetY }}
                className={`${GHOST_BUTTON} rounded-sm border border-accent px-[26px] py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-accent`}
              >
                {t.hero.cta}
              </motion.a>
              <div className="flex items-center gap-5">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`GitHub de ${personalInfo.name}`}
                  className="inline-block text-text-secondary transition-all duration-[350ms] ease-editorial hover:-translate-y-[3px] hover:text-accent"
                >
                  <FaGithub size={20} />
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`LinkedIn de ${personalInfo.name}`}
                  className="inline-block text-text-secondary transition-all duration-[350ms] ease-editorial hover:-translate-y-[3px] hover:text-accent"
                >
                  <FaLinkedin size={20} />
                </a>
              </div>
            </motion.div>
          </div>

          {/*
            Metadatos. Es un <dl> de verdad y no tres parejas de <p>: son pares
            termino-definicion, y asi un lector de pantalla los anuncia como
            tales en vez de leer seis lineas sueltas.
          */}
          <motion.dl
            style={{ y: yMeta }}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: EASE }}
            className="flex flex-col gap-[22px] border-l border-line2 pl-6"
          >
            <div>
              <dt className="text-[10px] uppercase tracking-[0.2em] text-muted">
                {t.hero.metaBase}
              </dt>
              <dd className="mt-1.5 text-sm text-text-primary">
                {personalInfo.location}
              </dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-[0.2em] text-muted">
                {t.hero.metaFocus}
              </dt>
              <dd className="mt-1.5 text-sm text-text-primary">
                {t.hero.metaFocusValue}
              </dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-[0.2em] text-muted">
                {t.hero.metaStatus}
              </dt>
              <dd className="mt-1.5 flex items-center gap-[9px] text-sm text-text-primary">
                <span
                  aria-hidden="true"
                  className="block h-[7px] w-[7px] animate-dot-pulse rounded-full bg-accent"
                />
                {t.hero.metaStatusValue}
              </dd>
            </div>
          </motion.dl>
        </div>
      </div>

      <Marquee />
    </section>
  );
};

export default Hero;

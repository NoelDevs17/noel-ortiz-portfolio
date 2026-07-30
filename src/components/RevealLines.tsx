import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE, VIEWPORT } from "../lib/motion";

interface RevealLinesProps {
  /** Parrafo completo. Se parte solo; no admite marcado dentro. */
  text: string;
  className?: string;
  /**
   * Retardo antes de la primera linea, en segundos. Solo lo usa el Hero, para
   * encajar el parrafo en la coreografia de entrada del resto de la columna.
   */
  delay?: number;
}

interface Measured {
  /** Texto del que salieron estas lineas: si cambia, hay que volver a medir. */
  text: string;
  lines: string[];
  /** Falso cuando se remide por un cambio de ancho o de fuente. */
  animate: boolean;
}

/** Palabras del parrafo, sin espacios vacios. */
const splitWords = (text: string) => text.trim().split(/\s+/).filter(Boolean);

/**
 * Revelado por lineas.
 *
 * Cada linea del parrafo sube desde su propio recorte, escalonadas. Es la
 * diferencia entre un fundido generico y un revelado editorial, y no se puede
 * hacer con CSS: donde rompe cada linea depende del ancho renderizado, la
 * fuente y el idioma, asi que hay que medirlo.
 *
 * Funciona en dos pasadas. La primera pinta cada palabra en un `inline-block`
 * y lee su `offsetTop` real; las palabras que comparten posicion vertical son
 * una linea. La segunda rehace el marcado como bloques recortados y los anima.
 * La medicion va en `useLayoutEffect`, antes del primer pintado, asi que la
 * pasada de palabras nunca llega a verse.
 *
 * Tres cosas que parecen detalles y no lo son:
 *
 * 1. El texto integro se guarda en `data-plain`. Al partirlo, el DOM queda
 *    troceado en spans y un rastreador leeria fragmentos sueltos; el atributo
 *    conserva la frase entera.
 * 2. El estado oculto solo existe *despues* de medir, y siempre con un
 *    `whileInView` que garantiza el estado final. Mientras no se ha medido, el
 *    parrafo esta visible y completo: si algo fallara, el peor resultado es un
 *    parrafo sin animar, nunca un hueco en blanco.
 * 3. Se vuelve a medir al cambiar el idioma (texto nuevo), el ancho o la fuente
 *    —una fuente que carga tarde mueve todos los cortes—, pero solo el cambio
 *    de idioma vuelve a animar: reanimar al redimensionar la ventana seria un
 *    parpadeo sin motivo.
 */
const RevealLines = ({ text, className = "", delay = 0 }: RevealLinesProps) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [measured, setMeasured] = useState<Measured | null>(null);

  /** Si la proxima medicion debe animar. Ver la nota 3 de arriba. */
  const animateNext = useRef(true);

  // Texto nuevo (cambio de idioma): se descarta el corte anterior en el mismo
  // render, sin pasar por un efecto. Es el patron de estado derivado de React y
  // no puede ciclar: tras el `setMeasured(null)` ya no hay medicion que sobre.
  if (measured && measured.text !== text) {
    animateNext.current = true;
    setMeasured(null);
  }

  useLayoutEffect(() => {
    if (prefersReducedMotion || measured) return;
    const el = ref.current;
    if (!el) return;

    const words = Array.from(el.querySelectorAll<HTMLElement>("[data-word]"));
    if (!words.length) return;

    const lines: string[][] = [];
    let top: number | null = null;
    for (const word of words) {
      const y = Math.round(word.offsetTop);
      if (top === null || y !== top) {
        lines.push([]);
        top = y;
      }
      lines[lines.length - 1]?.push(word.textContent ?? "");
    }

    setMeasured({
      text,
      lines: lines.map((line) => line.join(" ")),
      animate: animateNext.current,
    });
    animateNext.current = false;
  }, [text, measured, prefersReducedMotion]);

  // Cambio de ancho: los cortes de linea dejan de valer.
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion) return;

    let ancho = el.clientWidth;
    const observer = new ResizeObserver(() => {
      // Solo el ancho. La altura cambia sola al pasar de palabras a lineas, y
      // reaccionar a eso seria un bucle.
      if (el.clientWidth === ancho) return;
      ancho = el.clientWidth;
      animateNext.current = false;
      setMeasured(null);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  // Fuente que carga tarde: el primer corte se hizo con la de respaldo.
  useEffect(() => {
    if (prefersReducedMotion || document.fonts.status === "loaded") return;
    let vivo = true;
    void document.fonts.ready.then(() => {
      if (!vivo) return;
      animateNext.current = false;
      setMeasured(null);
    });
    return () => {
      vivo = false;
    };
  }, [prefersReducedMotion]);

  // Sin movimiento: el parrafo tal cual, sin partir ni animar.
  if (prefersReducedMotion) {
    return (
      <p ref={ref} className={className} data-plain={text}>
        {text}
      </p>
    );
  }

  // Primera pasada: palabras medibles, ya visibles. Los espacios van fuera de
  // los spans para que el salto de linea se calcule como en un parrafo normal.
  if (!measured) {
    return (
      <p ref={ref} className={className} data-plain={text}>
        {splitWords(text).map((word, index) => (
          <Fragment key={index}>
            {index > 0 ? " " : null}
            <span data-word="" className="inline-block">
              {word}
            </span>
          </Fragment>
        ))}
      </p>
    );
  }

  return (
    <p ref={ref} className={className} data-plain={text}>
      {measured.lines.map((line, index) => (
        // El recorte necesita algo de aire abajo o las colas de las "g" y las
        // "p" quedan cortadas.
        <span key={index} className="block overflow-hidden pb-[0.06em]">
          <motion.span
            className="block"
            data-reveal=""
            initial={measured.animate ? { y: "110%", opacity: 0 } : false}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={VIEWPORT}
            transition={{
              duration: 0.75,
              ease: EASE,
              delay: delay + index * 0.04,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </p>
  );
};

export default RevealLines;

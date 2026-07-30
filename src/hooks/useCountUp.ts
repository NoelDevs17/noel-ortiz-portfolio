import { useLayoutEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/** Duracion del conteo. Mas corto no se lee; mas largo se hace esperar. */
const DURATION = 1400;

/**
 * Cuenta una cifra desde cero cuando entra en pantalla.
 *
 * El valor llega como texto ("4+", "11") y el sufijo no numerico se conserva
 * durante todo el recorrido: la cifra crece pero el "+" ya esta puesto desde el
 * primer fotograma, asi que el ancho no da tirones. El frenado es
 * `1 - (1-p)^4`: arranca deprisa y se posa en el numero final en vez de
 * detenerse en seco.
 *
 * Dos decisiones deliberadas sobre robustez:
 *
 * - El estado inicial es el valor FINAL, no un cero. Quien no vea la animacion
 *   —movimiento reducido, JavaScript a medias, un rastreador— lee la cifra
 *   correcta. El cero solo se escribe justo antes de empezar a contar.
 * - Ese cero se escribe en `useLayoutEffect`, antes del pintado, para que la
 *   cifra final no llegue a verse ni un fotograma.
 *
 * Requiere `tabular-nums` en quien lo pinte, o los digitos bailan de ancho.
 */
export function useCountUp(value: string) {
  const ref = useRef<HTMLParagraphElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [text, setText] = useState(value);

  useLayoutEffect(() => {
    if (prefersReducedMotion) return;
    const el = ref.current;
    if (!el) return;

    const target = parseInt(value, 10);
    if (Number.isNaN(target)) return;
    const suffix = value.replace(/[0-9]/g, "");

    let frame = 0;
    let started = false;

    /*
      Red de seguridad. En un documento que no compone fotogramas fallan las dos
      piezas de las que depende el conteo: `requestAnimationFrame` no corre y el
      `IntersectionObserver` tampoco entrega, asi que la cifra se quedaria en
      cero. Los temporizadores si corren pase lo que pase, de modo que se arma
      uno al montar —cubre que el observador no llegue nunca— y se rearma al
      empezar a contar —cubre que sea el rAF el que no avance—.

      Una cifra sin animar es un detalle; una cifra equivocada, un error.
    */
    let safety = window.setTimeout(() => {
      if (!started) setText(value);
    }, DURATION + 600);

    const run = () => {
      started = true;
      window.clearTimeout(safety);
      safety = window.setTimeout(() => setText(value), DURATION + 600);

      const t0 = performance.now();
      const step = (now: number) => {
        const p = Math.min(1, (now - t0) / DURATION);
        setText(Math.round(target * (1 - Math.pow(1 - p, 4))) + suffix);
        if (p < 1) frame = requestAnimationFrame(step);
        else window.clearTimeout(safety);
      };
      frame = requestAnimationFrame(step);
    };

    setText("0" + suffix);

    // Si ya esta a la vista se cuenta sin esperar a nadie. El observador solo
    // hace falta para lo que todavia esta por debajo del pliegue.
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        run();
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    if (el.getBoundingClientRect().top < window.innerHeight) run();
    else observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.clearTimeout(safety);
    };
  }, [value, prefersReducedMotion]);

  return { ref, text };
}

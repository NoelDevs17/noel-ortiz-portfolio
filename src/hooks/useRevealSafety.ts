import { useEffect } from "react";

/** Clase que fuerza el estado final de todo lo que se revela. Ver index.css. */
const FROZEN_CLASS = "motion-frozen";

/** Cada cuanto se comprueba si la linea de tiempo avanza. */
const SAMPLE = 300;

/** Cuanto se espera antes de rendirse y pintar el estado final. */
const GIVE_UP = 2000;

/**
 * Red de seguridad del revelado al scroll.
 *
 * El problema, en corto: hay contextos donde el documento nunca compone
 * fotogramas —una previsualizacion embebida, un iframe oculto, una pestana que
 * se abre en segundo plano—. Ahi `requestAnimationFrame` no corre y, lo que es
 * peor, **`IntersectionObserver` tampoco entrega**, porque el calculo de
 * interseccion cuelga del mismo paso de renderizado. Todo lo que dependa de
 * `whileInView` se queda en opacidad 0 para siempre: la pagina existe en el DOM
 * pero esta en blanco.
 *
 * La deteccion no es adivinar el entorno, es medirlo: `document.timeline`
 * avanza solo cuando el navegador compone, mientras que `performance.now()` y
 * los temporizadores siguen corriendo pase lo que pase. Si a los dos segundos la
 * linea de tiempo sigue clavada, no va a arrancar.
 *
 * Se espera esos dos segundos en vez de decidirlo al primer intento a proposito:
 * una pestana abierta en segundo plano descongela en cuanto se mira, y en ese
 * caso conviene dejarla animar en lugar de darle el estado final de entrada.
 *
 * Cuando se rinde, marca `<html>` y de eso se encarga una regla de CSS con
 * `!important`, que gana a los estilos en linea que escribe framer-motion. No
 * vale con asignar `style.opacity`: hay que ganarle a la animacion, no
 * discutirle.
 */
export function useRevealSafety() {
  useEffect(() => {
    const root = document.documentElement;
    let previous = document.timeline.currentTime;
    let waited = 0;

    const id = window.setInterval(() => {
      const now = document.timeline.currentTime;
      // Avanza: el navegador compone y el revelado normal funciona.
      if (now !== previous) {
        window.clearInterval(id);
        return;
      }
      previous = now;
      waited += SAMPLE;
      if (waited < GIVE_UP) return;

      window.clearInterval(id);
      root.classList.add(FROZEN_CLASS);
    }, SAMPLE);

    return () => window.clearInterval(id);
  }, []);
}

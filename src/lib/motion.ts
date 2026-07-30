import type { Transition, Variants } from "framer-motion";

/**
 * La curva del sitio.
 *
 * Sale disparada y frena muy largo. Se usa en todo —entradas, hovers,
 * marquesina, transicion de tema— porque un movimiento con una sola curva se
 * lee como un sistema y no como una coleccion de efectos.
 *
 * Su gemela en CSS es la utilidad `ease-editorial` de `tailwind.config.js`.
 */
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * Umbral de disparo del revelado al scroll.
 *
 * El diseno pide que un elemento se anime cuando su borde superior entra en el
 * 92% de la altura de la ventana, es decir, un poco antes de tocar el borde
 * inferior. En framer-motion eso es un margen negativo del 8% por abajo.
 *
 * `once` es deliberado: repetir la entrada cada vez que algo vuelve a pasar por
 * pantalla convierte el scroll de vuelta en un parpadeo.
 */
export const VIEWPORT = { once: true, margin: "0px 0px -8% 0px" } as const;

/** Entrada generica: sube 18px y aparece. */
export const RISE: Variants = {
  hidden: { opacity: 0, y: 18 },
  shown: { opacity: 1, y: 0 },
};

/**
 * Escalonado del revelado generico.
 *
 * El retardo se reinicia cada seis elementos: en una lista de once
 * certificaciones un escalonado corrido dejaria la ultima esperando casi un
 * segundo despues de ser visible.
 */
export function riseTransition(index = 0): Transition {
  return { duration: 0.7, ease: EASE, delay: (index % 6) * 0.07 };
}

/**
 * Props de entrada al scroll, listas para esparcir sobre cualquier `motion.*`.
 *
 * Se devuelven como objeto en lugar de envolverlo todo en un `<Reveal>` porque
 * los elementos que se revelan son de siete etiquetas distintas —article, li,
 * p, dl, div— y la semantica importa: un envoltorio generico obligaria a
 * anadir un `<div>` dentro de cada `<ul>`.
 *
 * `whileInView` (y no `animate` con estado propio) es lo que garantiza el
 * estado final: el elemento nunca se queda en "oculto" a la espera de un
 * temporizador que quiza no llegue a correr.
 */
export function rise(index = 0) {
  return {
    variants: RISE,
    initial: "hidden",
    whileInView: "shown",
    viewport: VIEWPORT,
    transition: riseTransition(index),
    // Marca para la red de seguridad: si el documento no compone fotogramas,
    // `whileInView` no llega a dispararse nunca. Ver `useRevealSafety`.
    "data-reveal": "",
  } as const;
}

/**
 * Regla de seccion: se dibuja de izquierda a derecha en vez de aparecer.
 *
 * Va en su propio helper porque el `transform-origin` es la mitad del efecto y
 * es justo lo que se olvida al copiarlo.
 */
export const DRAW_RULE = {
  initial: { scaleX: 0 },
  whileInView: { scaleX: 1 },
  viewport: VIEWPORT,
  transition: { duration: 0.9, ease: EASE },
  style: { transformOrigin: "left" },
  "data-reveal": "",
} as const;

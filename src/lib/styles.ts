/**
 * Cadenas de clases que se repiten en varias secciones.
 *
 * Viven en un modulo `.ts` y no en `@layer components` de `index.css` por una
 * razon practica: Tailwind escanea estos archivos, asi que las clases se
 * generan igual, pero siguen siendo utilidades componibles —una llamada puede
 * anadir `w-full` o cambiar el `padding` sin pelearse con la especificidad de
 * una clase propia.
 *
 * Condicion para que funcione: las clases tienen que aparecer literales. Nada
 * de construirlas concatenando trozos.
 */

/**
 * Boton fantasma.
 *
 * En reposo es solo un borde. Al pasar el cursor, un panel de acento sube desde
 * abajo y ocupa el boton, y el texto se invierte al color del fondo. El panel
 * es un `::after` en z-index negativo dentro del propio boton, que crea
 * contexto de apilamiento con `z-0`: asi queda por detras del texto y por
 * delante del fondo, sin necesidad de un elemento extra en el marcado.
 */
export const GHOST_BUTTON =
  "relative z-0 overflow-hidden transition-colors duration-300 ease-editorial " +
  "after:absolute after:inset-0 after:-z-10 after:bg-accent after:content-[''] " +
  "after:translate-y-full after:transition-transform after:duration-[400ms] after:ease-editorial " +
  "hover:border-accent hover:text-primary-bg hover:after:translate-y-0";

/** Etiqueta pequena en versalitas: el rotulo por defecto del rediseno. */
export const LABEL = "text-[11px] uppercase tracking-[0.2em] text-muted";

/**
 * Boton de tarjeta de proyecto, en su version inactiva.
 *
 * Borde punteado y texto apagado. El punteado no es decoracion: distingue "este
 * enlace todavia no existe" de "este proyecto no tiene repositorio", que es lo
 * que comunicaria esconder el boton.
 */
export const PENDING_BUTTON =
  "inline-flex items-center gap-2.5 whitespace-nowrap rounded-sm border border-dashed " +
  "border-line2 px-4 py-2.5 text-xs uppercase tracking-[0.1em] text-muted";

/** Boton de tarjeta de proyecto, activo. El color lo pone quien lo usa. */
export const CARD_BUTTON =
  "inline-flex items-center gap-2.5 whitespace-nowrap rounded-sm border px-4 py-2.5 " +
  "text-xs uppercase tracking-[0.1em]";

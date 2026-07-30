/**
 * Geometria compartida del rediseno.
 *
 * Son cadenas de clases y no un componente envoltorio porque el contenedor
 * aparece dentro de secciones que ademas llevan capas de fondo, resplandores y
 * z-index propios: un `<Container>` obligaria a inventar props para cada uno de
 * esos casos. Una constante se compone con `clsx`-de-plantilla y ya.
 *
 * Tailwind escanea el codigo fuente en busca de nombres de clase literales, asi
 * que estas cadenas tienen que quedarse completas y sin interpolar.
 */

/**
 * Contenedor de pagina: 1280px centrados con 40px de aire a los lados.
 *
 * En movil 40px se comen la pantalla, asi que arranca en 24px y sube al valor
 * de diseno a partir de `sm`. `w-full` no es decorativo: dentro de un padre
 * flex —el Hero lo es— un hijo con solo `max-width` se encoge al contenido y el
 * titular pierde la alineacion con el resto de secciones.
 */
export const CONTAINER = "mx-auto w-full max-w-[1280px] px-6 sm:px-10";

/** Ritmo vertical de seccion: 140px arriba y abajo, reducido en movil. */
export const SECTION_PADDING = "py-24 sm:py-[140px]";

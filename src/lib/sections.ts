import { hasProjects } from "../data/portfolioData";

/** Secciones numeradas, en el orden en que aparecen en la pagina. */
const ORDER = [
  "about",
  "skills",
  "projects",
  "experience",
  "contact",
] as const;

export type SectionId = (typeof ORDER)[number];

/**
 * Las secciones que realmente se publican.
 *
 * Proyectos desaparece mientras no haya contenido real, y con el desaparece su
 * numero: la numeracion se calcula sobre esta lista, no sobre la de arriba. Si
 * no, el indice iria 01, 02, 04, 05 y el hueco se leeria como un fallo y no
 * como una seccion ausente. En cuanto se anada el primer proyecto, todo vuelve
 * a su sitio solo.
 */
export const SECTIONS: readonly SectionId[] = ORDER.filter(
  (id) => id !== "projects" || hasProjects,
);

/**
 * Numero de dos digitos de una seccion, el mismo que muestran su cabecera y su
 * enlace en la navegacion. Devuelve "" para una seccion no publicada.
 */
export function sectionNumber(id: SectionId): string {
  const position = SECTIONS.indexOf(id);
  return position < 0 ? "" : String(position + 1).padStart(2, "0");
}

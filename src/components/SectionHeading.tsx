import { motion } from "framer-motion";
import { DRAW_RULE, rise } from "../lib/motion";
import { sectionNumber } from "../lib/sections";
import type { SectionId } from "../lib/sections";

interface SectionHeadingProps {
  /**
   * Seccion a la que encabeza. De aqui sale su numero, calculado sobre las
   * secciones publicadas: nadie escribe "03" a mano, asi que ocultar Proyectos
   * no deja un hueco en la numeracion.
   */
  section: SectionId;
  title: string;
  /** Ancla del `aria-labelledby` de la seccion que lo contiene. */
  id?: string;
  /** Aire bajo la regla. Cada seccion pide el suyo. */
  className?: string;
}

/**
 * Cabecera de seccion: numero, titulo y una regla que se dibuja.
 *
 * Sustituye al antiguo `SectionTitle`, que centraba el titulo y lo repetia
 * detras en gris como marca de agua. Aqui el peso lo lleva la numeracion —la
 * misma que aparece en el nav— y la regla, que ata el titulo al ancho de la
 * columna en vez de dejarlo flotando.
 */
const SectionHeading = ({
  section,
  title,
  id,
  className = "",
}: SectionHeadingProps) => (
  <div className={className}>
    <motion.div {...rise()} className="flex items-baseline gap-3.5">
      <span aria-hidden="true" className="text-[11px] tracking-[0.2em] text-accent">
        {sectionNumber(section)}
      </span>
      <h2
        id={id}
        className="text-[26px] font-bold tracking-[-0.02em] text-text-primary"
      >
        {title}
      </h2>
    </motion.div>
    <motion.div
      {...DRAW_RULE}
      aria-hidden="true"
      className="mt-3 h-px w-full bg-line"
    />
  </div>
);

export default SectionHeading;

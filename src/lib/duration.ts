/**
 * Lectura de los rangos de fechas del modelo.
 *
 * En `portfolioData.ts` las duraciones se escriben "MM/AAAA - MM/AAAA", y las
 * que siguen abiertas terminan en "Present". Ese literal ingles esta ahi por
 * herencia del portafolio anterior; el rediseno necesita mostrar el inicio y el
 * fin por separado y traducir el extremo abierto, asi que se interpreta aqui en
 * vez de duplicar los datos con campos `from` / `to`.
 *
 * Se separa por el guion rodeado de espacios, no por el guion a secas: hay
 * titulos de certificacion con guiones dentro.
 */

const SEPARADOR = /\s+-\s+/;
const ABIERTO = /^(present|actualidad)$/i;

export interface DateRange {
  /** Extremo inicial, tal cual figura en los datos. */
  from: string;
  /** Extremo final, ya traducido si el rango sigue abierto. Vacio si no hay. */
  to: string;
  /** El rango no ha terminado. */
  ongoing: boolean;
  /** Los dos extremos unidos con raya, listos para pintar en una linea. */
  text: string;
}

/**
 * @param duration Rango tal cual esta en el modelo.
 * @param presentLabel Rotulo del extremo abierto en el idioma activo.
 */
export function parseRange(duration: string, presentLabel: string): DateRange {
  const [rawFrom = "", rawTo = ""] = duration.trim().split(SEPARADOR, 2);
  const ongoing = ABIERTO.test(rawTo);
  const to = ongoing ? presentLabel : rawTo;

  return {
    from: rawFrom,
    to,
    ongoing,
    // La raya larga es la del diseno; el guion corto del modelo es solo el
    // separador que usa el dato.
    text: to ? `${rawFrom} — ${to}` : rawFrom,
  };
}

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import RevealLines from "./RevealLines";
import {
  education,
  languages,
  personalInfo,
  stats,
} from "../data/portfolioData";
import { useCountUp } from "../hooks/useCountUp";
import { useI18n } from "../i18n/context";
import { parseRange } from "../lib/duration";
import { CONTAINER, SECTION_PADDING } from "../lib/layout";
import { rise } from "../lib/motion";
import type { Stat } from "../data/portfolioData";

interface StatCellProps {
  stat: Stat;
  index: number;
}

const StatCell = ({ stat, index }: StatCellProps) => {
  const { pick } = useI18n();
  const { ref, text } = useCountUp(stat.value);

  return (
    <motion.div {...rise(index)} className="bg-primary-bg px-6 py-[26px]">
      <p
        ref={ref}
        className="text-[38px] font-bold tracking-[-0.04em] text-text-primary [font-variant-numeric:tabular-nums]"
      >
        {text}
      </p>
      <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-muted">
        {pick(stat.label)}
      </p>
    </motion.div>
  );
};

const About = () => {
  const { t, pick } = useI18n();
  // La entradilla ya la muestra el Hero: aqui empieza el resto del resumen.
  const paragraphs = pick(personalInfo.summary).slice(1);

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className={`border-b border-line2 bg-primary-bg ${SECTION_PADDING}`}
    >
      <div className={CONTAINER}>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[300px_1fr] lg:gap-20">
          {/*
            Columna fija. Se queda a la altura de los ojos mientras el resumen
            pasa por delante: el titulo de la seccion nunca se pierde de vista,
            que es lo que sostiene una lectura larga.
          */}
          <div>
            <div className="lg:sticky lg:top-[120px]">
              <SectionHeading
                section="about"
                title={t.about.title}
                id="about-title"
              />
              <motion.p
                {...rise()}
                className="mt-[22px] text-sm font-light leading-[1.7] text-text-secondary"
              >
                {pick(personalInfo.specialty)}
              </motion.p>
            </div>
          </div>

          <div>
            {paragraphs.map((paragraph, index) => (
              // key por indice, no por texto: al cambiar de idioma el parrafo
              // debe persistir (no remontar) para que RevealLines lo remida sin
              // volver a esconderlo. Ver la nota larga de RevealLines.
              <RevealLines
                key={index}
                text={paragraph}
                className="mb-[26px] text-[17px] font-light leading-[1.8] text-text-secondary [text-wrap:pretty]"
              />
            ))}

            {/*
              Rejilla de cifras. Los filetes que separan las celdas son el
              propio `gap` de 1px sobre un fondo de color: asi los divisores
              caen exactamente donde toca sin un solo borde declarado, y no se
              duplican en los cruces.
            */}
            <div className="mt-14 grid grid-cols-1 gap-px border border-line2 bg-line2 sm:grid-cols-3">
              {stats.map((stat, index) => (
                <StatCell key={stat.value + index} stat={stat} index={index} />
              ))}
            </div>

            <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2">
              <motion.div {...rise()}>
                <h3 className="mb-[18px] text-[11px] uppercase tracking-[0.2em] text-muted">
                  {t.about.education}
                </h3>
                {education.map((entry) => {
                  const range = parseRange(entry.duration, t.experience.present);
                  return (
                    <div
                      key={entry.institution}
                      className="border-t border-line2 py-3.5"
                    >
                      <p className="text-[15px] font-medium text-text-primary">
                        {pick(entry.degree)}
                      </p>
                      <p className="mt-[5px] text-[13px] text-text-secondary">
                        {entry.institution}
                      </p>
                      {/*
                        Un rango abierto ya dice "en curso": repetir el estado
                        detras seria decir dos veces lo mismo.
                      */}
                      <p className="mt-[5px] text-xs text-muted">
                        {range.ongoing
                          ? range.text
                          : `${range.text} · ${pick(entry.status)}`}
                      </p>
                    </div>
                  );
                })}
              </motion.div>

              <motion.div {...rise(1)}>
                <h3 className="mb-[18px] text-[11px] uppercase tracking-[0.2em] text-muted">
                  {t.about.languages}
                </h3>
                {pick(languages).map((language) => (
                  <div
                    key={language.name}
                    className="border-t border-line2 py-3.5"
                  >
                    <p className="text-[15px] font-medium text-text-primary">
                      {language.name}
                    </p>
                    <p className="mt-[5px] text-[13px] text-text-secondary">
                      {language.level}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

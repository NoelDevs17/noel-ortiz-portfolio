import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { certifications, experience } from "../data/portfolioData";
import { useI18n } from "../i18n/context";
import { parseRange } from "../lib/duration";
import { CONTAINER, SECTION_PADDING } from "../lib/layout";
import { rise } from "../lib/motion";

/**
 * Trayectoria.
 *
 * Un riel vertical con un punto por empleo, y las certificaciones numeradas al
 * pie. El riel **se dibuja en proporcion al scroll de la seccion**, no de golpe
 * al entrar: la linea avanza al mismo ritmo que la lectura, asi que marca por
 * donde vas y no solo que la seccion existe.
 */
const Experience = () => {
  const { t, pick } = useI18n();
  const railScope = useRef<HTMLDivElement>(null);

  // El riel arranca cuando el bloque toca el 85% de la ventana y se completa
  // cuando su final llega al 65%: termina de dibujarse antes de salir por
  // arriba, no justo al desaparecer.
  const { scrollYProgress } = useScroll({
    target: railScope,
    offset: ["start 0.85", "end 0.65"],
  });

  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className={`border-b border-line2 bg-primary-bg ${SECTION_PADDING}`}
    >
      <div className={CONTAINER}>
        <SectionHeading
          section="experience"
          title={t.experience.title}
          id="experience-title"
          className="mb-14"
        />

        <div ref={railScope} className="relative">
          {/*
            El riel se esconde en movil: alli la rejilla de dos columnas colapsa
            y la linea se quedaria flotando lejos de los puntos que ata.
          */}
          <motion.div
            aria-hidden="true"
            // Sin fotogramas el progreso se queda en 0 y el riel no existiria:
            // la red de seguridad lo devuelve a su largo completo.
            data-reveal=""
            style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
            className="absolute left-[139px] top-2 bottom-2 hidden w-px bg-line lg:block"
          />

          <div className="flex flex-col gap-2">
            {experience.map((job, index) => {
              const range = parseRange(job.duration, t.experience.present);
              return (
                <motion.article
                  key={job.organization}
                  {...rise(index)}
                  className="group grid grid-cols-1 gap-4 py-7 pr-0 transition-[background-color] duration-[350ms] ease-editorial hover:bg-veil lg:grid-cols-[140px_1fr] lg:gap-12 lg:pr-6"
                >
                  <div>
                    <p className="text-xs tracking-[0.1em] text-text-secondary">
                      {range.from}
                    </p>
                    <p className="mt-1 text-xs tracking-[0.1em] text-muted">
                      {range.to}
                    </p>
                  </div>

                  <div className="relative">
                    <span
                      aria-hidden="true"
                      className="absolute -left-[49px] top-[9px] hidden h-[9px] w-[9px] rounded-full bg-line transition-colors duration-[350ms] group-hover:bg-accent lg:block"
                    />
                    <h3 className="text-[21px] font-bold tracking-[-0.02em] text-text-primary transition-colors duration-300 group-hover:text-accent">
                      {pick(job.role)}
                    </h3>
                    <p className="mb-5 mt-2 text-[13px] text-accent">
                      {job.organization}
                    </p>
                    <ul className="flex max-w-[760px] flex-col gap-2.5">
                      {pick(job.points).map((point, i) => (
                        <li
                          key={i}
                          className="grid grid-cols-[18px_1fr] text-sm font-light leading-[1.7] text-text-secondary"
                        >
                          <span aria-hidden="true" className="text-muted">
                            —
                          </span>
                          <span className="[text-wrap:pretty]">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        <div className="mt-24">
          <motion.div
            {...rise()}
            className="mb-2 flex items-baseline justify-between"
          >
            <h3 className="text-[11px] uppercase tracking-[0.2em] text-muted">
              {t.experience.certifications}
            </h3>
            <p
              aria-hidden="true"
              className="text-[11px] tracking-[0.2em] text-muted"
            >
              {String(certifications.length).padStart(2, "0")}
            </p>
          </motion.div>

          <ul>
            {certifications.map((cert, index) => (
              <motion.li
                key={cert.title}
                {...rise(index)}
                /*
                  Al pasar el cursor la fila entera se desplaza 14px a la
                  derecha. Es el mismo gesto de pasar el dedo por un indice: no
                  destaca la fila, senala donde estas.
                */
                className="group grid grid-cols-[44px_1fr] items-baseline gap-5 border-t border-line2 py-3.5 transition-[background-color,padding-left] duration-300 ease-editorial hover:bg-veil hover:pl-3.5"
              >
                <span
                  aria-hidden="true"
                  className="text-[11px] tracking-[0.1em] text-muted transition-colors duration-300 group-hover:text-accent"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-sm font-light leading-[1.6] text-text-primary">
                  {cert.title}
                  {cert.institution && (
                    <span className="text-muted"> · {cert.institution}</span>
                  )}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Experience;

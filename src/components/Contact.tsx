import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { personalInfo } from "../data/portfolioData";
import { useI18n } from "../i18n/context";
import { CONTAINER } from "../lib/layout";
import { rise } from "../lib/motion";

/**
 * Contacto.
 *
 * El email **es** el titular. No hay boton de "escríbeme" ni formulario: la
 * accion es la direccion, escrita al tamano de un titulo, con un subrayado de
 * acento que se dibuja de izquierda a derecha al pasar el cursor.
 */
const Contact = () => {
  const { t } = useI18n();

  const arrowLink =
    "group flex items-center justify-between border-b border-line2 py-2 text-[13px] text-text-secondary transition-colors hover:text-text-primary";

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative overflow-hidden bg-secondary-bg pb-24 pt-24 sm:pb-[120px] sm:pt-40"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[200px] left-1/2 h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-accent/10 blur-[150px]"
      />

      <div className={`${CONTAINER} relative z-[2]`}>
        <SectionHeading
          section="contact"
          title={t.contact.title}
          id="contact-title"
          className="mb-16"
        />

        <div className="grid grid-cols-1 items-end gap-12 lg:grid-cols-[1fr_300px] lg:gap-20">
          <div>
            <motion.p
              {...rise()}
              className="mb-7 max-w-[620px] text-lg font-light leading-[1.75] text-text-secondary [text-wrap:pretty]"
            >
              {t.contact.body}
            </motion.p>
            <motion.a
              {...rise(1)}
              href={`mailto:${personalInfo.email}`}
              className="group relative inline-block break-all text-[clamp(26px,4vw,54px)] font-bold tracking-[-0.045em] text-text-primary"
            >
              {personalInfo.email}
              <span
                aria-hidden="true"
                className="absolute bottom-[0.08em] left-0 h-0.5 w-full origin-left scale-x-0 bg-accent transition-transform duration-500 ease-editorial group-hover:scale-x-100"
              />
            </motion.a>
          </div>

          <motion.div
            {...rise(2)}
            className="flex flex-col gap-4 border-l border-line2 pl-6"
          >
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              className={arrowLink}
            >
              LinkedIn
              <span
                aria-hidden="true"
                className="inline-block text-accent transition-transform duration-[350ms] ease-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                ↗
              </span>
            </a>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              className={arrowLink}
            >
              GitHub
              <span
                aria-hidden="true"
                className="inline-block text-accent transition-transform duration-[350ms] ease-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                ↗
              </span>
            </a>
            <a
              href={personalInfo.resumeLink}
              download
              target="_blank"
              rel="noopener"
              aria-label={`${t.contact.cvLabel} — ${t.nav.resumeAria}`}
              className={arrowLink}
            >
              {t.contact.cvLabel}
              <span aria-hidden="true" className="text-accent">
                ↓
              </span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

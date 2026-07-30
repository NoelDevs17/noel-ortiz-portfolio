import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { skillGroups } from "../data/portfolioData";
import { useI18n } from "../i18n/context";
import { CONTAINER, SECTION_PADDING } from "../lib/layout";
import { rise } from "../lib/motion";

/**
 * Stack.
 *
 * Cada categoria es una **fila de tabla**, no una tarjeta: el nombre a la
 * izquierda y las tecnologias a la derecha, separadas por un filete. Cuatro
 * tarjetas con sombra convertirian cuatro listas cortas en cuatro objetos que
 * compiten; en fila se leen de un vistazo y el ojo baja solo.
 */
const Skills = () => {
  const { t, pick } = useI18n();

  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className={`border-b border-line2 bg-secondary-bg ${SECTION_PADDING}`}
    >
      <div className={CONTAINER}>
        <SectionHeading
          section="skills"
          title={t.skills.title}
          id="skills-title"
          className="mb-2"
        />

        {skillGroups.map((group, index) => (
          <motion.div
            key={group.category.es}
            {...rise(index)}
            /*
              Solo el fondo entra en la transicion. Con `transition-colors`
              tambien entrarian el borde y el texto, y al cambiar de tema la
              fila se quedaria a medio camino entre las dos paletas.
            */
            className="grid grid-cols-1 items-start gap-4 border-b border-line2 py-8 transition-[background-color] duration-[350ms] ease-editorial hover:bg-veil lg:grid-cols-[300px_1fr] lg:gap-10"
          >
            <h3 className="text-[13px] uppercase tracking-[0.14em] text-text-secondary">
              {pick(group.category)}
            </h3>
            <ul className="flex flex-wrap gap-2.5">
              {group.skills.map((skill) => {
                // El modelo guarda la referencia al componente, no un elemento
                // ya construido, asi que se instancia aqui.
                const Icon = skill.icon;
                return (
                  <li
                    key={skill.name}
                    /*
                      El chip se levanta 3px y cambia borde y color al pasar el
                      cursor. No es interactivo —no lleva a ningun sitio— pero
                      responder al puntero es lo que hace que la fila entera se
                      sienta viva en vez de impresa.
                    */
                    className="group/chip flex items-center gap-2.5 rounded-sm border border-line2 bg-primary-bg px-4 py-2.5 text-sm text-text-secondary transition-all duration-[350ms] ease-editorial hover:-translate-y-[3px] hover:border-accent hover:text-text-primary"
                  >
                    <Icon
                      size={17}
                      aria-hidden="true"
                      className="opacity-[0.55] transition-all duration-[250ms] group-hover/chip:text-accent group-hover/chip:opacity-100"
                    />
                    {skill.name}
                  </li>
                );
              })}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;

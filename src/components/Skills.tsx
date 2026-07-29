import SectionTitle from "./SectionTitle";
import { skillGroups } from "../data/portfolioData";
import { useI18n } from "../i18n/context";
import { motion } from "framer-motion";
import type { Skill } from "../types";

interface SkillCategoryProps {
  title: string;
  items: Skill[];
  delayOffset: number;
}

const SkillCategory = ({ title, items, delayOffset }: SkillCategoryProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: delayOffset, duration: 0.5 }}
    className="w-full"
  >
    {/* Category Title */}
    <h3 className="text-2xl md:text-3xl font-semibold text-accent mb-8 flex items-center gap-4">
      <span className="h-[2px] w-12 bg-accent/50 inline-block"></span>
      {title}
    </h3>

    {/* Skills Container - Flex Wrap for row layout */}
    <div className="flex flex-wrap gap-5">
      {items.map((skill, index) => {
        // El modelo guarda la referencia al componente, no un elemento ya
        // construido, asi que se instancia aqui.
        const Icon = skill.icon;
        return (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05, y: -5 }}
            className="flex items-center gap-4 bg-secondary-bg px-6 py-4 rounded-md border border-hairline hover:border-accent/50 hover:shadow-accent-glow transition-all duration-300 cursor-default"
          >
            <span className="text-3xl text-accent">
              <Icon />
            </span>
            <span className="text-text-primary text-lg font-medium">
              {skill.name}
            </span>
          </motion.div>
        );
      })}
    </div>
  </motion.div>
);

const Skills = () => {
  const { t, pick } = useI18n();

  return (
    <section id="skills" className="py-32 bg-primary-bg relative">
      {/* Background subtle grid */}
      <div className="grid-backdrop absolute inset-0 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <SectionTitle>{t.skills.title}</SectionTitle>

        <div className="max-w-7xl mx-auto mt-20">
          {/*
            Los grupos se recorren desde los datos. Antes eran cuatro claves
            fijas del tipo, asi que anadir una categoria obligaba a tocar el
            tipo y el componente; ahora es solo una entrada mas en el archivo
            de datos.
          */}
          <div className="flex flex-col gap-16">
            {skillGroups.map((group, index) => (
              <SkillCategory
                key={index}
                title={pick(group.category)}
                items={group.skills}
                delayOffset={0.1 + index * 0.1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;

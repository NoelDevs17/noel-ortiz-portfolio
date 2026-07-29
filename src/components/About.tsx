import SectionTitle from "./SectionTitle";
import {
  certifications,
  education,
  languages,
  personalInfo,
} from "../data/portfolioData";
import { useI18n } from "../i18n/context";
import { motion } from "framer-motion";
import { FaGraduationCap } from "react-icons/fa";

const About = () => {
  const { t, pick } = useI18n();
  // El primer parrafo del resumen ya se muestra en el Hero: aqui va el resto.
  const parrafos = pick(personalInfo.summary).slice(1);

  return (
    <section id="about" className="py-24 bg-secondary-bg">
      <div className="container mx-auto px-6 lg:px-20">
        <SectionTitle id="about-title">{t.about.title}</SectionTitle>

        <motion.div
          className="max-w-3xl mx-auto text-left mb-16 space-y-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-lg md:text-xl text-text-secondary leading-relaxed font-light">
            <span className="text-accent font-mono text-2xl mr-2">{t.about.greeting}</span>
            {pick(personalInfo.specialty)}
          </p>
          {parrafos.map((parrafo, index) => (
            <p
              key={index}
              className="text-base md:text-lg text-text-secondary leading-relaxed font-light"
            >
              {parrafo}
            </p>
          ))}
        </motion.div>

        <h3 className="text-2xl font-bold text-accent mb-10 font-mono flex items-center">
          <span className="mr-4 text-3xl">/</span> {t.about.education}
        </h3>

        {/* Minimal "Tech List" style */}
        <div className="space-y-4">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              className="group relative bg-primary-bg p-6 rounded-md border-l-2 border-transparent hover:border-accent transition-all duration-300 hover:bg-elevate/5"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-col md:flex-row justify-between md:items-center">
                <div className="flex items-start">
                  <FaGraduationCap className="text-text-secondary/70 text-2xl mt-1 mr-4 group-hover:text-accent transition-colors" />
                  <div>
                    <h4 className="text-xl font-bold text-text-primary group-hover:text-accent transition-colors">
                      {edu.institution}
                    </h4>
                    <p className="text-text-secondary font-medium mt-1">
                      {pick(edu.degree)}
                    </p>
                  </div>
                </div>

                <div className="mt-4 md:mt-0 text-left md:text-right">
                  <p className="font-mono text-sm text-accent bg-accent/10 inline-block px-3 py-1 rounded-md mb-2">
                    {edu.duration}
                  </p>
                  <p className="text-sm text-text-secondary font-mono block">
                    {pick(edu.status)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <h3 className="text-2xl font-bold text-accent mt-16 mb-10 font-mono flex items-center">
          <span className="mr-4 text-3xl">/</span> {t.about.certifications}
        </h3>

        {/*
          Once entradas: lista compacta en vez de tarjetas, que a este volumen
          convertirian la seccion en un muro.
        */}
        <ul className="space-y-2">
          {certifications.map((cert, index) => (
            <motion.li
              key={index}
              className="group flex flex-col gap-1 border-l-2 border-hairline pl-5 py-2 transition-colors duration-300 hover:border-accent sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: Math.min(index, 6) * 0.05, duration: 0.4 }}
              viewport={{ once: true }}
            >
              <span className="text-text-primary text-base leading-snug group-hover:text-accent transition-colors">
                {cert.title}
                {cert.institution && (
                  <span className="text-text-secondary"> · {cert.institution}</span>
                )}
              </span>
              <span className="font-mono text-sm text-text-secondary whitespace-nowrap">
                {cert.duration}
                {cert.status && ` · ${pick(cert.status)}`}
              </span>
            </motion.li>
          ))}
        </ul>

        <h3 className="text-2xl font-bold text-accent mt-16 mb-10 font-mono flex items-center">
          <span className="mr-4 text-3xl">/</span> {t.about.languages}
        </h3>

        <div className="flex flex-wrap gap-4">
          {pick(languages).map((idioma, index) => (
            <div
              key={index}
              className="bg-primary-bg border border-hairline rounded-md px-6 py-4"
            >
              <p className="text-text-primary font-bold">{idioma.name}</p>
              <p className="text-sm text-text-secondary mt-1">{idioma.level}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;

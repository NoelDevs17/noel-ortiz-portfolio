import { personalInfo } from "../data/portfolioData";
import { useI18n } from "../i18n/context";
import { motion } from "framer-motion";

const Contact = () => {
  const { t } = useI18n();

  return (
    <section
      id="contact"
      className="py-32 bg-secondary-bg flex items-center justify-center text-center relative overflow-hidden"
    >
      {/* Glowing circle behind */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-6 max-w-2xl relative z-10"
      >
        <p className="text-accent font-mono mb-4 text-lg">{t.contact.kicker}</p>
        <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
          {t.contact.title}
        </h2>
        <p className="text-text-secondary text-lg mb-10 leading-relaxed">
          {t.contact.body}
        </p>

        <a
          href={`mailto:${personalInfo.email}`}
          className="inline-block px-10 py-4 border-2 border-accent text-accent font-bold rounded-md hover:bg-accent/10 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-accent/20"
        >
          {t.contact.cta}
        </a>
      </motion.div>
    </section>
  );
};

export default Contact;

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaGithub, FaLinkedin, FaChevronDown } from "react-icons/fa";
import { personalInfo } from "../data/portfolioData";
import { useI18n } from "../i18n/context";

interface TypewriterProps {
  texts: string[];
  speed?: number;
  pause?: number;
}

// Typing effect component
const Typewriter = ({ texts, speed = 150, pause = 1500 }: TypewriterProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Con movimiento reducido no se programa ningun temporizador: el texto se
    // pinta entero mas abajo. Un cursor parpadeando y letras apareciendo son
    // justo el tipo de movimiento continuo que hay que evitar.
    if (prefersReducedMotion) return;

    // `noUncheckedIndexedAccess` obliga a comprobar el acceso por indice. La
    // guarda sustituye al `if (index === texts.length) return` del original y
    // cubre ademas el caso de una lista vacia.
    const current = texts[index];
    if (current === undefined) return;

    if (subIndex === current.length + 1 && !reverse) {
      // Este temporizador no se limpiaba: al desmontar seguia vivo y disparaba
      // setReverse sobre un componente que ya no existe.
      const pauseTimeout = setTimeout(() => setReverse(true), pause);
      return () => clearTimeout(pauseTimeout);
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % texts.length);
      return;
    }

    const timeout = setTimeout(
      () => {
        setSubIndex((prev) => prev + (reverse ? -1 : 1));
        setDisplayedText(current.substring(0, subIndex));
      },
      reverse ? speed / 2 : speed,
    );

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, texts, speed, pause, prefersReducedMotion]);

  // Sin animacion: la primera frase, completa y sin cursor. El contenido no se
  // pierde, solo deja de moverse.
  if (prefersReducedMotion) {
    return <span className="text-accent">{texts[0] ?? ""}</span>;
  }

  return (
    <span className="text-accent">
      {displayedText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

const Hero = () => {
  const { t, pick } = useI18n();

  return (
    <section
      id="hero"
      className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-primary-bg"
    >
      {/* Animated Background Blobs */}
      <motion.div
        animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-20 w-72 h-72 bg-accent/20 rounded-full blur-[100px]"
      />
      <motion.div
        animate={{ x: [0, -100, 0], y: [0, 50, 0], scale: [1, 1.5, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-[120px]"
      />

      <div className="container mx-auto px-6 relative z-10 text-center">
        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-accent font-mono mb-4 text-lg sm:text-xl tracking-wide"
        >
          {t.hero.greeting}
        </motion.p>

        {/* Name with Gradient */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
          className="text-5xl sm:text-7xl md:text-8xl font-bold mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-text-primary via-peak to-text-secondary"
        >
          {personalInfo.name}.
        </motion.h1>

        {/* Dynamic Role / Typewriter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="h-20 sm:h-24 md:h-28" // Fixed height to prevent layout shift
        >
          {/*
            Sin el "I " que traia la plantilla: los titulares de Noel son
            sintagmas nominales ("Líder Técnico"), no verbales, y "I Líder
            Técnico" no es una frase.
          */}
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-text-secondary mb-8">
            <Typewriter texts={pick(personalInfo.titles)} />
          </h2>
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="max-w-4xl mx-auto text-text-secondary text-base sm:text-lg mb-10 leading-relaxed"
        >
          {/* Solo la entradilla; el resto del resumen vive en Sobre mi. */}
          {pick(personalInfo.summary)[0]}
        </motion.p>

        {/* Icons Only (Button Removed) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center gap-8"
        >
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noreferrer"
            // Enlace solo con icono: sin nombre accesible, un lector de
            // pantalla anuncia "enlace" y nada mas.
            aria-label={`GitHub de ${personalInfo.name}`}
            className="text-text-secondary hover:text-text-primary transition-colors transform hover:scale-110"
          >
            <FaGithub size={32} />
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label={`LinkedIn de ${personalInfo.name}`}
            className="text-text-secondary hover:text-accent transition-colors transform hover:scale-110"
          >
            <FaLinkedin size={32} />
          </a>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-text-secondary/50"
      >
        <FaChevronDown size={24} />
      </motion.div>
    </section>
  );
};

export default Hero;

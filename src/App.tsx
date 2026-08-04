import { MotionConfig } from "framer-motion";
import { LanguageProvider } from "./i18n/LanguageProvider";
import { hasProjects } from "./data/portfolioData";
import { useRevealSafety } from "./hooks/useRevealSafety";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  /*
    Si el documento no compone fotogramas, el revelado al scroll no llega a
    dispararse y la pagina se quedaria en blanco. Esto lo detecta y pinta el
    estado final. Va aqui arriba, antes que nada que pueda fallar.
  */
  useRevealSafety();

  return (
    /*
      `reducedMotion="user"` hace que framer-motion respete la preferencia del
      sistema en todo el arbol: desactiva las animaciones de transformacion
      (los blobs del Hero, la flecha de scroll, las entradas por scroll) y deja
      pasar las de opacidad, que no provocan mareo.

      Lo que no cubre son las animaciones CSS de Tailwind y el efecto de
      escritura; de eso se encargan el bloque @media de index.css y el propio
      Typewriter.
    */
    <MotionConfig reducedMotion="user">
      <LanguageProvider>
        <div className="App">
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            {/*
              La seccion de Proyectos solo existe cuando hay proyectos reales.

              Ya no hace falta reajustar los fondos de las secciones vecinas
              cuando falta: en el rediseno el ritmo lo marcan los filetes
              divisorios, y solo Stack y Contacto se levantan a la superficie
              elevada. Quitar Proyectos deja la alternancia intacta.
            */}
            {hasProjects && <Projects />}
            <Experience />
            <Contact />
          </main>
          <Footer />
          <ScrollToTop />
        </div>
      </LanguageProvider>
    </MotionConfig>
  );
}

export default App;

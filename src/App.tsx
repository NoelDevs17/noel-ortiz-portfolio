import { MotionConfig } from "framer-motion";
import { LanguageProvider } from "./i18n/LanguageProvider";
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
            <Projects />
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

import { useEffect } from "react";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { Experience } from "./components/sections/Experience";
import { Skills } from "./components/sections/Skills";
import { Education } from "./components/sections/Education";
import { Contact } from "./components/sections/Contact";
import { PrintOverlay } from "./components/print/PrintOverlay";
import { useTheme } from "./hooks/useTheme";
import { useLanguage } from "./hooks/useLanguage";
import { useCopyClipboard } from "./hooks/useCopyClipboard";
import { personalInfo } from "./data";

export default function App() {
  const { isDark, toggleTheme } = useTheme("dark");
  const { lang, setLang } = useLanguage("es");
  const { copied: copiedEmail, copy: copyEmail } = useCopyClipboard();

  // Sync <html lang> attribute with active language
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const handleCopyEmail = () => copyEmail(personalInfo.email);

  return (
    <div
      id="landing-root"
      className={`min-h-screen font-sans selection:bg-blue-500 selection:text-white flex flex-col justify-between scroll-smooth transition-colors duration-300 ${
        isDark ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"
      }`}
    >
      <Header
        lang={lang}
        setLang={setLang}
        isDark={isDark}
        toggleTheme={toggleTheme}
      />

      <main className="flex-grow">
        <Hero
          lang={lang}
          isDark={isDark}
          copiedEmail={copiedEmail}
          onCopyEmail={handleCopyEmail}
        />
        <About lang={lang} isDark={isDark} />
        <Experience lang={lang} isDark={isDark} />
        <Skills lang={lang} isDark={isDark} />
        <Education lang={lang} isDark={isDark} />
        <Contact
          lang={lang}
          isDark={isDark}
          copiedEmail={copiedEmail}
          onCopyEmail={handleCopyEmail}
        />
      </main>

      <PrintOverlay lang={lang} />
      <Footer lang={lang} isDark={isDark} />
    </div>
  );
}

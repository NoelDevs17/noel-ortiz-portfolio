import { personalInfo } from "../data/portfolioData";
import { useI18n } from "../i18n/context";
import { FaHeart } from "react-icons/fa";

interface FooterProps {
  /** Ver la nota sobre alternancia de fondos en Experience.tsx. */
  elevated?: boolean;
}

const Footer = ({ elevated = false }: FooterProps) => {
  const { t } = useI18n();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`py-8 ${elevated ? "bg-secondary-bg" : "bg-primary-bg"} text-center`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-text-secondary font-mono">
          {t.footer.builtWith}{" "}
          <FaHeart className="inline text-accent" aria-hidden="true" />{" "}
          {t.footer.by} {personalInfo.name}
        </p>
        <p className="text-xs text-text-secondary font-mono mt-1">
          © {currentYear} {personalInfo.name}. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
};

export default Footer;

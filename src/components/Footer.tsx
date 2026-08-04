import { personalInfo } from "../data/portfolioData";
import { useI18n } from "../i18n/context";
import { CONTAINER } from "../lib/layout";

/**
 * Pie.
 *
 * Dos lineas en versalitas y nada mas. El "hecho con ♥" del portafolio anterior
 * se ha ido: el rediseno cierra en seco, y a estas alturas de la pagina el
 * corazon competia con la direccion de correo de la seccion anterior, que es lo
 * ultimo en lo que se deberia reparar.
 */
const Footer = () => {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary-bg py-7">
      <div
        className={`${CONTAINER} flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between`}
      >
        <p className="text-[11px] uppercase tracking-[0.14em] text-muted">
          © {year} {personalInfo.name}
        </p>
        <p className="text-[11px] uppercase tracking-[0.14em] text-muted">
          {t.footer.rights}
        </p>
      </div>
    </footer>
  );
};

export default Footer;

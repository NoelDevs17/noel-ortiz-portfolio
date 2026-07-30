import { useCallback, useEffect, useState } from "react";
import type { MouseEvent } from "react";
import { useReducedMotion } from "framer-motion";

export type Theme = "dark" | "light";

const STORAGE_KEY = "theme";

/**
 * Color de fondo por tema. Tiene que coincidir con el script de arranque del
 * index.html, que pinta antes de que exista este modulo.
 */
const PAGE_BG: Record<Theme, string> = {
  dark: "#0b0c0d",
  light: "#f2f0e9",
};

/**
 * Resuelve el tema igual que el script de arranque: una eleccion guardada
 * manda, y si no la hay se usa oscuro salvo que el sistema pida claro
 * explicitamente.
 *
 * La logica esta duplicada a proposito: aquel script corre antes de que este
 * modulo exista, y sin el la pagina se pintaria blanca hasta que React monta.
 * Si cambia una, cambia la otra.
 */
function readTheme(fallback: Theme = "dark"): Theme {
  let stored: string | null = null;
  // Solo la lectura va protegida: en modo privado localStorage puede lanzar, y
  // el pintado tiene que ocurrir igual o vuelve el parpadeo.
  try {
    stored = localStorage.getItem(STORAGE_KEY);
  } catch {
    // Almacenamiento no disponible; decide la preferencia del sistema.
  }
  if (stored === "dark" || stored === "light") return stored;
  return typeof window.matchMedia === "function"
    ? window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark"
    : fallback;
}

/**
 * `document.startViewTransition` no esta en la libreria estandar de TypeScript
 * todavia, y no es razon para apagar el efecto en los navegadores que si lo
 * traen. Se declara lo minimo que se usa.
 */
interface ViewTransition {
  ready: Promise<void>;
}
type WithViewTransitions = Document & {
  startViewTransition?: (callback: () => void) => ViewTransition;
};

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => readTheme());
  const isDark = theme === "dark";
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // El almacenamiento puede fallar; el tema sigue valiendo esta sesion.
    }

    const root = document.documentElement;
    // La clase es lo que conmuta las variables CSS de index.css.
    root.classList.toggle("light", theme === "light");
    // Mantiene <html> en sintonia con la app, para que la zona de rebote del
    // scroll y los controles nativos no se queden del color anterior.
    root.style.backgroundColor = PAGE_BG[theme];
    root.style.colorScheme = theme;

    // La barra del navegador en movil tambien debe seguir al tema.
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", PAGE_BG[theme]);
  }, [theme]);

  /**
   * Cambia el tema revelandolo en un circulo que nace del propio boton.
   *
   * El radio es la distancia del boton a la esquina mas lejana de la ventana,
   * asi que el circulo termina de cubrirla justo al completar la animacion, sin
   * pasarse ni quedarse corto. Las reglas que hacen falta para que el tema
   * nuevo se recorte por encima del viejo estan en `index.css`.
   *
   * Todo esto es adorno: sin soporte de la API, o con movimiento reducido, o si
   * el evento no trae boton (teclado, llamada programatica), el tema cambia de
   * golpe y no pasa nada.
   */
  const toggleTheme = useCallback(
    (event?: MouseEvent<HTMLElement>) => {
      const apply = () =>
        setTheme((actual) => (actual === "dark" ? "light" : "dark"));

      const doc = document as WithViewTransitions;
      const button = event?.currentTarget;
      if (!doc.startViewTransition || prefersReducedMotion || !button) {
        apply();
        return;
      }

      const box = button.getBoundingClientRect();
      const x = box.left + box.width / 2;
      const y = box.top + box.height / 2;
      const radius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y),
      );

      const transition = doc.startViewTransition(apply);
      void transition.ready
        .then(() => {
          document.documentElement.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${radius}px at ${x}px ${y}px)`,
              ],
            },
            {
              duration: 650,
              easing: "cubic-bezier(0.16, 1, 0.3, 1)",
              pseudoElement: "::view-transition-new(root)",
            },
          );
        })
        .catch(() => {
          // La transicion puede abortarse (otra en curso, pestana oculta). El
          // tema ya se aplico dentro del callback, asi que no hay nada que hacer.
        });
    },
    [prefersReducedMotion],
  );

  return { theme, isDark, toggleTheme };
}

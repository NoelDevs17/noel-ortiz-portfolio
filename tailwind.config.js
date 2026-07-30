/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      /**
       * Paleta de Noel Ortiz. Cada token tiene un trabajo definido; si un color
       * no encaja en ninguno, el problema es el color, no la lista.
       *
       * Regla que ordena todo esto: el AZUL es el unico acento con peso
       * (navegacion, CTAs, enlaces y foco) y el VERDE es exclusivamente
       * funcional. Ver DESIGN.md.
       *
       * Los valores ya no viven aqui: son variables CSS definidas en
       * `src/index.css`, que se conmutan con la clase `light` en <html>. Aqui
       * solo queda el cableado. `<alpha-value>` es lo que permite que sigan
       * funcionando los modificadores tipo `bg-accent/10`.
       */
      colors: {
        // --- Superficies -----------------------------------------------
        "primary-bg": "rgb(var(--primary-bg) / <alpha-value>)",
        "secondary-bg": "rgb(var(--secondary-bg) / <alpha-value>)",

        // --- Texto -----------------------------------------------------
        "text-primary": "rgb(var(--text-primary) / <alpha-value>)",
        "text-secondary": "rgb(var(--text-secondary) / <alpha-value>)",

        // Chrome no textual (scrollbar).
        muted: "rgb(var(--muted) / <alpha-value>)",

        // --- Acento ----------------------------------------------------
        accent: "rgb(var(--accent) / <alpha-value>)",

        // --- Funcional -------------------------------------------------
        /**
         * SOLO para Project.status === "production". Ni decoracion, ni
         * navegacion, ni enfasis. Si aparece en cualquier otro sitio, es un
         * error de revision.
         */
        success: "rgb(var(--success) / <alpha-value>)",

        // --- Bordes y velos --------------------------------------------
        /**
         * Filete que delimita tarjetas y barras. Decorativo: la informacion
         * nunca depende solo de el, asi que WCAG 1.4.11 no le exige 3:1.
         * Lleva la opacidad fija porque nadie lo usa con modificador.
         */
        hairline: "rgb(var(--hairline) / 0.2)",

        /**
         * Velo de composicion para estados hover. Aclara sobre oscuro y
         * oscurece sobre claro: por eso es un token y no un `white/5` fijo,
         * que sobre fondo claro no se veria.
         */
        elevate: "rgb(var(--elevate) / <alpha-value>)",

        /**
         * Extremo del degradado del nombre en el Hero. Blanco en oscuro,
         * negro en claro.
         */
        peak: "rgb(var(--peak) / <alpha-value>)",

        // --- Filetes del rediseno editorial --------------------------------
        /**
         * Tres pesos del mismo trazo. Ver la nota extensa en `src/index.css`:
         * el canal se invierte con el tema y la opacidad la aporta una
         * variable, no un literal, porque sobre papel hace falta un punto mas.
         *
         * Ninguno acepta modificador `/N`: el alfa ya esta puesto y un
         * `border-line/50` no compilaria. Para bordes con opacidad propia sigue
         * estando `hairline`.
         */
        line: "rgb(var(--hairline) / var(--line-alpha))",
        line2: "rgb(var(--hairline) / var(--line2-alpha))",
        veil: "rgb(var(--elevate) / var(--veil-alpha))",
      },
      /**
       * Resplandores de acento. Estaban escritos como rgba fijos dentro de
       * valores arbitrarios, asi que se quedaban con el azul del tema oscuro.
       * Aqui siguen al token.
       */
      boxShadow: {
        "accent-glow": "0 4px 20px rgb(var(--accent) / 0.15)",
        "accent-dot": "0 0 10px rgb(var(--accent) / 0.8)",
      },
      /**
       * `all` de Tailwind incluye outline-color. Animar el anillo de foco lo
       * hace aparecer con retardo, y quien navega con teclado necesita verlo
       * en el instante en que llega al elemento.
       *
       * Se redefine como la lista por defecto de Tailwind mas `width` y
       * `height` (el subrayado de la navegacion anima su ancho con
       * transition-all, asi que copiar la lista por defecto sin mas lo habria
       * roto), y sin ninguna propiedad outline-*.
       *
       * `transition-colors` no necesita ajuste: en 3.4 ya no lleva
       * outline-color.
       */
      transitionProperty: {
        all: [
          "color",
          "background-color",
          "border-color",
          "text-decoration-color",
          "fill",
          "stroke",
          "opacity",
          "box-shadow",
          "transform",
          "filter",
          "backdrop-filter",
          "width",
          "height",
        ].join(", "),
      },
      fontFamily: {
        // JetBrains Mono como fuente por defecto, no solo para monoespaciado.
        // La variante "Variable" la sirve @fontsource-variable (self-hosted);
        // la no variable queda como respaldo si alguien la tiene instalada.
        sans: [
          '"JetBrains Mono Variable"',
          '"JetBrains Mono"',
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          '"Noto Sans"',
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
        mono: [
          '"JetBrains Mono Variable"',
          '"JetBrains Mono"',
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          '"Liberation Mono"',
          '"Courier New"',
          "monospace",
        ],
      },
      /**
       * Curva unica del rediseno. Sale disparada y frena largo: es lo que hace
       * que un desplazamiento parezca decidido y no elastico. Se usa en TODA
       * transicion y animacion del sitio, tanto aqui como en los `ease` que
       * recibe framer-motion (alli va como la tupla [0.16, 1, 0.3, 1]).
       */
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      animation: {
        "text-focus-in":
          "text-focus-in 1s cubic-bezier(0.550, 0.085, 0.680, 0.530) both",
        "slide-in-bottom":
          "slide-in-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",

        /**
         * Marquesina. La lista de tecnologias se pinta DUPLICADA y la pista se
         * desplaza exactamente la mitad de su ancho: al terminar, la segunda
         * copia esta donde arrancó la primera y el salto es invisible.
         *
         * Es animacion CSS y no framer-motion a proposito: el Marquee ajusta su
         * `playbackRate` desde el scroll, y eso exige una WAAPI de verdad
         * (`element.getAnimations()`), que es lo que produce una @keyframes.
         */
        marquee: "marquee 42s linear infinite",

        /** Deriva propia del resplandor del Hero, bajo el parallax. */
        drift: "drift 18s ease-in-out infinite",

        /** Punto de "abierto a oportunidades": un pulso que se expande y muere. */
        "dot-pulse": "dot-pulse 2.4s ease-out infinite",
      },
      keyframes: {
        "text-focus-in": {
          "0%": { filter: "blur(12px)", opacity: "0" },
          "100%": { filter: "blur(0px)", opacity: "1" },
        },
        "slide-in-bottom": {
          "0%": { transform: "translateY(50px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        drift: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(60px, -40px) scale(1.15)" },
        },
        "dot-pulse": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgb(var(--accent) / 0.55)" },
          "50%": { boxShadow: "0 0 0 6px rgb(var(--accent) / 0)" },
        },
      },
    },
  },
  plugins: [],
};

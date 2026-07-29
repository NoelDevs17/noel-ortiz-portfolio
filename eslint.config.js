import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },

  // Codigo de la aplicacion.
  {
    files: ["**/*.{ts,tsx}"],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    settings: { react: { version: "detect" } },
    rules: {
      ...reactHooks.configs.recommended.rules,

      /**
       * Faltaba eslint-plugin-react en el flat config heredado. Sin esta regla
       * ESLint no reconoce el uso de una variable dentro de JSX y marcaba
       * `motion` como no usada aunque apareciera como <motion.div>: ese era el
       * origen de los 8 falsos positivos del proyecto original.
       */
      "react/jsx-uses-vars": "error",

      // La regla base no entiende los tipos; la version de typescript-eslint si.
      // Se conserva el patron original que exime a los identificadores en
      // mayusculas.
      "@typescript-eslint/no-unused-vars": [
        "error",
        { varsIgnorePattern: "^[A-Z_]" },
      ],

      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },

  // Archivos de configuracion: corren en Node, no en el navegador.
  {
    files: ["**/*.js"],
    extends: [js.configs.recommended],
    languageOptions: {
      globals: globals.node,
      sourceType: "module",
    },
  },
);

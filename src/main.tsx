import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Fuente self-hosted. Va antes que index.css para que las @font-face existan
// cuando se apliquen las reglas que las usan.
import "@fontsource-variable/jetbrains-mono";
import "./index.css";
import App from "./App";

const rootElement = document.getElementById("root");

// `strict` no deja asumir que el elemento existe. Fallar aqui con un mensaje
// claro es mejor que una asercion `!` que se traga el error de verdad.
if (!rootElement) {
  throw new Error("No se encontro el elemento #root en index.html");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

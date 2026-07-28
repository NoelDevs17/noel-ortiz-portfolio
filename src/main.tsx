import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
// Self-hosted variable fonts. Every subset is declared, but each @font-face
// carries a unicode-range, so a browser only fetches the latin one (~87 KB
// for both families). The family names end in "Variable" — see @theme.
import '@fontsource-variable/inter';
import '@fontsource-variable/jetbrains-mono';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

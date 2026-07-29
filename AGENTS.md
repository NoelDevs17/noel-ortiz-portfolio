# Repository Guidelines

## Project Structure & Module Organization

This repository is a React 19, TypeScript, Vite, and Tailwind CSS 4 portfolio. Application code lives in `src/`:

- `components/layout/` contains shared page chrome; `components/sections/` contains portfolio sections; `components/print/` contains the printable CV.
- `hooks/` owns theme, language, and clipboard behavior.
- `constants/` stores translations and technology metadata; `data.ts` stores portfolio content; `types/` defines shared TypeScript shapes.
- `index.css` defines Tailwind tokens and global accessibility styles.

Production output is generated in `dist/` and deployed through Firebase Hosting. Do not edit `dist/` or `node_modules/`.

## Build, Test, and Development Commands

- `npm ci` — install the exact dependency versions from `package-lock.json`.
- `npm run dev` — start Vite on `http://localhost:3000`.
- `npm run lint` — run TypeScript validation with `tsc --noEmit`.
- `npm run build` — create the production bundle in `dist/`.
- `npm run preview` — serve the built bundle for final local checks.

There is currently no automated test runner. Before submitting changes, run `npm run lint` and `npm run build`, then manually verify both themes, Spanish and English content, responsive navigation, and print/PDF output when relevant.

## Coding Style & Naming Conventions

Use TypeScript and functional React components with two-space indentation. Name components and component files in PascalCase (`PrintOverlay.tsx`), hooks with a `use` prefix (`useTheme.ts`), and utilities/data in camelCase. Keep shared interfaces in `src/types/`.

Follow the existing Tailwind-first styling approach. Preserve the explicit `isDark` class ternaries rather than introducing a separate theme mechanism. Use semantic `<button>` and `<a>` elements for interactions, retain the global focus treatment, and consult `DESIGN.md` before changing colors, typography, spacing, section numbering, or technology badges.

## Content and Architecture Notes

Keep bilingual UI text in `src/constants/translations.ts` and portfolio records in `src/data.ts`. When adding a section, update navigation, section numbering, translations, and `PrintOverlay` as applicable. Use `src/utils/scroll.ts` for section navigation so the fixed header offset remains correct.

## Agent-Specific Instructions

Do not use the Sites skill for design or implementation unless the user explicitly requests it.

## Commit & Pull Request Guidelines

Recent history follows Conventional Commit-style prefixes such as `feat:`, `fix:`, `refactor:`, `a11y:`, `perf:`, and `docs:`; optional scopes are acceptable, for example `fix(contact): ...`. Write concise, imperative subjects.

Pull requests should explain the user-visible change, list validation performed, and link related issues. Include screenshots for visual changes in both themes and at representative desktop/mobile sizes. Keep commits focused and avoid committing generated output or secrets.

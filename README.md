# Noel Ortiz — Portafolio (v3)

Portafolio personal de **Noel Ortiz**, Tech Lead y Desarrollador Full Stack.

> **Estado: migración en curso.** Este proyecto parte de una base de terceros y
> se está adaptando por fases. El contenido real todavía no está cargado: los
> datos de `src/data/portfolioData.jsx` son marcadores de posición.

## Atribución

Basado en el portafolio de código abierto de **Aditi Arya**
([github.com/aditiarya37](https://github.com/aditiarya37)), reutilizado con su
permiso expreso. El diseño original, el layout y las animaciones son obra suya;
todo el contenido, los datos personales y la identidad visual de este repositorio
son de Noel Ortiz.

El proyecto original no incluía archivo `LICENSE`, por lo que esta atribución es
voluntaria y el permiso de reutilización es directo del autor, no derivado de una
licencia pública.

## Stack

- React 19 + Vite 6
- Tailwind CSS 3
- framer-motion (animaciones)
- react-scroll (navegación)
- react-icons

## Desarrollo

```bash
npm install       # instalar dependencias
npm run dev       # servidor de desarrollo
npm run build     # build de producción
npm run preview   # previsualizar el build
npm run lint      # ESLint
```

## Estructura

```
src/
├── components/   # secciones y layout
├── data/         # contenido del portafolio (fuente única)
└── App.jsx
```

## Plan de migración

| Fase | Alcance | Estado |
|---|---|---|
| A | Reconocimiento y comparativa de capacidades | Completada |
| B | Limpieza legal y de identidad | Completada |
| C | Cimientos: TypeScript, paleta propia, SEO, favicon, a11y, fuentes | Pendiente |
| D | Contenido real de Noel Ortiz | Pendiente |
| E | Capacidades portadas: bilingüe ES/EN, tema claro/oscuro, CV imprimible | Pendiente |
| F | Verificación (contraste, teclado, impresión) y despliegue | Pendiente |

La rama `main` conserva el estado original intacto como red de seguridad; el
trabajo de migración vive en `prueba-de-migracion`.

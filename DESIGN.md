# Sistema de Diseño

Documenta las decisiones visuales del portafolio tal como están implementadas en el código. Sirve como referencia al añadir secciones o componentes nuevos, para que mantengan coherencia con lo existente.

## Concepto

**Estética de terminal / entorno de desarrollo.** El portafolio de un desarrollador debe parecerse a las herramientas que usa. De ahí vienen las decisiones que lo definen: tipografía monoespaciada para todo lo que es etiqueta o metadato, los tres puntos de ventana en la tarjeta del Hero, el logo `</>`, el nombre en `SNAKE_CASE` (`NOEL_ORTIZ`), la numeración de secciones (`01.`, `02.`…) y los patrones de rejilla sutiles de fondo.

La regla que sostiene el conjunto: **la mono etiqueta, la sans comunica**. Todo lo que sea navegación, estado, categoría o dato técnico va en JetBrains Mono; la prosa que se lee de corrido va en Inter.

## Color

El neutro es la escala **slate** de Tailwind, elegida sobre el gris puro por su leve sesgo azulado, que armoniza con el acento primario. No se usa `gray`, `zinc` ni `neutral` en ninguna parte.

### Fondos y texto

| Rol | Oscuro | Claro |
|---|---|---|
| Fondo de página | `bg-slate-950` | `bg-slate-50` |
| Texto principal | `text-slate-100` | `text-slate-900` |
| Texto secundario | `text-slate-300` / `text-slate-400` | `text-slate-600` / `text-slate-700` |
| Texto tenue (metadatos) | `text-slate-500` | `text-slate-500` |
| Superficie de tarjeta | `bg-slate-900/30` – `/40` | `bg-white` |
| Borde | `border-slate-800` / `border-slate-900` | `border-slate-200` |

`text-slate-500` es deliberadamente el mismo valor en ambos temas: funciona sobre los dos fondos y evita una ternaria innecesaria.

### Acentos

Dos acentos, con roles separados que conviene respetar:

- **Azul** (`blue-600` claro / `blue-400` oscuro) — identidad y acción primaria. Botón principal del Hero, logo, eyebrows de categoría, avatar.
- **Esmeralda** (`emerald-600` claro / `emerald-400` oscuro) — navegación y confirmación. Numeración de secciones, estados *hover*, feedback de "copiado", idioma activo.

En modo oscuro los acentos suben un escalón (600 → 400) para conservar contraste sobre el fondo casi negro. **No inviertas los roles**: el azul nunca marca un hover, la esmeralda nunca es el CTA principal.

El amarillo aparece una sola vez, en el icono de sol del selector de tema, donde es literal más que decorativo.

### Colores de marca

[`src/constants/technologies.ts`](src/constants/technologies.ts) guarda el hex oficial de cada tecnología (`#3178c6` TypeScript, `#dd0031` Angular, `#512bd4` .NET…). Son datos de marca ajenos, así que quedan fuera del sistema y **no deben normalizarse** a la paleta. Cada badge define además `text` y `dotBg` para garantizar contraste sobre su propio fondo.

### Grises arbitrarios

[`Skills.tsx`](src/components/sections/Skills.tsx) y [`Contact.tsx`](src/components/sections/Contact.tsx) usan cinco hex fuera de la escala (`#0a0c14`, `#0b0c10`, `#12141c`, `#141622`, `#1a1c29`) para superficies oscuras algo más profundas que `slate-950`. Funcionan, pero son deuda del sistema: si necesitas un tono así, reutiliza uno de esos cinco antes de inventar el sexto.

## Tipografía

Dos familias, cargadas desde Google Fonts en [`src/index.css`](src/index.css) y declaradas como tokens en el bloque `@theme`:

```css
--font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
--font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, monospace;
```

**Inter** (300–700) para títulos y prosa. **JetBrains Mono** (400–600) para todo lo demás.

### Cuándo usar cada una

`font-mono` va en: eyebrows de sección, ítems de navegación, etiquetas de campo, periodos y fechas, badges de tecnología, botones de acción, estados y el footer.

`font-sans` va en: títulos `h1`–`h4`, párrafos del resumen, descripciones y viñetas de logros.

### Escala

| Uso | Clases |
|---|---|
| Nombre en el Hero | `text-4xl sm:text-6xl font-bold tracking-tight` |
| Título de sección | `text-3xl font-bold tracking-tight` |
| Título de tarjeta | `text-lg` / `text-xl font-bold` |
| Prosa | `text-sm md:text-base leading-relaxed` |
| Metadato mono | `text-xs` / `text-[11px]` |
| Micro-etiqueta | `text-[10px]` / `text-[9px]` |

Las etiquetas en mayúsculas llevan siempre `tracking-wider` o `tracking-widest`; los títulos grandes llevan `tracking-tight`. Sin esa compensación de interletraje, la mono en caja alta se apelmaza y los titulares se ven sueltos.

## Layout

**Contenedor:** `max-w-7xl mx-auto px-4 sm:px-6` en todas las secciones.
**Ritmo vertical:** `py-16 md:py-24`, con `border-b` entre secciones.

**Patrón de dos columnas** — la estructura dominante (About, Experience, Contact):

```
grid grid-cols-1 lg:grid-cols-12 gap-12
├─ lg:col-span-4  → barra lateral fija (lg:sticky lg:top-24 h-fit)
└─ lg:col-span-8  → contenido
```

La barra lateral repite siempre la misma tríada: eyebrow con icono + número, título `h2`, subtítulo mono.

**Espaciado:** se usa `gap` de flex/grid y utilidades `space-y-*`, no márgenes por elemento. Mantenlo así — evita colapsos de margen y hace el ritmo predecible.

### Radios

Escala progresiva según el tamaño del elemento: `rounded-lg` (botones, badges) → `rounded-xl` (tarjetas pequeñas) → `rounded-2xl` (tarjetas) → `rounded-3xl` (contenedores grandes) → `rounded-full` (píldoras de tecnología, campo de búsqueda).

### Sombras

Muy contenidas y casi exclusivas del tema claro (`shadow-xs`, `shadow-sm`), donde sustituyen al borde como separador. En oscuro la profundidad la da el contraste de superficies, no la sombra.

## Tema claro / oscuro

La implementación **no usa la clase `dark:` de Tailwind ni variables CSS**. Un booleano `isDark` viaja por props desde [`App.tsx`](src/App.tsx) y cada componente resuelve sus clases con una ternaria:

```tsx
className={`... ${isDark ? "bg-slate-900/40 border-slate-800" : "bg-white border-slate-200"}`}
```

Es verboso, pero explícito: ambos temas se leen juntos en el mismo punto del código. **Si añades un componente, sigue este patrón** en lugar de introducir un segundo mecanismo.

Detalles del comportamiento actual, en [`useTheme.ts`](src/hooks/useTheme.ts) y [`useLanguage.ts`](src/hooks/useLanguage.ts):

- Arranca en **oscuro**; el idioma arranca en **español**.
- No se lee `prefers-color-scheme`.
- Ninguna de las dos preferencias persiste entre recargas.

Son limitaciones conocidas, no descuidos del sistema visual: añadir `localStorage` y detección de preferencia del sistema es la mejora natural.

## Movimiento

Se usa [Motion](https://motion.dev) con moderación, en tres lugares:

1. **Rotación de títulos en el Hero** — `AnimatePresence mode="wait"`, desplazamiento vertical ±20px, 0.3s, cada 4s.
2. **Menú móvil** — despliegue de altura `0 → auto`.
3. **Marquesinas de tecnologías** — CSS puro, no Motion. Dos keyframes (`marquee` y `marquee-reverse`) definidos en `@theme`, 110s lineales infinitos, en direcciones opuestas. Las listas se triplican en el JSX para que el bucle no muestre costuras, y unos degradados laterales difuminan los extremos.

Las transiciones de estado usan `transition-all` / `transition-colors` con la duración por defecto; el cambio de tema usa `duration-300`. Los *hover* elevan con `hover:-translate-y-0.5` o `hover:scale-[1.03]`, nunca más.

## Vista de impresión

El CV en PDF no es una hoja de estilos alternativa sino un **componente separado**: [`PrintOverlay.tsx`](src/components/print/PrintOverlay.tsx).

- Todas las secciones de pantalla llevan `print:hidden`.
- El overlay lleva `hidden print:block` y fuerza `text-slate-950 bg-white`, ignorando el tema activo.
- Maqueta densa de una columna, `text-xs`, con `page-break-inside-avoid` en los bloques que no deben partirse.
- Consume la misma data e idioma que la web, así que se mantiene sincronizado solo.

Si añades una sección al sitio, decide explícitamente si entra en el CV: no se propaga automáticamente.

## Detalles recurrentes

**Patrón de rejilla de fondo.** Dos degradados lineales de 1px a `currentColor`, con `backgroundSize` de 20px (Contact) o 24px (Skills), a opacidad 0.02–0.05. Va en un `div` absoluto con `pointer-events-none` y el contenido se eleva con `relative z-10`.

**Scrollbar.** Personalizado a 6px con pulgar `slate-400` translúcido, definido en `index.css`.

**Iconos.** [Lucide](https://lucide.dev), a `w-3.5`, `w-4` o `w-5` según jerarquía. Nunca emoji como marcador de sección — chocaría con la estética de terminal.

**Scroll de navegación.** [`scroll.ts`](src/utils/scroll.ts) calcula el desplazamiento restando la altura real de la cabecera fija más 16px de margen. Usa siempre este helper en vez de `scrollIntoView`, o el destino queda tapado por la cabecera.

## Deuda conocida

- Los cinco grises arbitrarios descritos arriba deberían consolidarse como tokens en `@theme`.
- Las fuentes se cargan por `@import` desde el CDN de Google, lo que bloquea el render inicial y añade una dependencia externa; alojarlas localmente sería más rápido y robusto.
- No hay estilos de `:focus-visible` definidos: la navegación por teclado depende del anillo por defecto del navegador, que en el tema oscuro apenas se percibe.

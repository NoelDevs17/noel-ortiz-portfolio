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

Una sola regla ordena todo el color del sistema:

> **El azul es marca. El ámbar y el esmeralda son estado.**

- **Azul** (`blue-600` claro / `blue-400` oscuro) — **marca, y no significa nada**. Identidad, navegación, numeración de secciones, CTAs, enlaces, *hover*, anillo de foco. Si un elemento es azul, es porque pertenece a la marca; nunca porque comunique una condición.
- **Ámbar** (`amber-400` oscuro / `amber-700` claro) — **en curso**. Estudios y certificaciones sin terminar.
- **Esmeralda** (`emerald-400` oscuro / `emerald-700` claro) — **completado o confirmado**. Titulaciones terminadas y el feedback de "copiado".

En oscuro los acentos suben de escalón para conservar contraste sobre el fondo casi negro; en claro los estados bajan a `700` —no `600`— porque `amber-600` sobre `amber-50` da 3.07:1 y no alcanza el 4.5:1 exigido a texto.

**La regla al añadir color:** si el elemento comunica una condición, usa ámbar o esmeralda; en cualquier otro caso, azul. Un estado nunca decora, y la marca nunca informa.

Dos amarillos/verdes escapan a la regla por ser literales, no semánticos: el icono de sol del selector de tema, y el tercer punto del semáforo de ventana en el Hero, que es rojo/amarillo/verde por convención de sistema operativo.

### Colores de marca

[`src/constants/technologies.ts`](src/constants/technologies.ts) guarda el hex oficial de cada tecnología (`#3178c6` TypeScript, `#dd0031` Angular, `#512bd4` .NET…). Son datos de marca ajenos, así que quedan fuera del sistema y **no deben normalizarse** a la paleta. Cada badge define además `text` y `dotBg`, elegidos a mano.

Esta lista es la fuente única de color de marca: la consumen tanto la marquesina de Skills como los chips de Projects. **Añadir una tecnología aquí la hace aparecer en ambas**, así que es también una declaración de competencias, no solo un color.

**Al añadir un badge, elige el `text` midiendo, no a ojo.** El fondo es color de marca y no se toca, pero el texto es decisión nuestra y debe alcanzar 4.5:1 sobre ese fondo. La regla práctica: los fondos claros o saturados —cian, naranja, verde medio— piden `text-black`; los oscuros, `text-white`. Los 32 badges actuales cumplen, con el mínimo en 4.51:1.

Cada entrada lleva además un `icon`, que sustituye al antiguo punto de color. Los logotipos de marca vienen de `react-icons/si` (Simple Icons); lo que no tiene logo cae en un icono de Lucide. **El icono no define color propio**: hereda el `text` del badge vía `currentColor`, de modo que el contraste se decide en un único sitio.

Dos avisos al añadir iconos:

- **Simple Icons no tiene marcas de Microsoft** (retiradas por política de marca registrada). SQL Server, Azure DevOps, Entity Framework y LINQ usan icono genérico, igual que gRPC, MassTransit y YARP.
- **`SiSolid` existe, pero es SolidJS**, no los principios SOLID. Verifica que el logo corresponde a la tecnología antes de importarlo; el nombre coincidente no basta.

### Superficies oscuras

La escala slate salta de **L\* 1.9** (`slate-950`) a **L\* 8.0** (`slate-900`), sin escalones intermedios. Las superficies anidadas del tema oscuro necesitan ese rango, así que hay tres tokens propios declarados en `@theme`:

| Token | Hex | L\* | Uso |
|---|---|---|---|
| `surface-card` | `#0b0c10` | 3.4 | Fondo de tarjeta sobre `slate-950` |
| `surface-raised` | `#12141c` | 6.4 | Elemento elevado dentro de una tarjeta |
| `surface-raised-hover` | `#1a1c29` | 10.6 | Estado *hover* del anterior |

Se usan como cualquier color de Tailwind (`bg-surface-card`, `bg-surface-raised/50`). **No los sustituyas por `slate`**: colapsaría cuatro escalones de luminancia en dos y aplanaría la jerarquía de las tarjetas. Si necesitas un tono nuevo en ese rango, añade un token aquí en vez de un hex suelto.

## Tipografía

Dos familias variables **alojadas en el propio proyecto**, importadas en [`src/main.tsx`](src/main.tsx) vía `@fontsource-variable` y declaradas como tokens en el `@theme` de [`src/index.css`](src/index.css):

```css
--font-sans: "Inter Variable", "Inter", ui-sans-serif, system-ui, sans-serif;
--font-mono: "JetBrains Mono Variable", "JetBrains Mono", ui-monospace, SFMono-Regular, monospace;
```

**El sufijo `Variable` es obligatorio**: es el nombre con el que `@fontsource-variable` registra la familia. Sin él la página cae en silencio a fuentes del sistema, sin error visible. Los nombres planos quedan detrás como respaldo para copias instaladas localmente.

**Inter** (100–900) para títulos y prosa. **JetBrains Mono** (100–800) para todo lo demás.

Cada paquete declara todos sus subconjuntos, pero con `unicode-range`: el navegador **solo descarga el latino**, unos **87 KB** entre las dos familias. No hay ninguna petición a dominios externos.

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

**Contenedor:** `max-w-7xl mx-auto px-4 sm:px-6`, aplicado **sobre el propio `<section>`** —no sobre un `div` interno— para que el borde inferior y el contenido compartan ancho. El Header y el Footer repiten el mismo contenedor.
**Ritmo vertical:** `py-16 md:py-24` en las siete secciones, con `border-b` entre ellas. Contact no lo lleva por ser la última antes del pie.

**Numeración:** los eyebrows van de `01.` a `06.` (Hero no lleva número). Están escritos a mano en cada sección, así que **insertar una sección obliga a renumerar las siguientes** — y también a añadirla al `navItems` del Header y al `PrintOverlay`, que no heredan nada automáticamente.

**Patrón de dos columnas** — la estructura dominante (About, Experience, Projects, Contact):

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

### Arranque y persistencia

El fondo de página se decide **antes de que cargue el bundle**, en un script en línea dentro de `index.html`. Sin él la página queda blanca hasta que React monta, lo que produce un destello en tema oscuro.

Orden de precedencia, idéntico en el script y en [`useTheme.ts`](src/hooks/useTheme.ts):

1. La elección guardada en `localStorage` (`theme`).
2. `prefers-color-scheme` — **oscuro salvo que el sistema pida claro explícitamente**, para conservar la identidad oscura del sitio cuando no hay preferencia.
3. El parámetro `initial` del hook, solo si `matchMedia` no existe.

[`useLanguage.ts`](src/hooks/useLanguage.ts) sigue el mismo patrón con la clave `lang`, cayendo en `navigator.language`: inglés si el navegador lo es, español en cualquier otro caso. No necesita script de arranque porque el idioma no afecta al color del primer pintado.

**Esa lógica está duplicada a propósito** entre el script y el hook: el script corre antes de que exista el módulo. Si cambias la clave de almacenamiento, la regla de precedencia o los dos colores de fondo, cámbialos en ambos sitios — hay un comentario en cada uno apuntando al otro.

Dos detalles que conviene no romper:

- **El `try` envuelve solo la lectura de `localStorage`**, nunca el pintado. En modo privado el almacenamiento lanza excepción; si el `catch` se tragara también el `matchMedia` y el pintado, el destello volvería.
- El hook **reescribe el fondo de `<html>` en cada cambio de tema**, no solo al arrancar, para que el área de *overscroll*, la barra de desplazamiento y los controles nativos no se queden con el color que pintó el script.

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

**Foco de teclado.** Regla global en `index.css`: `outline: 2px solid #3b82f6` con `outline-offset: 2px`. Como el tema vive en una prop de React y no en una clase sobre `<html>`, el anillo no puede cambiar según el tema, así que se usa `blue-500` — el único acento que supera el 3:1 de contraste no textual (WCAG 2.1 SC 1.4.11) sobre **ambos** fondos: 5.48:1 sobre `slate-950` y 3.52:1 sobre `slate-50`. (`emerald-500`, el otro candidato, se queda en 2.48:1 sobre el fondo claro.)

`transition-all` y `transition-colors` de Tailwind 4 incluyen `outline-color` en su lista de propiedades, lo que haría que el anillo se fundiera desde el color de texto del elemento en vez de aparecer a plena intensidad. Ambas utilidades se redeclaran en `index.css` sin esa propiedad. **Si añades una utilidad `transition-*` nueva, exclúyela también ahí.**

Corolario: **todo elemento clicable debe ser un `<button>` o un `<a>`**, nunca un `div` con `onClick`. Un `div` no recibe foco, así que el anillo jamás aparecería sobre él y el teclado no podría activarlo.

Este anillo es el **único** mecanismo de foco del proyecto: no añadas `focus:outline-none` con anillos propios por componente, ni siquiera en campos de formulario.

**Scrollbar.** Personalizado a 6px con pulgar `slate-400` translúcido, definido en `index.css`.

**Iconos.** [Lucide](https://lucide.dev), a `w-3.5`, `w-4` o `w-5` según jerarquía. Nunca emoji como marcador de sección — chocaría con la estética de terminal.

**Scroll de navegación.** [`scroll.ts`](src/utils/scroll.ts) calcula el desplazamiento restando la altura real de la cabecera fija más 16px de margen. Usa siempre este helper en vez de `scrollIntoView`, o el destino queda tapado por la cabecera.

## Deuda conocida

- Las píldoras de tecnología usan `font-black` (900), pero JetBrains Mono llega solo hasta 800 —también en su versión variable—, así que el navegador sintetiza esa diferencia. Eliminarla exigiría bajar las píldoras a `font-extrabold`.
- Los caracteres `➔` y `✖` quedan fuera del subconjunto latino, así que se renderizan con una fuente del sistema. Ya ocurría con Google Fonts; sustituirlos por iconos de Lucide lo resolvería.

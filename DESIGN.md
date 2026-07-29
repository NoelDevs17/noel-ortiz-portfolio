# Sistema de Diseño

Documento vivo del portafolio de Noel Ortiz. Recoge las decisiones tomadas y,
sobre todo, **por qué**: una regla sin su motivo se rompe en cuanto estorba.

Los números de contraste que aparecen aquí están medidos, no estimados.

---

## Reglas operativas

Las cinco reglas que gobiernan cualquier cambio. Si una decisión nueva choca con
alguna, la que cede es la decisión.

### 1. Criterio de tokenización

> **Si un valor sustituye a un color de la paleta, se tokeniza. Si su trabajo es
> oscurecer o aclarar lo que haya detrás, se queda como está.**

Un `border-white/5` que hace de borde es paleta disfrazada: pasa a `hairline`.

**El tema claro afinó esta regla.** La primera versión daba por buenos los
velos de composición tal cual, pero un velo blanco solo aclara sobre fondo
oscuro: sobre claro desaparece. Un valor que **depende del tema** es paleta,
aunque parezca composición. De ahí salieron tres tokens nuevos:

| Antes | Ahora | Por qué |
|---|---|---|
| `hover:bg-white/5` | `hover:bg-elevate/5` | Debe oscurecer sobre claro |
| `via-white` | `via-peak` | El extremo del degradado se invierte |
| Rejilla en `rgba(255,255,255,.02)` | Clase `.grid-backdrop` con `--hairline` | Las líneas blancas no existen sobre claro |

Lo único que sobrevive crudo es `shadow-black/5`: las sombras parten de negro
en los dos temas. **Prueba definitiva: si el valor tendría que cambiar al
invertir el fondo, es un token.**

### 2. Un único mecanismo de foco

> **Nada de `focus:outline-none` por componente. El anillo global es el único
> mecanismo.**

Está definido una vez en `index.css` y **fuera de `@layer`**, para que gane a
cualquier utilidad que intente anularlo. Si un componente necesita un foco
distinto, se cambia la regla global, no se apaga la de ese componente.

### 3. Nada estructural cuelga de un borde débil

> **Ninguna estructura visual debe depender exclusivamente de un borde por
> debajo de 3:1.**

Ver [Superficies y bordes](#superficies-y-bordes).

### 4. Las transiciones no tocan el foco

> **Toda utilidad `transition-*` nueva debe excluir `outline-color`.**

Un anillo de foco que se desvanece llega tarde a quien depende de él. `all` está
redefinido en `tailwind.config.js` sin propiedades `outline-*`. Si algún día se
añade otra clave a `transitionProperty`, hay que revisarla igual.

### 5. Todo lo clicable es `<button>` o `<a>`

> **Nada de `<div onClick>`. Y los `<a>` de `react-scroll` necesitan `href`
> real, o quedan fuera del orden de tabulación.**

`react-scroll` renderiza `<a>` sin `href` ni `tabindex`, y un ancla sin `href`
no es focusable. Eso dejó la navegación principal completa inalcanzable con
teclado: solo había 6 elementos focusables en toda la página. Cada `Link` lleva
ahora su `href={"#" + id}`.

Corolario: **todo control interactivo necesita nombre accesible**. Los enlaces
que solo llevan icono usan `aria-label`.

---

## Color

Una sola regla ordena la paleta:

> **El azul es el único acento con peso. El verde es exclusivamente funcional.**

El azul marca lo que el usuario puede *hacer*: navegación, CTAs, enlaces y foco.
El verde marca un *estado*, nunca una jerarquía visual.

### Tokens

Ningún componente conoce el tema. Los valores son variables CSS declaradas en
`src/index.css`: el oscuro en `:root` y el claro en `html.light`. Tailwind solo
guarda el cableado.

| Token | Oscuro | Claro | Trabajo |
|---|---|---|---|
| `primary-bg` | `#0b0c0d` | `#f2f0e9` | Fondo base |
| `secondary-bg` | `#17191d` | `#ffffff` | Superficie elevada: tarjetas y secciones alternas |
| `text-primary` | `#f5f4ef` | `#121315` | Títulos y texto de peso |
| `text-secondary` | `#9aa0a6` | `#55585d` | Párrafos y texto de apoyo |
| `muted` | `#6b6e73` | `#7d8288` | Chrome no textual (scrollbar) |
| `accent` | `#60a5fa` | `#185bd8` | Navegación, CTAs, enlaces, foco |
| `success` | `#75f0c9` | `#047857` | **Solo** `Project.status === "production"` |
| `hairline` | blanco 20% | negro 20% | Filete de refuerzo en bordes |
| `elevate` | blanco | negro | Velo de composición en estados hover |
| `peak` | blanco | negro | Extremo del degradado del nombre en el Hero |

Se declaran como **canales RGB sueltos** (`96 165 250`), no como color cerrado,
porque Tailwind necesita inyectar la opacidad: `bg-accent/10` compila a
`rgb(var(--accent) / 0.1)`. Con un `#hex` todos los modificadores `/N` del
proyecto se romperían.

### Los dos azules

`#60a5fa` sobre oscuro (7.70:1) y `#185bd8` sobre claro (5.22:1). **No son
intercambiables:** `#185bd8` sobre `#0b0c0d` da 3.29:1 y no alcanza el 4.5:1 de
texto; `#60a5fa` sobre `#f2f0e9` se lava. Cada uno solo funciona en su tema.

El favicon usa un tercero, `#2563eb`, por una razón distinta: no vive sobre
nuestro fondo sino sobre el cromo del navegador, que puede ser blanco o negro.
`#60a5fa` sobre una pestaña clara da 2.54:1.

### Por qué el verde está confinado

El esmeralda del tema oscuro (`#75f0c9`) da **1.22:1 sobre el fondo claro**:
invisible. Por eso en claro el verde funcional es oscuro (`#047857`, 4.81:1).

Es exactamente el motivo por el que el verde no puede cargar con significado
estructural: **es el único token que cambia de familia, no solo de luminosidad**,
al cruzar de tema. Solo comunica estado, y siempre acompañado de texto.

Si `success` aparece fuera de un badge de estado, es un error de revisión.

### Las opacidades no se heredan entre temas

Un modificador `/N` que cumple sobre oscuro **puede incumplir sobre claro**. Al
bajar opacidad el texto se acerca al fondo, y el margen disponible no es el
mismo en los dos temas. Dos casos reales encontrados al portar:

| Uso | Oscuro | Claro |
|---|---|---|
| Tecnologías con `text-text-secondary/80` | 5.05:1 ✅ | **3.99:1 ❌** |
| Pastilla con `text-accent/80` | 4.80:1 ✅ | **3.31:1 ❌** |

Los dos se resolvieron quitando el modificador. **Regla: cualquier `/N` sobre
texto se mide en los dos temas antes de darlo por bueno.**

### Dos combinaciones al límite en el tema claro

Cumplen, pero sin margen. **Cualquier cambio en esos fondos obliga a
re-medirlas:**

| Combinación | Ratio | Mínimo | Margen |
|---|---|---|---|
| Pastilla de fecha: `#185bd8` sobre `bg-accent/10` | **4.53:1** | 4.5 | 0.03 |
| Verde funcional: `#047857` sobre `#f2f0e9` | **4.81:1** | 4.5 | 0.31 |

Concretando lo que no se puede hacer sin volver a medir: subir la opacidad de
la pastilla por encima de `/10`, oscurecer `primary-bg` en claro, o aclarar el
verde funcional.

---

## Cómo se conmuta el tema

Tres piezas:

1. **Script de arranque en `index.html`.** Corre antes del bundle, lee la
   elección guardada o la preferencia del sistema, pone la clase `light` y pinta
   el fondo. Sin él el documento se queda blanco hasta que React monta, lo que
   produce un fogonazo al entrar en oscuro.
2. **`useTheme`.** Mantiene el estado, persiste en `localStorage`, conmuta la
   clase, sincroniza `color-scheme` y reescribe el `<meta name="theme-color">`.
3. **Las variables CSS.** Todo lo demás sale solo.

La lógica de resolución está **duplicada a propósito** entre el script y el
hook: aquel corre antes de que este módulo exista. Si cambia la clave de
almacenamiento, la regla de respaldo o los dos colores de fondo, hay que
cambiarlo en los dos sitios.

Consecuencia de diseño que conviene apreciar: **ningún componente recibe el
tema como prop**. No hay `isDark` viajando por el árbol; solo el conmutador del
Navbar conoce el estado.

---

## Superficies y bordes

`secondary-bg` está **5.4 puntos de L\* por encima** de la base en oscuro y
**5.2 en claro** — el mismo salto perceptual en los dos temas, aunque en oscuro
la superficie sube hacia el blanco y en claro también (de `#f2f0e9` a
`#ffffff`).

El ratio de contraste es mala guía aquí: la constante de reflexión de la fórmula
WCAG comprime todas las diferencias entre casi-negros, y `#111315` frente a
`#202225` apenas se separan en esa escala. **L\*, la luminosidad percibida,
discrimina mucho mejor.** El salto elegido sitúa la superficie en la misma banda
que `gray-900` de Tailwind (L\* 8.3) o `zinc-900` (L\* 8.4): todavía casi-negro,
no gris.

### Regla de dependencia estructural

El filete `hairline` compone a `#45474a` sobre la superficie: **1.89:1**. Para
llegar a 3:1 haría falta un blanco al 33% (`#606162`), que ya no se lee como
filete sino como caja gris.

De ahí la regla: **el borde refuerza, no sustituye**. Toda tarjeta, barra o panel
debe distinguirse por su propia superficie, y usar el filete solo para definir el
canto.

> Prueba rápida: **si al quitar mentalmente el borde el elemento desaparece, lo
> que hay que subir es la superficie.**

Esto es exactamente lo que se corrigió al pasar `secondary-bg` de `#111315`
(ΔL\* 2.5, invisible en pantallas de bajo contraste) a `#17191d`.

WCAG 1.4.11 no exige 3:1 al filete porque ninguna información depende de él. Esa
exención **solo se sostiene mientras se respete la regla de arriba**.

---

## Tipografía

**JetBrains Mono para todo.** Es la decisión más característica del sistema: no
hay una fuente para títulos y otra para texto. Se sirve self-hosted con
`@fontsource-variable/jetbrains-mono`, importada en `main.tsx`. Cero peticiones a
Google.

Ojo: `font-sans` y `font-mono` resuelven **a la misma familia**. `font-mono` se
usa como marcador semántico —etiquetas, fechas, datos— aunque hoy no produzca
ningún cambio visual. Está anotado en la deuda.

### Escala

No es una escala modular estricta: son los pasos de Tailwind que el diseño usa.

| Paso | Dónde |
|---|---|
| `text-8xl` / `7xl` / `5xl` | Nombre del Hero (responsivo) |
| `text-7xl` / `5xl` | Texto fantasma de los títulos de sección |
| `text-6xl` / `5xl` / `3xl` | Typewriter del Hero |
| `text-4xl` / `3xl` | Títulos de sección y `h2` de Contacto |
| `text-3xl` / `2xl` | Títulos de categoría de Skills |
| `text-2xl` | Logo, `h3` de About, el "Hello!" |
| `text-xl` | Puesto en Experiencia, institución en Educación |
| `text-lg` | Texto de párrafo. El tamaño más usado |
| `text-sm` / `xs` | Fechas, tecnologías, pie |

Pesos: `font-bold` para títulos, `font-semibold` para subtítulos, `font-medium`
para etiquetas, `font-light` en el párrafo de About.

---

## Layout y ritmo vertical

- **Ritmo de sección:** `py-24` (About, Experiencia) o `py-32` (Skills,
  Proyectos, Contacto). El Hero ocupa `h-screen`. El pie, `py-8`.
- **Contenedor:** `container mx-auto` con padding lateral `px-6`, que sube a
  `lg:px-20` o `lg:px-12` según la sección.
- **Anchos máximos:** `max-w-7xl` en Skills, `max-w-2xl` en Contacto (columna de
  lectura estrecha, a propósito), `max-w-6xl` en la barra flotante.
- **Barra de navegación:** fija, `w-[95%] max-w-6xl`, separada del borde
  superior (`top-4`). Gana fondo translúcido, `backdrop-blur` y filete al pasar
  de 50 px de scroll.
- **`scroll-padding-top: 100px`** en `html`, para que los anclajes no queden
  debajo de la barra fija. El mismo valor va como `offset={-100}` en
  `react-scroll`. **Si cambia uno, cambia el otro.**

Las secciones alternan `primary-bg` y `secondary-bg` para marcar el ritmo — con
dos excepciones que hoy rompen el patrón (ver deuda).

---

## Componentes recurrentes

### Tarjeta

`bg-secondary-bg` (o `bg-primary-bg/80` con `backdrop-blur` en Experiencia),
`border border-hairline`, `rounded-md`, `p-6`. Al pasar el ratón, el borde vira a
`accent/30` y el título a `accent`, coordinados con `group-hover`.

### Título de sección con texto fantasma

Dos capas del mismo texto: la de delante en `accent`, y detrás una copia mucho
mayor en `text-text-primary opacity-[0.06]`, centrada en términos absolutos.

El fantasma **debe ser un texto claro con opacidad muy baja**, no un color
sólido oscuro. Antes usaba `text-secondary-bg`, y al subir la superficie se
volvió invisible: el fantasma dependía de que la superficie fuera casi idéntica
al fondo.

### Pastilla de dato

`text-accent/80` sobre `bg-accent/10`, `px-3 py-1`, `rounded-md`, `font-mono
text-sm`. Para fechas y periodos. Compuesta da 4.80:1 — pasa, pero **con poco
margen: no bajar más la opacidad del texto**.

### Etiqueta / tag

`border border-text-secondary/20`, `rounded-full`, `px-6 py-2`. Para
competencias. Al pasar el ratón el borde vira a `accent`.

### Botones

Dos variantes, ambas de contorno; **no hay botón de relleno sólido en reposo**:

- **CTA principal** (Contacto): `border-2 border-accent text-accent`, con
  `hover:bg-accent/10` y elevación de 1 px.
- **Acción de barra** (RESUME): `border border-accent`, y al pasar el ratón
  **invierte** a `bg-accent text-primary-bg` (7.70:1).

### Línea temporal

Línea vertical con degradado `from-accent via-accent/40 to-transparent` al 30% de
opacidad, y punto con `border-accent` y halo `rgba(96,165,250,.8)`. Las tarjetas
alternan lado en escritorio y se apilan a la izquierda en móvil.

### Badge de estado *(pendiente)*

El único sitio donde debe aparecer `success`. Entra con el contenido real, en la
Fase D. Va siempre acompañado de texto: el color no puede ser el único portador
del significado.

---

## Movimiento

### Patrones

| Patrón | Valores |
|---|---|
| Entrada por scroll | `initial={{opacity:0, y:20}}` → `whileInView`, `viewport={{once:true}}`, 0.5–0.6 s |
| Escalonado en listas | `delay: index * 0.1` |
| Entrada de la barra | `y:-100` → `0`, 0.8 s, `easeOut` |
| Bucles de fondo | Blobs del Hero a 10 s y 12 s, `easeInOut`, `repeat: Infinity` |
| Hover de tarjeta | `whileHover={{scale:1.05, y:-5}}` |
| Transiciones CSS | `duration-300` por defecto; 500–700 ms en superposiciones e imágenes |

`viewport={{ once: true }}` en todas las entradas: **la animación se dispara una
vez**. Repetirla al volver a pasar convierte el scroll en un espectáculo y
cansa.

### Movimiento reducido, en tres capas

Ninguna cubre a las otras dos:

| Capa | Qué cubre |
|---|---|
| `<MotionConfig reducedMotion="user">` | Todo framer-motion. Desactiva transformaciones y deja pasar la opacidad, que no marea |
| `@media (prefers-reduced-motion: reduce)` | Animaciones CSS de Tailwind (`animate-pulse`), transiciones de hover, scroll suave |
| Rama explícita en `Typewriter` | El efecto de escritura, que es JS con temporizadores y no lo alcanza ninguna de las anteriores |

Con movimiento reducido el `Typewriter` pinta la primera frase completa y sin
cursor: **el contenido no se pierde, solo deja de moverse**. Y no programa ningún
temporizador, en vez de programarlos y ocultar el resultado.

---

## Foco y teclado

```css
:focus-visible {
  outline: 2px solid theme(colors.accent);
  outline-offset: 3px;
}
```

- **Fuera de `@layer`**: Tailwind emite lo no estratificado después de las
  utilidades, así que esta regla gana a cualquier `focus:outline-none`.
- **`:focus-visible`, no `:focus`**: el anillo aparece al navegar con teclado, no
  al hacer clic.
- El azul da 7.70:1 sobre la base y 6.92:1 sobre la superficie: muy por encima
  del 3:1 exigido a un componente.

Recorrido verificado con pulsaciones reales de Tab: **11 paradas en ciclo
completo**, todas con anillo y con nombre accesible.

Al redefinir `transitionProperty.all` hubo que conservar `width` y `height`: el
subrayado de la navegación anima su ancho, y copiar la lista por defecto de
Tailwind sin más lo habría roto en silencio.

---

## Recursos

- **Favicon:** N de barras blanca sobre `#2563eb`. Las barras se engrosaron de 46
  a 76 unidades sobre un lienzo de 512 porque a 16 px medían 1.4 px y la letra no
  se leía. Paquete: SVG, PNG de 16/32/180/192/512 y `.ico` con 16+32+48.
- **Open Graph:** `og-image.png` de 1200×630. Base `#0b0c0d`, barra de acento
  azul, nombre y titular. Referenciada con **URL absoluta**: las redes no
  resuelven rutas relativas.
- **Marcador de proyecto:** `project-placeholder.svg` local, 800×500, con la
  paleta. El `<img>` declara `width` y `height` para reservar el hueco y evitar
  el salto de layout al llegar las capturas reales.
- **Cero dominios externos.** Verificado sobre el build de producción. Cualquier
  recurso nuevo se sirve desde el propio origen.

### El CV es un archivo estático, mantenido a mano

`public/cv-noel-ortiz.pdf`. **No se genera desde los datos del sitio.** Se
descartó a propósito la vista de impresión que producía el CV a partir de
`data.ts`: el CV lo mantiene Noel y lo reemplaza cuando toca.

> ⚠️ **Esto significa que el sitio y el CV pueden divergir sin que nada avise.**
> Cada vez que cambien las experiencias, las certificaciones o la formación en
> `src/data/portfolioData.ts`, **hay que regenerar y reemplazar el PDF**. No hay
> comprobación automática que lo detecte.

Reglas del archivo:

- **El nombre no cambia.** `cv-noel-ortiz.pdf` es la ruta estable; sustituir el
  contenido, no crear `cv-v2.pdf`.
- **La ruta vive en `personalInfo.resumeLink`**, no cableada en el Navbar. Los
  dos botones (escritorio y móvil) leen de ahí, así que no pueden
  desincronizarse. En el proyecto original estaba escrita a mano en los dos.
- Los enlaces llevan `download`, `target="_blank"` y `rel="noopener"`.
- Hoy hay un **marcador de posición** en esa ruta para que el enlace no dé 404.
  Se nota al abrirlo: lo dice en la primera línea.

---

## Deuda conocida

### Contenido

- **Los proyectos siguen siendo un marcador.** Todo lo demás —perfil,
  experiencia, formación, certificaciones, idiomas y tecnologías— ya es
  contenido real. Los proyectos se trabajan aparte, con sus capturas.
- **El texto fantasma de los títulos duplica el contenido en el DOM.** Lleva
  `aria-hidden`, así que los lectores de pantalla ya no lo anuncian, pero sigue
  siendo un nodo de texto repetido.

### Inconsistencias del sistema

- **Radios sin criterio.** Conviven `rounded-md` (el dominante), `rounded-xl` en
  una sola tarjeta, `rounded` a secas en los botones RESUME y `rounded-full` en
  pastillas. Habría que reducirlo a dos o tres.
- **Padding lateral inconsistente.** `lg:px-20`, `lg:px-12` y `lg:px-8` conviven
  sin razón aparente.
- **`font-mono` no hace nada visualmente**, porque `font-sans` resuelve a la
  misma familia. Es semántico y está bien, pero conviene saberlo antes de
  intentar depurar por qué no cambia nada.
- **El fantasma de los títulos es puramente decorativo y duplica el texto en el
  DOM.** Los lectores de pantalla anuncian el título dos veces. Debería llevar
  `aria-hidden`.

### Limitaciones aceptadas

- **El conmutador de tema en vivo no se pudo verificar automaticamente.** Ambos
  temas se comprobaron correctos tras recargar, pero al conmutar sin recarga el
  panel de navegador devolvía valores obsoletos. Diagnosticado: la pestaña
  estaba en `visibilityState: "hidden"` y `requestAnimationFrame` no llegaba a
  ejecutarse, así que el motor congela el recálculo de estilos. Se descartó que
  fuera del código: escribir la variable como estilo en línea sobre `<html>`
  tampoco recalculaba. Conviene confirmarlo a ojo en un navegador real.
- **La pastilla de fecha en claro pasa con poco margen** (4.53:1 frente al 4.5
  exigido). No bajar la opacidad de ese texto ni oscurecer su fondo.

- **El filete no llega a 3:1** (1.89:1). Aceptado bajo la regla de dependencia
  estructural, pero hay que revisarlo si algún componente se queda sin superficie
  propia.
- **La imagen Open Graph no usa JetBrains Mono, sino Consolas.** Se intentó
  apuntar `sharp` al `woff2` de `@fontsource` descomprimiéndolo a TTF y sirviendo
  un `fontconfig` propio; el librsvg que embebe `sharp` en Windows **ignora
  `FONTCONFIG_FILE`** — los renders con la fuente y con un nombre inexistente
  salen byte a byte idénticos. Sin instalar la fuente en el sistema no hay vía
  limpia. Consolas mantiene el carácter monoespaciado.
- **Movimiento reducido verificado solo estáticamente.** Se comprobó que las tres
  capas existen y que la regla `@media` llega a la hoja servida, pero no se pudo
  forzar la preferencia del sistema para observarlo en vivo.
- **`react-scroll` sigue siendo una dependencia con aristas.** El `href` resuelve
  la tabulación, pero la librería mantiene su propio estado de scroll. Si alguna
  vez estorba, sustituirla por `scrollIntoView` nativo es un cambio pequeño.

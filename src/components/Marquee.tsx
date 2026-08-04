import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { skillGroups } from "../data/portfolioData";
import { useI18n } from "../i18n/context";

/** Todas las tecnologias del stack, en el orden en que estan agrupadas. */
const technologies = skillGroups.flatMap((group) => group.skills);

/**
 * Marquesina de tecnologias que cierra el Hero.
 *
 * Dos detalles la sacan del terreno del banner decorativo:
 *
 * 1. **El bucle no salta.** La lista se pinta duplicada y la pista se desplaza
 *    exactamente la mitad de su ancho, asi que al terminar la segunda copia
 *    esta donde arrancó la primera. Para que la mitad caiga en el sitio exacto,
 *    la separacion va como margen derecho de cada elemento y no como `gap` del
 *    contenedor: con `gap` falta la separacion que sigue al ultimo elemento y
 *    el bucle se desplaza media separacion en cada vuelta.
 *
 * 2. **Responde al scroll.** La velocidad de reproduccion sube con la velocidad
 *    del scroll y puede volverse negativa si se sube rapido; vuelve sola a 1 al
 *    soltar. Nunca llega a pararse del todo. Esto exige una animacion WAAPI de
 *    verdad —de ahi la @keyframes de Tailwind y no framer-motion—, porque lo
 *    que se manipula es su `playbackRate`.
 */
const Marquee = () => {
  const { t } = useI18n();
  const trackRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    let frame = 0;
    let retry = 0;
    let animation: Animation | undefined;
    let last = window.scrollY;
    let target = 1;
    let rate = 1;

    const onScroll = () => {
      const delta = window.scrollY - last;
      last = window.scrollY;
      // Techo asimetrico: acelerar hacia delante cunde mas que ir marcha atras.
      target = Math.max(-3.5, Math.min(5, 1 + delta * 0.06));
    };

    const loop = () => {
      // La velocidad objetivo vuelve a 1 sola; la aplicada la persigue mas
      // rapido. Dos interpolaciones encadenadas: la primera decide a donde ir,
      // la segunda evita que el cambio se note como un tiron.
      target += (1 - target) * 0.05;
      rate += (target - rate) * 0.12;
      if (animation) {
        animation.playbackRate = Math.abs(rate) < 0.05 ? 0.05 : rate;
      }
      frame = requestAnimationFrame(loop);
    };

    // La animacion CSS puede no existir todavia en el primer fotograma.
    const attach = () => {
      animation = trackRef.current?.getAnimations()[0];
      if (!animation && retry++ < 10) {
        frame = requestAnimationFrame(attach);
        return;
      }
      window.addEventListener("scroll", onScroll, { passive: true });
      loop();
    };
    attach();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [prefersReducedMotion]);

  return (
    <div className="group relative z-[2] mt-24 overflow-hidden border-y border-line2 py-5">
      <div
        ref={trackRef}
        className={`flex w-max ${
          prefersReducedMotion
            ? ""
            : "animate-marquee group-hover:[animation-play-state:paused]"
        }`}
      >
        {/*
          Dos copias. La segunda solo existe para que el bucle cierre, asi que
          se oculta a los lectores de pantalla; la primera ya nombra el stack
          entero —y la seccion 02 lo repite con detalle.
        */}
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-label={copy === 0 ? t.hero.marqueeAria : undefined}
            aria-hidden={copy === 0 ? undefined : true}
            className="flex w-max"
          >
            {technologies.map((skill) => {
              const Icon = skill.icon;
              return (
                <li
                  key={`${copy}-${skill.name}`}
                  className="mr-14 flex items-center gap-3.5 whitespace-nowrap text-xs uppercase tracking-[0.2em] text-text-secondary"
                >
                  <Icon size={15} aria-hidden="true" className="opacity-50" />
                  {skill.name}
                </li>
              );
            })}
          </ul>
        ))}
      </div>
    </div>
  );
};

export default Marquee;

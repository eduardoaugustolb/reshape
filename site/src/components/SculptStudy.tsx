"use client";

import { translate, type Locale } from "@/i18n";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const passes = (t: ReturnType<typeof translate>) => [
  { id: "base", label: t("Bloqueio", "Blockout"), detail: t("Defina a altura, a abertura e a silhueta do corpo.", "Set the height, opening, and silhouette of the body.") },
  { id: "volume", label: t("Volumes", "Volumes"), detail: t("Refine a inclinação da boca e a transição do ombro para o gargalo.", "Refine the tilt of the opening and the transition from shoulder to neck.") },
  { id: "surface", label: t("Superfície", "Surface"), detail: t("Esculpa os sulcos e confira como eles passam pelo corpo.", "Sculpt the grooves and check how they follow the body.") },
] as const;

const views = (t: ReturnType<typeof translate>) => [
  { id: "three-quarter", label: t("Três quartos", "Three-quarter") },
  { id: "front", label: t("Frente", "Front") },
  { id: "profile", label: t("Perfil", "Profile") },
] as const;

function Render({ pass, view, active, eager }: {
  pass: ReturnType<typeof passes>[number]["id"];
  view: ReturnType<typeof views>[number]["id"];
  active: boolean;
  eager?: boolean;
}) {
  return (
    <Image
      src={`/reshape/${pass}-${view}.webp`}
      className="study__render"
      data-active={active}
      width={720}
      height={580}
      loading={eager ? "eager" : "lazy"}
      alt=""
    />
  );
}

export function SculptPasses({ locale }: { locale: Locale }) {
  const t = translate(locale);
  const stages = passes(t);
  const figure = useRef<HTMLElement>(null);
  const [pass, setPass] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const element = figure.current;
    if (!element) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReduced(motion.matches);
    updateMotion();
    motion.addEventListener("change", updateMotion);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.35 });
    observer.observe(element);
    return () => {
      motion.removeEventListener("change", updateMotion);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!visible || !playing || reduced) return;
    const timer = window.setTimeout(() => setPass((pass + 1) % stages.length), 3200);
    return () => window.clearTimeout(timer);
  }, [pass, playing, reduced, visible, stages.length]);

  return (
    <figure ref={figure} className="figure study">
      <div className="study__frame" role="img" aria-label={`${t("Vaso em três quartos.", "Vase in three-quarter view.")} ${stages[pass].label}. ${stages[pass].detail}`}>
        {stages.map(({ id }, index) => (
          <Render key={id} pass={id} view="three-quarter" active={pass === index} eager />
        ))}
        <span className="study__view">{t("Três quartos", "Three-quarter")}</span>
      </div>
      <div className="study__controls">
        <div className="study__choices" role="group" aria-label={t("Passagens de modelagem", "Modeling passes")}>
          {stages.map(({ label }, index) => (
            <button key={label} type="button" aria-pressed={pass === index} onClick={() => {
              setPass(index);
              setPlaying(false);
            }}>{label}</button>
          ))}
        </div>
        <button className="study__play" type="button" hidden={reduced} onClick={() => setPlaying(!playing)}>
          {playing ? t("Pausar", "Pause") : t("Reproduzir", "Play")}
        </button>
      </div>
      <figcaption className="figure__caption" aria-live={playing && !reduced ? "off" : "polite"}>
        {stages[pass].detail}
      </figcaption>
    </figure>
  );
}

export function SculptComparison({ locale }: { locale: Locale }) {
  const t = translate(locale);
  const stages = passes(t);
  const angles = views(t);
  const [view, setView] = useState(0);
  return (
    <figure className="figure study">
      <div className="study__pair">
        {([stages[0], stages[2]] as const).map(({ id, label }) => (
          <div key={id} className="study__frame" role="img" aria-label={`${label} · ${angles[view].label}`}>
            {angles.map(({ id: angle }, index) => <Render key={angle} pass={id} view={angle} active={view === index} />)}
            <span className="study__view">{label}</span>
          </div>
        ))}
      </div>
      <div className="study__controls">
        <div className="study__choices" role="group" aria-label={t("Câmera da comparação", "Comparison camera")}>
          {angles.map(({ label }, index) => (
            <button key={label} type="button" aria-pressed={view === index} onClick={() => setView(index)}>{label}</button>
          ))}
        </div>
      </div>
      <figcaption className="figure__caption">{t("A câmera, a escala e a luz são iguais nas duas versões de cada vista.", "Camera, scale, and lighting match across both versions of each view.")}</figcaption>
    </figure>
  );
}

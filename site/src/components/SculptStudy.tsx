"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const passes = [
  { id: "base", label: "Bloqueio", detail: "Defina a altura, a abertura e a silhueta do corpo." },
  { id: "volume", label: "Volumes", detail: "Refine a inclinação da boca e a transição do ombro para o gargalo." },
  { id: "surface", label: "Superfície", detail: "Esculpa os sulcos e confira como eles passam pelo corpo." },
] as const;

const views = [
  { id: "three-quarter", label: "Três quartos" },
  { id: "front", label: "Frente" },
  { id: "profile", label: "Perfil" },
] as const;

function Render({ pass, view, active, eager }: {
  pass: typeof passes[number]["id"];
  view: typeof views[number]["id"];
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

export function SculptPasses() {
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
    const timer = window.setTimeout(() => setPass((pass + 1) % passes.length), 3200);
    return () => window.clearTimeout(timer);
  }, [pass, playing, reduced, visible]);

  return (
    <figure ref={figure} className="figure study">
      <div className="study__frame" role="img" aria-label={`Vaso em três quartos. ${passes[pass].label}. ${passes[pass].detail}`}>
        {passes.map(({ id }, index) => (
          <Render key={id} pass={id} view="three-quarter" active={pass === index} eager />
        ))}
        <span className="study__view">Três quartos</span>
      </div>
      <div className="study__controls">
        <div className="study__choices" role="group" aria-label="Passagens de modelagem">
          {passes.map(({ label }, index) => (
            <button key={label} type="button" aria-pressed={pass === index} onClick={() => {
              setPass(index);
              setPlaying(false);
            }}>{label}</button>
          ))}
        </div>
        <button className="study__play" type="button" hidden={reduced} onClick={() => setPlaying(!playing)}>
          {playing ? "Pausar" : "Reproduzir"}
        </button>
      </div>
      <figcaption className="figure__caption" aria-live={playing && !reduced ? "off" : "polite"}>
        {passes[pass].detail}
      </figcaption>
    </figure>
  );
}

export function SculptComparison() {
  const [view, setView] = useState(0);
  return (
    <figure className="figure study">
      <div className="study__pair">
        {([passes[0], passes[2]] as const).map(({ id, label }) => (
          <div key={id} className="study__frame" role="img" aria-label={`${label} do vaso, vista ${views[view].label.toLowerCase()}`}>
            {views.map(({ id: angle }, index) => <Render key={angle} pass={id} view={angle} active={view === index} />)}
            <span className="study__view">{label}</span>
          </div>
        ))}
      </div>
      <div className="study__controls">
        <div className="study__choices" role="group" aria-label="Câmera da comparação">
          {views.map(({ label }, index) => (
            <button key={label} type="button" aria-pressed={view === index} onClick={() => setView(index)}>{label}</button>
          ))}
        </div>
      </div>
      <figcaption className="figure__caption">A câmera, a escala e a luz são iguais nas duas versões de cada vista.</figcaption>
    </figure>
  );
}

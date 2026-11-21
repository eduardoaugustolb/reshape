"use client";

import { PauseIcon, PlayIcon } from "@phosphor-icons/react/ssr";
import { useState } from "react";
import { translate, type Locale } from "@/i18n";

export function HeaderMotion({ locale }: { locale: Locale }) {
  const [paused, setPaused] = useState(false);
  const t = translate(locale);

  return (
    <button className="icon-action" type="button" onClick={() => {
      document.documentElement.toggleAttribute("data-pause-header", !paused);
      setPaused(!paused);
    }}>
      {paused ? <PlayIcon aria-hidden="true" /> : <PauseIcon aria-hidden="true" />}
      {paused ? t("Retomar ícone", "Resume icon") : t("Pausar ícone", "Pause icon")}
    </button>
  );
}

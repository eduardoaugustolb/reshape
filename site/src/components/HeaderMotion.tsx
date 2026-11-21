"use client";

import { useState } from "react";
import { translate, type Locale } from "@/i18n";

export function HeaderMotion({ locale }: { locale: Locale }) {
  const [paused, setPaused] = useState(false);
  const t = translate(locale);

  return (
    <button type="button" onClick={() => {
      document.documentElement.toggleAttribute("data-pause-header", !paused);
      setPaused(!paused);
    }}>
      {paused ? t("Retomar ícone", "Resume icon") : t("Pausar ícone", "Pause icon")}
    </button>
  );
}

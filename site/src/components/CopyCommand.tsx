"use client";

import { useState } from "react";
import { translate, type Locale } from "@/i18n";

export function CopyCommand({ command, locale }: { command: string; locale: Locale }) {
  const [copied, setCopied] = useState(false);
  const t = translate(locale);
  return (
    <div className="cmd">
      <span>{command}</span>
      <button
        type="button"
        onClick={async () => {
          await navigator.clipboard.writeText(command);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }}
      >
        {copied ? t("Copiado", "Copied") : t("Copiar", "Copy")}
      </button>
    </div>
  );
}

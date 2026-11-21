"use client";

import { CheckIcon, CopyIcon } from "@phosphor-icons/react/ssr";
import { useState } from "react";
import { translate, type Locale } from "@/i18n";

export function CopyCommand({ command, locale }: { command: string; locale: Locale }) {
  const [copied, setCopied] = useState(false);
  const t = translate(locale);
  return (
    <div className="cmd">
      <span>{command}</span>
      <button
        className="icon-action"
        type="button"
        onClick={async () => {
          await navigator.clipboard.writeText(command);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }}
      >
        {copied ? <CheckIcon aria-hidden="true" /> : <CopyIcon aria-hidden="true" />}
        {copied ? t("Copiado", "Copied") : t("Copiar", "Copy")}
      </button>
    </div>
  );
}

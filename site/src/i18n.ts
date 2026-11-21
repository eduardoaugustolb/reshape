export type Locale = "pt-BR" | "en-US";

export function translate(locale: Locale) {
  return (portuguese: string, english: string) => locale === "en-US" ? english : portuguese;
}

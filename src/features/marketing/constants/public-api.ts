/** Public translated endpoints-er supported languages. */
export const PUBLIC_LANGUAGES = ["en", "es"] as const;
export type PublicLanguage = (typeof PUBLIC_LANGUAGES)[number];
export const DEFAULT_PUBLIC_LANGUAGE: PublicLanguage = "en";

/** Public booking slots-er fallback zone; browser zone na pele backend-o eta use kore. */
export const PUBLIC_TIMEZONE_FALLBACK = "America/Guayaquil";

/** Browser-er IANA timezone, unsupported browser-e documented school fallback. */
export function getPublicTimeZone(): string {
  if (typeof Intl === "undefined") return PUBLIC_TIMEZONE_FALLBACK;

  return (
    Intl.DateTimeFormat().resolvedOptions().timeZone || PUBLIC_TIMEZONE_FALLBACK
  );
}

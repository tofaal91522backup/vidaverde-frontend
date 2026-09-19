"use client";

import { useLanguage } from "@/providers/language-provider";

/**
 * Server-e dui bhashar version-i render kora thake; ekhane shudhu bachhai.
 *
 * Server component (jemon blog detail) localStorage-er bhasha jane na, ar
 * cookie porle marketing page static thake na. Tai server duita-i pathay, ar
 * browser-e visitor-er pochhondo dekhe ekta dekhano hoy. Hydration-e provider
 * "en" dey, tai server-er sathe mele; tar por Spanish hole bodlay.
 */
export function ByLanguage({
  en,
  es,
}: {
  en: React.ReactNode;
  es: React.ReactNode;
}) {
  const { language } = useLanguage();
  return <>{language === "es" ? es : en}</>;
}

/**
 * Hate lekha Spanish, Google Translate-er bahire. Jekhane Google eka tukro
 * prosongo chhara bhul kore ("From" -> "De", "usted" mishe jay) sheikhane.
 * EN-e English-i dekhay.
 */
export function HandTranslated({ en, es }: { en: string; es: string }) {
  return (
    <span translate="no">
      <ByLanguage en={en} es={es} />
    </span>
  );
}

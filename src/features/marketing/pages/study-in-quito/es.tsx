"use client";

import { HandTranslated } from "@/components/shared/by-language";

/*
  Study in Quito-r je tukro Google bhul kore, sheta hate. Map-e na thakle
  Google-er hatei.
  - "Free" (schedule-e fanka shomoy) -> "Gratis" (binamulye)
  - "(seasonal)" -> "(temporada alta)" (peak season)
  - "(you choose)" -> "(usted elige)"; baki site "tú"
  - "guide and teacher" -> "profesora" (ekta lingo dhore nito)
*/
const ES: Record<string, string> = {
  Free: "Libre",
  "2–6 hours of one-on-one Spanish classes per day (you choose)":
    "De 2 a 6 horas diarias de clases particulares de español (tú eliges)",
  "Experienced Vida Verde guide and teacher":
    "Guía y docente de Vida Verde con experiencia",
  "Whale-watching or Isla de la Plata (seasonal)":
    "Avistamiento de ballenas o Isla de la Plata (según temporada)",
  "Flexible afternoons. Beach, town, whale-watching (seasonal)":
    "Tardes flexibles: playa, pueblo y avistamiento de ballenas (según temporada)",
};

export function Es({ text }: { text: string }) {
  const es = ES[text];
  return es ? <HandTranslated en={text} es={es} /> : <>{text}</>;
}

/** Program naam — navbar-er "Aula Viajera"-r sathe mile; Google "Aula itinerante" dito */
export function ProgramName({ en, es }: { en: string; es?: string }) {
  return es ? <HandTranslated en={en} es={es} /> : <>{en}</>;
}

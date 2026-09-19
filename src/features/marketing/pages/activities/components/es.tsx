"use client";

import { HandTranslated } from "@/components/shared/by-language";

/*
  Activities page-er chhoto label Google prosongo chhara bhul kore:
  "Wed" -> "Casarse" (biye kora), "Sat" -> "Se sentó", "Sun" -> "Sol",
  "Break" -> "Romper", "Custom" -> "Costumbre" (obhyash), "Travelling
  classroom" -> "Aula itinerante" (navbar-e "Aula Viajera"). Egula hate;
  map-e na thakle Google-er hatei.
*/
const ES: Record<string, string> = {
  Mon: "Lun",
  Tue: "Mar",
  Wed: "Mié",
  Thu: "Jue",
  Fri: "Vie",
  Sat: "Sáb",
  Sun: "Dom",
  Time: "Horario",
  Break: "Recreo",
  Culinary: "Gastronomía",
  Volunteer: "Voluntariado",
  "Travelling classroom": "Aula Viajera",
  Custom: "A medida",
  "Plan a custom track": "Planifica tu itinerario",
};

/** Price + note ek shathe — alada anubad hole shobdo-r kram ulte jay */
const PRICE_ES: Record<string, [string, string]> = {
  "Custom|quote": ["Presupuesto", "a medida"],
  "Contact|for details": ["Escríbenos", "para más detalles"],
};

export function Es({ text }: { text: string }) {
  const es = ES[text];
  return es ? <HandTranslated en={text} es={es} /> : <>{text}</>;
}

export function priceEs(price: string, note?: string) {
  return PRICE_ES[`${price}|${note ?? ""}`];
}

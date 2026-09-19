"use client";

import { usePublicTeachers } from "@/features/marketing/pages/courses/queries/use-public-teachers";
import { useLanguage } from "@/providers/language-provider";
import { useMemo } from "react";

/*
  Teacher card-er je tukro Google eka pele bhul kore, sheguler hate lekha ES.
  Home, Online Classes ar teacher profile — tinta jaygay eki card, tai ekhane.
*/

/*
  Tag admin-er free text, English-e, `?lang=es`-eo English ashe. Google ekta
  shobdo prosongo chhara pay: "travel spanish" -> "viajar español", "writing"
  -> "escribiendo". Jana tag gula ekhane; notun tag map-e na thakle Google-i
  anubad kore.
*/
const TAG_ES: Record<string, string> = {
  "dele preparation": "preparación DELE",
  grammar: "gramática",
  "business spanish": "español de negocios",
  children: "niños",
  beginners: "principiantes",
  "homestay support": "apoyo con la familia anfitriona",
  conversation: "conversación",
  pronunciation: "pronunciación",
  "travel spanish": "español para viajar",
  "ecuadorian slang": "jerga ecuatoriana",
  advanced: "avanzado",
  literature: "literatura",
  writing: "escritura",
};

export function TeacherTag({ tag }: { tag: string }) {
  const { language } = useLanguage();
  const es = TAG_ES[tag.trim().toLowerCase()];
  if (language !== "es" || !es) return <>{tag}</>;
  // "Travel Spanish" (Our School-er static tag) -> "Español para viajar";
  // API-r chhoto hater tag chhoto hater-i thake
  const capitalised = /^[A-Z]/.test(tag.trim());
  return (
    <span translate="no">
      {capitalised ? es[0].toUpperCase() + es.slice(1) : es}
    </span>
  );
}

/** "Teacher" — Google "Maestro" lekhe, Gabriela/Lucía/Rosa-r card-eo. "Docente" dui lingei chole. */
export function TeacherRoleLabel() {
  const { language } = useLanguage();
  return <span translate="no">{language === "es" ? "Docente" : "Teacher"}</span>;
}

/**
 * "Book with Fernando" — naam `translate="no"` hole Google baki tuku eka pay
 * ar "Reservar con" (infinitive) lekhe; baki page "Reserva" (tú). Ek span-e
 * rakha, karon Google-er <font> alada flex item hoye button-er gap pay.
 */
export function BookWithLabel({ name }: { name: string }) {
  const { language } = useLanguage();
  return (
    <span translate="no">
      {language === "es" ? "Reserva con" : "Book with"} {name}
    </span>
  );
}

/**
 * Bio-r Spanish admin na likhle `?lang=es` English-i pathay. Shob shomoy
 * `translate="no"` dile ES-e English theke jay — tai English-er shathe mile,
 * shudhu je bio alada (school-er nijer Spanish) sheta Google theke bachai.
 * EN-e eki query, alada request na.
 */
export function useOwnSpanishBio() {
  const { data: english } = usePublicTeachers({ lang: "en" });
  const englishBio = useMemo(
    () => new Map(english?.map((t) => [t.id, t.description])),
    [english],
  );
  return (id: string, description: string) =>
    description !== englishBio.get(id);
}

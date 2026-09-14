"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import {
  DEFAULT_PUBLIC_LANGUAGE,
  type PublicLanguage,
} from "@/features/marketing/constants/public-api";

export type LanguageCode = PublicLanguage;

export type TranslationKey =
  | "nav.primary"
  | "nav.openMenu"
  | "nav.onlineClasses"
  | "nav.studyInQuito"
  | "nav.travelSpanish"
  | "nav.ourSchool"
  | "nav.blog"
  | "nav.contact"
  | "nav.teachers"
  | "nav.bookLesson"
  | "nav.quitoImmersion"
  | "nav.travellingClassroom"
  | "nav.puertoLopez"
  | "nav.tabBar"
  | "nav.home"
  | "nav.classesShort"
  | "nav.quitoShort"
  | "nav.bookShort"
  | "nav.dashboard"
  | "nav.more"
  | "cta.bookFirstLesson"
  | "language.label"
  | "footer.description"
  | "footer.member"
  | "footer.whatsapp"
  | "footer.quickLinks"
  | "footer.findUs"
  | "footer.location"
  | "footer.getInTouch"
  | "footer.study"
  | "footer.school"
  | "footer.homestay"
  | "footer.blog"
  | "footer.privacyPolicy"
  | "footer.terms";

const translations: Record<LanguageCode, Record<TranslationKey, string>> = {
  en: {
    "nav.primary": "Primary navigation",
    "nav.openMenu": "Open menu",
    "nav.onlineClasses": "Online Classes",
    "nav.studyInQuito": "Study in Quito",
    "nav.travelSpanish": "Travel Spanish",
    "nav.ourSchool": "Our School",
    "nav.blog": "Blog",
    "nav.contact": "Contact",
    "nav.teachers": "Teachers",
    "nav.bookLesson": "Book a Lesson",
    "nav.quitoImmersion": "Quito Immersion Program",
    "nav.travellingClassroom": "Travelling Classroom",
    "nav.puertoLopez": "Puerto López",
    "nav.tabBar": "Quick navigation",
    "nav.home": "Home",
    // Tab-er niche ek shobde dhukte hobe — "Online Classes" wrap kore jay
    "nav.classesShort": "Classes",
    "nav.quitoShort": "Quito",
    "nav.bookShort": "Book",
    "nav.dashboard": "Dashboard",
    "nav.more": "More",
    "cta.bookFirstLesson": "Book Your First Lesson",
    "language.label": "Language",
    "footer.description":
      "One-on-one Spanish immersion, homestays, and cultural activities in Quito, Ecuador.",
    "footer.member":
      "Family-run Spanish school in La Floresta, Quito since 1999.",
    "footer.whatsapp": "Chat on WhatsApp",
    "footer.quickLinks": "Quick Links",
    "footer.findUs": "Find Us",
    "footer.location": "La Floresta, Quito, Ecuador",
    "footer.getInTouch": "Get in Touch",
    "footer.study": "Study",
    "footer.school": "School",
    "footer.homestay": "Homestay",
    "footer.blog": "Blog",
    "footer.privacyPolicy": "Privacy Policy",
    "footer.terms": "Terms",
  },
  es: {
    "nav.primary": "Navegación principal",
    "nav.openMenu": "Abrir menú",
    "nav.onlineClasses": "Clases en Línea",
    "nav.studyInQuito": "Estudiar en Quito",
    "nav.travelSpanish": "Español para Viajar",
    "nav.ourSchool": "Nuestra Escuela",
    "nav.blog": "Blog",
    "nav.contact": "Contacto",
    "nav.teachers": "Profesores",
    "nav.bookLesson": "Reservar una Clase",
    "nav.quitoImmersion": "Programa de Inmersión en Quito",
    "nav.travellingClassroom": "Aula Viajera",
    "nav.puertoLopez": "Puerto López",
    "nav.tabBar": "Navegación rápida",
    "nav.home": "Inicio",
    "nav.classesShort": "Clases",
    "nav.quitoShort": "Quito",
    "nav.bookShort": "Reservar",
    "nav.dashboard": "Panel",
    "nav.more": "Más",
    "cta.bookFirstLesson": "Reserva tu Primera Clase",
    "language.label": "Idioma",
    "footer.description":
      "Inmersión en español personalizada, alojamiento con familias y actividades culturales en Quito, Ecuador.",
    "footer.member":
      "Escuela de español familiar en La Floresta, Quito desde 1999.",
    "footer.whatsapp": "Chatea por WhatsApp",
    "footer.quickLinks": "Enlaces Rápidos",
    "footer.findUs": "Encuéntranos",
    "footer.location": "La Floresta, Quito, Ecuador",
    "footer.getInTouch": "Contáctanos",
    "footer.study": "Estudiar",
    "footer.school": "Escuela",
    "footer.homestay": "Alojamiento",
    "footer.blog": "Blog",
    "footer.privacyPolicy": "Política de Privacidad",
    "footer.terms": "Términos",
  },
};

const STORAGE_KEY = "vv-language";

type LanguageContextValue = {
  language: LanguageCode;
  setLanguage: (code: LanguageCode) => void;
  t: (key: TranslationKey) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function readStoredLanguage(): LanguageCode {
  if (typeof window === "undefined") return DEFAULT_PUBLIC_LANGUAGE;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "en" || stored === "es" ? stored : DEFAULT_PUBLIC_LANGUAGE;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>(readStoredLanguage);

  const setLanguage = useCallback((code: LanguageCode) => {
    setLanguageState(code);
    window.localStorage.setItem(STORAGE_KEY, code);
  }, []);

  const t = useCallback(
    (key: TranslationKey) =>
      translations[language][key] ?? translations.en[key] ?? key,
    [language],
  );

  const value = useMemo(
    () => ({ language, setLanguage, t }),
    [language, setLanguage, t],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}

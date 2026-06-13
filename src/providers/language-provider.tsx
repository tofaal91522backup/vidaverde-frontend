"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type LanguageCode = "en" | "es";

const translations = {
  en: {
    "brand.subtitle": "Centro de Español",
    "nav.onlineClasses": "Online Classes",
    "nav.studyInQuito": "Study in Quito",
    "nav.travelSpanish": "Travel Spanish",
    "nav.ourSchool": "Our School",
    "nav.blog": "Blog",
    "nav.contact": "Contact",
    "nav.overview": "Overview",
    "nav.bookLesson": "Book a Lesson",
    "nav.teachers": "Teachers",
    "nav.quitoImmersion": "Quito Immersion Program",
    "nav.travellingClassroom": "Travelling Classroom",
    "nav.puertoLopez": "Puerto López",
    "nav.junglePrograms": "Jungle Programs",
    "nav.primary": "Primary navigation",
    "nav.openMenu": "Open menu",
    "cta.bookFirstLesson": "Book Your First Lesson",
    "language.label": "Language",
    "footer.quickLinks": "Quick Links",
    "footer.study": "Study",
    "footer.school": "School",
    "footer.homestay": "Homestay",
    "footer.blog": "Blog",
    "footer.privacyPolicy": "Privacy Policy",
    "footer.terms": "Terms",
    "footer.findUs": "Find Us",
    "footer.getInTouch": "Get in Touch",
    "footer.location": "La Floresta, Quito, Ecuador",
    "footer.whatsapp": "WhatsApp Us",
    "footer.description":
      "Teaching Spanish since 1999. AECEE-certified. La Floresta, Quito.",
    "footer.member":
      "Proud member of the Association of Spanish Language Schools (AECEE)",
    "footer.rights": "© 2026 Vida Verde Centro de Español. All rights reserved.",
  },
  es: {
    "brand.subtitle": "Centro de Español",
    "nav.onlineClasses": "Clases en línea",
    "nav.studyInQuito": "Estudia en Quito",
    "nav.travelSpanish": "Español para viajeros",
    "nav.ourSchool": "Nuestra escuela",
    "nav.blog": "Blog",
    "nav.contact": "Contacto",
    "nav.overview": "Resumen",
    "nav.bookLesson": "Reservar una clase",
    "nav.teachers": "Profesores",
    "nav.quitoImmersion": "Programa de inmersión en Quito",
    "nav.travellingClassroom": "Aula viajera",
    "nav.puertoLopez": "Puerto López",
    "nav.junglePrograms": "Programas en la selva",
    "nav.primary": "Navegación principal",
    "nav.openMenu": "Abrir menú",
    "cta.bookFirstLesson": "Reserva tu primera clase",
    "language.label": "Idioma",
    "footer.quickLinks": "Enlaces rápidos",
    "footer.study": "Estudiar",
    "footer.school": "Escuela",
    "footer.homestay": "Hospedaje familiar",
    "footer.blog": "Blog",
    "footer.privacyPolicy": "Política de privacidad",
    "footer.terms": "Términos",
    "footer.findUs": "Encuéntranos",
    "footer.getInTouch": "Contáctanos",
    "footer.location": "La Floresta, Quito, Ecuador",
    "footer.whatsapp": "Escríbenos por WhatsApp",
    "footer.description":
      "Enseñamos español desde 1999. Certificados por AECEE. La Floresta, Quito.",
    "footer.member":
      "Miembro orgulloso de la Asociación de Escuelas de Español (AECEE)",
    "footer.rights":
      "© 2026 Vida Verde Centro de Español. Todos los derechos reservados.",
  },
} as const;

export type TranslationKey = keyof (typeof translations)["en"];

type LanguageContextValue = {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  t: (key: TranslationKey) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const LANGUAGE_STORAGE_KEY = "vida-verde-language";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>("en");

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);

    if (savedLanguage === "en" || savedLanguage === "es") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLanguageState(savedLanguage);
      document.documentElement.lang = savedLanguage;
    }
  }, []);

  const setLanguage = (nextLanguage: LanguageCode) => {
    setLanguageState(nextLanguage);
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
    document.documentElement.lang = nextLanguage;
  };

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: (key: TranslationKey) => translations[language][key],
    }),
    [language]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }

  return context;
}

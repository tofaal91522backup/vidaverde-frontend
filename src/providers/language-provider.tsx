"use client";

import { usePathname } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export const languages = [
  { code: "en", label: "English" },
  { code: "es", label: "Spanish" },
] as const;

export type LanguageCode = (typeof languages)[number]["code"];

type LanguageContextValue = {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
};

const STORAGE_KEY = "vida-verde-language";
const GOOGLE_SCRIPT_ID = "google-translate-script";
const GOOGLE_CONTAINER_ID = "google_translate_element";

const LanguageContext = createContext<LanguageContextValue | null>(null);

declare global {
  interface Window {
    google?: {
      translate?: {
        TranslateElement?: new (
          options: {
            pageLanguage: string;
            includedLanguages: string;
            autoDisplay: boolean;
          },
          elementId: string,
        ) => void;
      };
    };
    googleTranslateElementInit?: () => void;
  }
}

function isLanguageCode(value: string | null): value is LanguageCode {
  return languages.some((language) => language.code === value);
}

function setTranslateCookie(language: LanguageCode) {
  const cookieValue = `/en/${language}`;
  document.cookie = `googtrans=${cookieValue}; path=/`;
  document.cookie = `googtrans=${cookieValue}; path=/; domain=${window.location.hostname}`;
}

function applyGoogleLanguage(language: LanguageCode) {
  setTranslateCookie(language);
  document.documentElement.lang = language;
  suppressGoogleTranslateChrome();

  const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
  if (!select) {
    return false;
  }

  select.value = language;
  select.dispatchEvent(new Event("change"));
  window.setTimeout(suppressGoogleTranslateChrome, 50);
  window.setTimeout(suppressGoogleTranslateChrome, 300);
  return true;
}

function suppressGoogleTranslateChrome() {
  document.documentElement.style.top = "0px";
  document.body.style.top = "0px";
  document.body.style.marginTop = "0px";

  document
    .querySelectorAll<HTMLElement>(
      [
        ".goog-te-banner-frame",
        ".goog-te-balloon-frame",
        ".VIpgJd-ZVi9od-ORHb-OEVmcd",
        "body > .skiptranslate",
        "iframe.skiptranslate",
      ].join(","),
    )
    .forEach((element) => {
      element.style.display = "none";
      element.style.visibility = "hidden";
      element.style.height = "0";
      element.style.width = "0";
    });
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [language, setLanguageState] = useState<LanguageCode>("en");

  useEffect(() => {
    const storedLanguage = window.localStorage.getItem(STORAGE_KEY);
    if (isLanguageCode(storedLanguage)) {
      setLanguageState(storedLanguage);
      document.documentElement.lang = storedLanguage;
    }
  }, []);

  useEffect(() => {
    window.googleTranslateElementInit = () => {
      if (!window.google?.translate?.TranslateElement) return;

      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: languages.map((item) => item.code).join(","),
          autoDisplay: false,
        },
        GOOGLE_CONTAINER_ID,
      );
      suppressGoogleTranslateChrome();
    };

    if (!document.getElementById(GOOGLE_SCRIPT_ID)) {
      const script = document.createElement("script");
      script.id = GOOGLE_SCRIPT_ID;
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    } else {
      window.googleTranslateElementInit();
    }

    const observer = new MutationObserver(suppressGoogleTranslateChrome);
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Apply immediately — don't wait for the first interval tick
    applyGoogleLanguage(language);

    // Keep retrying in case the GT widget wasn't ready yet
    let attempts = 0;
    const timer = window.setInterval(() => {
      attempts += 1;
      const applied = applyGoogleLanguage(language);
      if (applied || attempts > 40) {
        window.clearInterval(timer);
      }
    }, 200);

    return () => window.clearInterval(timer);
  }, [language, pathname]);

  const setLanguage = useCallback((nextLanguage: LanguageCode) => {
    setLanguageState(nextLanguage);
    window.localStorage.setItem(STORAGE_KEY, nextLanguage);
    applyGoogleLanguage(nextLanguage);
  }, []);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
    }),
    [language, setLanguage],
  );

  return (
    <LanguageContext.Provider value={value}>
      <div id={GOOGLE_CONTAINER_ID} className="hidden" aria-hidden="true" />
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

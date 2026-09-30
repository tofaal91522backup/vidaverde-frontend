"use client";

import { switchSiteLanguage } from "@/components/shared/google-translate";
import {
  type LanguageCode,
  useLanguage,
} from "@/providers/language-provider";

const options: { code: LanguageCode; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
];

/*
  Duita chehara, ek-i switch.

  Marketing site-er nijer `vv-*` token gula shudhu light — dashboard-e dark mode
  ache, tai oikhane oi rong bosale dark background-e ekta shada pill jhulto. Tai
  dashboard-er variant shadcn-er token use kore ar theme-er shathe bodlay.
*/
const tones = {
  marketing: {
    wrap: "border-vv-line bg-vv-bg p-1",
    button: "h-8 min-w-10 px-3 text-[12px]",
    active: "bg-vv-ink text-vv-bg",
    idle: "text-vv-ink-2 hover:bg-vv-bg-warm hover:text-vv-ink",
  },
  dashboard: {
    wrap: "border-border bg-background p-0.5",
    button: "h-7 min-w-9 px-2.5 text-[11px]",
    active: "bg-primary text-primary-foreground",
    idle: "text-muted-foreground hover:bg-muted hover:text-foreground",
  },
} as const;

export function LangToggle({
  className = "",
  variant = "marketing",
}: {
  className?: string;
  variant?: keyof typeof tones;
}) {
  const { language, setLanguage } = useLanguage();
  const tone = tones[variant];

  return (
    <div
      className={`inline-flex items-center rounded-full border ${tone.wrap} ${className}`}
      aria-label="Select language"
      translate="no"
    >
      {options.map((option) => {
        const isActive = language === option.code;

        return (
          <button
            key={option.code}
            type="button"
            aria-pressed={isActive}
            onClick={() => {
              if (isActive) return;
              /*
                Duita-i: provider (API teacher/package gula school-er nijer
                lekha Spanish-e ane, navbar-er t() o) ar Google (baki page).
                Hate lekha Spanish jekhane ache sheta-i thake, baki machine.
              */
              setLanguage(option.code);
              switchSiteLanguage(option.code);
            }}
            className={`rounded-full font-semibold transition-[background,color] ${tone.button} ${
              isActive ? tone.active : tone.idle
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

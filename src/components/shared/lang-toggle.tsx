"use client";

import {
  type LanguageCode,
  useLanguage,
} from "@/providers/language-provider";

const options: { code: LanguageCode; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
];

export function LangToggle({ className = "" }: { className?: string }) {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      className={`inline-flex items-center rounded-full border border-vv-line bg-vv-bg p-1 ${className}`}
      aria-label="Select language"
    >
      {options.map((option) => {
        const isActive = language === option.code;

        return (
          <button
            key={option.code}
            type="button"
            aria-pressed={isActive}
            onClick={() => setLanguage(option.code)}
            className={`h-8 min-w-10 rounded-full px-3 text-[12px] font-semibold transition-[background,color] ${
              isActive
                ? "bg-vv-ink text-vv-bg"
                : "text-vv-ink-2 hover:bg-vv-bg-warm hover:text-vv-ink"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "next-intl";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { useTransition } from "react";

const options: { code: Locale; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
];

export function LangToggle({ className = "" }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  const setLocale = (nextLocale: Locale) => {
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- params shape varies per route, next-intl types this loosely
        { pathname, params },
        { locale: nextLocale }
      );
    });
  };

  return (
    <div
      className={`inline-flex items-center rounded-full border border-vv-line bg-vv-bg p-1 ${className}`}
      aria-label="Select language"
    >
      {options.map((option) => {
        const isActive = locale === option.code;

        return (
          <button
            key={option.code}
            type="button"
            aria-pressed={isActive}
            disabled={isPending}
            onClick={() => setLocale(option.code)}
            className={`h-8 min-w-10 rounded-full px-3 text-[12px] font-semibold transition-[background,color] disabled:opacity-60 ${
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

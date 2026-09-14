"use client";

import { useLanguage, type TranslationKey } from "@/providers/language-provider";
import { CalendarCheck, Home, Mail, MapPin, Monitor } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Tab = {
  href: string;
  labelKey: TranslationKey;
  icon: LucideIcon;
  /** Site-er conversion action — baki tab-er moto dekhale hariye jay */
  cta?: boolean;
};

/*
  Pach-ta-i shesh. Ei bar-e visitor-er **porer step** thake, site-er puro
  sitemap na — sitemap-ta hamburger-e ache. Baki page (Travel Spanish, Our
  School) shekhan theke-i pawa jabe.
*/
const TABS: Tab[] = [
  { href: "/", labelKey: "nav.home", icon: Home },
  { href: "/online-classes", labelKey: "nav.classesShort", icon: Monitor },
  {
    href: "/online-classes/book",
    labelKey: "nav.bookShort",
    icon: CalendarCheck,
    cta: true,
  },
  { href: "/study-in-quito", labelKey: "nav.quitoShort", icon: MapPin },
  { href: "/contact", labelKey: "nav.contact", icon: Mail },
];

export function MobileTabBar() {
  const pathname = usePathname();
  const { t } = useLanguage();

  /*
    Longest match — `/online-classes/book` "Classes" ar "Book" duitar-i under,
    ar `startsWith` dile duita-i active dekhato. Je tab-er href shobcheye lomba
    ar pathname-ta cover kore, sei ta-i jete.
  */
  const covers = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  const activeHref = TABS.filter((tab) => covers(tab.href)).sort(
    (a, b) => b.href.length - a.href.length,
  )[0]?.href;

  return (
    <nav
      aria-label={t("nav.tabBar")}
      className="fixed inset-x-0 bottom-0 z-40 hidden border-t border-vv-nav-border bg-vv-nav-bg backdrop-blur-[14px] backdrop-saturate-140 pb-[env(safe-area-inset-bottom)] max-[640px]:grid max-[640px]:grid-cols-5"
    >
      {TABS.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeHref === tab.href;
        const label = t(tab.labelKey);

        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={isActive ? "page" : undefined}
            className="flex min-h-14 flex-col items-center justify-center gap-0.5 px-1 py-2"
          >
            <span
              className={`grid h-7 w-12 place-items-center rounded-full transition-colors ${
                tab.cta
                  ? "bg-vv-accent text-vv-accent-deep"
                  : isActive
                    ? "bg-vv-bg-warm text-vv-accent-deep"
                    : "text-vv-ink-2"
              }`}
            >
              <Icon className="h-4.5 w-4.5" aria-hidden="true" />
            </span>
            <span
              className={`text-[10px] leading-none font-medium ${
                isActive ? "text-vv-accent-deep" : "text-vv-ink-2"
              }`}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

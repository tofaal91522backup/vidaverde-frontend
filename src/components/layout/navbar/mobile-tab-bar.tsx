"use client";

import { useMarketingNav } from "@/components/layout/navbar/marketing-nav-provider";
import { useLanguage, type TranslationKey } from "@/providers/language-provider";
import {
  CalendarCheck,
  Ellipsis,
  Home,
  LayoutDashboard,
  Mail,
  Monitor,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Tab = { href: string; labelKey: TranslationKey; icon: LucideIcon };

/*
  Char-ta link + ekta "More". "More" jehetu puro menu-ta khole, bar-e shudhu
  **shobcheye beshi lagey** emon jaiga gula rakha hoyeche — puro sitemap na.
  Study in Quito-r nijer char-ta sub-page ache, oita sheet-e-i bhalo dekhay.
*/
const HOME_TAB: Tab = { href: "/", labelKey: "nav.home", icon: Home };

const CONTENT_TABS: Tab[] = [
  { href: "/online-classes", labelKey: "nav.classesShort", icon: Monitor },
  {
    href: "/online-classes/book",
    labelKey: "nav.bookShort",
    icon: CalendarCheck,
  },
];

/** Logged out hole char number slot-e Contact */
const CONTACT_TAB: Tab = {
  href: "/contact",
  labelKey: "nav.contact",
  icon: Mail,
};

export function MobileTabBar() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const { user, setMenuOpen } = useMarketingNav();

  const dashboardHref =
    user?.role === "ADMIN"
      ? "/dashboard/admin"
      : user?.role === "STUDENT"
        ? "/dashboard/student"
        : null;

  /*
    Login thakle Home-er pashei dashboard-e ferar rasta — ekjon student site-e
    ese shobcheye beshi oikhane-i jete chay. Tokhon Contact bade jay; sheta
    mulot notun visitor-er jonno, ar menu-te ache-i.

    Account-er menu (profile, sign out) tab bar-e na — sheta hamburger-e.
  */
  const tabs: Tab[] = dashboardHref
    ? [
        HOME_TAB,
        {
          href: dashboardHref,
          labelKey: "nav.dashboard",
          icon: LayoutDashboard,
        },
        ...CONTENT_TABS,
      ]
    : [HOME_TAB, ...CONTENT_TABS, CONTACT_TAB];

  /*
    Longest match — `/online-classes/book` "Classes" ar "Book" duitar-i under,
    ar shudhu `startsWith` dile duita-i active dekhato. Je href shobcheye lomba
    ar pathname-ta cover kore, sei ta jete.
  */
  const covers = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  const activeHref = tabs
    .filter((tab) => covers(tab.href))
    .sort((a, b) => b.href.length - a.href.length)[0]?.href;

  /** Sob slot ek-i rokom — ekta tab-e rong dile seta "tumi ekhane acho" pore */
  const slot =
    "flex min-h-14 flex-col items-center justify-center gap-1 px-1 py-2";
  const tone = (active: boolean) =>
    active ? "text-vv-accent-deep" : "text-vv-ink-2";

  return (
    <nav
      aria-label={t("nav.tabBar")}
      className="fixed inset-x-0 bottom-0 z-40 hidden border-t border-vv-nav-border bg-vv-nav-bg backdrop-blur-[14px] backdrop-saturate-140 pb-[env(safe-area-inset-bottom)] max-[640px]:grid max-[640px]:grid-cols-5"
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeHref === tab.href;

        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={isActive ? "page" : undefined}
            className={`${slot} ${tone(isActive)}`}
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
            <span className="text-[10px] leading-none font-medium">
              {t(tab.labelKey)}
            </span>
          </Link>
        );
      })}

      <button
        type="button"
        onClick={() => setMenuOpen(true)}
        aria-label={t("nav.openMenu")}
        className={`${slot} ${tone(false)}`}
      >
        <Ellipsis className="h-5 w-5" aria-hidden="true" />
        <span className="text-[10px] leading-none font-medium">
          {t("nav.more")}
        </span>
      </button>
    </nav>
  );
}

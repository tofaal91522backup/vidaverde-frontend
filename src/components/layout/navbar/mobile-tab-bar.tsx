"use client";

import { DashboardUserMenu } from "@/components/layout/navbar/dashboard-user-menu";
import { useMarketingNav } from "@/components/layout/navbar/marketing-nav-provider";
import { useLanguage, type TranslationKey } from "@/providers/language-provider";
import { CalendarCheck, Ellipsis, Home, Mail, Monitor } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Tab = { href: string; labelKey: TranslationKey; icon: LucideIcon };

/*
  Char-ta link + ekta "More". "More" jehetu puro menu-ta khole, bar-e shudhu
  **shobcheye beshi lagey** emon jaiga gula rakha hoyeche — puro sitemap na.
  Study in Quito-r nijer char-ta sub-page ache, oita sheet-e-i bhalo dekhay.
*/
const TABS: Tab[] = [
  { href: "/", labelKey: "nav.home", icon: Home },
  { href: "/online-classes", labelKey: "nav.classesShort", icon: Monitor },
  { href: "/online-classes/book", labelKey: "nav.bookShort", icon: CalendarCheck },
];

/** Logged out hole char number slot-e Contact; login thakle Account menu */
const CONTACT_TAB: Tab = {
  href: "/contact",
  labelKey: "nav.contact",
  icon: Mail,
};

export function MobileTabBar() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const { user, clearUser, setMenuOpen } = useMarketingNav();

  /*
    Longest match — `/online-classes/book` "Classes" ar "Book" duitar-i under,
    ar shudhu `startsWith` dile duita-i active dekhato. Je href shobcheye lomba
    ar pathname-ta cover kore, sei ta jete.
  */
  const covers = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  const linkTabs = user ? TABS : [...TABS, CONTACT_TAB];

  const activeHref = linkTabs
    .filter((tab) => covers(tab.href))
    .sort((a, b) => b.href.length - a.href.length)[0]?.href;

  /** Sob slot ek-i rokom dekhay — ekta tab-e rong dile seta "tumi ekhane acho" pore */
  const slot = "flex min-h-14 flex-col items-center justify-center gap-1 px-1 py-2";
  const iconWrap = (active: boolean) =>
    `grid h-6 w-6 place-items-center ${active ? "text-vv-accent-deep" : "text-vv-ink-2"}`;
  const labelCls = (active: boolean) =>
    `text-[10px] leading-none font-medium ${active ? "text-vv-accent-deep" : "text-vv-ink-2"}`;

  return (
    <nav
      aria-label={t("nav.tabBar")}
      className="fixed inset-x-0 bottom-0 z-40 hidden border-t border-vv-nav-border bg-vv-nav-bg backdrop-blur-[14px] backdrop-saturate-140 pb-[env(safe-area-inset-bottom)] max-[640px]:grid max-[640px]:grid-cols-5"
    >
      {linkTabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeHref === tab.href;

        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={isActive ? "page" : undefined}
            className={slot}
          >
            <span className={iconWrap(isActive)}>
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className={labelCls(isActive)}>{t(tab.labelKey)}</span>
          </Link>
        );
      })}

      {/*
        Login thakle char number slot-ta Account. Sudhu dashboard-er link na
        kore puro menu-ta khola hoy — na hole **sign out** korte hole hamburger
        → avatar → menu, tin tap lagto. Ekhon Dashboard ar Sign out duita-i ek
        tap dure.
      */}
      {user && (
        <DashboardUserMenu
          user={user}
          inDashboard={false}
          onSignedOut={clearUser}
          side="top"
          trigger={
            <button type="button" className={slot} aria-label={t("nav.account")}>
              <span className={iconWrap(false)}>
                <AccountGlyph name={user.name} />
              </span>
              <span className={labelCls(false)}>{t("nav.account")}</span>
            </button>
          }
        />
      )}

      <button
        type="button"
        onClick={() => setMenuOpen(true)}
        aria-label={t("nav.openMenu")}
        className={slot}
      >
        <span className={iconWrap(false)}>
          <Ellipsis className="h-5 w-5" aria-hidden="true" />
        </span>
        <span className={labelCls(false)}>{t("nav.more")}</span>
      </button>
    </nav>
  );
}

/** Avatar-er chhobi-ta menu-r bhitore; tab-e sudhu ekta chena account glyph */
function AccountGlyph({ name }: { name?: string }) {
  return (
    <span className="grid size-5.5 place-items-center rounded-full bg-vv-ink text-[9px] font-semibold text-vv-bg">
      {(name?.trim()?.[0] ?? "A").toUpperCase()}
    </span>
  );
}

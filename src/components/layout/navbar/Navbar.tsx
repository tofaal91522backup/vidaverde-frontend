"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LangToggle } from "@/components/shared/lang-toggle";
import { DashboardUserMenu } from "@/components/layout/navbar/dashboard-user-menu";
import { useMarketingNav } from "@/components/layout/navbar/marketing-nav-provider";
import { dashboardHref } from "@/features/auth/utils/dashboard-href";
import { navItems } from "@/features/marketing/data/marketing.data";
import { useLanguage, type TranslationKey } from "@/providers/language-provider";
import { ChevronDown, LayoutDashboard, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const { t } = useLanguage();

  /*
    User ar menu-r obostha duita-i provider theke — MobileTabBar-o ek-i duita
    pore, ar tar "More" button ei sheet-ta-i khole.
  */
  const { user, clearUser, menuOpen, setMenuOpen } = useMarketingNav();

  const desktopDashboardHref = dashboardHref(user);

  const navLabelByHref: Record<string, TranslationKey> = {
    "/online-classes": "nav.onlineClasses",
    "/study-in-quito": "nav.studyInQuito",
    "/travel-spanish": "nav.travelSpanish",
    "/our-school": "nav.ourSchool",
    "/blog": "nav.blog",
    "/contact": "nav.contact",
    "/online-classes#teachers": "nav.teachers",
    "/online-classes/book": "nav.bookLesson",
    "/study-in-quito/quito-immersion": "nav.quitoImmersion",
    "/study-in-quito/travelling-classroom": "nav.travellingClassroom",
    "/study-in-quito/puerto-lopez": "nav.puertoLopez",
  };

  /*
    Mobile menu-te je group-e sub-item ache seta collapsible. `undefined` mane
    user ekhono kichu tap kore nai — tokhon **cholti page-er group ta** khola
    thake. Ekta effect diye korle `set-state-in-effect` lint-e atkato, tai
    derived value.
  */
  const [openGroup, setOpenGroup] = useState<string | null | undefined>(
    undefined,
  );

  const getHrefPath = (href: string) => href.split("#")[0];

  const isHrefActive = (href: string) => {
    if (href.includes("#")) {
      return false;
    }

    const hrefPath = getHrefPath(href);
    return pathname === hrefPath || pathname.startsWith(`${hrefPath}/`);
  };

  const getItemLabel = (href: string, fallback: string) =>
    t(navLabelByHref[href] ?? (fallback as TranslationKey));

  const isItemActive = (item: (typeof navItems)[number]) =>
    isHrefActive(item.href) ||
    item.children?.some((child) => isHrefActive(child.href));

  const activeGroupHref =
    navItems.find((item) => item.children?.length && isItemActive(item))?.href ??
    null;

  const expandedGroup = openGroup === undefined ? activeGroupHref : openGroup;

  return (
    <header className="sticky top-0 z-50 animate-nav-enter backdrop-blur-[14px] backdrop-saturate-140 bg-vv-nav-bg border-b border-b-vv-nav-border">
      <div className="flex items-center justify-between mx-auto max-w-330 px-8 py-4.5 max-[1100px]:px-5 max-[1100px]:py-4 max-[640px]:px-4 max-[640px]:py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 min-w-0">
          <Image
            src="/images/logo.png"
            alt="Vida Verde logo"
            width={82}
            height={82}
            unoptimized
          />
          <div className="flex flex-col min-w-0">
            <span className="text-[16px] font-bold tracking-[-0.02em] leading-tight text-vv-ink">
              <span translate="no">Vida Verde</span>
            </span>
            <span className="text-[11px] font-medium text-vv-muted leading-tight max-[640px]:hidden">
              Centro de Español
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav
          className="flex items-center gap-1 max-[1100px]:hidden"
          aria-label={t("nav.primary")}
        >
          {navItems.map((item) => {
            const isActive = isItemActive(item);
            const label = getItemLabel(item.href, item.label);

            if (item.children?.length) {
              return (
                <div
                  key={item.href}
                  className="group relative"
                  tabIndex={-1}
                >
                  <Link
                    href={item.href}
                    className={`inline-flex items-center gap-1 rounded-full text-sm font-medium px-3 py-2.25 transition-[background,color] duration-150 hover:bg-vv-bg-warm hover:text-vv-ink ${
                      isActive ? "bg-vv-ink text-vv-bg" : "text-vv-ink-2"
                    }`}
                  >
                    {label}
                    <ChevronDown
                      className="h-3.5 w-3.5 transition-transform duration-150 group-hover:rotate-180 group-focus-within:rotate-180"
                      aria-hidden="true"
                    />
                  </Link>
                  <div className="invisible absolute left-0 top-full z-50 min-w-[17rem] translate-y-2 pt-3 opacity-0 transition-[opacity,transform,visibility] duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                    <div className="rounded-[18px] border border-vv-line bg-vv-bg p-2 shadow-[0_18px_48px_rgba(7,14,10,0.14)]">
                      {item.children.map((child) => {
                        const childActive = isHrefActive(child.href);

                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`block rounded-[12px] px-3.5 py-2.5 text-sm font-medium transition-colors ${
                              childActive
                                ? "bg-vv-bg-warm text-vv-ink"
                                : "text-vv-ink-2 hover:bg-vv-bg-warm hover:text-vv-ink"
                            }`}
                          >
                            {getItemLabel(child.href, child.label)}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full text-sm font-medium px-3 py-2.25 transition-[background,color] duration-150 hover:bg-vv-bg-warm hover:text-vv-ink ${
                  isActive ? "bg-vv-ink text-vv-bg" : "text-vv-ink-2"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop right side */}
        <div className="flex items-center gap-3 max-[1100px]:hidden">
          <LangToggle />

          {user === null && (
            <>
              <Link
                href="/auth/signin"
                className="text-[13px] font-semibold text-vv-ink-2 transition hover:text-vv-ink"
              >
                {/* Hate lekha, Google-er bahire — session jana-r por ashe, tokhon
                    Google kokhono dhorto na (English-e thakto), kokhono "Acceso" */}
                <span translate="no">{t("nav.login")}</span>
              </Link>
              <Link
                href="/auth/registration"
                className="inline-flex items-center justify-center gap-2.5 border border-vv-accent rounded-full cursor-pointer text-[13px] font-semibold tracking-[-0.005em] py-2.25 px-3.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-vv-accent text-vv-accent-deep hover:bg-vv-accent-hi hover:-translate-y-px"
              >
                <span translate="no">{t("nav.signup")}</span>
              </Link>
            </>
          )}

          {user && (
            <>
              {/*
                Mobile tab bar-e dashboard-e ferar tab ache; desktop-e tab bar
                nai, tai ei button-ta. Menu-r bhitore luki'ye rakhle student-ke
                proti bar avatar khule khujte hoto.
              */}
              {desktopDashboardHref && (
                <Link
                  href={desktopDashboardHref}
                  className="inline-flex items-center gap-1.5 rounded-full border border-vv-line bg-vv-bg-warm px-3.5 py-2 text-[13px] font-semibold text-vv-ink transition-colors hover:bg-vv-line/40"
                >
                  <LayoutDashboard className="h-3.5 w-3.5" aria-hidden="true" />
                  {t("nav.dashboard")}
                </Link>
              )}

              <DashboardUserMenu
                user={user}
                inDashboard={false}
                onSignedOut={clearUser}
              />
            </>
          )}
        </div>

        {/*
          Mobile-e auth-er ekta-i jaiga — hamburger-er pashe. Logged out hole
          "Sign in", login thakle avatar menu (profile, dashboard, sign out).
          Duijaygay dile visitor bujhto na kon-ta asol, tai menu-r bhitore ar
          rakha hoy na.
        */}
        <div className="ml-auto mr-2 hidden max-[1100px]:flex items-center">
          {user === null && (
            <Link
              href="/auth/signin"
              className="inline-flex items-center rounded-full border border-vv-line bg-vv-bg-warm px-3.5 py-2 text-[13px] font-semibold text-vv-ink"
            >
              <span translate="no">{t("nav.signin")}</span>
            </Link>
          )}

          {user && (
            <DashboardUserMenu
              user={user}
              inDashboard={false}
              onSignedOut={clearUser}
            />
          )}
        </div>

        {/* Mobile hamburger */}
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger asChild>
            <button
              className="hidden max-[1100px]:inline-flex items-center justify-center bg-vv-bg-warm border border-vv-line rounded-[10px] h-10 w-10"
              type="button"
              aria-label={t("nav.openMenu")}
            >
              <Menu aria-hidden="true" />
            </button>
          </SheetTrigger>
          {/*
            Age puro menu-ta `SheetHeader`-er bhitore chhilo. SheetHeader scroll
            kore na, tai item beshi hole nicher gula dhora-i jeto na — mobile-e
            Contact-er por ar kichu pounchano jeto na. Ekhon tin-ta layer:
            brand (fixed) · nav (scroll) · login/language (fixed).
          */}
          <SheetContent
            side="right"
            className="flex flex-col gap-0 bg-vv-bg p-0"
          >
            <SheetHeader className="shrink-0 border-b border-vv-line p-4">
              <SheetTitle className="flex items-center gap-2.5">
                {/*
                  Age ekhane `<BrandMark />` chhilo — ekta generic sobuj pin,
                  asol logo na. Upor-er bar ar menu-te duijaygay ek-i chhobi
                  thakle-i brand-ta chena jay.
                */}
                <Image
                  src="/images/logo.png"
                  alt="Vida Verde logo"
                  width={82}
                  height={82}
                  className="h-11 w-auto"
                  unoptimized
                />
                <div className="flex flex-col">
                  <span className="text-[16px] font-bold tracking-[-0.02em] leading-tight text-vv-ink">
                    <span translate="no">Vida Verde</span>
                  </span>
                  <span className="text-[11px] font-medium text-vv-muted leading-tight">
                    Centro de Español
                  </span>
                </div>
              </SheetTitle>
            </SheetHeader>

            {/* `overscroll-contain` — menu-r sesh-e pouchhe pichoner page ta
                scroll hoye jaoa bondho kore */}
            <nav
              className="flex-1 overflow-y-auto overscroll-contain px-4 py-2"
              aria-label={t("nav.primary")}
            >
              {navItems.map((item) => {
                const isActive = isItemActive(item);
                const label = getItemLabel(item.href, item.label);
                const hasChildren = Boolean(item.children?.length);
                const isOpen = expandedGroup === item.href;

                return (
                  <div key={item.href} className="border-b border-vv-line">
                    <div className="flex items-center gap-1">
                      <SheetClose asChild>
                        <Link
                          href={item.href}
                          className={`flex-1 py-4 text-2xl font-semibold tracking-[-0.02em] ${
                            isActive ? "text-vv-accent-deep" : "text-vv-ink"
                          }`}
                        >
                          {label}
                        </Link>
                      </SheetClose>

                      {/*
                        Label-e tap korle page-e jay, chevron-e tap korle sudhu
                        khole — duita alada kaj, tai duita alada target. Sob
                        item-e chevron dewa hoy na, sudhu jar sub-item ache.
                      */}
                      {hasChildren && (
                        <button
                          type="button"
                          onClick={() =>
                            setOpenGroup(isOpen ? null : item.href)
                          }
                          aria-expanded={isOpen}
                          aria-label={`${label} submenu`}
                          className={`-mr-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-vv-accent-deep transition-colors ${
                            isOpen
                              ? "bg-vv-accent"
                              : "bg-vv-accent/20 hover:bg-vv-accent/35"
                          }`}
                        >
                          <ChevronDown
                            className={`h-5 w-5 transition-transform duration-200 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                            aria-hidden="true"
                          />
                        </button>
                      )}
                    </div>

                    {hasChildren && isOpen ? (
                      <div className="-mt-1 mb-4 flex flex-col gap-1 pl-4">
                        {item.children?.map((child) => (
                          <SheetClose asChild key={child.href}>
                            <Link
                              href={child.href}
                              className={`rounded-[10px] px-3 py-2.5 text-[15px] font-medium ${
                                isHrefActive(child.href)
                                  ? "bg-vv-bg-warm text-vv-ink"
                                  : "text-vv-ink-2"
                              }`}
                            >
                              {getItemLabel(child.href, child.label)}
                            </Link>
                          </SheetClose>
                        ))}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </nav>

            <div className="shrink-0 border-t border-vv-line p-4">
              <div className="flex flex-col gap-4">
                {user === null && (
                  <>
                    <SheetClose asChild>
                      <Link
                        href="/auth/signin"
                        className="text-center text-[15px] font-semibold text-vv-ink"
                      >
                        <span translate="no">{t("nav.login")}</span>
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        href="/auth/registration"
                        className="flex items-center justify-center gap-2.5 border border-vv-accent rounded-full cursor-pointer text-[15px] font-semibold tracking-[-0.005em] py-3.5 px-5.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-vv-accent text-vv-accent-deep hover:bg-vv-accent-hi"
                      >
                        <span translate="no">{t("nav.signup")}</span>
                      </Link>
                    </SheetClose>
                  </>
                )}

                <div className="flex items-center gap-2">
                  <span className="text-[12px] text-vv-muted font-medium">
                    {t("language.label")}
                  </span>
                  <LangToggle />
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

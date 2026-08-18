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
import { BrandMark } from "@/features/marketing/components/BrandMark";
import { navItems } from "@/features/marketing/data/marketing.data";
import { Link, usePathname } from "@/i18n/navigation";
import { ChevronDown, Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

type NavMessageKey = Parameters<ReturnType<typeof useTranslations<"Nav">>>[0];

export default function Navbar() {
  const pathname = usePathname();
  const t = useTranslations("Nav");
  const tCta = useTranslations("Cta");
  const tLanguage = useTranslations("Language");

  const navLabelByHref: Record<string, NavMessageKey> = {
    "/online-classes": "onlineClasses",
    "/study-in-quito": "studyInQuito",
    "/travel-spanish": "travelSpanish",
    "/our-school": "ourSchool",
    "/blog": "blog",
    "/contact": "contact",
    "/online-classes#teachers": "teachers",
    "/online-classes/book": "bookLesson",
    "/study-in-quito/quito-immersion": "quitoImmersion",
    "/study-in-quito/travelling-classroom": "travellingClassroom",
    "/study-in-quito/puerto-lopez": "puertoLopez",
    "/study-in-quito/jungle-programme": "junglePrograms",
  };

  const getHrefPath = (href: string) => href.split("#")[0];

  const isHrefActive = (href: string) => {
    if (href.includes("#")) {
      return false;
    }

    const hrefPath = getHrefPath(href);
    return pathname === hrefPath || pathname.startsWith(`${hrefPath}/`);
  };

  const getItemLabel = (href: string, fallback: string) => {
    const key = navLabelByHref[href];
    return key ? t(key) : fallback;
  };

  const isItemActive = (item: (typeof navItems)[number]) =>
    isHrefActive(item.href) ||
    item.children?.some((child) => isHrefActive(child.href));

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
              Vida Verde
            </span>
            <span className="text-[11px] font-medium text-vv-muted leading-tight max-[640px]:hidden">
              Centro de Español
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav
          className="flex items-center gap-1 max-[1100px]:hidden"
          aria-label={t("primary")}
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
          <Link
            href="/online-classes/book"
            className="inline-flex items-center justify-center gap-2.5 border border-vv-accent rounded-full cursor-pointer text-[13px] font-semibold tracking-[-0.005em] py-2.25 px-3.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-vv-accent text-vv-accent-deep hover:bg-vv-accent-hi hover:-translate-y-px"
          >
            {tCta("bookFirstLesson")}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <Sheet>
          <SheetTrigger asChild>
            <button
              className="hidden max-[1100px]:inline-flex items-center justify-center bg-vv-bg-warm border border-vv-line rounded-[10px] h-10 w-10"
              type="button"
              aria-label={t("openMenu")}
            >
              <Menu aria-hidden="true" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-vv-bg">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2.5">
                <BrandMark />
                <div className="flex flex-col">
                  <span className="text-[16px] font-bold tracking-[-0.02em] leading-tight text-vv-ink">
                    Vida Verde
                  </span>
                  <span className="text-[11px] font-medium text-vv-muted leading-tight">
                    Centro de Español
                  </span>
                </div>
              </SheetTitle>
              <nav className="mt-8 flex flex-col gap-1">
                {navItems.map((item) => {
                  const isActive = isItemActive(item);

                  return (
                    <div key={item.href} className="border-b border-vv-line">
                      <SheetClose asChild>
                        <Link
                          href={item.href}
                          className={`block py-4 text-2xl font-semibold tracking-[-0.02em] ${
                            isActive ? "text-vv-accent-deep" : "text-vv-ink"
                          }`}
                        >
                          {getItemLabel(item.href, item.label)}
                        </Link>
                      </SheetClose>
                      {item.children?.length ? (
                        <div className="-mt-1 mb-4 flex flex-col gap-1 pl-4">
                          {item.children.map((child) => (
                            <SheetClose asChild key={child.href}>
                              <Link
                                href={child.href}
                                className={`rounded-[10px] px-3 py-2 text-[15px] font-medium ${
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
              <div className="mt-6 flex flex-col gap-4">
                <SheetClose asChild>
                  <Link
                    href="/online-classes/book"
                    className="flex items-center justify-center gap-2.5 border border-vv-accent rounded-full cursor-pointer text-[15px] font-semibold tracking-[-0.005em] py-3.5 px-5.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-vv-accent text-vv-accent-deep hover:bg-vv-accent-hi"
                  >
                    {tCta("bookFirstLesson")}
                  </Link>
                </SheetClose>
                <div className="flex items-center gap-2">
                  <span className="text-[12px] text-vv-muted font-medium">
                    {tLanguage("label")}
                  </span>
                  <LangToggle />
                </div>
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BrandMark } from "@/features/marketing/components/BrandMark";
import { navItems } from "@/features/marketing/data/marketing.data";
// import { type LanguageCode, useLanguage } from "@/providers/language-provider";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

// function LangToggle() {
//   const { language, setLanguage } = useLanguage();
//   const options: { code: LanguageCode; label: string }[] = [
//     { code: "en", label: "EN" },
//     { code: "es", label: "ES" },
//   ];
//   return (
//     <div
//       className="flex items-center gap-0.5 rounded-full border border-vv-line bg-vv-bg px-1 py-1"
//       aria-label="Language toggle"
//       translate="no"
//     >
//       {options.map((opt) => (
//         <button
//           key={opt.code}
//           type="button"
//           onClick={() => setLanguage(opt.code)}
//           className={`rounded-full px-2.5 py-0.5 font-code text-[11px] font-semibold tracking-[0.08em] transition-[background,color] duration-150 ${
//             language === opt.code
//               ? "bg-vv-ink text-vv-bg"
//               : "text-vv-muted hover:text-vv-ink"
//           }`}
//         >
//           {opt.label}
//         </button>
//       ))}
//     </div>
//   );
// }

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 animate-nav-enter backdrop-blur-[14px] backdrop-saturate-140 bg-vv-nav-bg border-b border-b-vv-nav-border">
      <div className="flex items-center justify-between mx-auto max-w-330 px-8 py-4.5 max-[900px]:px-5 max-[900px]:py-4 max-[640px]:px-4 max-[640px]:py-3">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 min-w-0"
        >
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
          className="flex items-center gap-1 max-[900px]:hidden"
          aria-label="Primary navigation"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full text-sm font-medium px-3.5 py-2.25 transition-[background,color] duration-150 hover:bg-vv-bg-warm hover:text-vv-ink ${
                pathname === item.href
                  ? "bg-vv-ink text-vv-bg"
                  : "text-vv-ink-2"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop right side */}
        <div className="flex items-center gap-3 max-[900px]:hidden">
          {/* <LangToggle /> */}
          <Link
            href="/online-classes/book"
            className="inline-flex items-center justify-center gap-2.5 border border-vv-accent rounded-full cursor-pointer text-[13px] font-semibold tracking-[-0.005em] py-2.25 px-3.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-vv-accent text-vv-accent-deep hover:bg-vv-accent-hi hover:-translate-y-px"
          >
            Book Your First Lesson
          </Link>
        </div>

        {/* Mobile hamburger */}
        <Sheet>
          <SheetTrigger asChild>
            <button
              className="hidden max-[900px]:inline-flex items-center justify-center bg-vv-bg-warm border border-vv-line rounded-[10px] h-10 w-10"
              type="button"
              aria-label="Open menu"
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
                {navItems.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <Link
                      href={item.href}
                      className="border-b border-vv-line py-4 text-2xl font-semibold tracking-[-0.02em]"
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-6 flex flex-col gap-4">
                <SheetClose asChild>
                  <Link
                    href="/online-classes/book"
                    className="flex items-center justify-center gap-2.5 border border-vv-accent rounded-full cursor-pointer text-[15px] font-semibold tracking-[-0.005em] py-3.5 px-5.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-vv-accent text-vv-accent-deep hover:bg-vv-accent-hi"
                  >
                    Book Your First Lesson
                  </Link>
                </SheetClose>
                <div className="flex items-center gap-2">
                  <span className="text-[12px] text-vv-muted font-medium">Language</span>
                  {/* <LangToggle /> */}
                </div>
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}


"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BrandMark } from "@/features/marketing/components/BrandMark";
import { navItems } from "@/features/marketing/data/marketing.data";
import {
  languages,
  useLanguage,
  type LanguageCode,
} from "@/providers/language-provider";
import { Globe2, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();
  const preventNavigation = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
  };

  return (
    <header className="nav">
      <div className="nav-inner">
        <Link href="/" className="brand" onClick={preventNavigation}>
          {/* logo */}
          <Image
            src="/images/logo.png"
            alt="Vida Verde logo"
            width={82}
            height={82}
            className="logo"
            unoptimized
          />
          <span>Vida Verde</span>
        </Link>
        <nav className="nav-links" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname === item.href ? "active" : undefined}
              onClick={preventNavigation}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="nav-right">
          <LanguageSwitcher value={language} onChange={setLanguage} />
          <Button asChild className="vv-btn vv-btn-primary vv-btn-sm">
            <Link href="/#book" onClick={preventNavigation}>
              Join us &rarr;
            </Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <button className="menu-btn" type="button" aria-label="Open menu">
                <Menu aria-hidden="true" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[var(--vv-bg)]">
              <SheetHeader>
                <SheetTitle className="brand">
                  <BrandMark />
                  <span>Vida Verde</span>
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-8 flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="border-b border-[var(--vv-line)] py-4 text-2xl font-semibold tracking-[-0.02em]"
                    onClick={preventNavigation}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mobile-language-switcher">
                <LanguageSwitcher value={language} onChange={setLanguage} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function LanguageSwitcher({
  value,
  onChange,
}: {
  value: LanguageCode;
  onChange: (value: LanguageCode) => void;
}) {
  const selectedLanguage =
    languages.find((language) => language.code === value) ?? languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="language-switcher"
          type="button"
          aria-label="Change language"
        >
          <Globe2 aria-hidden="true" />
          <span>{selectedLanguage.label}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="language-menu">
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={(nextValue) => {
            if (languages.some((language) => language.code === nextValue)) {
              onChange(nextValue as LanguageCode);
            }
          }}
        >
          {languages.map((language) => (
            <DropdownMenuRadioItem key={language.code} value={language.code}>
              {language.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

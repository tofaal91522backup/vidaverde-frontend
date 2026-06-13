"use client";

import { Container } from "@/components/shared/Container";
import { LangToggle } from "@/components/shared/lang-toggle";
import { useLanguage, type TranslationKey } from "@/providers/language-provider";
import {
  Facebook,
  Instagram,
  Leaf,
  Mail,
  MapPin,
  MessageCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const quickLinks: {
  headingKey: TranslationKey;
  items: { labelKey: TranslationKey; href: string }[];
}[] = [
  {
    headingKey: "footer.study",
    items: [
      { labelKey: "nav.onlineClasses", href: "/online-classes" },
      { labelKey: "nav.studyInQuito", href: "/study-in-quito" },
      { labelKey: "nav.travelSpanish", href: "/travel-spanish" },
      { labelKey: "footer.homestay", href: "/homestay" },
    ],
  },
  {
    headingKey: "footer.school",
    items: [
      { labelKey: "nav.ourSchool", href: "/our-school" },
      { labelKey: "footer.blog", href: "/blog" },
      { labelKey: "nav.contact", href: "/contact" },
      { labelKey: "footer.privacyPolicy", href: "/privacy" },
      { labelKey: "footer.terms", href: "/terms" },
    ],
  },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/vidaverdequito/",
    icon: Instagram,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/vidaverdespanishschool/",
    icon: Facebook,
  },
];

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer
      className="border-t border-vv-line bg-vv-accent/10 py-16"
      data-screen-label="Footer"
    >
      <Container>
        <div className="grid gap-10 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {/* Column 1. Brand + AECEE + Social */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src="/images/logo.png"
                alt="Vida Verde logo"
                width={48}
                height={48}
                unoptimized
              />
              <span className="text-[17px] font-bold tracking-[-0.02em] text-vv-ink">
                Vida Verde Centro de Español
              </span>
            </Link>

            <p className="text-[13px] leading-[1.7] text-vv-ink-2 m-0 max-w-[38ch]">
              {t("footer.description")}
            </p>

            <div className="flex items-start gap-2.5">
              <Leaf
                aria-hidden="true"
                className="h-4 w-4 mt-0.5 shrink-0 text-vv-accent"
              />
              <p className="text-[13px] leading-[1.6] text-vv-ink-2 m-0">
                {t("footer.member")}
              </p>
            </div>

            <div
              className="flex items-center gap-2"
              aria-label="Social media links"
            >
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    aria-label={item.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid h-9 w-9 place-items-center rounded-full border border-vv-line bg-vv-bg text-vv-ink-2 transition hover:bg-vv-ink hover:border-vv-ink hover:text-vv-bg"
                  >
                    <Icon aria-hidden="true" className="h-4 w-4" />
                  </Link>
                );
              })}
            </div>

            <a
              href="https://wa.me/593998037473?text=Hi%2C%20I%27d%20like%20to%20find%20out%20more%20about%20Vida%20Verde%27s%20Spanish%20classes."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2.5 border border-[#25d366] rounded-full cursor-pointer text-[14px] font-semibold tracking-[-0.005em] py-2.5 px-5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-[#25d366] text-white hover:bg-[#1dbf59] hover:-translate-y-px"
            >
              <MessageCircle aria-hidden="true" className="h-4 w-4" />
              {t("footer.whatsapp")}
            </a>
          </div>

          {/* Column 2. Quick Links */}
          <div>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-vv-ink m-0 mb-5">
              {t("footer.quickLinks")}
            </h4>
            <div className="grid grid-cols-2 gap-6">
              {quickLinks.map((group) => (
                <div key={group.headingKey}>
                  <div className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-vv-ink-2">
                    {t(group.headingKey)}
                  </div>
                  <ul className="flex flex-col gap-2 list-none p-0 m-0">
                    {group.items.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-[14px] text-vv-ink-2 transition hover:text-vv-ink"
                        >
                          {t(link.labelKey)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3. Contact */}
          <div className="flex flex-col gap-6">
            <div>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-vv-ink m-0 mb-4">
                {t("footer.findUs")}
              </h4>
              <div className="flex items-start gap-2.5 text-[13px] text-vv-ink-2">
                <MapPin
                  aria-hidden="true"
                  className="h-4 w-4 mt-0.5 shrink-0 text-vv-accent"
                />
                <span>{t("footer.location")}</span>
              </div>
            </div>

            <div>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-vv-ink m-0 mb-4">
                {t("footer.getInTouch")}
              </h4>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2.5 text-[13px] text-vv-ink-2">
                  <Mail
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-vv-accent"
                  />
                  <span>info@vidaverde.com</span>
                </div>
                <div className="flex items-center gap-2.5 text-[13px] text-vv-ink-2">
                  <MessageCircle
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-vv-accent"
                  />
                  <a
                    href="https://wa.me/593998037473?text=Hi%2C%20I%27d%20like%20to%20find%20out%20more%20about%20Vida%20Verde%27s%20Spanish%20classes."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-vv-ink transition"
                  >
                    {t("footer.whatsapp")}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-vv-line pt-6 flex flex-wrap items-center justify-between gap-4">
          <p className="font-code text-[12px] text-vv-muted tracking-[0.04em] m-0">
            © 2026 Vida Verde Centro de Español. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-medium text-vv-muted">
              {t("language.label")}
            </span>
            <LangToggle />
          </div>
        </div>
      </Container>
    </footer>
  );
}

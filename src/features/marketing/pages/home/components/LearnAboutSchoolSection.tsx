import { Container } from "@/components/shared/Container";
import { Link } from "@/i18n/navigation";
import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function LearnAboutSchoolSection() {
  const t = useTranslations("Home.aboutSchool");

  return (
    <section
      className="border-t border-vv-line bg-vv-bg-warm"
      data-screen-label="About School"
    >
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div className="relative mx-auto aspect-square w-full max-w-130 overflow-hidden rounded-[22px] border border-vv-line bg-vv-bg">
            <Image
              src="/images/teachers/1.jpg"
              alt="Rosa Proaño, director of Vida Verde Spanish School"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
              unoptimized
            />
          </div>

          <div className="flex flex-col gap-5">
            <span className="font-code text-vv-muted text-[11px] font-medium tracking-[0.14em] uppercase">
              {t("eyebrow")}
            </span>
            <h2 className="text-[clamp(28px,3vw,44px)] font-semibold tracking-[-0.02em] leading-[1.08] m-0 text-balance">
              {t("title")}
            </h2>
            <p className="text-vv-ink-2 text-[clamp(16px,1.2vw,18px)] leading-relaxed max-w-[62ch] text-pretty m-0">
              {t("paragraph1")}
            </p>
            <p className="text-vv-ink-2 text-[clamp(16px,1.2vw,18px)] leading-relaxed max-w-[62ch] text-pretty m-0">
              {t("paragraph2")}
            </p>
            <p className="text-vv-ink-2 text-[clamp(16px,1.2vw,18px)] leading-relaxed max-w-[62ch] text-pretty m-0">
              {t("paragraph3")}
            </p>

            <div className="flex items-center gap-3 mt-1">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-vv-line bg-vv-bg">
                <span className="font-code text-[10px] font-bold text-vv-accent-deep leading-none text-center">
                  AECEE
                </span>
              </div>
              <span className="text-[13px] text-vv-ink-2">
                {t("certifiedLabel")}
              </span>
            </div>

            <Link
              href="/our-school"
              className="inline-flex w-fit items-center gap-2.5 border border-vv-ink rounded-full cursor-pointer text-[15px] font-semibold tracking-[-0.005em] leading-none py-3.5 px-5.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-vv-ink text-vv-bg hover:bg-vv-accent-deep hover:border-vv-accent-deep hover:-translate-y-px"
            >
              {t("cta")}
              <ChevronRight aria-hidden="true" className="h-4 w-4 shrink-0" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

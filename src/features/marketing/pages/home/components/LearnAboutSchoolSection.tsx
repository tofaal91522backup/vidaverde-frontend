import { Container } from "@/components/shared/Container";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function LearnAboutSchoolSection() {
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
              {"// About Vida Verde"}
            </span>
            <h2 className="text-[clamp(28px,3vw,44px)] font-semibold tracking-[-0.02em] leading-[1.08] m-0 text-balance">
              Teaching Spanish Since 1999
            </h2>
            <p className="text-vv-ink-2 text-[clamp(16px,1.2vw,18px)] leading-relaxed max-w-[62ch] text-pretty m-0">
              Since 1999, our teachers have been helping students learn Spanish —
              and through it, discover the culture, warmth, and remarkable natural
              world of Ecuador. Over 4,700 students from every corner of the world
              have had that experience with us — online and in person.
            </p>
            <p className="text-vv-ink-2 text-[clamp(16px,1.2vw,18px)] leading-relaxed max-w-[62ch] text-pretty m-0">
              As a certified member of the AECEE, Ecuador&apos;s standard of
              excellence in Spanish language education, you can trust that every
              lesson is taught by a qualified native speaker, designed around you,
              and held to the highest professional standard.
            </p>

            <div className="flex items-center gap-3 mt-1">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-vv-line bg-vv-bg">
                <span className="font-code text-[10px] font-bold text-vv-accent-deep leading-none text-center">
                  AECEE
                </span>
              </div>
              <span className="text-[13px] text-vv-ink-2">
                AECEE-certified Spanish school
              </span>
            </div>

            <Link
              href="/our-school"
              className="inline-flex w-fit items-center gap-2.5 border border-vv-ink rounded-full cursor-pointer text-[15px] font-semibold tracking-[-0.005em] py-3.5 px-5.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-vv-ink text-vv-bg hover:bg-vv-accent-deep hover:border-vv-accent-deep hover:-translate-y-px"
            >
              Our Story
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

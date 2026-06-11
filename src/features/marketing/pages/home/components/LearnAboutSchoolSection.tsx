import { Container } from "@/components/shared/Container";
import { ChevronRight } from "lucide-react";
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
              Vida Verde was founded in 1999 by Rosa, a Spanish teacher with a
              simple belief: the best way to learn a language is through a real
              human connection.
            </p>
            <p className="text-vv-ink-2 text-[clamp(16px,1.2vw,18px)] leading-relaxed max-w-[62ch] text-pretty m-0">
              From our home in La Floresta. One of Quito&apos;s most vibrant
              and welcoming neighbourhoods. We&apos;ve grown to serve over
              4,700 students from every corner of the world. Online and in
              person. Beginners and advanced speakers. Travellers and
              professionals.
            </p>
            <p className="text-vv-ink-2 text-[clamp(16px,1.2vw,18px)] leading-relaxed max-w-[62ch] text-pretty m-0">
              We&apos;re proud to hold AECEE certification, a quality standard
              recognised across the Spanish-speaking world.
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
              className="inline-flex w-fit items-center gap-2.5 border border-vv-ink rounded-full cursor-pointer text-[15px] font-semibold tracking-[-0.005em] leading-none py-3.5 px-5.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-vv-ink text-vv-bg hover:bg-vv-accent-deep hover:border-vv-accent-deep hover:-translate-y-px"
            >
              Our Story
              <ChevronRight aria-hidden="true" className="h-4 w-4 shrink-0" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

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
              25 Years. 4,700 Students. Lasting Connections.
            </h2>
            <p className="text-vv-ink-2 text-[clamp(16px,1.2vw,18px)] leading-relaxed max-w-[62ch] text-pretty m-0">
              Since 1999, our teachers have been helping students learn
              Spanish — and through it, discover the culture, warmth, and
              remarkable natural world of Ecuador.
            </p>
            <p className="text-vv-ink-2 text-[clamp(16px,1.2vw,18px)] leading-relaxed max-w-[62ch] text-pretty m-0">
              Imagine ordering your meal in Spanish without hesitating.
              Following a conversation around the table without losing the
              thread. Travelling through any Spanish-speaking country and
              actually connecting with the people you meet — not just
              observing them.
            </p>
            <p className="text-vv-ink-2 text-[clamp(16px,1.2vw,18px)] leading-relaxed max-w-[62ch] text-pretty m-0">
              Over 4,700 students from every corner of the world have had
              that experience with us.
            </p>
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

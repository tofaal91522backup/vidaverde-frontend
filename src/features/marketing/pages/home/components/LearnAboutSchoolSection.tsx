import { Container } from "@/components/shared/Container";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function LearnAboutSchoolSection() {
  return (
    <section
      className="border-t border-[var(--vv-line)] bg-[var(--vv-bg-warm)]"
      data-screen-label="Learn About"
    >
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div className="learn-about-image relative mx-auto aspect-square w-full max-w-[520px] overflow-hidden rounded-[var(--vv-radius-lg)] border border-[var(--vv-line)] bg-[var(--vv-bg)]">
            <Image
              src="/images/teachers/1.jpg"
              alt="Rosa Proaño, director of Vida Verde Spanish School"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
              unoptimized
            />
          </div>

          <div className="learn-about-copy flex flex-col gap-5">
            <span className="eyebrow">{"// About Vida Verde"}</span>
            <h2 className="h2">Learn About Our Spanish School</h2>
            <p className="lede max-w-[62ch]">
              Vida Verde is a small, close-knit language school that has a rich
              history of helping students learn Spanish in Quito since 1999. We
              promise excellence in Spanish teaching, and we are dedicated to
              the green movement of Ecuador. Not only will we supply you with
              quality Spanish classes, but we will also lead you in cultural
              outings and help you organize weekend excursions! As a certified
              member of the Ecuadorian Association of Spanish Language Centers
              (AECEE), you can count on us to make your time in Quito safe, fun,
              and rewarding!
            </p>
            <Link
              href="https://vidaverde.com/index.php/who-we-are/"
              target="_blank"
              rel="noreferrer"
              className="vv-btn vv-btn-dark w-fit"
            >
              Learn More
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

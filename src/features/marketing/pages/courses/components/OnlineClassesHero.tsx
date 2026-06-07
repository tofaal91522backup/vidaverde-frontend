import { Container } from "@/components/shared/Container";
import Link from "next/link";

export function OnlineClassesHero() {
  return (
    <section className="bg-vv-bg-warm border-b border-vv-line" data-screen-label="01 Online Classes Hero">
      <Container>
        <div className="font-code text-vv-muted text-[12px] tracking-[0.06em] mb-6">
          Home <span className="mx-1 text-vv-line-2">/</span> Online Classes
        </div>
        <h1 className="text-[clamp(36px,5vw,68px)] font-semibold tracking-[-0.03em] leading-none m-0 mb-5">
          One-on-One Spanish Classes.
          <br />
          Real Teacher. Anywhere.
        </h1>
        <p className="text-vv-ink-2 text-[clamp(17px,1.4vw,20px)] leading-normal max-w-[52ch] text-pretty m-0">
          Personalised lessons with expert Ecuadorian native speakers, via
          Google Meet, at a time that works for you.
        </p>
        <div className="flex flex-wrap gap-3 mt-6">
          <Link
            href="/online-classes/book"
            className="inline-flex items-center justify-center gap-2.5 border border-vv-accent rounded-full cursor-pointer text-[15px] font-semibold tracking-[-0.005em] py-3.5 px-5.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-vv-accent text-vv-accent-deep hover:bg-vv-accent-hi hover:-translate-y-px"
          >
            Book Your First Lesson · From $12 →
          </Link>
          <Link
            href="#teachers"
            className="inline-flex items-center justify-center gap-2.5 border border-vv-line-2 rounded-full cursor-pointer text-[15px] font-semibold tracking-[-0.005em] py-3.5 px-5.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-transparent text-vv-ink hover:bg-vv-ink hover:border-vv-ink hover:text-vv-bg"
          >
            Choose Your Teacher
          </Link>
        </div>
        <div className="mt-8 flex flex-wrap gap-4 text-[14px] text-vv-ink-2">
          {["AECEE Certified", "Est. 1999", "4,700+ Students", "All Levels Welcome", "Classes via Google Meet"].map(
            (item) => (
              <span key={item} className="flex items-center gap-1.5">
                <span className="text-vv-accent" aria-hidden="true">✓</span>
                {item}
              </span>
            ),
          )}
        </div>
      </Container>
    </section>
  );
}

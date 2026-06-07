import { Container } from "@/components/shared/Container";
import Link from "next/link";

export function OnlineClassesBottomCTA() {
  return (
    <section
      className="border-t border-vv-line bg-vv-ink"
      data-screen-label="06 Bottom CTA"
    >
      <Container className="text-center">
        <span className="font-code text-vv-accent text-[11px] font-medium tracking-[0.14em] uppercase">
          {"// Ready to start?"}
        </span>
        <div className="h-4" />
        <h2 className="text-[clamp(28px,3vw,44px)] font-semibold tracking-[-0.02em] leading-[1.08] m-0 text-vv-bg text-balance">
          Your First Lesson Is Just $12.
        </h2>
        <p className="text-vv-bg/70 text-[clamp(17px,1.4vw,20px)] leading-normal mt-3 max-w-[52ch] mx-auto m-0">
          Book your Spanish Assessment &amp; First Lesson today. No commitment.
          Cancel or continue. It&apos;s your call.
        </p>
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <Link
            href="/online-classes/book"
            className="inline-flex items-center justify-center gap-2.5 border border-vv-accent rounded-full cursor-pointer text-[15px] font-semibold tracking-[-0.005em] py-3.5 px-5.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-vv-accent text-vv-accent-deep hover:bg-vv-accent-hi hover:-translate-y-px"
          >
            Book My First Lesson →
          </Link>
          <Link
            href="#teachers"
            className="inline-flex items-center justify-center gap-2.5 border border-vv-bg/30 rounded-full cursor-pointer text-[15px] font-semibold tracking-[-0.005em] py-3.5 px-5.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-transparent text-vv-bg hover:bg-vv-bg/10"
          >
            Choose a Teacher First
          </Link>
        </div>
      </Container>
    </section>
  );
}

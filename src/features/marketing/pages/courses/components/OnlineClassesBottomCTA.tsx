import { Container } from "@/components/shared/Container";
import Link from "next/link";

export function OnlineClassesBottomCTA() {
  return (
    <section
      className="border-t border-[var(--vv-line)] bg-[var(--vv-ink)] py-16"
      data-screen-label="06 Bottom CTA"
    >
      <Container className="text-center">
        <span className="eyebrow text-[var(--vv-accent)]">
          {"// Ready to start?"}
        </span>
        <div className="h-4" />
        <h2 className="h2 text-[var(--vv-bg)]">
          Your First Lesson Is Just $12.
        </h2>
        <p className="lede text-[var(--vv-bg)]/70 mt-3 max-w-[52ch] mx-auto">
          Book your Spanish Assessment &amp; First Lesson today. No commitment.
          Cancel or continue — it&apos;s your call.
        </p>
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <Link href="/book" className="vv-btn vv-btn-primary">
            Book My First Lesson →
          </Link>
          <Link
            href="#teachers"
            className="vv-btn border border-[var(--vv-bg)]/30 text-[var(--vv-bg)] hover:bg-[var(--vv-bg)]/10"
          >
            Choose a Teacher First
          </Link>
        </div>
      </Container>
    </section>
  );
}

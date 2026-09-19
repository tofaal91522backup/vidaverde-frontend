import { Container } from "@/components/shared/Container";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ByLanguage } from "@/components/shared/by-language";

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
          Ready to Start?
        </h2>
        <p className="text-vv-bg/70 text-[clamp(17px,1.4vw,20px)] leading-normal mt-3 max-w-[52ch] mx-auto m-0">
          Your first lesson is just $12. Meet your teacher, find your level,
          and leave with a plan — no commitment required.
        </p>
        <div className="mt-8 flex justify-center">
          <Link
            href="/online-classes/book"
            className="inline-flex items-center justify-center gap-2.5 border border-vv-accent rounded-full cursor-pointer text-[15px] font-semibold tracking-[-0.005em] leading-none py-3.5 px-5.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-vv-accent text-vv-accent-deep hover:bg-vv-accent-hi hover:-translate-y-px"
          >
            {/* Google "Reserva mi primera lección" — baki page "clase" bole */}
            <span translate="no">
              <ByLanguage
                en="Book My First Lesson"
                es="Reserva tu primera clase"
              />
            </span>{" "}
            <ChevronRight className="h-4 w-4 shrink-0 translate-y-0.5" />
          </Link>
        </div>
        <p className="mt-5 text-[13px] text-vv-bg/50">
          No contracts. Cancel or continue. It&apos;s your call.
        </p>
      </Container>
    </section>
  );
}

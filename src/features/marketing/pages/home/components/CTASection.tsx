import { Container } from "@/components/shared/Container";
import { MarketingButton } from "@/features/marketing/components/MarketingButton";
import { ChevronRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-0" data-screen-label="CTA">
      <Container>
        <div className="flex items-center justify-between gap-8 rounded-3xl bg-vv-ink px-12 py-12 max-[760px]:flex-col max-[760px]:items-start max-[640px]:rounded-2xl max-[640px]:px-7 max-[640px]:py-8">
          <div>
            <h2 className="text-[clamp(28px,3vw,44px)] font-semibold tracking-[-0.02em] leading-[1.08] m-0 text-vv-bg text-balance">
              Welcome to
              <br />
              the family.
            </h2>
            <p className="mt-3 text-vv-bg/70 text-[clamp(15px,1.2vw,17px)] leading-normal m-0 max-w-[52ch]">
              Contact Vida Verde to design a personalized program, ask about
              extended-study discounts, or receive a free online trial class.
            </p>
          </div>
          <MarketingButton href="/#book" tone="primary">
            Contact us{" "}
            <ChevronRight className="h-4 w-4 shrink-0 translate-y-0.5" />
          </MarketingButton>
        </div>
      </Container>
    </section>
  );
}

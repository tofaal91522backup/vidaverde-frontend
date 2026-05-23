import { Container } from "@/components/shared/Container";
import { MarketingButton } from "@/features/marketing/components/MarketingButton";

export function CTASection() {
  return (
    <section data-screen-label="CTA">
      <Container>
        <div className="cta-strip">
          <div>
            <h2 className="h2">
              Welcome to
              <br />
              the family.
            </h2>
            <p>
              Contact Vida Verde to design a personalized program, ask about
              extended-study discounts, or receive a free online trial class.
            </p>
          </div>
          <MarketingButton href="/#book" tone="primary">
            Contact us →
          </MarketingButton>
        </div>
      </Container>
    </section>
  );
}

import { Container } from "@/components/shared/Container";
import { SectionHeader } from "./SectionHeader";
import { TestimonialCarousel } from "./TestimonialCarousel";

function TripAdvisorBadge() {
  return (
    <a
      href="https://www.tripadvisor.com"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-3 rounded-xl border border-[var(--vv-line)] bg-[var(--vv-bg)] px-5 py-3 transition hover:border-[var(--vv-accent)]"
      aria-label="View Vida Verde on TripAdvisor"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#34E0A1] text-[18px] font-bold text-white">
        t
      </div>
      <div>
        <div className="flex gap-0.5 text-[#34E0A1]">
          {"★★★★★".split("").map((s, i) => (
            <span key={i} aria-hidden="true">{s}</span>
          ))}
        </div>
        <div className="text-[12px] text-[var(--vv-ink-2)] mt-0.5">
          Excellent · TripAdvisor
        </div>
      </div>
    </a>
  );
}

function AggregateRating() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2">
        <span className="text-[32px] font-bold tracking-tight text-[var(--vv-ink)]">
          5.0
        </span>
        <div>
          <div className="flex gap-0.5 text-amber-400" aria-label="5 out of 5 stars">
            {"★★★★★".split("").map((s, i) => (
              <span key={i} aria-hidden="true">{s}</span>
            ))}
          </div>
          <div className="text-[12px] text-[var(--vv-ink-2)]">
            Average rating · 200+ reviews
          </div>
        </div>
      </div>
      <TripAdvisorBadge />
    </div>
  );
}

const TestimonialSection = () => {
  return (
    <section className="testimonials" data-screen-label="06 Testimonials">
      <Container>
        <SectionHeader
          eyebrow="// What students say"
          title="Real Students. Real Results."
          lede="Students from around the world describe Vida Verde as welcoming, friendly, and transformative."
        />
        <div className="mb-8">
          <AggregateRating />
        </div>
        <TestimonialCarousel />
      </Container>
    </section>
  );
};

export default TestimonialSection;

import { Container } from "@/components/shared/Container";
import { TestimonialCarousel } from "./TestimonialCarousel";
import { CountUpStat } from "./CountUpStat";
import { socialStats } from "../data/marketing.data";

function Stars({ color = "text-amber-400" }: { color?: string }) {
  return (
    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={color} aria-hidden="true">★</span>
      ))}
    </div>
  );
}

function TripAdvisorBadge() {
  return (
    <a
      href="https://www.tripadvisor.com/Attraction_Review-g294308-d12405709-Reviews-Vida_Verde-Quito_Pichincha_Province.html"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="View Vida Verde on TripAdvisor"
      className="group flex items-center gap-3 rounded-2xl border border-vv-line bg-vv-bg px-5 py-4 transition hover:border-[#34E0A1]/50 hover:shadow-[0_4px_20px_-4px_rgba(52,224,161,0.15)]"
    >
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#34E0A1] text-white text-[20px] font-black leading-none select-none">
        t
      </div>
      <div>
        <Stars color="text-[#34E0A1]" />
        <p className="text-[12px] text-vv-ink-2 mt-0.5 m-0">Rated Excellent · TripAdvisor</p>
      </div>
    </a>
  );
}

const TestimonialSection = () => {
  return (
    <section className="bg-vv-bg-warm border-t border-vv-line" data-screen-label="06 Testimonials">
      <Container>

        {/* Header row. Title left, rating right */}
        <div className="grid lg:grid-cols-[1fr_auto] items-end gap-10 mb-12 max-[760px]:grid-cols-1">

          {/* Left */}
          <div className="flex flex-col gap-4">
            <span className="font-code text-vv-muted text-[11px] font-medium tracking-[0.14em] uppercase">
              {"// What students say"}
            </span>
            <h2 className="text-[clamp(30px,3.5vw,50px)] font-semibold tracking-[-0.02em] leading-[1.06] m-0 text-balance text-vv-ink">
              Real Students. Real Results.
            </h2>
            <p className="text-vv-ink-2 text-[clamp(16px,1.2vw,18px)] leading-normal max-w-[48ch] text-pretty m-0">
              Over 4,700 students from around the world have learned Spanish
              with Vida Verde. Here&apos;s what some of them say.
            </p>
          </div>

          {/* Right. Rating block */}
          <div className="flex items-center gap-5 shrink-0">
            <div className="text-center">
              <div className="text-[52px] font-bold text-vv-ink tracking-[-0.04em] leading-none">
                5.0
              </div>
              <Stars />
              <p className="text-vv-muted text-[11px] font-code mt-1.5 m-0">200+ reviews</p>
            </div>
            <div className="w-px h-14 bg-vv-line shrink-0" aria-hidden="true" />
            <TripAdvisorBadge />
          </div>
        </div>

        {/* Stats inline row */}
        <div className="flex flex-wrap justify-evenly items-center gap-y-4 mb-10 border-t border-b border-vv-line py-6">
          {socialStats.map((stat, i) => (
            <div key={stat.label} className="flex items-center justify-between gap-5">
              <div>
                <CountUpStat
                  value={stat.value}
                  className="text-[clamp(24px,2.5vw,34px)] font-bold tracking-[-0.03em] leading-none text-vv-accent-deep block"
                />
                <span className="font-code text-[10px] uppercase tracking-widest text-vv-muted mt-0.5 block">
                  {stat.label}
                </span>
              </div>
              {i < socialStats.length - 1 && (
                <div className="h-8 w-px bg-vv-line shrink-0" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>

        {/* Carousel */}
        <TestimonialCarousel />

      </Container>
    </section>
  );
};

export default TestimonialSection;

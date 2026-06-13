import { Container } from "@/components/shared/Container";
import WorldMap from "@/components/ui/world-map";
import { ChevronRight, Star } from "lucide-react";
import Link from "next/link";

const TRAVEL_DOTS = [
  {
    start: { lat: 40.71, lng: -74.0, label: "New York" },
    end: { lat: -0.22, lng: -78.51, label: "Quito" },
  },
  {
    start: { lat: 51.5, lng: -0.12, label: "London" },
    end: { lat: -0.22, lng: -78.51, label: "Quito" },
  },
  {
    start: { lat: 52.52, lng: 13.4, label: "Berlin" },
    end: { lat: -0.22, lng: -78.51, label: "Quito" },
  },
  {
    start: { lat: -33.86, lng: 151.2, label: "Sydney" },
    end: { lat: -0.22, lng: -78.51, label: "Quito" },
  },
  {
    start: { lat: 35.68, lng: 139.69, label: "Tokyo" },
    end: { lat: -0.22, lng: -78.51, label: "Quito" },
  },
  {
    start: { lat: 43.65, lng: -79.38, label: "Toronto" },
    end: { lat: -0.22, lng: -78.51, label: "Quito" },
  },
  {
    start: { lat: 48.85, lng: 2.35, label: "Paris" },
    end: { lat: -0.22, lng: -78.51, label: "Quito" },
  },
];

const WHATSAPP_HREF =
  "https://wa.me/593998037473?text=Hi%2C%20I%27d%20like%20to%20find%20out%20more%20about%20Travel%20Spanish%20classes%20at%20Vida%20Verde.";

const reviews = [
  {
    quote:
      "I did five days with Laura before flying to Guayaquil. I was nervous about speaking to anyone. By day three I was ordering food, asking for directions, and chatting with strangers on the bus.",
    name: "Sarah K.",
    meta: "USA · Solo traveller",
    initials: "SK",
  },
  {
    quote:
      "We booked a week of classes for our family before a two-week tour of Ecuador. The kids loved it. The teacher tailored everything to travel situations and it made such a difference.",
    name: "James & Amy",
    meta: "UK · Family trip",
    initials: "JA",
  },
  {
    quote:
      "I had two weeks before a volunteer project in Esmeraldas. Ximena prepared me for exactly the conversations I'd need. I felt confident from day one in the field.",
    name: "Franziska D.",
    meta: "Germany · Volunteer",
    initials: "FD",
  },
];

export default function TravelSpanishRoute() {
  return (
    <>
      {/* Hero */}
      <section
        className="bg-vv-bg-warm border-b border-vv-line"
        data-screen-label="01 Hero"
      >
        <Container>
          <div className="font-code text-vv-muted text-[12px] tracking-[0.06em] mb-6">
            Home <span className="mx-1 text-vv-line-2">/</span> Travel Spanish
          </div>
          <div className="grid lg:grid-cols-[0.8fr_1.2fr]  gap-10 max-[900px]:grid-cols-1">
            <div className="flex flex-col gap-5">
              <h1 className="text-[clamp(34px,4.5vw,64px)] font-semibold tracking-[-0.03em] leading-[1.08] m-0">
                Travelling to Ecuador?{" "}
                <span className="text-vv-accent-deep">Learn the Spanish</span>{" "}
                You&apos;ll Actually Use.
              </h1>
              <p className="text-vv-ink-2 text-[clamp(16px,1.3vw,19px)] leading-relaxed m-0 max-w-[56ch] text-pretty">
                A few classes before or during your trip can transform your
                experience. Our teachers specialise in practical, conversational
                Spanish. The kind that gets you off the tourist trail.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 mt-1">
                <Link
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 border border-vv-accent rounded-full cursor-pointer text-[15px] font-semibold tracking-[-0.005em] leading-none py-3.5 px-5.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-vv-accent text-vv-accent-deep hover:bg-vv-accent-hi hover:-translate-y-px"
                >
                  Plan My Travel Spanish. WhatsApp Us
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2.5 border border-vv-line-2 rounded-full cursor-pointer text-[15px] font-semibold tracking-[-0.005em] leading-none py-3.5 px-5.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-transparent text-vv-ink hover:bg-vv-ink hover:border-vv-ink hover:text-vv-bg"
                >
                  Send Us a Message{" "}
                  <ChevronRight className="h-4 w-4 shrink-0 translate-y-0.5" />
                </Link>
              </div>
              <p className="text-[13px] text-vv-muted m-0">
                We respond within 24 hours, Monday to Friday.
              </p>
            </div>

            <div className="max-[900px]:hidden overflow-hidden">
              <WorldMap dots={TRAVEL_DOTS} lineColor="#a3d635" />
            </div>
          </div>
        </Container>
      </section>

      {/* Spanish for Travellers */}
      <section
        className="border-t border-vv-line bg-vv-bg"
        data-screen-label="02 Offer"
      >
        <Container>
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-start">
            <div className="flex flex-col gap-5">
              <span className="font-code text-vv-muted text-[11px] font-medium tracking-[0.14em] uppercase">
                {"// Spanish for Travellers"}
              </span>
              <h2 className="text-[clamp(28px,3vw,44px)] font-semibold tracking-[-0.02em] leading-[1.08] m-0 text-balance">
                Spanish for Travellers
              </h2>
              <p className="text-[16px] leading-[1.75] text-vv-ink-2 m-0">
                Whether you have a week or a month, a few targeted Spanish
                classes can make a real difference to how you experience
                Ecuador. Our travel Spanish programme is flexible, practical,
                and built around you.
              </p>
              <p className="text-[16px] leading-[1.75] text-vv-ink-2 m-0">
                Classes can be taken online before you arrive, or in person in
                Quito. Add a homestay with a local family and you&apos;ll be
                practising around the clock.
              </p>
              <p className="text-[16px] leading-[1.75] text-vv-ink-2 m-0">
                If you&apos;d like advice on your itinerary, local
                recommendations, or help navigating Ecuador as a traveller, our
                team is happy to help. We&apos;ve been in Quito for 25 years.
                we know the country well.
              </p>
            </div>

            {/* Pricing note card */}
            <div className="rounded-[22px] border border-vv-line bg-vv-bg-warm p-7 flex flex-col gap-4 lg:sticky lg:top-24">
              <div className="font-code text-vv-muted text-[11px] font-medium tracking-[0.14em] uppercase">
                {"// Pricing"}
              </div>
              <p className="text-[15px] leading-[1.7] text-vv-ink-2 m-0">
                There&apos;s no fixed price for travel Spanish. It depends on
                how many classes you want, whether you&apos;d like online or
                in-person, and whether you&apos;re adding a homestay. Contact us
                and we&apos;ll put together a custom quote.
              </p>
              <div className="flex flex-col gap-2.5 pt-2">
                <Link
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 border border-vv-accent rounded-full cursor-pointer text-[14px] font-semibold tracking-[-0.005em] leading-none py-3 px-5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-vv-accent text-vv-accent-deep hover:bg-vv-accent-hi hover:-translate-y-px text-center"
                >
                  Plan My Travel Spanish. WhatsApp Us
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2.5 border border-vv-line-2 rounded-full cursor-pointer text-[14px] font-semibold tracking-[-0.005em] leading-none py-3 px-5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-transparent text-vv-ink hover:bg-vv-ink hover:border-vv-ink hover:text-vv-bg text-center"
                >
                  Send Us a Message{" "}
                  <ChevronRight className="h-4 w-4 shrink-0 translate-y-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* What Travellers Say */}
      <section
        className="border-t border-vv-line bg-vv-bg-warm"
        data-screen-label="03 Reviews"
      >
        <Container>
          <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex max-w-[64ch] flex-col gap-3">
              <span className="font-code text-vv-muted text-[11px] font-medium tracking-[0.14em] uppercase">
                {"// TripAdvisor"}
              </span>
              <h2 className="text-[clamp(28px,3vw,44px)] font-semibold tracking-[-0.02em] leading-[1.08] m-0 text-balance">
                What Travellers Say About Us
              </h2>
              <p className="text-[13px] text-vv-muted italic">
                TripAdvisor profile URL and badge to be supplied by Vida Verde.
              </p>
            </div>

            <div
              className="w-full rounded-[22px] border border-vv-line bg-vv-bg px-6 py-5 shadow-sm lg:mt-1 lg:max-w-[19.5rem]"
              aria-label="TripAdvisor rating badge"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-[12px] font-semibold uppercase tracking-[0.14em] text-vv-muted">
                    TripAdvisor
                  </div>
                  <div className="mt-1 text-[24px] font-semibold leading-none tracking-[-0.02em] text-vv-ink">
                    Excellent
                  </div>
                </div>
                <div className="grid h-[3.25rem] w-[3.25rem] place-items-center rounded-full bg-[#00aa6c]/12 text-[#00aa6c]">
                  <Star className="h-6 w-6 fill-[#00aa6c] text-[#00aa6c]" />
                </div>
              </div>
              <div className="mt-4 flex gap-1" aria-label="5 out of 5 rating">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className="h-3.5 w-3.5 rounded-full bg-[#00aa6c]"
                  />
                ))}
              </div>
              <div className="mt-3 text-[12px] leading-relaxed text-vv-ink-2">
                Trusted by travellers learning Spanish for real Ecuador trips.
              </div>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {reviews.map((review) => (
              <article
                key={review.name}
                className="flex flex-col gap-5 rounded-[22px] border border-vv-line bg-vv-bg p-7"
              >
                <div className="flex gap-0.5" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <blockquote className="flex-1 text-[15px] leading-[1.65] text-vv-ink m-0 text-pretty">
                  &ldquo;{review.quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3 border-t border-vv-line pt-4">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-vv-accent text-vv-accent-deep text-[12px] font-bold">
                    {review.initials}
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold text-vv-ink">
                      {review.name}
                    </div>
                    <div className="text-[11px] text-vv-muted mt-0.5">
                      {review.meta}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

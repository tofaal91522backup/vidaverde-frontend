import { Container } from "@/components/shared/Container";
import { MarketingButton } from "@/features/marketing/components/MarketingButton";
import { SectionHeader } from "@/features/marketing/pages/home/components/SectionHeader";
import { Calendar, Globe2, MapPin, Star } from "lucide-react";
import Link from "next/link";

const WHATSAPP_HREF =
  "https://wa.me/593998037473?text=Hi%2C%20I%27d%20like%20to%20find%20out%20more%20about%20Travel%20Spanish%20classes%20at%20Vida%20Verde.";

const offerings = [
  {
    icon: Calendar,
    title: "Short-Stay Classes",
    body: "Even a few days of focused one-on-one Spanish can transform your trip. We offer classes from a single day to several weeks, in person in Quito or via Google Meet before you arrive.",
  },
  {
    icon: MapPin,
    title: "In-Person or Online",
    body: "Already in Ecuador? Join us at our La Floresta school in Quito. Planning ahead? Start online before your trip and continue in person when you arrive.",
  },
  {
    icon: Globe2,
    title: "Travel Advisory Included",
    body: "Our team knows Ecuador. Along with your Spanish classes, we can advise on travel routes, safe neighbourhoods, local recommendations, and cultural customs to help your trip go smoothly.",
  },
];

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
          <div className="grid lg:grid-cols-[1fr_auto] items-end gap-10 max-[900px]:grid-cols-1">
            <div className="flex flex-col gap-5 max-w-160">
              <h1 className="text-[clamp(34px,4.5vw,64px)] font-semibold tracking-[-0.03em] leading-[1.08] m-0">
                Travelling to Ecuador?{" "}
                <span className="text-vv-accent">Learn the Spanish</span>{" "}
                You'll Actually Use.
              </h1>
              <p className="text-vv-ink-2 text-[clamp(16px,1.3vw,19px)] leading-relaxed m-0 max-w-[52ch] text-pretty">
                Short-stay classes in person in Quito or online before you
                arrive. Native teachers, flexible scheduling, real results. Even
                in just a few days.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 mt-1">
                <Link
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 border border-vv-accent rounded-full cursor-pointer text-[15px] font-semibold tracking-[-0.005em] py-3.5 px-5.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-vv-accent text-vv-accent-deep hover:bg-vv-accent-hi hover:-translate-y-px"
                >
                  Plan My Travel Spanish
                </Link>
                <MarketingButton href="/contact" tone="ghost">
                  Send Us a Message →
                </MarketingButton>
              </div>
            </div>

            {/* Stat card */}
            <div className="flex flex-col gap-4 rounded-2xl border border-vv-line bg-vv-bg px-7 py-6 min-w-56 max-[900px]:hidden">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-amber-400 text-amber-400"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <div>
                <div className="text-[32px] font-bold tracking-tight text-vv-ink leading-none">
                  5.0
                </div>
                <div className="text-[12px] text-vv-muted mt-1 font-code uppercase tracking-widest">
                  Rated on TripAdvisor
                </div>
              </div>
              <div className="border-t border-vv-line pt-4 text-[13px] text-vv-ink-2 leading-snug">
                Trusted by travellers from over 50 countries since 1999.
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* What to Expect */}
      <section
        className="border-t border-vv-line bg-vv-bg"
        data-screen-label="02 Offering"
      >
        <Container>
          <SectionHeader
            eyebrow="// What You Get"
            title="Spanish built for your trip."
            lede="No textbook grammar you'll never use. Just the words and phrases that get you through real situations in Ecuador."
          />
          <div className="grid gap-5 md:grid-cols-3">
            {offerings.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="flex flex-col gap-4 rounded-[22px] border border-vv-line bg-vv-bg-warm p-7"
                >
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-vv-accent text-vv-accent-deep shrink-0">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-[18px] font-semibold tracking-[-0.02em] leading-tight text-vv-ink m-0">
                    {item.title}
                  </h3>
                  <p className="text-[14px] leading-[1.6] text-vv-ink-2 m-0">
                    {item.body}
                  </p>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Reviews */}
      <section
        className="border-t border-vv-line bg-vv-bg-warm"
        data-screen-label="03 Reviews"
      >
        <Container>
          <SectionHeader
            eyebrow="// Traveller Reviews"
            title="What travellers say."
            lede="Rated Excellent on TripAdvisor. Here's what Ecuador-bound students say about learning with us."
          />
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

      {/* Pricing note */}
      <section
        className="border-t border-vv-line bg-vv-bg"
        data-screen-label="04 Pricing"
      >
        <Container className="max-w-220">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="flex flex-col gap-4">
              <span className="font-code text-vv-muted text-[11px] font-medium tracking-[0.14em] uppercase">
                {"// Pricing"}
              </span>
              <h2 className="text-[clamp(26px,3vw,40px)] font-semibold tracking-[-0.02em] leading-tight m-0">
                Custom pricing for every trip.
              </h2>
              <p className="text-vv-ink-2 text-[16px] leading-relaxed m-0">
                Travel Spanish is bespoke. Pricing depends on how many days you
                have, whether you want classes online or in person, and whether
                you'd like to add homestay. Contact us and we'll put together a
                plan that fits your trip and your budget.
              </p>
              <p className="text-vv-ink-2 text-[16px] leading-relaxed m-0">
                Most travellers do 2–5 days of intensive classes. Online lessons
                start from $12 per class. WhatsApp us and we'll reply within a
                few hours with a tailored quote.
              </p>
            </div>
            <div className="flex flex-col gap-4 rounded-[22px] border border-vv-line bg-vv-bg-warm p-8">
              <div className="font-code text-vv-muted text-[11px] uppercase tracking-widest">
                Custom quote
              </div>
              <div className="text-[42px] font-bold text-vv-ink tracking-tight leading-none">
                Get a Quote
              </div>
              <p className="text-vv-ink-2 text-[14px] leading-relaxed m-0">
                No fixed packages here. Tell us your trip dates and goals and
                we'll build a plan around you.
              </p>
              <ul className="flex flex-col gap-2 list-none p-0 m-0">
                {[
                  "Flexible duration: 1 day to several weeks",
                  "In-person in Quito or online via Google Meet",
                  "Homestay add-on available",
                  "We reply within a few hours",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-[13px] text-vv-ink-2">
                    <span className="text-vv-accent mt-0.5" aria-hidden="true">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center justify-center gap-2.5 border border-vv-ink rounded-full cursor-pointer text-[15px] font-semibold tracking-[-0.005em] py-3.5 px-5.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-vv-ink text-vv-bg hover:bg-vv-accent-deep hover:border-vv-accent-deep hover:-translate-y-px"
              >
                WhatsApp Us for a Quote
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Bottom CTA */}
      <section
        className="border-t border-vv-line bg-vv-ink"
        data-screen-label="05 Bottom CTA"
      >
        <Container className="text-center">
          <span className="font-code text-vv-accent text-[11px] font-medium tracking-[0.14em] uppercase">
            {"// Ready to go?"}
          </span>
          <div className="h-4" />
          <h2 className="text-[clamp(28px,3vw,44px)] font-semibold tracking-[-0.02em] leading-[1.08] m-0 text-vv-bg text-balance">
            Your trip will be better with Spanish.
          </h2>
          <p className="text-vv-bg/70 text-[clamp(16px,1.3vw,19px)] leading-normal mt-3 max-w-[50ch] mx-auto m-0">
            Even a few lessons before you fly makes a real difference. WhatsApp us
            and we'll have a plan ready for you today.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3 justify-center">
            <Link
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 border border-vv-accent rounded-full cursor-pointer text-[15px] font-semibold tracking-[-0.005em] py-3.5 px-5.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-vv-accent text-vv-accent-deep hover:bg-vv-accent-hi hover:-translate-y-px"
            >
              Plan My Travel Spanish
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2.5 border border-vv-bg/30 rounded-full cursor-pointer text-[15px] font-semibold tracking-[-0.005em] py-3.5 px-5.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-transparent text-vv-bg hover:bg-vv-bg/10"
            >
              Send Us a Message →
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}

import { Container } from "@/components/shared/Container";
import { MarketingButton } from "@/features/marketing/components/MarketingButton";
import { Globe2, MapPin, MessageCircle, BookOpen } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const programs = [
  {
    label: "Online Classes",
    description:
      "One-on-one lessons with a native teacher via Google Meet. Flexible scheduling, all levels. Start today.",
    price: "From $12",
    priceSub: "Book Your First Lesson",
    cta: "Get Started →",
    href: "/online-classes",
    icon: Globe2,
    badge: "Most Popular",
    tone: "accent" as const,
  },
  {
    label: "Study in Quito",
    description:
      "Full immersion in Ecuador: daily classes, homestay with an Ecuadorian family, and cultural activities.",
    price: "From $140 / week",
    priceSub: "Explore Programs",
    cta: "Explore Programs →",
    href: "/study-in-quito",
    icon: MapPin,
    tone: "dark" as const,
  },
  {
    label: "Travel Spanish",
    description:
      "Travelling to Ecuador? Learn the Spanish you'll actually use before or during your trip.",
    price: "Custom quote",
    priceSub: "Contact us to plan",
    cta: "Plan My Trip →",
    href: "/contact",
    icon: MessageCircle,
    tone: "default" as const,
  },
  {
    label: "Free Spanish Guide",
    description:
      "Not sure where to start? Download our free guide and take your first steps — no commitment needed.",
    price: "Free",
    priceSub: "No commitment needed",
    cta: "Download Free →",
    href: "#lead-capture",
    icon: BookOpen,
    tone: "default" as const,
  },
];

export function CourseSelectorSection() {
  return (
    <section className="bg-vv-bg border-t border-vv-line" data-screen-label="03 Course Selector">
      <Container>
        <SectionHeader
          eyebrow="// Programs"
          title="Find Your Perfect Spanish Program"
          lede="Whether you're at home or heading to Ecuador — we have a programme for you."
        />
        <div className="grid gap-5 md:grid-cols-2">
          {programs.map((prog) => {
            const Icon = prog.icon;
            const isAccent = prog.tone === "accent";
            const isDark = prog.tone === "dark";

            return (
              <article
                key={prog.label}
                className={[
                  "group flex flex-col gap-6 rounded-[22px] border p-8 transition duration-200 max-[640px]:p-6",
                  isAccent
                    ? "bg-vv-accent border-vv-accent text-vv-accent-deep"
                    : isDark
                      ? "bg-vv-bg-deep border-vv-bg-deep text-vv-bg"
                      : "bg-vv-bg border-vv-line text-vv-ink hover:border-vv-accent hover:-translate-y-0.5 hover:shadow-[0_28px_70px_-52px_rgba(15,20,16,0.2)]",
                ].join(" ")}
              >
                {/* Top row */}
                <div className="flex items-start justify-between gap-4">
                  <div
                    className={[
                      "grid h-11 w-11 shrink-0 place-items-center rounded-full",
                      isAccent
                        ? "bg-vv-accent-deep text-vv-accent"
                        : isDark
                          ? "bg-vv-accent text-vv-accent-deep"
                          : "bg-vv-accent text-vv-accent-deep",
                    ].join(" ")}
                  >
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </div>
                  {prog.badge ? (
                    <span
                      className={[
                        "rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider font-code",
                        isAccent ? "bg-vv-accent-deep/15 text-vv-accent-deep" : "bg-vv-ink/10 text-vv-ink",
                      ].join(" ")}
                    >
                      {prog.badge}
                    </span>
                  ) : null}
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col gap-3">
                  <h3
                    className={[
                      "text-[24px] font-semibold tracking-[-0.02em] leading-tight m-0",
                      isAccent ? "text-vv-accent-deep" : isDark ? "text-vv-bg" : "text-vv-ink",
                    ].join(" ")}
                  >
                    {prog.label}
                  </h3>
                  <p
                    className={[
                      "text-[15px] leading-[1.6] m-0 flex-1",
                      isAccent ? "text-vv-accent-deep/75" : isDark ? "text-vv-bg/65" : "text-vv-ink-2",
                    ].join(" ")}
                  >
                    {prog.description}
                  </p>
                </div>

                {/* Price + CTA */}
                <div className="flex items-end justify-between gap-4 pt-2 border-t border-current/10">
                  <div>
                    <div
                      className={[
                        "text-[20px] font-bold tracking-[-0.02em]",
                        isAccent ? "text-vv-accent-deep" : isDark ? "text-vv-bg" : "text-vv-ink",
                      ].join(" ")}
                    >
                      {prog.price}
                    </div>
                    <div
                      className={[
                        "text-[11px] font-code mt-0.5",
                        isAccent ? "text-vv-accent-deep/60" : isDark ? "text-vv-bg/50" : "text-vv-muted",
                      ].join(" ")}
                    >
                      {prog.priceSub}
                    </div>
                  </div>
                  <MarketingButton
                    href={prog.href}
                    tone={isAccent ? "dark" : isDark ? "primary" : "ghost"}
                  >
                    {prog.cta}
                  </MarketingButton>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

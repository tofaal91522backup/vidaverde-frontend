import { Container } from "@/components/shared/Container";
import { ChevronRight } from "lucide-react";
import { MarketingButton } from "@/features/marketing/components/MarketingButton";
import { SectionHeader } from "./SectionHeader";
import Image from "next/image";

/* ── Inline SVG illustrations ───────────────────────────────────────────── */

function LaptopIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 90"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <rect
        x="10"
        y="8"
        width="100"
        height="62"
        rx="7"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <rect
        x="17"
        y="15"
        width="86"
        height="48"
        rx="3"
        fill="currentColor"
        fillOpacity="0.07"
      />
      <circle cx="60" cy="36" r="13" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M36 56 Q60 47 84 56"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M2 72 L118 72 L110 82 L10 82 Z"
        fill="currentColor"
        fillOpacity="0.08"
        stroke="currentColor"
        strokeWidth="1"
      />
      {/* signal dots */}
      <circle cx="97" cy="22" r="2.5" fill="currentColor" fillOpacity="0.6" />
      <circle cx="103" cy="22" r="2" fill="currentColor" fillOpacity="0.35" />
      <circle cx="108" cy="22" r="1.5" fill="currentColor" fillOpacity="0.2" />
    </svg>
  );
}

function MountainsIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 90"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {/* far mountain */}
      <path
        d="M0 68 L28 28 L52 58"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeOpacity="0.5"
      />
      {/* main mountain */}
      <path
        d="M42 68 L80 10 L118 68"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      {/* snow cap */}
      <path
        d="M74 24 L80 10 L86 24 Q80 28 74 24 Z"
        fill="currentColor"
        fillOpacity="0.15"
        stroke="currentColor"
        strokeWidth="1"
      />
      {/* buildings foreground */}
      <rect
        x="14"
        y="54"
        width="14"
        height="16"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="currentColor"
        fillOpacity="0.06"
      />
      <rect
        x="30"
        y="48"
        width="11"
        height="22"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="currentColor"
        fillOpacity="0.06"
      />
      {/* ground */}
      <line
        x1="0"
        y1="70"
        x2="120"
        y2="70"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.25"
      />
      {/* sun */}
      <circle cx="14" cy="16" r="6" stroke="currentColor" strokeWidth="1.2" />
      <line
        x1="14"
        y1="5"
        x2="14"
        y2="3"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <line
        x1="22"
        y1="9"
        x2="24"
        y2="7"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <line
        x1="25"
        y1="16"
        x2="27"
        y2="16"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AirplaneIllustration({ className }: { className?: string }) {
  return (
    <Image
      src="/images/airplane.svg"
      width={240}
      height={158}
      alt=""
      aria-hidden="true"
      className={className}
    />
  );

  return (
    <svg
      viewBox="0 0 120 90"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {/* Dotted flight path arc */}
      <path
        d="M8,80 Q60,62 112,32"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="3 5"
        strokeLinecap="round"
        strokeOpacity="0.3"
      />

      {/* Cloud 1. Upper left */}
      <path
        d="M6,30 Q6,24 12,23 Q15,18 22,20 Q28,19 30,24 Q35,24 35,29 Q35,33 30,33 L11,33 Q6,33 6,30 Z"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.05"
      />
      {/* Cloud 2. Upper right */}
      <path
        d="M82,25 Q82,19 88,18 Q91,14 97,15 Q103,14 105,19 Q110,19 110,24 Q110,28 105,28 L87,28 Q82,28 82,25 Z"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.05"
      />
      {/* Cloud 3. Small, centre */}
      <path
        d="M42,36 Q42,32 46,31 Q48,28 53,29 Q57,28 58,32 Q61,32 61,35 Q61,38 58,38 L45,38 Q42,38 42,36 Z"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.04"
      />

      {/* Fuselage body */}
      <path
        d="M22,48 C22,43 26,40 34,40 L83,40 C94,40 108,42 110,48 C108,54 94,56 83,56 L34,56 C26,56 22,53 22,48 Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.07"
      />

      {/* Vertical tail fin */}
      <path
        d="M26,40 L22,23 Q27,20 33,23 L34,36 L34,40 Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.06"
      />
      {/* Horizontal tail stabilizer */}
      <path
        d="M26,55 L18,64 L22,66 L30,57"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.06"
      />

      {/* Main wing */}
      <path
        d="M58,55 L52,77 L66,77 L74,55 Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.07"
      />

      {/* Oval windows */}
      <ellipse
        cx="54"
        cy="44"
        rx="4"
        ry="2.8"
        stroke="currentColor"
        strokeWidth="1.1"
        fill="currentColor"
        fillOpacity="0.08"
      />
      <ellipse
        cx="65"
        cy="43"
        rx="4"
        ry="2.8"
        stroke="currentColor"
        strokeWidth="1.1"
        fill="currentColor"
        fillOpacity="0.08"
      />
      <ellipse
        cx="76"
        cy="43"
        rx="4"
        ry="2.8"
        stroke="currentColor"
        strokeWidth="1.1"
        fill="currentColor"
        fillOpacity="0.08"
      />
      <ellipse
        cx="87"
        cy="42"
        rx="3.5"
        ry="2.5"
        stroke="currentColor"
        strokeWidth="1.1"
        fill="currentColor"
        fillOpacity="0.08"
      />
    </svg>
  );
}

function BookIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 90"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {/* left page */}
      <path
        d="M8 14 Q32 10 60 14 L60 78 Q32 74 8 78 Z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="currentColor"
        fillOpacity="0.05"
      />
      {/* right page */}
      <path
        d="M60 14 Q88 10 112 14 L112 78 Q88 74 60 78 Z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="currentColor"
        fillOpacity="0.09"
      />
      {/* spine */}
      <line
        x1="60"
        y1="14"
        x2="60"
        y2="78"
        stroke="currentColor"
        strokeWidth="2"
      />
      {/* text lines left */}
      <line
        x1="18"
        y1="27"
        x2="50"
        y2="27"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.35"
        strokeLinecap="round"
      />
      <line
        x1="18"
        y1="35"
        x2="50"
        y2="35"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.35"
        strokeLinecap="round"
      />
      <line
        x1="18"
        y1="43"
        x2="42"
        y2="43"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.35"
        strokeLinecap="round"
      />
      <line
        x1="18"
        y1="51"
        x2="50"
        y2="51"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.35"
        strokeLinecap="round"
      />
      <line
        x1="18"
        y1="59"
        x2="38"
        y2="59"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.35"
        strokeLinecap="round"
      />
      {/* text lines right */}
      <line
        x1="70"
        y1="27"
        x2="102"
        y2="27"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.35"
        strokeLinecap="round"
      />
      <line
        x1="70"
        y1="35"
        x2="102"
        y2="35"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.35"
        strokeLinecap="round"
      />
      <line
        x1="70"
        y1="43"
        x2="90"
        y2="43"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.35"
        strokeLinecap="round"
      />
      {/* bookmark */}
      <path
        d="M96 10 L96 32 Q96 37 92 40 Q88 37 88 32 L88 10 Z"
        fill="currentColor"
        fillOpacity="0.18"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}

/* ── Programs data ───────────────────────────────────────────────────────── */

const programs = [
  {
    label: "Online Classes",
    description:
      "One-on-one lessons with a native teacher via Google Meet. Flexible scheduling, all levels. Start today.",
    price: "From $12",
    priceSub: "Book Your First Lesson",
    cta: "Get Started",
    href: "/online-classes",
    Illustration: LaptopIllustration,
    badge: "Most Popular",
    tone: "accent" as const,
  },
  {
    label: "Study in Quito",
    description:
      "Full immersion in Ecuador: daily classes, homestay with an Ecuadorian family, and cultural activities.",
    price: "From $140 / week",
    priceSub: "Explore Programs",
    cta: "Explore Programs",
    href: "/study-in-quito",
    Illustration: MountainsIllustration,
    tone: "dark" as const,
  },
  {
    label: "Travel Spanish",
    description:
      "Travelling to Ecuador? Learn the Spanish you'll actually use before or during your trip.",
    price: "Custom quote",
    priceSub: "Contact us to plan",
    cta: "Plan My Trip",
    href: "/travel-spanish",
    Illustration: AirplaneIllustration,
    tone: "default" as const,
  },
  {
    label: "Free Spanish Guide",
    description:
      "Not sure where to start? Download our free guide and take your first steps. No commitment needed.",
    price: "Free",
    priceSub: "No commitment needed",
    cta: "Download Free",
    href: "#lead-capture",
    Illustration: BookIllustration,
    tone: "default" as const,
  },
];

export function CourseSelectorSection() {
  return (
    <section
      className="bg-vv-bg border-t border-vv-line"
      data-screen-label="03 Course Selector"
    >
      <Container>
        <SectionHeader
          eyebrow="// Programs"
          title="Find Your Perfect Spanish Program"
          lede="Whether you're at home or heading to Ecuador. We have a programme for you."
        />
        <div className="grid gap-5 md:grid-cols-2">
          {programs.map((prog) => {
            const { Illustration } = prog;
            const isAccent = prog.tone === "accent";
            const isDark = prog.tone === "dark";

            return (
              <article
                key={prog.label}
                className={[
                  "group flex flex-col rounded-[22px] border overflow-hidden transition duration-200",
                  isAccent
                    ? "bg-vv-accent border-vv-accent text-vv-accent-deep"
                    : isDark
                      ? "bg-vv-bg-deep border-vv-bg-deep text-vv-bg"
                      : "bg-vv-bg border-vv-line text-vv-ink hover:border-vv-accent hover:-translate-y-0.5 hover:shadow-[0_28px_70px_-52px_rgba(15,20,16,0.2)]",
                ].join(" ")}
              >
                {/* Illustration strip */}
                <div
                  className={[
                    "relative flex items-center justify-center px-8 pt-8 pb-4",
                    isAccent
                      ? "text-vv-accent-deep"
                      : isDark
                        ? "text-vv-accent"
                        : "text-vv-ink",
                  ].join(" ")}
                >
                  <Illustration
                    className={`h-24 w-auto max-w-45${isAccent || isDark ? " opacity-75" : ""}`}
                  />
                  {prog.badge && (
                    <span
                      className={[
                        "absolute top-5 right-5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider font-code",
                        isAccent
                          ? "bg-vv-accent-deep/15 text-vv-accent-deep"
                          : "bg-vv-ink/10 text-vv-ink",
                      ].join(" ")}
                    >
                      {prog.badge}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 gap-4 px-8 pb-8 max-[640px]:px-6 max-[640px]:pb-6">
                  <div className="flex flex-col gap-2">
                    <h3
                      className={[
                        "text-[22px] font-semibold tracking-[-0.02em] leading-tight m-0",
                        isAccent
                          ? "text-vv-accent-deep"
                          : isDark
                            ? "text-vv-bg"
                            : "text-vv-ink",
                      ].join(" ")}
                    >
                      {prog.label}
                    </h3>
                    <p
                      className={[
                        "text-[15px] leading-[1.6] m-0",
                        isAccent
                          ? "text-vv-accent-deep/75"
                          : isDark
                            ? "text-vv-bg/65"
                            : "text-vv-ink-2",
                      ].join(" ")}
                    >
                      {prog.description}
                    </p>
                  </div>

                  {/* Price + CTA */}
                  <div className="flex items-end justify-between gap-4 pt-4 mt-auto border-t border-current/10">
                    <div>
                      <div
                        className={[
                          "text-[20px] font-bold tracking-[-0.02em]",
                          isAccent
                            ? "text-vv-accent-deep"
                            : isDark
                              ? "text-vv-bg"
                              : "text-vv-ink",
                        ].join(" ")}
                      >
                        {prog.price}
                      </div>
                      <div
                        className={[
                          "text-[11px] font-code mt-0.5",
                          isAccent
                            ? "text-vv-accent-deep/60"
                            : isDark
                              ? "text-vv-bg/50"
                              : "text-vv-muted",
                        ].join(" ")}
                      >
                        {prog.priceSub}
                      </div>
                    </div>
                    <MarketingButton
                      href={prog.href}
                      tone={isAccent ? "dark" : isDark ? "primary" : "ghost"}
                    >
                      {prog.cta}{" "}
                      <ChevronRight className="h-4 w-4 shrink-0 translate-y-0.5" />
                    </MarketingButton>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

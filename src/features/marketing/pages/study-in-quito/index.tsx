import { Container } from "@/components/shared/Container";
import { programs } from "./data/programs.data";
import Image from "next/image";
import Link from "next/link";

export default function StudyInQuitoRoute() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden bg-vv-bg-warm border-b border-vv-line"
        data-screen-label="01 Study in Quito Hero"
      >
        {/* Background decoration */}
        <svg
          className="absolute inset-0 h-full w-full pointer-events-none select-none"
          viewBox="0 0 1000 560"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="siq-fade" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f7f5f0" stopOpacity="1" />
              <stop offset="42%" stopColor="#f7f5f0" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Concentric arcs — top right */}
          {[260, 340, 420, 500, 580].map((r, i) => (
            <circle
              key={r}
              cx="1000"
              cy="0"
              r={r}
              fill="none"
              stroke="#1f3d1a"
              strokeWidth="0.8"
              opacity={0.07 - i * 0.01}
            />
          ))}

          {/* Dot grid — right half */}
          {Array.from({ length: 13 }, (_, row) =>
            Array.from({ length: 16 }, (_, col) => (
              <circle
                key={`d-${row}-${col}`}
                cx={480 + col * 40}
                cy={row * 44 + 22}
                r="1.4"
                fill="#1f3d1a"
                opacity="0.08"
              />
            ))
          )}

          {/* Andean mountain silhouette — bottom right */}
          <path
            d="M 480 560 L 560 420 L 600 450 L 660 360 L 710 400 L 770 300 L 830 348 L 890 260 L 950 310 L 1000 270 L 1000 560 Z"
            fill="#1f3d1a"
            opacity="0.055"
          />
          {/* Second range (closer, lighter) */}
          <path
            d="M 600 560 L 670 460 L 710 490 L 760 420 L 820 450 L 870 390 L 930 430 L 1000 380 L 1000 560 Z"
            fill="#a3d635"
            opacity="0.06"
          />

          {/* Colonial arch (Quito historic centre) */}
          <g transform="translate(730, 100)" opacity="0.11">
            <path
              d="M 0 80 L 0 28 Q 0 0 24 0 Q 48 0 48 28 L 48 80"
              fill="none"
              stroke="#1f3d1a"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            {/* Steps/base */}
            <line x1="-8" y1="80" x2="56" y2="80" stroke="#1f3d1a" strokeWidth="1.4" />
            <line x1="-4" y1="86" x2="52" y2="86" stroke="#1f3d1a" strokeWidth="1" />
            {/* Arch detail */}
            <path
              d="M 8 80 L 8 34 Q 8 10 24 10 Q 40 10 40 34 L 40 80"
              fill="none"
              stroke="#1f3d1a"
              strokeWidth="0.75"
              opacity="0.5"
            />
          </g>

          {/* Tropical leaf — top right */}
          <g transform="translate(890, 60)" opacity="0.1">
            <path
              d="M 24 90 Q -18 60 0 10 Q 10 0 20 6 Q 52 20 66 60 Q 52 90 24 90Z"
              fill="none"
              stroke="#a3d635"
              strokeWidth="1.6"
            />
            <line x1="24" y1="90" x2="34" y2="28" stroke="#a3d635" strokeWidth="1.1" />
          </g>
          {/* Second smaller leaf */}
          <g transform="translate(940, 130)" opacity="0.07">
            <path
              d="M 14 56 Q -10 36 0 6 Q 4 0 12 4 Q 32 12 40 36 Q 32 56 14 56Z"
              fill="none"
              stroke="#a3d635"
              strokeWidth="1.4"
            />
            <line x1="14" y1="56" x2="20" y2="18" stroke="#a3d635" strokeWidth="1" />
          </g>

          {/* Map pin — Ecuador */}
          <g transform="translate(680, 230)" opacity="0.12">
            <path
              d="M 18 0 C 8 0 0 8 0 18 C 0 30 18 46 18 46 C 18 46 36 30 36 18 C 36 8 28 0 18 0Z"
              fill="none"
              stroke="#1f3d1a"
              strokeWidth="1.6"
            />
            <circle cx="18" cy="18" r="6" fill="none" stroke="#a3d635" strokeWidth="1.3" />
            {/* Equator line */}
            <line x1="0" y1="18" x2="36" y2="18" stroke="#a3d635" strokeWidth="0.7" strokeDasharray="2 2" opacity="0.5" />
          </g>

          {/* Sun / horizon rays */}
          <g transform="translate(840, 380)" opacity="0.08">
            <circle cx="0" cy="0" r="18" fill="none" stroke="#a3d635" strokeWidth="1.4" />
            <circle cx="0" cy="0" r="10" fill="none" stroke="#a3d635" strokeWidth="0.8" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
              const rad = (deg * Math.PI) / 180;
              return (
                <line
                  key={i}
                  x1={Math.cos(rad) * 22}
                  y1={Math.sin(rad) * 22}
                  x2={Math.cos(rad) * 30}
                  y2={Math.sin(rad) * 30}
                  stroke="#a3d635"
                  strokeWidth="1.2"
                />
              );
            })}
          </g>

          {/* Scattered dots */}
          <circle cx="610" cy="170" r="3.5" fill="#a3d635" opacity="0.16" />
          <circle cx="658" cy="310" r="2.5" fill="#a3d635" opacity="0.13" />
          <circle cx="800" cy="180" r="4" fill="#1f3d1a" opacity="0.07" />
          <circle cx="960" cy="210" r="3" fill="#a3d635" opacity="0.12" />
          <circle cx="720" cy="440" r="3" fill="#1f3d1a" opacity="0.06" />
          <circle cx="980" cy="440" r="4" fill="#a3d635" opacity="0.08" />

          {/* Plus marks */}
          {([
            [640, 260, "#a3d635", 0.15],
            [870, 300, "#1f3d1a", 0.1],
            [960, 130, "#a3d635", 0.13],
            [630, 440, "#1f3d1a", 0.08],
          ] as const).map(([x, y, c, o], i) => (
            <g key={`plus-${i}`} opacity={o}>
              <line x1={x - 7} y1={y} x2={x + 7} y2={y} stroke={c} strokeWidth="1.1" />
              <line x1={x} y1={y - 7} x2={x} y2={y + 7} stroke={c} strokeWidth="1.1" />
            </g>
          ))}

          {/* Fade overlay */}
          <rect x="0" y="0" width="1000" height="560" fill="url(#siq-fade)" />
        </svg>

        <Container className="relative z-10">
          <div className="font-code text-vv-muted text-[12px] tracking-[0.06em] mb-6">
            Home <span className="mx-1 text-vv-line-2">/</span> Study in Quito
          </div>
          <h1 className="text-[clamp(36px,5vw,68px)] font-semibold tracking-[-0.03em] leading-none m-0 mb-5">
            Immerse Yourself in Spanish.
            <br />
            Live It in Ecuador.
          </h1>
          <p className="text-vv-ink-2 text-[clamp(17px,1.4vw,20px)] leading-normal max-w-[52ch] text-pretty m-0">
            From a week in Quito to a journey along the Pacific coast, Vida
            Verde&apos;s immersion programmes combine expert teaching with real
            Ecuadorian life.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <a
              href="#programmes"
              className="inline-flex items-center justify-center gap-2.5 border border-vv-accent rounded-full cursor-pointer text-[15px] font-semibold tracking-[-0.005em] py-3.5 px-5.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-vv-accent text-vv-accent-deep hover:bg-vv-accent-hi hover:-translate-y-px"
            >
              Explore Our Programmes ↓
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2.5 border border-vv-line-2 rounded-full cursor-pointer text-[15px] font-semibold tracking-[-0.005em] py-3.5 px-5.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-transparent text-vv-ink hover:bg-vv-ink hover:border-vv-ink hover:text-vv-bg"
            >
              Contact Us to Plan Your Stay
            </Link>
          </div>
        </Container>
      </section>

      {/* Programme Cards */}
      <section
        className="border-t border-vv-line"
        data-screen-label="02 Programmes"
        id="programmes"
      >
        <Container>
          <div className="flex flex-col gap-3.5 mb-12 max-w-[58ch]">
            <span className="font-code text-vv-muted text-[11px] font-medium tracking-[0.14em] uppercase">
              {"// Programmes"}
            </span>
            <h2 className="text-[clamp(28px,3vw,44px)] font-semibold tracking-[-0.02em] leading-[1.08] m-0 text-balance">
              Choose Your Programme
            </h2>
            <p className="text-vv-ink-2 text-[clamp(15px,1.1vw,17px)] leading-relaxed m-0 text-pretty">
              All programmes include one-on-one classes with an expert
              Ecuadorian teacher. Most include homestay with a local family.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {programs.map((program) => (
              <article
                key={program.slug}
                className="group flex flex-col overflow-hidden rounded-[22px] border border-vv-line bg-vv-bg transition hover:-translate-y-0.5 hover:border-vv-accent"
              >
                <div className="relative aspect-video overflow-hidden bg-vv-bg-warm">
                  <Image
                    src={program.heroImage}
                    alt={program.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition duration-300 group-hover:scale-[1.03]"
                    unoptimized
                  />
                </div>
                <div className="flex flex-col gap-3 p-6 flex-1">
                  <div>
                    <h3 className="text-[20px] font-semibold leading-tight tracking-[-0.02em] text-vv-ink m-0">
                      {program.title}
                    </h3>
                    <div className="mt-1 text-[13px] text-vv-ink-2">
                      From{" "}
                      <strong className="text-vv-ink font-semibold">
                        {program.priceFrom}
                      </strong>
                      {program.pricePeriod}
                    </div>
                  </div>
                  <p className="text-[14px] leading-[1.6] text-vv-ink-2 flex-1 m-0">
                    {program.tagline}
                  </p>
                  <Link
                    href={`/study-in-quito/${program.slug}`}
                    className="mt-auto inline-flex items-center justify-center gap-2.5 border border-vv-line-2 rounded-full cursor-pointer text-[13px] font-semibold tracking-[-0.005em] py-2.25 px-3.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-transparent text-vv-ink hover:bg-vv-ink hover:border-vv-ink hover:text-vv-bg text-center"
                  >
                    View Programme →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Homestay Preview */}
      {/* <section
        className="border-t border-vv-line bg-vv-bg-warm"
        data-screen-label="03 Homestay Preview"
      >
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="relative aspect-4/3 overflow-hidden rounded-[22px] border border-vv-line">
              <Image
                src="https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1000&q=80"
                alt="Ecuadorian host family at home"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="flex flex-col gap-5">
              <span className="font-code text-vv-muted text-[11px] font-medium tracking-[0.14em] uppercase">
                {"// Homestay"}
              </span>
              <h2 className="text-[clamp(28px,3vw,44px)] font-semibold tracking-[-0.02em] leading-[1.08] m-0 text-balance">
                Live Like a Local. Learn Faster.
              </h2>
              <p className="text-[15px] leading-[1.7] text-vv-ink-2 m-0">
                The best Spanish classroom isn&apos;t a classroom at all — it&apos;s a
                family dinner table in Quito. Our homestay programme places you
                with a vetted Ecuadorian family, so the immersion never stops
                when the lesson does.
              </p>
              <p className="text-[15px] leading-[1.7] text-vv-ink-2 m-0">
                Meals, conversation, local insight, and a warm home base —
                all from{" "}
                <strong className="text-vv-ink font-semibold">$26/night</strong>.
                Included in the Quito Immersion Program or bookable as an add-on
                to any programme.
              </p>
              <Link
                href="/homestay"
                className="w-fit inline-flex items-center justify-center gap-2.5 border border-vv-ink rounded-full cursor-pointer text-[15px] font-semibold tracking-[-0.005em] py-3.5 px-5.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-vv-ink text-vv-bg hover:bg-vv-accent-deep hover:border-vv-accent-deep hover:-translate-y-px"
              >
                Find out about Homestay →
              </Link>
            </div>
          </div>
        </Container>
      </section> */}

      {/* Enquiry CTA */}
      <section
        className="border-t border-vv-line bg-vv-bg-warm"
        data-screen-label="04 Enquiry"
      >
        <Container className="text-center">
          <span className="font-code text-vv-muted text-[11px] font-medium tracking-[0.14em] uppercase">
            {"// Need help choosing?"}
          </span>
          <div className="h-4" />
          <h2 className="text-[clamp(28px,3vw,44px)] font-semibold tracking-[-0.02em] leading-[1.08] m-0 text-balance">
            Not Sure Which Programme Is Right for You?
          </h2>
          <p className="text-vv-ink-2 text-[clamp(17px,1.4vw,20px)] leading-normal mt-3 max-w-[52ch] mx-auto m-0">
            Tell us a little about your goals, your schedule, and what kind of
            experience you&apos;re looking for. We&apos;ll recommend the best
            fit and answer any questions — in English or Spanish.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <a
              href="https://wa.me/593998037473?text=Hi%2C+I%27d+like+to+find+out+more+about+Vida+Verde%27s+immersion+programmes."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 border border-vv-accent rounded-full cursor-pointer text-[15px] font-semibold tracking-[-0.005em] py-3.5 px-5.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-vv-accent text-vv-accent-deep hover:bg-vv-accent-hi hover:-translate-y-px"
            >
              WhatsApp Us
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2.5 border border-vv-line-2 rounded-full cursor-pointer text-[15px] font-semibold tracking-[-0.005em] py-3.5 px-5.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-transparent text-vv-ink hover:bg-vv-ink hover:border-vv-ink hover:text-vv-bg"
            >
              Send a Message →
            </Link>
          </div>
          <p className="mt-5 text-[13px] text-vv-muted">
            We respond to all enquiries within 24 hours, Monday to Friday.
          </p>
        </Container>
      </section>
    </>
  );
}

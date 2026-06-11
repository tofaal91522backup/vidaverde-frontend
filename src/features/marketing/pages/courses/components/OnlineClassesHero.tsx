import { Container } from "@/components/shared/Container";
import Link from "next/link";
import { AnimatedBookButton } from "../../home/components/HeroSection";

export function OnlineClassesHero() {
  return (
    <section
      className="relative overflow-hidden bg-vv-bg-warm border-b border-vv-line"
      data-screen-label="01 Online Classes Hero"
    >
      {/* Background decoration */}
      <svg
        className="absolute inset-0 h-full w-full pointer-events-none select-none"
        viewBox="0 0 1000 560"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          {/* Fade-left mask so decoration stays on the right */}
          <linearGradient id="oc-fade" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f7f5f0" stopOpacity="1" />
            <stop offset="45%" stopColor="#f7f5f0" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Concentric quarter-arcs anchored top-right */}
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

        {/* Dot grid. Right half only */}
        {Array.from({ length: 13 }, (_, row) =>
          Array.from({ length: 16 }, (_, col) => (
            <circle
              key={`d-${row}-${col}`}
              cx={480 + col * 40}
              cy={row * 44 + 22}
              r="1.4"
              fill="#1f3d1a"
              opacity="0.09"
            />
          ))
        )}

        {/* Laptop / screen icon */}
        <g transform="translate(680, 110)" opacity="0.13">
          <rect x="0" y="0" width="90" height="60" rx="8" fill="none" stroke="#1f3d1a" strokeWidth="1.8" />
          <line x1="0" y1="46" x2="90" y2="46" stroke="#1f3d1a" strokeWidth="1.2" />
          <rect x="34" y="58" width="22" height="10" rx="3" fill="none" stroke="#1f3d1a" strokeWidth="1.2" />
          {/* Screen content lines */}
          <rect x="10" y="12" width="50" height="5" rx="2.5" fill="#a3d635" opacity="0.6" />
          <rect x="10" y="22" width="38" height="4" rx="2" fill="#1f3d1a" opacity="0.3" />
          <rect x="10" y="30" width="44" height="4" rx="2" fill="#1f3d1a" opacity="0.3" />
        </g>

        {/* Video call avatar circles */}
        <g transform="translate(830, 100)" opacity="0.11">
          <circle cx="24" cy="24" r="24" fill="none" stroke="#a3d635" strokeWidth="1.5" />
          <circle cx="24" cy="20" r="10" fill="none" stroke="#a3d635" strokeWidth="1.2" />
          <path d="M 4 48 Q 24 38 44 48" fill="none" stroke="#a3d635" strokeWidth="1.2" />
        </g>
        <g transform="translate(884, 100)" opacity="0.08">
          <circle cx="24" cy="24" r="24" fill="none" stroke="#1f3d1a" strokeWidth="1.5" />
          <circle cx="24" cy="20" r="10" fill="none" stroke="#1f3d1a" strokeWidth="1.2" />
          <path d="M 4 48 Q 24 38 44 48" fill="none" stroke="#1f3d1a" strokeWidth="1.2" />
        </g>

        {/* Book icon */}
        <g transform="translate(900, 270)" opacity="0.1">
          <rect x="0" y="0" width="52" height="68" rx="5" fill="none" stroke="#a3d635" strokeWidth="1.6" />
          <line x1="6" y1="18" x2="46" y2="18" stroke="#a3d635" strokeWidth="1.1" />
          <line x1="6" y1="28" x2="46" y2="28" stroke="#a3d635" strokeWidth="1.1" />
          <line x1="6" y1="38" x2="36" y2="38" stroke="#a3d635" strokeWidth="1.1" />
          <line x1="6" y1="48" x2="40" y2="48" stroke="#a3d635" strokeWidth="1.1" />
          <line x1="26" y1="0" x2="26" y2="68" stroke="#a3d635" strokeWidth="1" opacity="0.4" />
        </g>

        {/* Speech bubbles */}
        <g transform="translate(760, 280)" opacity="0.1">
          <rect x="0" y="0" width="72" height="36" rx="10" fill="none" stroke="#1f3d1a" strokeWidth="1.4" />
          <path d="M 12 36 L 6 48 L 22 36 Z" fill="none" stroke="#1f3d1a" strokeWidth="1.2" strokeLinejoin="round" />
          <rect x="8" y="10" width="40" height="4" rx="2" fill="#1f3d1a" opacity="0.4" />
          <rect x="8" y="20" width="28" height="4" rx="2" fill="#1f3d1a" opacity="0.4" />
        </g>
        <g transform="translate(790, 340)" opacity="0.08">
          <rect x="0" y="0" width="56" height="28" rx="8" fill="none" stroke="#a3d635" strokeWidth="1.2" />
          <path d="M 44 28 L 50 38 L 36 28 Z" fill="none" stroke="#a3d635" strokeWidth="1" strokeLinejoin="round" />
        </g>

        {/* Scattered accent dots */}
        <circle cx="620" cy="160" r="3.5" fill="#a3d635" opacity="0.18" />
        <circle cx="660" cy="320" r="2.5" fill="#a3d635" opacity="0.14" />
        <circle cx="810" cy="200" r="4" fill="#1f3d1a" opacity="0.08" />
        <circle cx="950" cy="200" r="3" fill="#a3d635" opacity="0.14" />
        <circle cx="730" cy="440" r="3.5" fill="#1f3d1a" opacity="0.07" />
        <circle cx="860" cy="400" r="2.5" fill="#a3d635" opacity="0.1" />
        <circle cx="980" cy="360" r="4.5" fill="#1f3d1a" opacity="0.06" />

        {/* Plus marks */}
        {([
          [690, 250, "#a3d635", 0.16],
          [840, 460, "#1f3d1a", 0.12],
          [970, 140, "#a3d635", 0.14],
          [640, 420, "#1f3d1a", 0.1],
        ] as const).map(([x, y, c, o], i) => (
          <g key={`plus-${i}`} opacity={o}>
            <line x1={x - 7} y1={y} x2={x + 7} y2={y} stroke={c} strokeWidth="1.1" />
            <line x1={x} y1={y - 7} x2={x} y2={y + 7} stroke={c} strokeWidth="1.1" />
          </g>
        ))}

        {/* Fade overlay. Keeps left (text) area clean */}
        <rect x="0" y="0" width="1000" height="560" fill="url(#oc-fade)" />
      </svg>

      <Container className="relative z-10">
        <div className="font-code text-vv-muted text-[12px] tracking-[0.06em] mb-6">
          Home <span className="mx-1 text-vv-line-2">/</span> Online Classes
        </div>
        <h1 className="text-[clamp(36px,5vw,68px)] font-semibold tracking-[-0.03em] leading-none m-0 mb-5">
          One-on-One Spanish Classes.
          <br />
          Real Teacher. Anywhere in the World.
        </h1>
        <p className="text-vv-ink-2 text-[clamp(17px,1.4vw,20px)] leading-normal max-w-[52ch] text-pretty m-0">
          Personalised lessons with expert Ecuadorian native speakers via Google
          Meet, at a time that works for you. All levels welcome.
        </p>
        <div className="flex flex-wrap gap-3 mt-6">
          <AnimatedBookButton />
          <Link
            href="#teachers"
            className="inline-flex items-center justify-center gap-2.5 border border-vv-line-2 rounded-full cursor-pointer text-[15px] font-semibold tracking-[-0.005em] py-3.5 px-5.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-transparent text-vv-ink hover:bg-vv-ink hover:border-vv-ink hover:text-vv-bg"
          >
            Choose Your Teacher
          </Link>
        </div>
        <div className="mt-8 flex flex-wrap gap-4 text-[14px] text-vv-ink-2">
          {[
            "AECEE Certified",
            "Est. 1999",
            "4,700+ Students",
            "All Levels Welcome",
            "Classes via Google Meet",
          ].map((item) => (
            <span key={item} className="flex items-center gap-1.5">
              <span className="text-vv-accent" aria-hidden="true">✓</span>
              {item}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}

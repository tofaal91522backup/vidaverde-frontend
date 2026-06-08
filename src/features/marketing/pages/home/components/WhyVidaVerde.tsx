import { Container } from "@/components/shared/Container";
import { Globe2, GraduationCap, Target, UserCheck } from "lucide-react";
import { featureBlocks } from "../data/marketing.data";

const whyIcons = [GraduationCap, UserCheck, Target, Globe2];

function WhyIllustration() {
  return (
    <div
      className="relative flex items-center justify-center py-10 lg:py-0"
      aria-hidden="true"
    >
      {/* Background illustrated layer */}
      <svg
        viewBox="0 0 360 320"
        className="pointer-events-none absolute inset-0 w-full h-full overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="wvGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#a3d635" stopOpacity="0.13" />
            <stop offset="100%" stopColor="#a3d635" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Center glow */}
        <ellipse cx="180" cy="160" rx="155" ry="138" fill="url(#wvGlow)" />

        {/* Outer orbital rings */}
        <circle cx="180" cy="160" r="150" fill="none" stroke="#1f3d1a" strokeWidth="0.6" opacity="0.07" strokeDasharray="3 7" />
        <circle cx="180" cy="160" r="170" fill="none" stroke="#a3d635" strokeWidth="0.5" opacity="0.05" />

        {/* Speech bubble — "¡Hola!" top left */}
        <g transform="translate(22, 38)" opacity="0.2">
          <rect x="0" y="0" width="58" height="30" rx="10" fill="none" stroke="#1f3d1a" strokeWidth="1.4" />
          <path d="M 10 30 L 5 42 L 20 30 Z" fill="none" stroke="#1f3d1a" strokeWidth="1.2" strokeLinejoin="round" />
          <text x="29" y="20" textAnchor="middle" fontFamily="monospace" fontSize="10.5" fill="#1f3d1a" fontWeight="700">¡Hola!</text>
        </g>

        {/* Speech bubble — "Gracias" top right */}
        <g transform="translate(274, 32)" opacity="0.17">
          <rect x="0" y="0" width="66" height="28" rx="10" fill="#a3d635" fillOpacity="0.2" stroke="#a3d635" strokeWidth="1.3" />
          <path d="M 54 28 L 62 40 L 44 28 Z" fill="none" stroke="#a3d635" strokeWidth="1.1" strokeLinejoin="round" />
          <text x="33" y="18.5" textAnchor="middle" fontFamily="monospace" fontSize="9.5" fill="#1f3d1a" fontWeight="700">Gracias</text>
        </g>

        {/* Botanical leaf — bottom left */}
        <g transform="translate(10, 224)" opacity="0.16">
          <path d="M 20 64 Q -14 42 0 6 Q 4 0 14 4 Q 44 16 48 46 Q 36 66 20 64Z" fill="none" stroke="#1f3d1a" strokeWidth="1.5" />
          <line x1="20" y1="64" x2="25" y2="20" stroke="#1f3d1a" strokeWidth="1" />
          <line x1="25" y1="20" x2="14" y2="40" stroke="#1f3d1a" strokeWidth="0.7" opacity="0.5" />
          <line x1="25" y1="20" x2="36" y2="42" stroke="#1f3d1a" strokeWidth="0.7" opacity="0.5" />
        </g>

        {/* Small leaf — top right */}
        <g transform="translate(322, 62)" opacity="0.12">
          <path d="M 12 46 Q -8 30 0 4 Q 3 0 10 3 Q 28 11 32 34 Q 24 50 12 46Z" fill="none" stroke="#a3d635" strokeWidth="1.4" />
          <line x1="12" y1="46" x2="15" y2="14" stroke="#a3d635" strokeWidth="0.9" />
        </g>

        {/* Open book — bottom right */}
        <g transform="translate(286, 246)" opacity="0.17" stroke="#1f3d1a" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4">
          <path d="M18,4 C12,2 4,2 0,4 L0,28 C4,26 12,26 18,28 Z" />
          <path d="M18,4 C24,2 32,2 36,4 L36,28 C32,26 24,26 18,28 Z" />
          <line x1="18" y1="4" x2="18" y2="28" />
          <line x1="5" y1="10" x2="15" y2="10" />
          <line x1="5" y1="15" x2="15" y2="15" />
          <line x1="21" y1="10" x2="31" y2="10" />
          <line x1="21" y1="15" x2="31" y2="15" />
        </g>

        {/* Map pin — center right edge */}
        <g transform="translate(322, 142)" opacity="0.14">
          <path d="M 13 0 C 6 0 0 6 0 13 C 0 21 13 32 13 32 C 13 32 26 21 26 13 C 26 6 20 0 13 0Z" fill="none" stroke="#a3d635" strokeWidth="1.5" />
          <circle cx="13" cy="13" r="4.5" fill="none" stroke="#a3d635" strokeWidth="1.2" />
        </g>

        {/* Pencil — top left, tilted */}
        <g transform="translate(62, 14) rotate(28)" opacity="0.16" stroke="#a3d635" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3">
          <rect x="0" y="0" width="8" height="30" rx="1.5" />
          <path d="M0,30 L4,39 L8,30 Z" fill="#a3d635" stroke="none" />
          <line x1="0" y1="6" x2="8" y2="6" />
          <rect x="1" y="0" width="6" height="4" rx="0.5" fill="#a3d635" fillOpacity="0.3" stroke="none" />
        </g>

        {/* Star row — bottom left */}
        <g transform="translate(24, 268)" opacity="0.2">
          {[0, 17, 34].map((x, i) => (
            <path
              key={i}
              transform={`translate(${x},0)`}
              d="M6,0 L7.5,4.5 L12,4.5 L8.5,7 L10,11.5 L6,9 L2,11.5 L3.5,7 L0,4.5 L4.5,4.5 Z"
              fill="#1f3d1a"
              stroke="none"
            />
          ))}
        </g>

        {/* Progress bars — center left edge */}
        <g transform="translate(8, 140)" opacity="0.18" strokeLinecap="round" strokeWidth="1.2" fill="none">
          <rect x="0" y="0" width="32" height="6" rx="3" stroke="#1f3d1a" />
          <rect x="0" y="0" width="22" height="6" rx="3" fill="#1f3d1a" fillOpacity="0.35" stroke="none" />
          <rect x="0" y="12" width="32" height="6" rx="3" stroke="#1f3d1a" />
          <rect x="0" y="12" width="14" height="6" rx="3" fill="#a3d635" fillOpacity="0.5" stroke="none" />
          <rect x="0" y="24" width="32" height="6" rx="3" stroke="#1f3d1a" />
          <rect x="0" y="24" width="28" height="6" rx="3" fill="#1f3d1a" fillOpacity="0.35" stroke="none" />
        </g>

        {/* Play / video icon — top right area */}
        <g transform="translate(276, 82)" opacity="0.15" stroke="#1f3d1a" fill="none" strokeWidth="1.3">
          <circle cx="16" cy="16" r="15" />
          <path d="M11,10 L25,16 L11,22 Z" fill="#1f3d1a" stroke="none" />
        </g>

        {/* Accent dots */}
        <circle cx="264" cy="54" r="3"   fill="#a3d635" opacity="0.28" />
        <circle cx="92"  cy="80" r="2"   fill="#1f3d1a" opacity="0.2" />
        <circle cx="302" cy="242" r="2.5" fill="#a3d635" opacity="0.22" />
        <circle cx="68"  cy="216" r="2"   fill="#1f3d1a" opacity="0.16" />
        <circle cx="178" cy="22" r="3"   fill="#a3d635" opacity="0.18" />
        <circle cx="346" cy="190" r="2.5" fill="#1f3d1a" opacity="0.13" />
        <circle cx="180" cy="298" r="2"  fill="#a3d635" opacity="0.15" />

        {/* Plus marks */}
        {([
          [50,  134, "#a3d635", 0.16],
          [316, 98,  "#1f3d1a", 0.13],
          [140, 292, "#a3d635", 0.15],
          [330, 254, "#1f3d1a", 0.12],
        ] as const).map(([x, y, c, o], i) => (
          <g key={i} opacity={o}>
            <line x1={x - 6} y1={y} x2={x + 6} y2={y} stroke={c} strokeWidth="1.1" />
            <line x1={x} y1={y - 6} x2={x} y2={y + 6} stroke={c} strokeWidth="1.1" />
          </g>
        ))}

        {/* Dashed connector arc */}
        <path
          d="M58,282 C100,248 248,272 302,232"
          stroke="#1f3d1a"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
          opacity="0.08"
          strokeDasharray="3 6"
        />

        {/* Diagonal tick marks — top-right quadrant texture */}
        {[0, 1, 2, 3].map((i) => (
          <line
            key={`tick-${i}`}
            x1={308 + i * 12}
            y1={164 - i * 14}
            x2={316 + i * 12}
            y2={172 - i * 14}
            stroke="#a3d635"
            strokeWidth="1"
            opacity="0.1"
          />
        ))}
      </svg>

      {/* Concentric rings + stat cards */}
      <div className="relative h-80 w-80 xl:h-96 xl:w-96">
        <div className="absolute inset-0 rounded-full border border-vv-line/30" />
        <div className="absolute inset-6 rounded-full border border-vv-line/50" />
        <div className="absolute inset-14 rounded-full bg-vv-accent/8 border border-vv-accent/20" />

        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-16 w-16 rounded-full bg-vv-accent flex items-center justify-center shadow-md">
            <GraduationCap className="h-8 w-8 text-vv-accent-deep" />
          </div>
        </div>

        {/* Top */}
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-vv-bg rounded-2xl border border-vv-line px-4 py-3 shadow-sm text-center min-w-20.5">
          <div className="text-[22px] font-bold text-vv-ink tracking-tight leading-none">1999</div>
          <div className="font-code text-[9px] text-vv-muted uppercase tracking-widest mt-1">Founded</div>
        </div>

        {/* Right */}
        <div className="absolute -right-7 top-1/2 -translate-y-1/2 bg-vv-bg-deep rounded-2xl px-4 py-3 shadow-sm text-center min-w-20.5">
          <div className="text-[22px] font-bold text-vv-bg tracking-tight leading-none">4,700+</div>
          <div className="font-code text-[9px] text-vv-bg/55 uppercase tracking-widest mt-1">Students</div>
        </div>

        {/* Bottom */}
        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-vv-accent rounded-2xl px-4 py-3 shadow-sm text-center min-w-20.5">
          <div className="font-code text-[13px] font-bold text-vv-accent-deep tracking-wider">AECEE</div>
          <div className="font-code text-[9px] text-vv-accent-deep/65 uppercase tracking-widest mt-1">Certified</div>
        </div>

        {/* Left */}
        <div className="absolute -left-7 top-1/2 -translate-y-1/2 bg-vv-bg rounded-2xl border border-vv-line px-4 py-3 shadow-sm text-center min-w-19">
          <div className="text-[22px] font-bold text-vv-ink tracking-tight leading-none">50+</div>
          <div className="font-code text-[9px] text-vv-muted uppercase tracking-widest mt-1">Countries</div>
        </div>
      </div>
    </div>
  );
}

const WhyVidaVerde = () => {
  return (
    <section
      className="relative overflow-hidden bg-vv-bg-warm border-t border-vv-line"
      data-screen-label="02 Why"
    >
      {/* Section-level background texture */}
      <svg
        className="absolute inset-0 h-full w-full pointer-events-none select-none"
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        {/* Dot grid — illustration side (left) */}
        {Array.from({ length: 10 }, (_, row) =>
          Array.from({ length: 10 }, (_, col) => (
            <circle
              key={`bg-${row}-${col}`}
              cx={28 + col * 52}
              cy={30 + row * 62}
              r="1.2"
              fill="#1f3d1a"
              opacity="0.045"
            />
          ))
        )}

        {/* Corner arcs — bottom right */}
        {[140, 200, 260].map((r) => (
          <circle
            key={r}
            cx="1200"
            cy="600"
            r={r}
            fill="none"
            stroke="#a3d635"
            strokeWidth="0.7"
            opacity="0.055"
          />
        ))}

        {/* Corner arc — top right */}
        <circle cx="1200" cy="0" r="180" fill="none" stroke="#1f3d1a" strokeWidth="0.6" opacity="0.04" strokeDasharray="4 8" />
      </svg>

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.15fr] gap-10 xl:gap-20 items-center">
          {/* Left: illustration */}
          <WhyIllustration />

          {/* Right: content + feature list */}
          <div>
            <span className="font-code text-vv-muted text-[11px] font-medium tracking-[0.14em] uppercase">
              {"// Why Vida Verde"}
            </span>
            <h2 className="mt-3 mb-1.5 text-[clamp(26px,2.8vw,40px)] font-semibold tracking-[-0.02em] leading-[1.1] text-balance">
              More than an app. More than a freelance teacher.
            </h2>
            <p className="text-vv-ink-2 text-[15px] leading-relaxed mb-6 max-w-[48ch]">
              Here&apos;s what makes learning with Vida Verde different.
            </p>

            <div className="flex flex-col">
              {featureBlocks.map((feature, index) => {
                const Icon = whyIcons[index] ?? Globe2;
                return (
                  <div
                    key={feature.number}
                    className="flex items-start gap-4 py-5 border-t border-vv-line first:border-0 first:pt-0"
                  >
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-vv-accent text-vv-accent-deep mt-0.5">
                      <Icon aria-hidden="true" className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="font-code text-[10px] text-vv-muted uppercase tracking-widest">
                          {feature.number}
                        </span>
                        <span className="text-vv-line-2 text-[10px]">/</span>
                        <span className="font-code text-[10px] text-vv-muted uppercase tracking-widest">
                          {feature.eyebrow}
                        </span>
                      </div>
                      <h3 className="text-[16px] font-semibold tracking-[-0.01em] text-vv-ink m-0 leading-snug">
                        {feature.title}
                      </h3>
                      <p className="text-[14px] leading-relaxed text-vv-ink-2 m-0 mt-1">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default WhyVidaVerde;

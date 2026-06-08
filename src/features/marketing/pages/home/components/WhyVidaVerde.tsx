import { Container } from "@/components/shared/Container";
import { Globe2, GraduationCap, Target, UserCheck } from "lucide-react";
import { featureBlocks } from "../data/marketing.data";

const whyIcons = [GraduationCap, UserCheck, Target, Globe2];

function WhyIllustration() {
  return (
    <div className="relative flex items-center justify-center py-10 lg:py-0" aria-hidden="true">
      {/* Background illustrated layer */}
      <svg
        className="pointer-events-none absolute inset-0 w-full h-full overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="wvGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-vv-accent)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="var(--color-vv-accent)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Soft center glow */}
        <ellipse cx="50%" cy="50%" rx="44%" ry="44%" fill="url(#wvGlow)" />

        {/* Open book — top-left */}
        <g transform="translate(22,28)" opacity="0.18" stroke="var(--color-vv-accent-deep)" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4">
          <path d="M18,4 C12,2 4,2 0,4 L0,28 C4,26 12,26 18,28 Z" />
          <path d="M18,4 C24,2 32,2 36,4 L36,28 C32,26 24,26 18,28 Z" />
          <line x1="18" y1="4" x2="18" y2="28" />
          <line x1="5" y1="10" x2="15" y2="10" />
          <line x1="5" y1="15" x2="15" y2="15" />
          <line x1="5" y1="20" x2="12" y2="20" />
          <line x1="21" y1="10" x2="31" y2="10" />
          <line x1="21" y1="15" x2="31" y2="15" />
          <line x1="21" y1="20" x2="28" y2="20" />
        </g>

        {/* Play button / video lesson — top-right */}
        <g transform="translate(306,20)" opacity="0.2" stroke="var(--color-vv-accent-deep)" fill="none" strokeWidth="1.4">
          <circle cx="18" cy="18" r="17" />
          <path d="M13,11 L27,18 L13,25 Z" fill="var(--color-vv-accent-deep)" stroke="none" />
        </g>

        {/* Star rating — bottom-left */}
        <g transform="translate(18,268)" opacity="0.2">
          {[0, 16, 32, 48, 64].map((x, i) => (
            <path
              key={i}
              transform={`translate(${x},0)`}
              d="M6,0 L7.5,4.5 L12,4.5 L8.5,7 L10,11.5 L6,9 L2,11.5 L3.5,7 L0,4.5 L4.5,4.5 Z"
              fill={i < 4 ? "var(--color-vv-accent-deep)" : "none"}
              stroke="var(--color-vv-accent-deep)"
              strokeWidth="0.8"
              strokeLinejoin="round"
            />
          ))}
        </g>

        {/* Certificate / diploma — bottom-right */}
        <g transform="translate(288,272)" opacity="0.17" stroke="var(--color-vv-accent-deep)" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3">
          <rect x="0" y="0" width="52" height="38" rx="3" />
          <line x1="8" y1="10" x2="44" y2="10" />
          <line x1="8" y1="17" x2="44" y2="17" />
          <line x1="8" y1="24" x2="30" y2="24" />
          <circle cx="40" cy="28" r="7" />
          <path d="M36,36 L40,31 L44,36" fill="var(--color-vv-accent-deep)" stroke="none" />
        </g>

        {/* Pencil — center-left edge */}
        <g transform="translate(14,150) rotate(-20)" opacity="0.16" stroke="var(--color-vv-accent-deep)" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3">
          <rect x="0" y="0" width="8" height="32" rx="1" />
          <path d="M0,32 L4,40 L8,32 Z" fill="var(--color-vv-accent-deep)" stroke="none" />
          <line x1="0" y1="6" x2="8" y2="6" />
        </g>

        {/* Progress bar — center-right edge */}
        <g transform="translate(308,148)" opacity="0.2" stroke="var(--color-vv-accent-deep)" strokeLinecap="round" strokeWidth="1.3" fill="none">
          <rect x="0" y="0" width="36" height="7" rx="3.5" />
          <rect x="0" y="0" width="24" height="7" rx="3.5" fill="var(--color-vv-accent-deep)" stroke="none" opacity="0.5" />
          <rect x="0" y="13" width="36" height="7" rx="3.5" />
          <rect x="0" y="13" width="16" height="7" rx="3.5" fill="var(--color-vv-accent-deep)" stroke="none" opacity="0.5" />
          <rect x="0" y="26" width="36" height="7" rx="3.5" />
          <rect x="0" y="26" width="30" height="7" rx="3.5" fill="var(--color-vv-accent-deep)" stroke="none" opacity="0.5" />
        </g>

        {/* Scattered sparkle dots */}
        <circle cx="272" cy="62"  r="3"   fill="var(--color-vv-accent)" opacity="0.32" />
        <circle cx="88"  cy="88"  r="2"   fill="var(--color-vv-accent-deep)" opacity="0.22" />
        <circle cx="295" cy="245" r="2.5" fill="var(--color-vv-accent)" opacity="0.25" />
        <circle cx="68"  cy="222" r="2"   fill="var(--color-vv-accent-deep)" opacity="0.2" />

        {/* Dashed connector arc */}
        <path
          d="M55,290 C100,240 240,275 290,230"
          stroke="var(--color-vv-accent-deep)"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
          opacity="0.1"
          strokeDasharray="4 7"
        />
      </svg>

      {/* Concentric rings */}
      <div className="relative h-72 w-72 xl:h-80 xl:w-80">
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
    <section className="bg-vv-bg-warm border-t border-vv-line" data-screen-label="02 Why">
      <Container>
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

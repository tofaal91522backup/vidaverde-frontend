import { Container } from "@/components/shared/Container";
import { Globe2, GraduationCap, Target, UserCheck } from "lucide-react";
import { featureBlocks } from "../data/marketing.data";

const whyIcons = [GraduationCap, UserCheck, Target, Globe2];

function WhyIllustration() {
  return (
    <div
      className="relative flex items-center justify-center py-10 lg:py-0 min-h-100"
      aria-hidden="true"
    >
      {/* Figure 1: Reading a book — top-left */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        className="pointer-events-none absolute top-6 left-4 w-28 h-28 -rotate-3"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="50" cy="50" r="46" stroke="#a3d635" strokeWidth="1.2" opacity="0.22" />
        <g stroke="#1f3d1a" strokeWidth="1.3" opacity="0.18" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="50" cy="20" r="9" />
          <path d="M49,29 Q48,33 47,35" />
          <path d="M41,36 Q36,50 34,64" />
          <path d="M53,36 Q58,50 62,64" />
          <path d="M41,44 Q33,56 26,64" />
          <path d="M53,44 Q63,56 74,64" />
          <path d="M24,64 Q34,60 50,64 L50,80 Q34,84 24,80 Z" />
          <path d="M50,64 Q66,60 76,64 L76,80 Q66,84 50,80 Z" />
          <line x1="50" y1="64" x2="50" y2="80" />
          <line x1="29" y1="69" x2="46" y2="69" strokeWidth="0.9" />
          <line x1="29" y1="73" x2="43" y2="73" strokeWidth="0.9" />
          <line x1="54" y1="69" x2="71" y2="69" strokeWidth="0.9" />
          <line x1="54" y1="73" x2="68" y2="73" strokeWidth="0.9" />
          <path d="M38,64 Q32,72 29,80" />
          <path d="M62,64 Q68,72 71,80" />
        </g>
      </svg>

      {/* Figure 2: Two people in conversation — bottom-left */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        className="pointer-events-none absolute bottom-4 left-8 w-28 h-28 rotate-2"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="50" cy="50" rx="46" ry="44" stroke="#a3d635" strokeWidth="1.2" opacity="0.22" />
        <g stroke="#1f3d1a" strokeWidth="1.3" opacity="0.18" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <rect x="26" y="4" width="48" height="18" rx="7" />
          <path d="M42,22 L38,30 L50,22" />
          <text x="50" y="16" textAnchor="middle" fill="#1f3d1a" fontSize="8" fontFamily="monospace" stroke="none">¡Hola!</text>
          <circle cx="26" cy="36" r="8" />
          <path d="M26,44 L26,50" />
          <path d="M19,50 Q17,62 17,74" />
          <path d="M33,50 Q34,62 34,74" />
          <path d="M33,57 Q42,53 50,51" />
          <path d="M19,57 Q13,63 11,70" />
          <path d="M19,74 Q18,82 17,88" />
          <path d="M33,74 Q34,82 35,88" />
          <circle cx="74" cy="36" r="8" />
          <path d="M74,44 L74,50" />
          <path d="M67,50 Q66,62 66,74" />
          <path d="M81,50 Q82,62 82,74" />
          <path d="M67,57 Q58,53 50,51" />
          <path d="M81,57 Q87,63 89,70" />
          <path d="M67,74 Q66,82 65,88" />
          <path d="M81,74 Q82,82 83,88" />
        </g>
      </svg>

      {/* Figure 3: Teacher at whiteboard — top-right */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        className="pointer-events-none absolute top-4 right-4 w-28 h-28 rotate-2"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="50" cy="50" r="46" stroke="#a3d635" strokeWidth="1.2" opacity="0.22" />
        <g stroke="#1f3d1a" strokeWidth="1.3" opacity="0.18" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <rect x="8" y="12" width="28" height="22" rx="2" />
          <line x1="13" y1="20" x2="26" y2="20" strokeWidth="0.9" />
          <path d="M13,27 L16,31 L19,25 L22,31 L26,25" strokeWidth="0.9" />
          <line x1="22" y1="34" x2="22" y2="46" />
          <circle cx="72" cy="16" r="8" />
          <path d="M72,24 L72,30" />
          <path d="M66,30 Q62,46 60,62" />
          <path d="M78,30 Q82,46 82,62" />
          <path d="M66,38 Q50,30 36,28" />
          <path d="M78,38 Q84,50 86,56" />
          <path d="M62,62 Q60,74 59,82" />
          <path d="M80,62 Q82,74 82,82" />
        </g>
      </svg>

      {/* Figure 4: Person with headphones at desk — bottom-right */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        className="pointer-events-none absolute bottom-6 right-6 w-28 h-28 -rotate-2"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="50" cy="50" rx="46" ry="44" stroke="#a3d635" strokeWidth="1.2" opacity="0.22" />
        <g stroke="#1f3d1a" strokeWidth="1.3" opacity="0.18" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="50" cy="14" r="9" />
          <path d="M39,12 Q42,3 50,3 Q58,3 61,12" strokeWidth="1.5" />
          <circle cx="39" cy="13" r="4" />
          <circle cx="61" cy="13" r="4" />
          <path d="M50,23 L50,30" />
          <path d="M43,30 Q38,44 36,58" />
          <path d="M57,30 Q62,44 64,58" />
          <path d="M43,38 Q30,50 18,56" />
          <path d="M57,38 Q70,50 82,56" />
          <path d="M12,60 Q50,63 88,60" />
          <path d="M38,60 Q34,70 32,78" />
          <path d="M62,60 Q66,70 68,78" />
        </g>
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
      {/* Corner gradient blobs */}
      <div className="pointer-events-none select-none absolute -top-24 -right-24 w-120 h-96 rounded-full bg-vv-accent/20 blur-3xl" />
      <div className="pointer-events-none select-none absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-vv-accent/16 blur-3xl" />

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

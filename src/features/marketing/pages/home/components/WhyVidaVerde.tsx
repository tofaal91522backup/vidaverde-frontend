import { Container } from "@/components/shared/Container";
import { Globe2, GraduationCap, Target, UserCheck } from "lucide-react";
import { featureBlocks } from "../data/marketing.data";

const whyIcons = [GraduationCap, UserCheck, Target, Globe2];

function WhyIllustration() {
  return (
    <div className="relative flex items-center justify-center py-10 lg:py-0" aria-hidden="true">
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
              Here's what makes learning with Vida Verde different.
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

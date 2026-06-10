"use client";

import { Container } from "@/components/shared/Container";
import { LampContainer } from "@/components/ui/lamp";
import { Globe2, GraduationCap, Target, UserCheck } from "lucide-react";
import { featureBlocks } from "../data/marketing.data";

const whyIcons = [GraduationCap, UserCheck, Target, Globe2];

const WhyVidaVerde = () => {
  return (
    <section
      className="relative overflow-hidden bg-vv-bg-warm border-t border-vv-line"
      data-screen-label="02 Why"
    >
      {/* Corner gradient blobs */}
      <div className="pointer-events-none select-none absolute -top-24 -right-24 w-120 h-96 rounded-full bg-vv-accent/20 blur-3xl" />
      <div className="pointer-events-none select-none absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-vv-accent/16 blur-3xl" />

      <Container className="relative z-10">
        <div className="flex flex-col gap-12 pb-4">
          <LampContainer
            className="min-h-[420px] rounded-[22px] border border-vv-line/70 bg-vv-bg-warm md:min-h-[500px]"
            glowClassName="from-vv-accent/70 via-transparent to-transparent"
            maskClassName="bg-vv-bg-warm"
            beamClassName="bg-vv-accent"
            contentClassName="-translate-y-62"
          >
            <span className="font-code text-[11px] font-medium uppercase tracking-[0.18em] text-vv-accent-deep">
              {"// Why Vida Verde"}
            </span>
          </LampContainer>

          <div className="relative -mt-28 grid gap-x-10 gap-y-0 md:-mt-36 md:grid-cols-2">
            <div className="pointer-events-none absolute left-5 top-0 hidden h-full w-px bg-vv-line md:block" />
            {featureBlocks.map((feature, index) => {
              const Icon = whyIcons[index] ?? Globe2;
              return (
                <div
                  key={feature.number}
                  className="relative flex items-start gap-4 border-t border-vv-line py-7 first:border-t-0"
                >
                  <div className="relative z-10 mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-vv-accent text-vv-accent-deep ring-8 ring-vv-bg-warm">
                    <Icon aria-hidden="true" className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <div className="mb-1 flex items-center gap-1.5">
                      <span className="font-code text-[10px] uppercase tracking-widest text-vv-muted">
                        {feature.number}
                      </span>
                      <span className="text-[10px] text-vv-line-2">/</span>
                      <span className="font-code text-[10px] uppercase tracking-widest text-vv-muted">
                        {feature.eyebrow}
                      </span>
                    </div>
                    <h3 className="m-0 text-[16px] font-semibold leading-snug tracking-[-0.01em] text-vv-ink">
                      {feature.title}
                    </h3>
                    <p className="m-0 mt-1 text-[14px] leading-relaxed text-vv-ink-2">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default WhyVidaVerde;

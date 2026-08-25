"use client";

import { Container } from "@/components/shared/Container";
import { Globe2, GraduationCap, Target, UserCheck } from "lucide-react";
import { featureBlocks } from "../data/marketing.data";
import WhyIllustration from "./WhyIllustration";

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
        <div className="relative grid items-center gap-12 py-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-18 lg:py-12">
          <div className="pointer-events-none absolute -left-10 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-vv-accent/18 blur-3xl" />
          <div className="relative">
            <WhyIllustration />
          </div>

          <div className="relative flex flex-col justify-center gap-9">
            <div className="max-w-2xl">
             
              <h2 className="mt-4 text-balance text-[clamp(34px,4.6vw,64px)] font-semibold leading-[1.02] tracking-[-0.035em] text-vv-ink">
                Why{" "}
                <span className="rounded-sm bg-vv-accent px-2 text-vv-accent-deep">
                  Vida Verde
                </span>
              </h2>
              <h3 className="mt-5 max-w-[18ch] text-[clamp(22px,2vw,30px)] font-semibold leading-[1.12] tracking-[-0.025em] text-vv-ink">
                More than an app. More than a freelance teacher.
              </h3>
              <p className="mt-4 max-w-[58ch] text-[16px] leading-relaxed text-vv-ink-2">
                Here’s what makes learning with Vida Verde different.
              </p>
            </div>

            <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {featureBlocks.map((feature, index) => {
                const Icon = whyIcons[index] ?? Globe2;
                return (
                  <div key={feature.number} className="flex gap-3">
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center text-vv-accent-deep">
                      <Icon aria-hidden="true" className="h-5 w-5" />
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
                      <h3 className="m-0 text-[15px] font-semibold leading-snug tracking-[-0.01em] text-vv-ink">
                        {feature.title}
                      </h3>
                      <p className="m-0 mt-1 text-[13px] leading-relaxed text-vv-ink-2">
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

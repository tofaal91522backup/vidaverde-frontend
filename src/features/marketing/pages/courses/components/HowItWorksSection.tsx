"use client";

import { Container } from "@/components/shared/Container";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { howItWorksSteps } from "../data/online-classes.data";

const STEP_DURATION = 2500;

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(
      () => setActiveStep((s) => (s + 1) % howItWorksSteps.length),
      STEP_DURATION,
    );
    return () => clearInterval(id);
  }, [paused]);

  return (
    <section
      className="border-t border-vv-line bg-vv-bg"
      data-screen-label="02 How It Works"
    >
      <Container>
        <div className="flex flex-col gap-3.5 mb-16 max-w-[54ch]">
          <span className="font-code text-vv-muted text-[11px] font-medium tracking-[0.14em] uppercase">
            {"// How It Works"}
          </span>
          <h2 className="text-[clamp(28px,3vw,44px)] font-semibold tracking-[-0.02em] leading-[1.08] m-0 text-balance">
            How It Works
          </h2>
          <p className="text-vv-ink-2 text-[clamp(15px,1.1vw,17px)] leading-relaxed m-0 text-pretty">
            From your first click to your first conversation — here&apos;s what
            to expect.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-vv-line rounded-3xl overflow-hidden border border-vv-line">
          {howItWorksSteps.map((step, i) => {
            const isActive = activeStep === i;
            return (
              <div
                key={step.step}
                onMouseEnter={() => { setPaused(true); setActiveStep(i); }}
                onMouseLeave={() => setPaused(false)}
                className={cn(
                  "relative flex flex-col gap-5 p-7 lg:p-8 transition-colors duration-300 cursor-default",
                  isActive ? "bg-vv-bg-warm" : "bg-vv-bg",
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-code text-[11px] font-medium tracking-[0.18em] text-vv-muted uppercase">
                    Step {String(step.step).padStart(2, "0")}
                  </span>
                  {i < howItWorksSteps.length - 1 && (
                    <span className="hidden lg:block text-vv-line-2 text-[18px] leading-none select-none">
                      →
                    </span>
                  )}
                </div>

                <span
                  className={cn(
                    "font-code text-[48px] font-bold leading-none tracking-tight select-none transition-colors duration-300",
                    isActive ? "text-vv-accent/70" : "text-vv-accent-deep/10",
                  )}
                >
                  {String(step.step).padStart(2, "0")}
                </span>

                <div className="flex flex-col gap-2 mt-auto">
                  <h3 className="text-[18px] font-semibold leading-snug tracking-[-0.02em] text-vv-ink m-0">
                    {step.label}
                  </h3>
                  <p className="text-[14px] leading-[1.65] text-vv-ink-2 m-0">
                    {step.description}
                  </p>
                </div>

                {/* Progress bar */}
                <div className="absolute bottom-0 left-0 right-0 h-0.75 bg-vv-line overflow-hidden rounded-b-sm">
                  <div
                    className={cn(
                      "h-full bg-vv-accent rounded-b-sm",
                      isActive && !paused
                        ? "w-full transition-[width] ease-linear"
                        : isActive && paused
                        ? "w-full"
                        : "w-0",
                    )}
                    style={
                      isActive && !paused
                        ? { transitionDuration: `${STEP_DURATION}ms` }
                        : undefined
                    }
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

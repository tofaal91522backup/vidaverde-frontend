import { Container } from "@/components/shared/Container";
import { howItWorksSteps } from "../data/online-classes.data";

export function HowItWorksSection() {
  return (
    <section
      className="border-t border-vv-line bg-vv-bg-warm"
      data-screen-label="02 How It Works"
    >
      <Container>
        <div className="flex items-end justify-between gap-8 mb-12 max-[760px]:flex-col max-[760px]:items-start">
          <div className="flex flex-col gap-3.5">
            <span className="font-code text-vv-muted text-[11px] font-medium tracking-[0.14em] uppercase">
              {"// How It Works"}
            </span>
            <h2 className="text-[clamp(28px,3vw,44px)] font-semibold tracking-[-0.02em] leading-[1.08] m-0 text-balance">
              Four steps to real progress.
            </h2>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorksSteps.map((step) => (
            <div
              key={step.step}
              className="relative flex flex-col gap-4 rounded-[22px] border border-vv-line bg-vv-bg p-6"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-vv-accent text-vv-accent-deep font-bold text-lg font-mono">
                {step.step}
              </div>
              <h3 className="text-[17px] font-semibold leading-tight tracking-[-0.01em] text-vv-ink m-0">
                {step.label}
              </h3>
              <p className="text-[14px] leading-[1.6] text-vv-ink-2 m-0">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

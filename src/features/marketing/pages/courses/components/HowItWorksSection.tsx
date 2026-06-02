import { Container } from "@/components/shared/Container";
import { howItWorksSteps } from "../data/online-classes.data";

export function HowItWorksSection() {
  return (
    <section
      className="border-t border-[var(--vv-line)] bg-[var(--vv-bg-warm)] py-16"
      data-screen-label="02 How It Works"
    >
      <Container>
        <div className="section-head">
          <div className="meta">
            <span className="eyebrow">{"// How It Works"}</span>
            <h2 className="h2">Four steps to real progress.</h2>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-10">
          {howItWorksSteps.map((step) => (
            <div
              key={step.step}
              className="relative flex flex-col gap-4 rounded-[var(--vv-radius-lg)] border border-[var(--vv-line)] bg-[var(--vv-bg)] p-6"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--vv-accent)] text-[var(--vv-accent-deep)] font-bold text-lg font-mono">
                {step.step}
              </div>
              <h3 className="text-[17px] font-semibold leading-tight tracking-[-0.01em] text-[var(--vv-ink)]">
                {step.label}
              </h3>
              <p className="text-[14px] leading-[1.6] text-[var(--vv-ink-2)]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

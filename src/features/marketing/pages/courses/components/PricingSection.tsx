import { Container } from "@/components/shared/Container";
import { pricingPackages } from "../data/online-classes.data";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function PricingSection() {
  return (
    <section
      className="border-t border-vv-line"
      data-screen-label="03 Pricing"
      id="pricing"
    >
      <Container>
        <div className="flex items-end justify-between gap-8 mb-12 max-[760px]:flex-col max-[760px]:items-start">
          <div className="flex flex-col gap-3.5">
            <span className="font-code text-vv-muted text-[11px] font-medium tracking-[0.14em] uppercase">
              {"// Pricing"}
            </span>
            <h2 className="text-[clamp(28px,3vw,44px)] font-semibold tracking-[-0.02em] leading-[1.08] m-0 text-balance">
              Simple, Transparent Pricing
            </h2>
          </div>
          <p className="text-vv-ink-2 text-[clamp(17px,1.4vw,20px)] leading-normal max-w-[46ch] text-pretty m-0">
            No hidden fees. No subscriptions. Pay for what you need.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-4">
          {pricingPackages.map((pkg) => (
            <article
              key={pkg.title}
              className={cn(
                "relative flex flex-col gap-4 rounded-[22px] border p-6",
                pkg.featured
                  ? "border-vv-accent bg-vv-accent text-vv-accent-deep"
                  : "border-vv-line bg-vv-bg",
              )}
            >
              {pkg.badge && (
                <span
                  className={cn(
                    "absolute -top-3 left-4 rounded-full px-3 py-0.5 text-[11px] font-semibold uppercase tracking-wide",
                    pkg.featured
                      ? "bg-vv-ink text-vv-bg"
                      : "bg-vv-accent text-vv-accent-deep",
                  )}
                >
                  {pkg.badge}
                </span>
              )}
              <div>
                <div
                  className={cn(
                    "text-[12px] font-semibold uppercase tracking-widest mb-1",
                    pkg.featured ? "text-vv-accent-deep" : "text-vv-ink-2",
                  )}
                >
                  {pkg.title}
                </div>
                <div className="flex items-end gap-1">
                  <span className="text-[36px] font-bold leading-none tracking-tight">
                    {pkg.price}
                  </span>
                </div>
                {pkg.priceNote && (
                  <div
                    className={cn(
                      "text-[12px] mt-0.5",
                      pkg.featured ? "text-vv-accent-deep/70" : "text-vv-ink-2",
                    )}
                  >
                    {pkg.priceNote}
                  </div>
                )}
              </div>
              <p
                className={cn(
                  "text-[13px] leading-normal m-0",
                  pkg.featured ? "text-vv-accent-deep" : "text-vv-ink-2",
                )}
              >
                {pkg.description}
              </p>
              <ul className="flex flex-col gap-2 flex-1 list-none p-0 m-0">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-[13px]">
                    <span className={pkg.featured ? "text-vv-accent-deep" : "text-vv-accent"} aria-hidden="true">
                      ✓
                    </span>
                    <span className={pkg.featured ? "text-vv-accent-deep" : "text-vv-ink-2"}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                href="/online-classes/book"
                className={cn(
                  "mt-auto inline-flex items-center justify-center gap-2.5 border rounded-full cursor-pointer text-[15px] font-semibold tracking-[-0.005em] py-3.5 px-5.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap text-center",
                  pkg.featured
                    ? "border-vv-ink bg-vv-ink text-vv-bg hover:bg-vv-accent-deep hover:border-vv-accent-deep hover:-translate-y-px"
                    : "border-vv-line-2 bg-transparent text-vv-ink hover:bg-vv-ink hover:border-vv-ink hover:text-vv-bg",
                )}
              >
                {pkg.cta} →
              </Link>
            </article>
          ))}
        </div>
        <p className="text-[13px] text-vv-muted mt-2">All prices in USD.</p>
      </Container>
    </section>
  );
}

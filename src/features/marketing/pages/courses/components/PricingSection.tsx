import { Container } from "@/components/shared/Container";
import { pricingPackages } from "../data/online-classes.data";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function PricingSection() {
  return (
    <section
      className="border-t border-[var(--vv-line)] py-16"
      data-screen-label="03 Pricing"
      id="pricing"
    >
      <Container>
        <div className="section-head">
          <div className="meta">
            <span className="eyebrow">{"// Pricing"}</span>
            <h2 className="h2">Simple, Transparent Pricing</h2>
          </div>
          <p className="lede max-w-[46ch]">
            All prices in USD. No hidden fees, no auto-renewals.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pricingPackages.map((pkg) => (
            <article
              key={pkg.title}
              className={cn(
                "relative flex flex-col gap-4 rounded-[var(--vv-radius-lg)] border p-6",
                pkg.featured
                  ? "border-[var(--vv-accent)] bg-[var(--vv-accent)] text-[var(--vv-accent-deep)]"
                  : "border-[var(--vv-line)] bg-[var(--vv-bg)]",
              )}
            >
              {pkg.badge && (
                <span
                  className={cn(
                    "absolute -top-3 left-4 rounded-full px-3 py-0.5 text-[11px] font-semibold uppercase tracking-wide",
                    pkg.featured
                      ? "bg-[var(--vv-ink)] text-[var(--vv-bg)]"
                      : "bg-[var(--vv-accent)] text-[var(--vv-accent-deep)]",
                  )}
                >
                  {pkg.badge}
                </span>
              )}
              <div>
                <div
                  className={cn(
                    "text-[12px] font-semibold uppercase tracking-widest mb-1",
                    pkg.featured ? "text-[var(--vv-accent-deep)]" : "text-[var(--vv-ink-2)]",
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
                      pkg.featured ? "text-[var(--vv-accent-deep)]/70" : "text-[var(--vv-ink-2)]",
                    )}
                  >
                    {pkg.priceNote}
                  </div>
                )}
              </div>
              <p
                className={cn(
                  "text-[13px] leading-[1.5]",
                  pkg.featured ? "text-[var(--vv-accent-deep)]" : "text-[var(--vv-ink-2)]",
                )}
              >
                {pkg.description}
              </p>
              <ul className="flex flex-col gap-2 flex-1">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-[13px]">
                    <span className={pkg.featured ? "text-[var(--vv-accent-deep)]" : "text-[var(--vv-accent)]"}>
                      ✓
                    </span>
                    <span className={pkg.featured ? "text-[var(--vv-accent-deep)]" : "text-[var(--vv-ink-2)]"}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                href="/book"
                className={cn(
                  "vv-btn mt-auto text-center",
                  pkg.featured ? "vv-btn-dark" : "vv-btn-ghost",
                )}
              >
                {pkg.cta} →
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

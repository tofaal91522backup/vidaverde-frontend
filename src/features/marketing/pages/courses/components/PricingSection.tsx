"use client";

import { Container } from "@/components/shared/Container";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/providers/language-provider";
import { ChevronRight, PackageOpen } from "lucide-react";
import Link from "next/link";
import {
  orderPublicPackages,
  usePublicPackages,
} from "../queries/use-public-packages";

function packageFeatures(totalClasses: number, validityDays: number) {
  return [
    `${totalClasses} private ${totalClasses === 1 ? "class" : "classes"}`,
    `Valid for ${validityDays} days`,
    "Choose your teacher and lesson time",
    "Online via Google Meet",
  ];
}

export function PricingSection() {
  const { language } = useLanguage();
  const { data, isLoading, isError } = usePublicPackages({ lang: language });
  const packages = orderPublicPackages(data ?? []);

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

        {isLoading && (
          <p className="text-vv-ink-2" role="status">
            Loading packages…
          </p>
        )}

        {isError && (
          <p className="text-red-600" role="alert">
            Packages are unavailable right now. Please try again shortly.
          </p>
        )}

        {!isLoading && !isError && packages.length === 0 && (
          <p className="text-vv-ink-2">No packages are currently available.</p>
        )}

        {packages.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-4">
            {packages.map((pkg) => {
              const featured = pkg.is_first_lesson;
              const badge = pkg.is_first_lesson ? "Best way to start" : null;

              return (
                <article
                  key={pkg.id}
                  className={cn(
                    "relative flex flex-col gap-4 rounded-[22px] border p-6",
                    featured
                      ? "border-vv-accent bg-vv-accent text-vv-accent-deep"
                      : "border-vv-line bg-vv-bg",
                  )}
                >
                  {badge && (
                    <span
                      className={cn(
                        "absolute -top-3 left-4 rounded-full px-3 py-0.5 text-[11px] font-semibold uppercase tracking-wide",
                        featured
                          ? "bg-vv-ink text-vv-bg"
                          : "bg-vv-accent text-vv-accent-deep",
                      )}
                    >
                      {badge}
                    </span>
                  )}

                  <div className="flex h-24 items-center justify-center overflow-hidden rounded-xl bg-vv-bg-warm">
                    {pkg.image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={pkg.image_url}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <PackageOpen
                        aria-hidden="true"
                        className="h-9 w-9 text-vv-muted"
                      />
                    )}
                  </div>

                  <div>
                    <div
                      className={cn(
                        "text-[12px] font-semibold uppercase tracking-widest mb-1",
                        featured ? "text-vv-accent-deep" : "text-vv-ink-2",
                      )}
                    >
                      {pkg.title}
                    </div>
                    <div className="flex items-end gap-1">
                      <span className="text-[36px] font-bold leading-none tracking-tight">
                        ${pkg.price}
                      </span>
                    </div>
                    <div
                      className={cn(
                        "text-[12px] mt-0.5",
                        featured ? "text-vv-accent-deep/70" : "text-vv-ink-2",
                      )}
                    >
                      {pkg.validity_days}-day validity
                      {/* Booking step 2-e koyjon teacher dekhabe — backend
                          `teacher_count` diye dey. `0` hole badge-i dekhai na
                          (edge case; tokhon kichu bola-r cheye chup thaka bhalo). */}
                      {pkg.teacher_count > 0 && (
                        <> · {pkg.teacher_count}{" "}
                          {pkg.teacher_count === 1 ? "teacher" : "teachers"}{" "}
                          available
                        </>
                      )}
                    </div>
                  </div>

                  <p
                    className={cn(
                      "text-[13px] leading-normal m-0",
                      featured ? "text-vv-accent-deep" : "text-vv-ink-2",
                    )}
                  >
                    {pkg.description}
                  </p>

                  <ul className="flex flex-col gap-2 flex-1 list-none p-0 m-0">
                    {packageFeatures(pkg.total_classes, pkg.validity_days).map(
                      (feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2 text-[13px]"
                        >
                          <span
                            className={
                              featured
                                ? "text-vv-accent-deep"
                                : "text-vv-accent"
                            }
                            aria-hidden="true"
                          >
                            ✓
                          </span>
                          <span
                            className={
                              featured ? "text-vv-accent-deep" : "text-vv-ink-2"
                            }
                          >
                            {feature}
                          </span>
                        </li>
                      ),
                    )}
                  </ul>

                  <Link
                    href={`/online-classes/book?package=${encodeURIComponent(pkg.id)}`}
                    className={cn(
                      "mt-auto inline-flex items-center justify-center gap-2.5 border rounded-full cursor-pointer text-[15px] font-semibold tracking-[-0.005em] leading-none py-3.5 px-5.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap text-center",
                      featured
                        ? "border-vv-ink bg-vv-ink text-vv-bg hover:bg-vv-accent-deep hover:border-vv-accent-deep hover:-translate-y-px"
                        : "border-vv-line-2 bg-transparent text-vv-ink hover:bg-vv-ink hover:border-vv-ink hover:text-vv-bg",
                    )}
                  >
                    {featured ? "Book your first lesson" : "Choose package"}
                    <ChevronRight className="h-4 w-4 shrink-0 translate-y-0.5" />
                  </Link>
                </article>
              );
            })}
          </div>
        )}

        <p className="text-[13px] text-vv-muted mt-2">All prices in USD.</p>
      </Container>
    </section>
  );
}

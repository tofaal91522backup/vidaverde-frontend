import { Container } from "@/components/shared/Container";
import {
  faqs,
  homestayMosaic,
  homestayPillars,
  includedItems,
  pricingTiers,
} from "./data/marketing.data";
import { GallerySection } from "./components/GallerySection";
import { SectionHeader } from "./components/SectionHeader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function HomestayRoute() {
  return (
    <>
      {/* Hero */}
      <section
        className="bg-vv-bg-warm border-b border-vv-line"
        data-screen-label="01 Homestay Hero"
      >
        <Container>
          <div className="font-code text-vv-muted text-[12px] tracking-[0.06em] mb-6">
            Home <span className="mx-1 text-vv-line-2">/</span> Homestay
          </div>
          <h1 className="text-[clamp(36px,5vw,68px)] font-semibold tracking-[-0.03em] leading-none m-0 mb-5">
            Homestay with
            <br />
            an Ecuadorian <em>familia.</em>
          </h1>
          <p className="text-vv-ink-2 text-[clamp(17px,1.4vw,20px)] leading-normal max-w-[52ch] text-pretty m-0">
            At Vida Verde, living at a homestay in Quito with a local family is
            one of the most powerful ways to make your Ecuadorian experience
            unforgettable.
          </p>
          <GallerySection images={homestayMosaic} />
        </Container>
      </section>

      {/* Pillars */}
      <section
        className="border-t border-vv-line"
        data-screen-label="02 Why Homestay"
      >
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 items-start">
            <div>
              <span className="font-code text-vv-muted text-[11px] font-medium tracking-[0.14em] uppercase">
                {"// Why a homestay"}
              </span>
              <div className="h-4" />
              <h2 className="text-[clamp(28px,3vw,44px)] font-semibold tracking-[-0.02em] leading-[1.08] m-0 text-balance">
                Total immersion,
                <br />
                actually.
              </h2>
              <p className="text-vv-ink-2 text-[17px] leading-normal mt-4.5 max-w-[36ch] m-0">
                Four reasons our students extend their stay by an average of 3
                weeks.
              </p>
            </div>
            <div className="flex flex-col gap-6">
              {homestayPillars.map((pillar) => (
                <div key={pillar.number} className="flex gap-5 items-start">
                  <div className="text-[clamp(28px,3vw,40px)] font-bold tracking-[-0.04em] leading-none text-vv-accent-deep/20 shrink-0 font-code w-10">
                    {pillar.number}
                  </div>
                  <div>
                    <h3 className="text-[18px] font-semibold tracking-[-0.01em] leading-tight text-vv-ink m-0 mb-1.5">
                      {pillar.title}
                    </h3>
                    <p className="text-vv-ink-2 text-[15px] leading-[1.6] m-0">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* What's included */}
      <section
        className="border-t border-vv-line bg-vv-bg-warm"
        data-screen-label="03 What's Included"
      >
        <Container>
          <span className="font-code text-vv-muted text-[11px] font-medium tracking-[0.14em] uppercase">
            {"// What's included"}
          </span>
          <div className="h-4.5" />
          <h2 className="text-[clamp(28px,3vw,44px)] font-semibold tracking-[-0.02em] leading-[1.08] m-0 text-balance">
            Everything you need.
            <br />
            Nothing extra to figure out.
          </h2>
          <div className="h-12" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {includedItems.map((item) => (
              <article
                key={item.title}
                className="flex flex-col gap-3 rounded-2xl border border-vv-line bg-vv-bg p-6"
              >
                <div className="text-[28px] leading-none" aria-hidden="true">
                  {item.icon}
                </div>
                <h4 className="text-[16px] font-semibold tracking-[-0.01em] text-vv-ink m-0">
                  {item.title}
                </h4>
                <p className="text-[14px] leading-[1.6] text-vv-ink-2 m-0">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Pricing */}
      <section
        className="border-t border-vv-line"
        data-screen-label="04 Pricing"
      >
        <Container>
          <SectionHeader
            eyebrow="// Pricing"
            title="Simple weekly rates."
            lede="Add a homestay to any course. Discounts kick in past 4 weeks."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pricingTiers.map((tier) => (
              <article
                key={tier.title}
                className={cn(
                  "flex flex-col gap-5 rounded-[22px] border p-7",
                  tier.featured
                    ? "border-vv-accent bg-vv-accent text-vv-accent-deep"
                    : "border-vv-line bg-vv-bg",
                )}
              >
                <h3
                  className={cn(
                    "text-[13px] font-semibold uppercase tracking-widest m-0",
                    tier.featured ? "text-vv-accent-deep" : "text-vv-ink-2",
                  )}
                >
                  {tier.title}
                </h3>
                <div>
                  <span
                    className={cn(
                      "text-[40px] font-bold tracking-[-0.03em] leading-none",
                      tier.featured ? "text-vv-accent-deep" : "text-vv-ink",
                    )}
                  >
                    {tier.price}
                  </span>
                  <span
                    className={cn(
                      "text-[15px] ml-1",
                      tier.featured
                        ? "text-vv-accent-deep/70"
                        : "text-vv-muted",
                    )}
                  >
                    {tier.period}
                  </span>
                </div>
                <p
                  className={cn(
                    "text-[14px] leading-[1.6] m-0",
                    tier.featured ? "text-vv-accent-deep/80" : "text-vv-ink-2",
                  )}
                >
                  {tier.description}
                </p>
                <ul className="flex flex-col gap-2 flex-1 list-none p-0 m-0">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-[13px]"
                    >
                      <span
                        className={
                          tier.featured
                            ? "text-vv-accent-deep"
                            : "text-vv-accent"
                        }
                        aria-hidden="true"
                      >
                        ✓
                      </span>
                      <span
                        className={
                          tier.featured
                            ? "text-vv-accent-deep"
                            : "text-vv-ink-2"
                        }
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/#book"
                  className={cn(
                    "inline-flex items-center justify-center gap-2.5 border rounded-full cursor-pointer text-[15px] font-semibold tracking-[-0.005em] leading-none py-3.5 px-5.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap",
                    tier.featured
                      ? "border-vv-ink bg-vv-ink text-vv-bg hover:bg-vv-accent-deep hover:border-vv-accent-deep hover:-translate-y-px"
                      : "border-vv-line-2 bg-transparent text-vv-ink hover:bg-vv-ink hover:border-vv-ink hover:text-vv-bg",
                  )}
                >
                  {tier.cta}{" "}
                  <ChevronRight className="h-4 w-4 shrink-0 translate-y-0.5" />
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section
        className="border-t border-vv-line bg-vv-bg-warm"
        data-screen-label="05 FAQ"
      >
        <Container className="max-w-220">
          <span className="font-code text-vv-muted text-[11px] font-medium tracking-[0.14em] uppercase">
            {"// Common questions"}
          </span>
          <div className="h-4" />
          <h2 className="text-[clamp(28px,3vw,44px)] font-semibold tracking-[-0.02em] leading-[1.08] m-0 mb-8 text-balance">
            Things students ask first.
          </h2>
          <Accordion type="single" collapsible>
            {faqs.map((faq) => (
              <AccordionItem key={faq.question} value={faq.question}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent className="text-vv-ink-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Container>
      </section>
    </>
  );
}

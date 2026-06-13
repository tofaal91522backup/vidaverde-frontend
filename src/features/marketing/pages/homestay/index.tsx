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
import { ChevronRight, ShieldCheck, UsersRound } from "lucide-react";

export default function HomestayRoute() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden bg-vv-bg-warm border-b border-vv-line"
        data-screen-label="01 Homestay Hero"
      >
        <div
          className="pointer-events-none absolute -right-24 top-16 h-72 w-72 rounded-full border border-vv-accent/25"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute bottom-20 left-8 hidden h-24 w-24 rounded-full bg-vv-accent/10 lg:block"
          aria-hidden="true"
        />
        <Container>
          <div className="relative z-10 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end lg:gap-14">
            <div>
              <div className="font-code text-vv-muted text-[12px] tracking-[0.06em] mb-6">
                Home <span className="mx-1 text-vv-line-2">/</span> Homestay
              </div>
              <h1 className="text-[clamp(40px,5.2vw,76px)] font-semibold tracking-[-0.035em] leading-[0.96] m-0 mb-5 text-balance">
                Live Like a Local. Learn Faster.
              </h1>
              <p className="text-vv-ink-2 text-[clamp(18px,1.45vw,21px)] leading-normal max-w-[54ch] text-pretty m-0">
                The best Spanish classroom isn&apos;t a classroom at all. It&apos;s
                a family dinner table in Quito.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2.5 border border-vv-ink rounded-full cursor-pointer text-[15px] font-semibold tracking-[-0.005em] leading-none py-3.5 px-5.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-vv-ink text-vv-bg hover:bg-vv-accent-deep hover:border-vv-accent-deep hover:-translate-y-px"
                >
                  Add Homestay to Your Programme{" "}
                  <ChevronRight className="h-4 w-4 shrink-0 translate-y-0.5" />
                </Link>
                <Link
                  href="/study-in-quito/quito-immersion"
                  className="inline-flex items-center justify-center gap-2.5 border border-vv-line-2 rounded-full cursor-pointer text-[15px] font-semibold tracking-[-0.005em] leading-none py-3.5 px-5.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-vv-bg text-vv-ink hover:bg-vv-ink hover:border-vv-ink hover:text-vv-bg"
                >
                  Included in Quito Immersion
                </Link>
              </div>
            </div>
            <div className="rounded-[28px] border border-vv-line bg-vv-bg p-5 shadow-[0_22px_70px_rgba(7,14,10,0.08)]">
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  ["From", "$26", "per night"],
                  ["Meals", "2", "per day"],
                  ["Support", "24/7", "Vida Verde team"],
                ].map(([label, value, note]) => (
                  <div
                    key={label}
                    className="rounded-[18px] border border-vv-line bg-vv-bg-warm p-4"
                  >
                    <div className="font-code text-[10px] font-medium uppercase tracking-[0.14em] text-vv-muted">
                      {label}
                    </div>
                    <div className="mt-2 text-[28px] font-semibold leading-none tracking-[-0.03em] text-vv-ink">
                      {value}
                    </div>
                    <div className="mt-1 text-[12px] leading-snug text-vv-ink-2">
                      {note}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <GallerySection images={homestayMosaic} />
        </Container>
      </section>

      {/* What is a homestay */}
      <section
        className="border-t border-vv-line"
        data-screen-label="02 What Is a Homestay"
      >
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 items-start">
            <div>
              <span className="font-code text-vv-muted text-[11px] font-medium tracking-[0.14em] uppercase">
                {"// What is a homestay?"}
              </span>
              <div className="h-4" />
              <h2 className="text-[clamp(28px,3vw,44px)] font-semibold tracking-[-0.02em] leading-[1.08] m-0 text-balance">
                What Is a Homestay?
              </h2>
              <p className="text-vv-ink-2 text-[17px] leading-normal mt-4.5 max-w-[39ch] m-0">
                A Vida Verde homestay means living with a real Ecuadorian
                family during your studies, not in a hotel, not in a hostel,
                but in a home.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {homestayPillars.map((pillar) => (
                <div
                  key={pillar.number}
                  className="rounded-[22px] border border-vv-line bg-vv-bg p-6"
                >
                  <div className="text-[clamp(28px,3vw,40px)] font-bold tracking-[-0.04em] leading-none text-vv-accent-deep/20 font-code">
                    {pillar.number}
                  </div>
                  <h3 className="mt-4 text-[18px] font-semibold tracking-[-0.01em] leading-tight text-vv-ink mb-1.5">
                    {pillar.title}
                  </h3>
                  <p className="text-vv-ink-2 text-[15px] leading-[1.6] m-0">
                    {pillar.description}
                  </p>
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
            What&apos;s Included
          </h2>
          <div className="h-12" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {includedItems.map((item) => (
              <article
                key={item.title}
                className="flex gap-4 rounded-[20px] border border-vv-line bg-vv-bg p-5"
              >
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-vv-accent/70 font-code text-[12px] font-semibold text-vv-accent-deep"
                  aria-hidden="true"
                >
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-[16px] font-semibold tracking-[-0.01em] text-vv-ink m-0">
                    {item.title}
                  </h4>
                  <p className="mt-1 text-[14px] leading-[1.6] text-vv-ink-2 m-0">
                    {item.description}
                  </p>
                </div>
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
            title="Pricing"
            lede="From $26 / night. Homestay can be booked as a standalone option or as part of any Vida Verde immersion programme."
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
                  href={
                    tier.title === "Quito Immersion"
                      ? "/study-in-quito/quito-immersion"
                      : "/contact"
                  }
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

      {/* Safety */}
      <section
        className="border-t border-vv-line bg-vv-bg-warm"
        data-screen-label="05 Safety"
      >
        <Container>
          <div className="grid gap-8 rounded-[22px] border border-vv-line bg-vv-bg p-7 md:grid-cols-[auto_1fr] md:items-start md:p-9">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-vv-accent text-vv-accent-deep">
              <ShieldCheck className="h-7 w-7" aria-hidden="true" />
            </div>
            <div>
              <span className="font-code text-vv-muted text-[11px] font-medium tracking-[0.14em] uppercase">
                {"// Safety"}
              </span>
              <h2 className="mt-3 text-[clamp(26px,2.7vw,40px)] font-semibold tracking-[-0.02em] leading-[1.08] text-vv-ink">
                Your Safety Is Our Priority
              </h2>
              <p className="mt-4 max-w-[70ch] text-[15px] leading-[1.7] text-vv-ink-2">
                Every Vida Verde host family is personally vetted by our team.
                All homestay families live in safe, well-connected Quito
                neighbourhoods. We provide 24/7 contact support throughout your
                stay, and our team is always available if anything needs to be
                resolved.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Host families */}
      <section
        className="border-t border-vv-line"
        data-screen-label="06 Host Families"
      >
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <span className="font-code text-vv-muted text-[11px] font-medium tracking-[0.14em] uppercase">
                {"// Host Families"}
              </span>
              <h2 className="mt-4 text-[clamp(28px,3vw,44px)] font-semibold tracking-[-0.02em] leading-[1.08] text-vv-ink">
                Meet Some of Our Host Families
              </h2>
              <p className="mt-4 text-[15px] leading-[1.7] text-vv-ink-2">
                Real host family profiles will be added here once Vida Verde has
                family photos and consent. Each profile can include first names,
                neighbourhood, and a short introduction.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {["Family photo", "Neighbourhood", "About us"].map((item) => (
                <div
                  key={item}
                  className="rounded-[22px] border border-dashed border-vv-line-2 bg-vv-bg-warm p-5"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-vv-accent/60 text-vv-accent-deep">
                    <UsersRound className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-[16px] font-semibold tracking-[-0.01em] text-vv-ink">
                    {item}
                  </h3>
                  <p className="mt-2 text-[13px] leading-[1.55] text-vv-ink-2">
                    Vida Verde to supply with host family consent.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section
        className="border-t border-vv-line bg-vv-bg-warm"
        data-screen-label="07 FAQ"
      >
        <Container >
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

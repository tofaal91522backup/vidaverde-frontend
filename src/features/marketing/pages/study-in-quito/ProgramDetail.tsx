import { Container } from "@/components/shared/Container";
import { CountUpStat } from "@/features/marketing/pages/home/components/CountUpStat";
import type { Program } from "./data/programs.data";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { TestimonialCarousel } from "../home/components/TestimonialCarousel";

export function ProgramDetail({ program }: { program: Program }) {
  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden min-h-120"
        data-screen-label="01 Program Hero"
      >
        <div className="absolute inset-0">
          <Image
            src={program.heroImage}
            alt={program.title}
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/60 to-black/20" />
        </div>
        <Container className="relative z-10 py-24">
          <div className="font-code text-[12px] tracking-[0.06em] mb-6 text-white/65">
            Home <span className="mx-1">/</span>{" "}
            <Link
              href="/study-in-quito"
              className="hover:text-white transition"
            >
              Study in Quito
            </Link>{" "}
            <span className="mx-1">/</span> {program.title}
          </div>
          <h1 className="text-[clamp(36px,5vw,68px)] font-semibold tracking-[-0.03em] leading-none m-0 mb-5 max-w-[18ch] text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.4)]">
            {program.detailTitle}
          </h1>
          <p className="text-[clamp(17px,1.4vw,20px)] leading-normal max-w-[52ch] text-pretty m-0 text-white/85 [text-shadow:0_1px_6px_rgba(0,0,0,0.4)]">
            {program.detailSubheadline}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2.5 border border-vv-accent rounded-full cursor-pointer text-[15px] font-semibold tracking-[-0.005em] leading-none py-3.5 px-5.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-vv-accent text-vv-accent-deep hover:bg-vv-accent-hi hover:-translate-y-px"
            >
              Enquire &amp; Reserve Your Place{" "}
              <ChevronRight className="h-4 w-4 shrink-0 translate-y-0.5" />
            </Link>
            <a
              href="https://wa.me/593998037473?text=Hi%2C+I%27d+like+to+enquire+about+the+Vida+Verde+immersion+programme."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 rounded-full cursor-pointer text-[15px] font-semibold tracking-[-0.005em] leading-none py-3.5 px-5.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap border border-white/50 text-white bg-white/8 hover:bg-white/15"
            >
              WhatsApp Us
            </a>
          </div>
        </Container>
      </section>

      {/* Description + What's Included */}
      <section
        className="border-t border-vv-line py-16"
        data-screen-label="02 Description"
      >
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <span className="font-code text-vv-muted text-[11px] font-medium tracking-[0.14em] uppercase">
                {"// About This Programme"}
              </span>
              <div className="h-4" />
              <h2 className="text-[clamp(28px,3vw,44px)] font-semibold tracking-[-0.02em] leading-[1.08] m-0 mb-5 text-balance">
                What is the {program.title}?
              </h2>
              <p className="text-[15px] leading-[1.7] text-vv-ink-2">
                {program.description}
              </p>
            </div>
            <div className="rounded-[22px] border border-vv-line bg-vv-bg-warm p-7">
              <div className="font-code text-vv-muted text-[11px] font-medium tracking-[0.14em] uppercase mb-4">
                {"// What's Included"}
              </div>
              <ul className="flex flex-col gap-2.5">
                {program.included.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-[14px] text-vv-ink-2"
                  >
                    <span className="mt-0.5 text-vv-accent font-bold shrink-0">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Sample Schedule */}
      <section
        className="border-t border-vv-line bg-vv-bg-warm py-16"
        data-screen-label="03 Schedule"
      >
        <Container>
          <span className="font-code text-vv-muted text-[11px] font-medium tracking-[0.14em] uppercase">
            {"// Sample Schedule"}
          </span>
          <div className="h-4" />
          <h2 className="text-[clamp(28px,3vw,44px)] font-semibold tracking-[-0.02em] leading-[1.08] m-0 mb-4 text-balance">
            A Typical Week
          </h2>
          {program.scheduleDescription && (
            <p className="text-[15px] leading-[1.7] text-vv-ink-2 mb-8 max-w-[64ch]">
              {program.scheduleDescription}
            </p>
          )}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[14px]">
              <thead>
                <tr className="border-b border-vv-line">
                  <th className="py-3 pr-6 text-left font-semibold text-vv-ink-2 uppercase tracking-wide text-[11px]">
                    When
                  </th>
                  <th className="py-3 pr-6 text-left font-semibold text-vv-ink-2 uppercase tracking-wide text-[11px]">
                    Activity
                  </th>
                  <th className="py-3 text-left font-semibold text-vv-ink-2 uppercase tracking-wide text-[11px]">
                    Type
                  </th>
                </tr>
              </thead>
              <tbody>
                {program.schedule.map((row, i) => (
                  <tr key={i} className="border-b border-vv-line last:border-0">
                    <td className="py-3.5 pr-6 font-medium text-vv-ink">
                      {row.day}
                    </td>
                    <td className="py-3.5 pr-6 text-vv-ink-2">
                      {row.activity}
                    </td>
                    <td className="py-3.5">
                      <span className="rounded-full border border-vv-line bg-vv-bg px-2.5 py-0.5 text-[11px] font-medium text-vv-ink-2">
                        {row.type}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      {/* Pricing */}
      <section
        className="border-t border-vv-line py-16"
        data-screen-label="04 Pricing"
      >
        <Container>
          <span className="font-code text-vv-muted text-[11px] font-medium tracking-[0.14em] uppercase">
            {"// Pricing"}
          </span>
          <div className="h-4" />
          <h2 className="text-[clamp(28px,3vw,44px)] font-semibold tracking-[-0.02em] leading-[1.08] m-0 mb-4 text-balance">
            Pricing
          </h2>
          {program.pricingNote && (
            <p className="text-[14px] text-vv-ink-2 mb-6">
              {program.pricingNote}
            </p>
          )}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {program.pricing.map((tier) => (
              <div
                key={tier.duration}
                className="flex flex-col gap-2 rounded-[22px] border border-vv-line bg-vv-bg-warm p-6"
              >
                <div className="text-[12px] font-semibold uppercase tracking-wide text-vv-ink-2">
                  {tier.duration}
                </div>
                <div className="text-[32px] font-bold tracking-tight text-vv-ink">
                  <CountUpStat value={tier.price} />
                </div>
                {tier.note && (
                  <div className="text-[12px] text-vv-ink-2">{tier.note}</div>
                )}
              </div>
            ))}
          </div>
          {program.pricingFooter && (
            <p className="mt-6 text-[13px] text-vv-ink-2">
              {program.pricingFooter}
            </p>
          )}
        </Container>
      </section>

      {/* Testimonial */}
      {program.testimonial && (
        <section
          className="border-t border-vv-line bg-vv-bg-warm py-16"
          data-screen-label="05 Testimonial"
        >
          <Container>
            <span className="font-code text-vv-muted text-[11px] font-medium tracking-[0.14em] uppercase">
              {"// What Our Students Say"}
            </span>
            <div className="h-8" />
            <TestimonialCarousel />
          </Container>
        </section>
      )}

      {/* CTA */}
      <section
        className="border-t border-vv-line py-16"
        data-screen-label="06 Enquiry CTA"
      >
        <Container className="text-center">
          <span className="font-code text-vv-muted text-[11px] font-medium tracking-[0.14em] uppercase">
            {"// Ready to book?"}
          </span>
          <div className="h-4" />
          <h2 className="text-[clamp(28px,3vw,44px)] font-semibold tracking-[-0.02em] leading-[1.08] m-0 text-balance">
            Ready to Reserve Your Place?
          </h2>
          <p className="text-vv-ink-2 text-[clamp(17px,1.4vw,20px)] leading-normal mt-3 max-w-[50ch] mx-auto">
            Spots fill up quickly, especially during peak travel months. Send us
            a message or WhatsApp us and we&apos;ll confirm availability and
            hold your place.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2.5 border border-vv-accent rounded-full cursor-pointer text-[15px] font-semibold tracking-[-0.005em] leading-none py-3.5 px-5.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-vv-accent text-vv-accent-deep hover:bg-vv-accent-hi hover:-translate-y-px"
            >
              Enquire Now{" "}
              <ChevronRight className="h-4 w-4 shrink-0 translate-y-0.5" />
            </Link>
          </div>
          <div className="mt-4">
            <Link
              href="/study-in-quito"
              className="text-[13px] text-vv-ink-2 underline hover:text-vv-ink"
            >
              ← Back to all programmes
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}

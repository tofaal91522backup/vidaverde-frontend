import { Container } from "@/components/shared/Container";
import type { Program } from "./data/programs.data";
import Image from "next/image";
import Link from "next/link";

export function ProgramDetail({ program }: { program: Program }) {
  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        data-screen-label="01 Program Hero"
        style={{ minHeight: "480px" }}
      >
        <div className="absolute inset-0">
          <Image
            src={program.heroImage}
            alt={program.title}
            fill
            className="object-cover"
            unoptimized
          />
          {/* strong gradient from bottom-left so text is always readable */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/20" />
        </div>
        <Container className="relative z-10 py-24">
          <div className="crumb" style={{ color: "rgba(255,255,255,0.65)" }}>
            Home <span>/</span>{" "}
            <Link href="/study-in-quito" style={{ color: "rgba(255,255,255,0.65)" }} className="hover:text-white">
              Study in Quito
            </Link>{" "}
            <span>/</span> {program.title}
          </div>
          <h1
            className="h1 mt-4 max-w-[18ch]"
            style={{ color: "#ffffff", textShadow: "0 2px 12px rgba(0,0,0,0.4)" }}
          >
            {program.title}
          </h1>
          <p
            className="lede mt-3 max-w-[52ch]"
            style={{ color: "rgba(255,255,255,0.85)", textShadow: "0 1px 6px rgba(0,0,0,0.4)" }}
          >
            {program.tagline}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="vv-btn vv-btn-primary">
              Enquire to Book →
            </Link>
            <a
              href="https://wa.me/593998037473?text=Hi%2C+I%27d+like+to+enquire+about+the+Vida+Verde+immersion+programme."
              target="_blank"
              rel="noopener noreferrer"
              className="vv-btn"
              style={{ border: "1.5px solid rgba(255,255,255,0.5)", color: "#ffffff", background: "rgba(255,255,255,0.08)" }}
            >
              WhatsApp Us
            </a>
          </div>
        </Container>
      </section>

      {/* Description + What's Included */}
      <section
        className="border-t border-[var(--vv-line)] py-16"
        data-screen-label="02 Description"
      >
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <span className="eyebrow">{"// About This Programme"}</span>
              <div className="h-4" />
              <h2 className="h2 mb-5">What is the {program.title}?</h2>
              <p className="text-[15px] leading-[1.7] text-[var(--vv-ink-2)]">
                {program.description}
              </p>
            </div>
            <div className="rounded-[var(--vv-radius-lg)] border border-[var(--vv-line)] bg-[var(--vv-bg-warm)] p-7">
              <div className="eyebrow mb-4">{"// What's Included"}</div>
              <ul className="flex flex-col gap-2.5">
                {program.included.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[14px] text-[var(--vv-ink-2)]">
                    <span className="mt-0.5 text-[var(--vv-accent)] font-bold shrink-0">✓</span>
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
        className="border-t border-[var(--vv-line)] bg-[var(--vv-bg-warm)] py-16"
        data-screen-label="03 Schedule"
      >
        <Container>
          <span className="eyebrow">{"// Sample Schedule"}</span>
          <div className="h-4" />
          <h2 className="h2 mb-8">A Typical Week</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[14px]">
              <thead>
                <tr className="border-b border-[var(--vv-line)]">
                  <th className="py-3 pr-6 text-left font-semibold text-[var(--vv-ink-2)] uppercase tracking-wide text-[11px]">
                    When
                  </th>
                  <th className="py-3 pr-6 text-left font-semibold text-[var(--vv-ink-2)] uppercase tracking-wide text-[11px]">
                    Activity
                  </th>
                  <th className="py-3 text-left font-semibold text-[var(--vv-ink-2)] uppercase tracking-wide text-[11px]">
                    Type
                  </th>
                </tr>
              </thead>
              <tbody>
                {program.schedule.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-[var(--vv-line)] last:border-0"
                  >
                    <td className="py-3.5 pr-6 font-medium text-[var(--vv-ink)]">
                      {row.day}
                    </td>
                    <td className="py-3.5 pr-6 text-[var(--vv-ink-2)]">
                      {row.activity}
                    </td>
                    <td className="py-3.5">
                      <span className="rounded-full border border-[var(--vv-line)] bg-[var(--vv-bg)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--vv-ink-2)]">
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
        className="border-t border-[var(--vv-line)] py-16"
        data-screen-label="04 Pricing"
      >
        <Container>
          <span className="eyebrow">{"// Pricing"}</span>
          <div className="h-4" />
          <h2 className="h2 mb-8">Programme Rates</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {program.pricing.map((tier) => (
              <div
                key={tier.duration}
                className="flex flex-col gap-2 rounded-[var(--vv-radius-lg)] border border-[var(--vv-line)] bg-[var(--vv-bg-warm)] p-6"
              >
                <div className="text-[12px] font-semibold uppercase tracking-wide text-[var(--vv-ink-2)]">
                  {tier.duration}
                </div>
                <div className="text-[32px] font-bold tracking-tight text-[var(--vv-ink)]">
                  {tier.price}
                </div>
                {tier.note && (
                  <div className="text-[12px] text-[var(--vv-ink-2)]">
                    {tier.note}
                  </div>
                )}
              </div>
            ))}
          </div>
          <p className="mt-6 text-[13px] text-[var(--vv-ink-2)]">
            A one-time $35 registration fee covers personalised school
            materials, completion certificate, and staff support.
            Pricing confirmed at time of enquiry.
          </p>
        </Container>
      </section>

      {/* Testimonial */}
      {program.testimonial && (
        <section
          className="border-t border-[var(--vv-line)] bg-[var(--vv-bg-warm)] py-16"
          data-screen-label="05 Testimonial"
        >
          <Container className="max-w-[780px]">
            <blockquote className="text-[22px] leading-[1.5] font-medium text-[var(--vv-ink)] italic">
              &ldquo;{program.testimonial.quote}&rdquo;
            </blockquote>
            <div className="mt-6 text-[14px] text-[var(--vv-ink-2)]">
              — {program.testimonial.name} · {program.testimonial.meta}
            </div>
          </Container>
        </section>
      )}

      {/* CTA */}
      <section
        className="border-t border-[var(--vv-line)] py-16"
        data-screen-label="06 Enquiry CTA"
      >
        <Container className="text-center">
          <span className="eyebrow">{"// Ready to book?"}</span>
          <div className="h-4" />
          <h2 className="h2">Reserve Your Place</h2>
          <p className="lede mt-3 max-w-[50ch] mx-auto text-[var(--vv-ink-2)]">
            Immersion bookings need a little coordination — dates, levels,
            homestay preferences. Send us a message and we&apos;ll sort it all
            out within 24 hours.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link href="/contact" className="vv-btn vv-btn-primary">
              Send an Enquiry →
            </Link>
            <a
              href="https://wa.me/593998037473?text=Hi%2C+I%27d+like+to+book+the+Vida+Verde+immersion+programme."
              target="_blank"
              rel="noopener noreferrer"
              className="vv-btn vv-btn-ghost"
            >
              WhatsApp Us
            </a>
          </div>
          <div className="mt-4">
            <Link
              href="/study-in-quito"
              className="text-[13px] text-[var(--vv-ink-2)] underline hover:text-[var(--vv-ink)]"
            >
              ← Back to all programmes
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}

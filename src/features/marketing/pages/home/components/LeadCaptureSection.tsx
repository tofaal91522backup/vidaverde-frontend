"use client";

import { Container } from "@/components/shared/Container";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

const bulletPoints = [
  "50 essential phrases for travellers",
  "Pronunciation guide included",
  "Designed by Vida Verde teachers",
  "Instant download, no wait",
];

export function LeadCaptureSection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section
      className="border-t border-vv-line bg-vv-bg py-16"
      data-screen-label="Lead Capture"
      id="lead-capture"
    >
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="font-code text-vv-muted text-[11px] font-medium tracking-[0.14em] uppercase">
              {"// Free Resource"}
            </span>
            <div className="h-4" />
            <h2 className="text-[clamp(28px,3vw,44px)] font-semibold tracking-[-0.02em] leading-[1.08] m-0 text-balance">
              Not Sure Where to Start?
              <br />
              Get Your Free Spanish Guide.
            </h2>
            <p className="text-vv-ink-2 text-[clamp(15px,1.2vw,17px)] leading-normal mt-4 max-w-[52ch] m-0">
              Download{" "}
              <em className="font-semibold text-vv-ink">
                &ldquo;Survival Spanish for Ecuador: 50 Essential Phrases for
                Travellers and Learners&rdquo;
              </em>{" "}
              Free, instant, no commitment.
            </p>
            <ul className="mt-6 flex flex-col gap-2 list-none p-0 m-0">
              {bulletPoints.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-[15px] text-vv-ink-2"
                >
                  <span className="text-vv-accent font-bold" aria-hidden="true">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[22px] border border-vv-line bg-vv-bg p-8 max-[640px]:p-6">
            {submitted ? (
              <div className="flex flex-col items-center gap-4 py-6 text-center">
                <div className="text-5xl" aria-hidden="true">
                  🎉
                </div>
                <h3 className="text-[22px] font-semibold text-vv-ink m-0">
                  Check your inbox!
                </h3>
                <p className="text-vv-ink-2 max-w-[36ch] m-0">
                  Your free guide is on its way. While you wait, why not book
                  your first lesson for just $12?
                </p>
                <Link
                  href="/online-classes/book"
                  className="mt-2 inline-flex items-center justify-center gap-2.5 border border-vv-accent rounded-full cursor-pointer text-[15px] font-semibold tracking-[-0.005em] leading-none py-3.5 px-5.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-vv-accent text-vv-accent-deep hover:bg-vv-accent-hi hover:-translate-y-px"
                >
                  Book My First Lesson{" "}
                  <ChevronRight className="h-4 w-4 shrink-0 translate-y-0.5" />
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <h3 className="text-[20px] font-semibold text-vv-ink mb-1 m-0">
                    Get the Free Guide
                  </h3>
                  <p className="text-[13px] text-vv-ink-2 m-0">
                    No spam. One-click unsubscribe anytime.
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="lead-name"
                    className="text-[12px] font-medium uppercase tracking-wide text-vv-ink-2"
                  >
                    First Name
                  </label>
                  <input
                    id="lead-name"
                    type="text"
                    name="name"
                    required
                    placeholder="Maria"
                    className="rounded-lg border border-vv-line bg-vv-bg-warm px-4 py-3 text-[15px] text-vv-ink outline-none placeholder:text-vv-ink-2/50 focus:border-vv-accent"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="lead-email"
                    className="text-[12px] font-medium uppercase tracking-wide text-vv-ink-2"
                  >
                    Email Address
                  </label>
                  <input
                    id="lead-email"
                    type="email"
                    name="email"
                    required
                    placeholder="maria@example.com"
                    className="rounded-lg border border-vv-line bg-vv-bg-warm px-4 py-3 text-[15px] text-vv-ink outline-none placeholder:text-vv-ink-2/50 focus:border-vv-accent"
                  />
                </div>
                <div className="flex items-start gap-2">
                  <input
                    id="lead-consent"
                    type="checkbox"
                    name="consent"
                    required
                    className="mt-1 h-4 w-4 accent-vv-accent cursor-pointer"
                  />
                  <label
                    htmlFor="lead-consent"
                    className="text-[12px] text-vv-ink-2 leading-normal"
                  >
                    I agree to receive emails from Vida Verde.{" "}
                    <a href="/privacy" className="underline hover:text-vv-ink">
                      Privacy Policy
                    </a>
                  </label>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-1 w-full inline-flex items-center justify-center gap-2.5 border border-vv-accent rounded-full cursor-pointer text-[15px] font-semibold tracking-[-0.005em] leading-none py-3.5 px-5.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-vv-accent text-vv-accent-deep hover:bg-vv-accent-hi hover:-translate-y-px disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {loading ? (
                    "Sending…"
                  ) : (
                    <>
                      Download Free Guide{" "}
                      <ChevronRight className="h-4 w-4 shrink-0 translate-y-0.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

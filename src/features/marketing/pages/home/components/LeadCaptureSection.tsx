"use client";

import { Container } from "@/components/shared/Container";
import { useState } from "react";

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
      className="border-t border-[var(--vv-line)] bg-[var(--vv-bg-warm)] py-16"
      data-screen-label="Lead Capture"
      id="lead-capture"
    >
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="eyebrow">{"// Free Resource"}</span>
            <div className="h-4" />
            <h2 className="h2">
              Not Sure Where to Start?
              <br />
              Get Your Free Spanish Guide.
            </h2>
            <p className="lede mt-4 max-w-[52ch]">
              Download{" "}
              <em className="font-semibold text-[var(--vv-ink)]">
                &ldquo;Survival Spanish for Ecuador: 50 Essential Phrases for
                Travellers and Learners&rdquo;
              </em>{" "}
              — free, instant, no commitment.
            </p>
            <ul className="mt-6 flex flex-col gap-2">
              {[
                "50 essential phrases for travellers",
                "Pronunciation guide included",
                "Designed by Vida Verde teachers",
                "Instant download — no wait",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-[15px] text-[var(--vv-ink-2)]">
                  <span className="text-[var(--vv-accent)] font-bold">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[var(--vv-radius-lg)] border border-[var(--vv-line)] bg-[var(--vv-bg)] p-8">
            {submitted ? (
              <div className="flex flex-col items-center gap-4 py-6 text-center">
                <div className="text-5xl">🎉</div>
                <h3 className="text-[22px] font-semibold text-[var(--vv-ink)]">
                  Check your inbox!
                </h3>
                <p className="text-[var(--vv-ink-2)] max-w-[36ch]">
                  Your free guide is on its way. While you wait, why not book
                  your first lesson for just $12?
                </p>
                <a href="/book" className="vv-btn vv-btn-primary mt-2">
                  Book My First Lesson →
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <h3 className="text-[20px] font-semibold text-[var(--vv-ink)] mb-1">
                    Get the Free Guide
                  </h3>
                  <p className="text-[13px] text-[var(--vv-ink-2)]">
                    No spam. One-click unsubscribe anytime.
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="lead-name"
                    className="text-[12px] font-medium uppercase tracking-wide text-[var(--vv-ink-2)]"
                  >
                    First Name
                  </label>
                  <input
                    id="lead-name"
                    type="text"
                    name="name"
                    required
                    placeholder="Maria"
                    className="rounded-lg border border-[var(--vv-line)] bg-[var(--vv-bg-warm)] px-4 py-3 text-[15px] text-[var(--vv-ink)] outline-none placeholder:text-[var(--vv-ink-2)]/50 focus:border-[var(--vv-accent)]"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="lead-email"
                    className="text-[12px] font-medium uppercase tracking-wide text-[var(--vv-ink-2)]"
                  >
                    Email Address
                  </label>
                  <input
                    id="lead-email"
                    type="email"
                    name="email"
                    required
                    placeholder="maria@example.com"
                    className="rounded-lg border border-[var(--vv-line)] bg-[var(--vv-bg-warm)] px-4 py-3 text-[15px] text-[var(--vv-ink)] outline-none placeholder:text-[var(--vv-ink-2)]/50 focus:border-[var(--vv-accent)]"
                  />
                </div>
                <div className="flex items-start gap-2">
                  <input
                    id="lead-consent"
                    type="checkbox"
                    name="consent"
                    required
                    className="mt-1 h-4 w-4 accent-[var(--vv-accent)] cursor-pointer"
                  />
                  <label
                    htmlFor="lead-consent"
                    className="text-[12px] text-[var(--vv-ink-2)] leading-[1.5]"
                  >
                    I agree to receive emails from Vida Verde.{" "}
                    <a
                      href="/privacy"
                      className="underline hover:text-[var(--vv-ink)]"
                    >
                      Privacy Policy
                    </a>
                  </label>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="vv-btn vv-btn-primary mt-1 w-full"
                >
                  {loading ? "Sending…" : "Download Free Guide →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

"use client";

import { Container } from "@/components/shared/Container";
import { MarketingButton } from "@/features/marketing/components/MarketingButton";
import { useEffect, useRef } from "react";

const trustItems = [
  { icon: "✓", label: "AECEE Certified", sub: "Accredited Spanish school" },
  { icon: "★", label: "Est. 1999", sub: "25+ years of teaching" },
  { icon: "♡", label: "4,700+ Students", sub: "From over 50 countries" },
  {
    icon: "◎",
    label: "All Levels Welcome",
    sub: "A1 beginners to C1 advanced",
  },
  { icon: "◑", label: "Classes via Google Meet", sub: "Join from anywhere" },
];

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.play().catch((err) => {
      console.warn("Autoplay blocked:", err);
    });
  }, []);

  return (
    <section className="relative overflow-hidden h-[80vh]" data-screen-label="01 Hero">
      {/* Video background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="https://images.pexels.com/videos/17118763/iglesia-san-francisco-quito-ecuador-17118763.jpeg?auto=compress&cs=tinysrgb&h=900&w=1600"
          className="h-full w-full object-cover"
          aria-label="Vida Verde teacher in an online Spanish class via Google Meet"
        >
          <source src="/videos/hero_loop2.mp4" type="video/mp4" />
        </video>
        <div
          className="absolute inset-0 bg-linear-to-r from-vv-bg-deep/92 via-vv-bg-deep/55 to-vv-bg-deep/18 max-[900px]:from-vv-bg-deep/88 max-[900px]:to-vv-bg-deep/60"
          aria-hidden="true"
        />

        {/* A1 floating card */}
        <div className="absolute top-10 right-10 flex items-center gap-3.5 rounded-2xl border border-white/20 bg-black/25 px-5 py-4 text-white backdrop-blur-md shadow-[0_8px_28px_-6px_rgba(0,0,0,0.6)] animate-[hero-rise_0.7s_0.5s_ease_both] max-[900px]:hidden">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-[10px] bg-vv-accent text-vv-accent-deep text-[16px] font-bold">
            A1
          </div>
          <div>
            <div className="font-code text-[11px] text-white/80 uppercase tracking-widest">
              Starting level
            </div>
            <div className="text-[15px] font-semibold text-white">
              No experience needed
            </div>
          </div>
        </div>
      </div>

      <Container className="relative z-10 h-full">
        <div className="grid lg:grid-cols-[1fr_auto] items-center gap-10 h-full py-16 max-[900px]:py-14 max-[640px]:py-12 max-[900px]:grid-cols-1">
          {/* Left — main content */}
          <div className="flex flex-col gap-6 max-w-145 text-white max-[640px]:gap-5">
            {/* Headline */}
            <h1 className="text-[clamp(32px,4vw,58px)] font-semibold tracking-[-0.03em] leading-[1.12] m-0 animate-[hero-rise_0.55s_0.2s_ease_both]">
              Learn{" "}
              <span className="text-vv-accent">Spanish</span>{" "}
              Online.
              <br />
              <span className="[font-family:var(--font-newsreader),Georgia,serif] italic font-normal text-white/90">
                One-on-One.
              </span>{" "}
              <span className="font-semibold">With a Real Teacher.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-white/72 text-[clamp(16px,1.3vw,19px)] leading-normal m-0 max-w-[50ch] text-pretty animate-[hero-rise_0.55s_0.3s_ease_both]">
              Expert Ecuadorian teachers, personalised lessons, flexible
              scheduling — from anywhere in the world.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 animate-[hero-rise_0.55s_0.4s_ease_both]">
              <MarketingButton href="/online-classes/book" tone="primary">
                Start for $12 — Book Your First Lesson
              </MarketingButton>
              <MarketingButton
                href="/study-in-quito"
                tone="ghost"
                className="border-white/40 text-white hover:bg-white hover:border-white hover:text-vv-ink"
              >
                Explore all programs →
              </MarketingButton>
            </div>
          </div>

          {/* Right — trust bar card */}
          <div className="flex flex-col gap-1 min-w-72 rounded-2xl border border-white/14 bg-white/10 px-8 py-7 backdrop-blur-md shadow-[0_8px_32px_-8px_rgba(0,0,0,0.4)] animate-[hero-rise_0.6s_0.5s_ease_both] max-[900px]:hidden">
            {trustItems.map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-4 py-3.5 border-b border-white/10 last:border-0"
              >
                <span
                  className="text-vv-accent text-[17px] leading-none shrink-0 mt-0.5"
                  aria-hidden="true"
                >
                  {item.icon}
                </span>
                <div>
                  <div className="text-white text-[14px] font-semibold leading-tight">
                    {item.label}
                  </div>
                  <div className="text-white/55 text-[12px] mt-0.5">
                    {item.sub}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

"use client";

import { Container } from "@/components/shared/Container";
import { MarketingButton } from "@/features/marketing/components/MarketingButton";
import { Link } from "@/i18n/navigation";
import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useRef, useState } from "react";

function useTypewriterWords() {
  const t = useTranslations("Home.hero");
  const main = t("typewriterMain");
  const alt = t("typewriterAlt");

  return useMemo(
    () => [
      { text: main, accent: true },
      { text: alt, accent: true },
    ],
    [main, alt]
  );
}

function TypewriterCycle() {
  const words = useTypewriterWords();
  const [wordIdx, setWordIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState<"typing" | "pause" | "deleting">("typing");

  useEffect(() => {
    const word = words[wordIdx].text;
    let timer: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (displayed.length < word.length) {
        timer = setTimeout(
          () => setDisplayed(word.slice(0, displayed.length + 1)),
          110,
        );
      } else {
        timer = setTimeout(() => setPhase("pause"), 2200);
      }
    } else if (phase === "pause") {
      timer = setTimeout(() => setPhase("deleting"), 300);
    } else {
      if (displayed.length > 0) {
        timer = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 65);
      } else {
        timer = setTimeout(() => {
          setWordIdx((i) => (i + 1) % words.length);
          setPhase("typing");
        }, 0);
      }
    }

    return () => clearTimeout(timer);
  }, [displayed, phase, wordIdx]);

  const isAccent = words[wordIdx].accent;

  return (
    <span className={isAccent ? "text-vv-accent" : "text-white"}>
      {displayed}
      {/* <span className="text-vv-accent animate-pulse ml-0.5">|</span> */}
    </span>
  );
}

export function AnimatedBookButton() {
  const t = useTranslations("Home.hero");

  return (
    <>
      <style>{`
        @keyframes book-cycle {
          0%, 38%  { transform: translateY(0); }
          48%, 83% { transform: translateY(-33.333%); }
          93%, 100%{ transform: translateY(-66.666%); }
        }
        .book-cycle { animation: book-cycle 5s ease-in-out infinite; }
      `}</style>
      <Link
        href="/online-classes/book"
        className="inline-flex items-center justify-center border border-vv-accent rounded-full cursor-pointer text-[15px] font-semibold tracking-[-0.005em] leading-none py-3.5 px-5.5 bg-vv-accent text-vv-accent-deep hover:bg-vv-accent-hi hover:-translate-y-px transition-[transform,background,border-color] duration-200 sm:w-auto overflow-hidden"
      >
        <span className="block overflow-hidden" style={{ height: "1.25em" }}>
          <span className="book-cycle flex flex-col">
            <span
              className="flex items-center justify-center"
              style={{ height: "1.25em" }}
            >
              {t("bookButtonLine1")}
            </span>
            <span
              className="flex items-center justify-center"
              style={{ height: "1.25em" }}
            >
              {t("bookButtonLine2")}
            </span>
            <span
              className="flex items-center justify-center"
              style={{ height: "1.25em" }}
            >
              {t("bookButtonLine1")}
            </span>
          </span>
        </span>
      </Link>
    </>
  );
}

const trustItemKeys = ["aecee", "est", "students", "levels", "google"] as const;
const trustIcons: Record<(typeof trustItemKeys)[number], string> = {
  aecee: "✓",
  est: "★",
  students: "♡",
  levels: "A1",
  google: "G",
};

export function HeroSection() {
  const t = useTranslations("Home.hero");
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
    <section
      className="relative overflow-hidden min-h-svh flex flex-col"
      data-screen-label="01 Hero"
    >
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
              {t("startingLevel")}
            </div>
            <div className="text-[15px] font-semibold text-white">
              {t("noExperience")}
            </div>
          </div>
        </div>
      </div>

      <Container className="relative z-10 flex-1 flex items-center">
        <div className="grid lg:grid-cols-[1fr_auto] items-center gap-10 w-full py-20 max-[900px]:py-16 max-[640px]:py-14 max-[900px]:grid-cols-1">
          {/* Left. Main content */}
          <div className="flex flex-col gap-6 max-w-145 text-white max-[640px]:gap-5 max-[640px]:max-w-full">
            {/* Headline */}
            <h1 className="text-[clamp(38px,4vw,58px)] font-semibold tracking-[-0.03em] leading-[1.12] m-0 animate-[hero-rise_0.5s_0.1s_ease_both]">
              <span className="block min-h-[1.2em]">
                <TypewriterCycle />
              </span>
              <span className="block text-white/90">{t("headlineSuffix")}</span>
            </h1>

            {/* Subheadline */}
            <p className="text-white/72 text-[clamp(17px,1.3vw,18px)] leading-relaxed m-0 max-w-[50ch] text-pretty animate-[hero-rise_0.55s_0.3s_ease_both]">
              {t("subheadline")}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 animate-[hero-rise_0.55s_0.4s_ease_both]">
              <AnimatedBookButton />
              <MarketingButton
                href="/study-in-quito"
                tone="ghost"
                className="border-white/40 text-white hover:bg-white hover:border-white hover:text-vv-ink justify-center sm:w-auto"
              >
                {t("exploreProgramsCta")}{" "}
                <ChevronRight className="h-4 w-4 shrink-0 translate-y-0.5 translate-y-0.5" />
              </MarketingButton>
            </div>
          </div>

          {/* Right. Trust bar card */}
          <div className="flex flex-col gap-1 min-w-72 rounded-2xl border border-white/14 bg-white/10 px-8 py-7 backdrop-blur-md shadow-[0_8px_32px_-8px_rgba(0,0,0,0.4)] animate-[hero-rise_0.6s_0.5s_ease_both] max-[900px]:hidden">
            {trustItemKeys.map((key) => (
              <div
                key={key}
                className="flex items-start gap-4 py-3.5 border-b border-white/10 last:border-0"
              >
                <span
                  className="text-vv-accent text-[17px] leading-none shrink-0 mt-0.5"
                  aria-hidden="true"
                >
                  {trustIcons[key]}
                </span>
                <div>
                  <div className="text-white text-[14px] font-semibold leading-tight">
                    {t(`trust.${key}.label`)}
                  </div>
                  <div className="text-white/55 text-[12px] mt-0.5">
                    {t(`trust.${key}.sub`)}
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

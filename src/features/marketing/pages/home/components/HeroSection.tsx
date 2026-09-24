"use client";

import { Container } from "@/components/shared/Container";
import { MarketingButton } from "@/features/marketing/components/MarketingButton";
import Link from "next/link";
import { ChevronRight, Heart, Star, type LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage, type LanguageCode } from "@/providers/language-provider";
import { FromLowestPrice } from "@/features/marketing/components/lowest-package-price";

/*
  Hero-ta Google Translate-er hate chhara hoy na (`translate="no"`), hate lekha
  EN/ES. Karon typewriter-ta proti 110ms-e lekha bodlay — Google tal rakhte pare
  na, ar ES-e-o "One-on-O" English-e atke thakto. Ar site-er prothom ja chokhe
  pore, sheta machine Spanish-e na thakai bhalo.

  ⚠️ Spanish-ta draft — school-er keu (Rosa/Mateo) ekbar dekhe nile bhalo.
*/
type HeroCopy = {
  words: { text: string; accent: boolean }[];
  tagline: string;
  sub: string;
  book: string;
  explore: string;
  trust: { label: string; sub: string }[];
};

const COPY: Record<LanguageCode, HeroCopy> = {
  en: {
    words: [
      { text: "Learn Spanish Online", accent: true },
      { text: "One-on-One", accent: true },
    ],
    tagline: "With a Real Teacher",
    sub: "Expert Ecuadorian teachers, personalised lessons, flexible scheduling. Join from anywhere in the world.",
    book: "Book Your First Lesson",
    explore: "Explore all programs",
    trust: [
      { label: "Est. 1999", sub: "25+ years of teaching" },
      { label: "4,700+ Students", sub: "From over 50 countries" },
      { label: "All Levels Welcome", sub: "A1 beginners to C1 advanced" },
      { label: "Classes via Google Meet", sub: "Join from anywhere" },
    ],
  },
  es: {
    words: [
      { text: "Aprende español en línea", accent: true },
      { text: "Clases uno a uno", accent: true },
    ],
    tagline: "Con un profesor de verdad",
    sub: "Profesores ecuatorianos expertos, clases personalizadas y horarios flexibles. Únete desde cualquier parte del mundo.",
    book: "Reserva tu primera clase",
    explore: "Ver todos los programas",
    trust: [
      { label: "Desde 1999", sub: "Más de 25 años enseñando" },
      // RAE: 4 ongker shonkhya alada hoy na — 4700 (baki page-er sathe mile)
      { label: "Más de 4700 estudiantes", sub: "De más de 50 países" },
      { label: "Todos los niveles", sub: "De principiante A1 a avanzado C1" },
      {
        label: "Clases por Google Meet",
        sub: "Conéctate desde cualquier lugar",
      },
    ],
  },
};

function TypewriterCycle({ words }: { words: HeroCopy["words"] }) {
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
  }, [displayed, phase, wordIdx, words]);

  const isAccent = words[wordIdx].accent;

  return (
    <span className={isAccent ? "text-vv-accent" : "text-white"}>
      {displayed}
      {/* <span className="text-vv-accent animate-pulse ml-0.5">|</span> */}
    </span>
  );
}

export function AnimatedBookButton() {
  // Online Classes page-er hero-teo boshe, tai nijei bhasha pore
  const { language } = useLanguage();
  const copy = COPY[language];

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
        translate="no"
        className="inline-flex items-center justify-center border border-vv-accent rounded-full cursor-pointer text-[15px] font-semibold tracking-[-0.005em] leading-none py-3.5 px-5.5 bg-vv-accent text-vv-accent-deep hover:bg-vv-accent-hi hover:-translate-y-px transition-[transform,background,border-color] duration-200 sm:w-auto overflow-hidden"
      >
        <span className="block overflow-hidden" style={{ height: "1.25em" }}>
          <span className="book-cycle flex flex-col">
            <span
              className="flex items-center justify-center"
              style={{ height: "1.25em" }}
            >
              {copy.book}
            </span>
            <span
              className="flex items-center justify-center"
              style={{ height: "1.25em" }}
            >
              <FromLowestPrice />
            </span>
            <span
              className="flex items-center justify-center"
              style={{ height: "1.25em" }}
            >
              {copy.book}
            </span>
          </span>
        </span>
      </Link>
    </>
  );
}

/** `icon` icon-o hote pare, chhoto text-o ("A1", "G") */
const TRUST_ICONS: (LucideIcon | string)[] = [Star, Heart, "A1", "G"];

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { language } = useLanguage();
  const copy = COPY[language];

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
      translate="no"
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
      </div>

      <Container className="relative z-10 flex-1 flex items-center">
        <div className="grid lg:grid-cols-[1fr_auto] items-center gap-10 w-full py-20 max-[900px]:py-16 max-[640px]:py-14 max-[900px]:grid-cols-1">
          {/* Left. Main content */}
          <div className="flex flex-col gap-6 max-w-145 text-white max-[640px]:gap-5 max-[640px]:max-w-full">
            {/* Headline */}
            <h1 className="text-[clamp(38px,4vw,58px)] font-semibold tracking-[-0.03em] leading-[1.12] m-0 animate-[hero-rise_0.5s_0.1s_ease_both]">
              <span className="block min-h-[1.2em]">
                {/* `key` — bhasha bodlale adha-type kora English shobdo theke
                    shuru na kore notun kore type hoy */}
                <TypewriterCycle key={language} words={copy.words} />
              </span>
              <span className="block text-white/65 font-normal">
                {copy.tagline}
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-white/72 text-[clamp(17px,1.3vw,18px)] leading-relaxed m-0 max-w-[50ch] text-pretty animate-[hero-rise_0.55s_0.3s_ease_both]">
              {copy.sub}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 animate-[hero-rise_0.55s_0.4s_ease_both]">
              <AnimatedBookButton />
              <MarketingButton
                href="/study-in-quito"
                tone="ghost"
                className="border-white/40 text-white hover:bg-white hover:border-white hover:text-vv-ink justify-center sm:w-auto"
              >
                {copy.explore}{" "}
                <ChevronRight className="h-4 w-4 shrink-0 translate-y-0.5 translate-y-0.5" />
              </MarketingButton>
            </div>
          </div>

          {/* Right. Trust bar card */}
          <div className="flex flex-col gap-1 min-w-72 rounded-2xl border border-white/14 bg-white/10 px-8 py-7 backdrop-blur-md shadow-[0_8px_32px_-8px_rgba(0,0,0,0.4)] animate-[hero-rise_0.6s_0.5s_ease_both] max-[900px]:hidden">
            {copy.trust.map((item, i) => {
              const Icon = TRUST_ICONS[i];
              return (
                <div
                  key={item.label}
                  className="flex items-start gap-4 py-3.5 border-b border-white/10 last:border-0"
                >
                  <span
                    className="text-vv-accent text-[17px] leading-none shrink-0 mt-0.5"
                    aria-hidden="true"
                  >
                    {typeof Icon === "string" ? (
                      Icon
                    ) : (
                      <Icon className="size-[17px] fill-current" />
                    )}
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
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

"use client";

import { Container } from "@/components/shared/Container";
import { heroStats } from "../data/marketing.data";
import { useEffect, useRef, useState } from "react";
import { MarketingButton } from "@/features/marketing/components/MarketingButton";

const words = ["Learn Spanish Online", "One-on-One", "With a Real Teacher"];

export function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const [animated, setAnimated] = useState<Record<number, string>>({});

  useEffect(() => {
    const id = window.setInterval(() => {
      setWordIndex((current) => (current + 1) % words.length);
    }, 2200);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const timers = heroStats
      .filter((stat) => stat.target)
      .map((stat, index) => {
        const target = stat.target ?? 0;
        const start = performance.now();
        const tick = (time: number) => {
          const progress = Math.min(1, (time - start) / 1400);
          const eased = 1 - (1 - progress) ** 3;
          const value = Math.floor(target * eased);
          setAnimated((current) => ({
            ...current,
            [index]: target >= 1000 ? value.toLocaleString() : String(value),
          }));
          if (progress < 1) requestAnimationFrame(tick);
        };
        return requestAnimationFrame(tick);
      });
    return () => timers.forEach((timer) => cancelAnimationFrame(timer));
  }, []);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true; // must be set imperatively for Safari
    video.play().catch((err) => {
      console.warn("Autoplay blocked:", err);
    });
  }, []);
  return (
    <section className="hero" data-screen-label="01 Hero">
      <div className="hero-bg">
        <video
          autoPlay
          ref={videoRef}
          muted
          loop
          playsInline
          preload="metadata"
          poster="https://images.pexels.com/videos/17118763/iglesia-san-francisco-quito-ecuador-17118763.jpeg?auto=compress&cs=tinysrgb&h=900&w=1600"
        >
          <source src="/videos/hero_loop2.mp4" type="video/mp4" />
        </video>
        <div className="floating-card fc-1">
          <div className="ico">A1</div>
          <div>
            <div className="lbl">Starting level</div>
            <div className="val">No experience needed</div>
          </div>
        </div>

       
      </div>
      <Container className="relative z-1">
        <div className="hero-layout">
          <div className="hero-text-wrap">
            <div className="hero-tag">
              <span className="dot" />
              <span>Quito · Ecuador · Since 1999</span>
            </div>
            <h1 className="h-display">
              <span className="swap-line">
                <span className="word-swap" aria-live="polite">
                  <span key={words[wordIndex]} className="in">
                    {words[wordIndex]}
                  </span>
                </span>
              </span>
            </h1>
            <p className="hero-sub">
              Expert Ecuadorian Spanish teachers, personalized lessons, flexible
              scheduling — from anywhere in the world.
            </p>
            <div className="hero-cta">
              <div className="hero-cta-primary">
                <MarketingButton href="/#book" tone="dark">
                  Book Your First Lesson →
                </MarketingButton>
                <span className="hero-cta-note">Start for $12</span>
              </div>
              <MarketingButton href="/activities" tone="ghost">
                Study in Quito
              </MarketingButton>
            </div>
            <div className="hero-stats">
              {heroStats.map((stat, index) => (
                <div className="stat" key={stat.label}>
                  <div className="num">
                    <span>
                      {stat.target ? (animated[index] ?? "0") : stat.value}
                    </span>
                    {stat.suffix ? (
                      <span className="unit">{stat.suffix}</span>
                    ) : null}
                  </div>
                  <div className="lab">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-trust">
            <div className="hero-trust-item">
              <span className="hero-trust-icon">✓</span>
              <div>
                <div className="hero-trust-label">AECEE Certified</div>
                <div className="hero-trust-sub">Accredited Spanish school</div>
              </div>
            </div>
            <div className="hero-trust-item">
              <span className="hero-trust-icon">★</span>
              <div>
                <div className="hero-trust-label">Since 1999</div>
                <div className="hero-trust-sub">25+ years of teaching</div>
              </div>
            </div>
            <div className="hero-trust-item">
              <span className="hero-trust-icon">♡</span>
              <div>
                <div className="hero-trust-label">4,700+ Students</div>
                <div className="hero-trust-sub">From over 50 countries</div>
              </div>
            </div>
            <div className="hero-trust-item">
              <span className="hero-trust-icon">◎</span>
              <div>
                <div className="hero-trust-label">All Levels Welcome</div>
                <div className="hero-trust-sub">
                  A1 beginners to C1 advanced
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

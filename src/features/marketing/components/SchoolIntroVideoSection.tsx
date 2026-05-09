"use client";

import { Container } from "@/components/shared/Container";
import { Play, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MarketingButton } from "./MarketingButton";

const youtubeId = "f6u_7cDiFUc";
const thumbnailUrl = `/images/ytThum2.jpg`;
const embedUrl = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`;

export function SchoolIntroVideoSection() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <section className="school-intro-video" data-screen-label="School Intro">
      <Container>
        <div className="school-intro-grid">
          <button
            className="school-intro-card video-preview-card"
            type="button"
            aria-label="Play Spanish school video"
            onClick={() => setIsOpen(true)}
          >
            <Image
              src={thumbnailUrl}
              alt="Spanish school video preview"
              width={1280}
              height={720}
              sizes="(max-width: 768px) 100vw, 58vw"
              className="video-preview-thumb"
            />
            <span className="video-preview-shade" aria-hidden="true" />
            <span className="video-play-button" aria-hidden="true">
              <Play />
            </span>
          </button>

          <div className="school-intro-copy">
            <span className="eyebrow">{"// Spanish School"}</span>
            <h2 className="h2">Get to Know our Spanish School in Ecuador</h2>
            <p className="lede">
              Vida Verde Spanish School is proud to be located in the popular
              La Floresta neighborhood of Quito, one of the safest and
              culturally rich areas in all of Quito. We are a 15 minute bus ride
              from the famous Historic Center and 15 minute walk from the Plaza
              Foch. Our Spanish school is a two story house complete with patio
              and garden, which complements our close-knit, family environment.
              Come visit us to experience why we say, &quot;Welcome to the Family&quot;.
            </p>
            <MarketingButton href="#" tone="dark">
              Learn More
            </MarketingButton>
          </div>
        </div>
      </Container>

      {isOpen ? (
        <div
          className="video-modal-overlay"
          role="presentation"
          onMouseDown={() => setIsOpen(false)}
        >
          <div
            className="video-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Get to Know our Spanish School in Ecuador video"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              className="video-modal-close"
              type="button"
              aria-label="Close video"
              onClick={() => setIsOpen(false)}
            >
              <X />
            </button>
            <div className="video-modal-frame">
              <iframe
                src={embedUrl}
                title="Get to Know our Spanish School in Ecuador"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

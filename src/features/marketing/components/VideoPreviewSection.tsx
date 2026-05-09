"use client";

import { Container } from "@/components/shared/Container";
import { Play, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const youtubeId = "4bkxD5q8THk";
const thumbnailUrl = `/images/ytThumb.jpg`;
const embedUrl = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`;

export function VideoPreviewSection() {
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
    <section className="video-preview-section" data-screen-label="02 Video">
      <Container>
        <div className="video-preview-layout">
          <div className="video-preview-copy">
            <span className="eyebrow">{"// Watch Vida Verde"}</span>
            <h2 className="h2">Step inside the Quito experience.</h2>
            <p className="lede">
              See how Spanish lessons, local culture, and everyday conversation
              come together at Vida Verde.
            </p>
          </div>

          <button
            className="video-preview-card"
            type="button"
            aria-label="Play Vida Verde video"
            onClick={() => setIsOpen(true)}
          >
            <Image
              src={thumbnailUrl}
              alt="Vida Verde video preview"
              width={1280}
              height={720}
              sizes="(max-width: 768px) 100vw, 58vw"
              className="video-preview-thumb"
              priority={false}
            />
            <span className="video-preview-shade" aria-hidden="true" />
            <span className="video-play-button" aria-hidden="true">
              <Play />
            </span>
          </button>
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
            aria-label="Vida Verde video"
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
                title="Vida Verde YouTube video"
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

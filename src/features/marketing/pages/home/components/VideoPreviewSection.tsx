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
    <section
      className="bg-vv-bg border-b border-vv-line py-18 max-[640px]:py-13"
      data-screen-label="02 Video"
    >
      <Container>
        <div className="grid items-center gap-12 grid-cols-[0.75fr_1.25fr] max-[640px]:grid-cols-1 max-[640px]:gap-7">
          {/* Copy */}
          <div
            className="flex flex-col gap-4.5 max-[640px]:gap-3.5"
            data-scroll-from="left"
            data-scroll-reveal="true"
          >
            <span className="font-code text-vv-muted text-[11px] font-medium tracking-[0.14em] uppercase">
              {"// Watch Vida Verde"}
            </span>
            <h2 className="text-[clamp(28px,3vw,44px)] font-semibold tracking-[-0.02em] leading-[1.08] m-0 text-balance">
              Step inside the Quito experience.
            </h2>
            <p className="text-vv-ink-2 text-[clamp(17px,1.4vw,20px)] leading-normal max-w-[60ch] text-pretty m-0 max-[640px]:text-[16px]">
              See how Spanish lessons, local culture, and everyday conversation
              come together at Vida Verde.
            </p>
          </div>

          {/* Video card */}
          <button
            className="group relative block w-full aspect-video cursor-pointer overflow-hidden rounded-3xl border border-vv-line-2 bg-vv-ink shadow-[0_28px_70px_-42px_rgba(15,20,16,0.7)] transition-[border-color,box-shadow,transform] duration-200 hover:border-vv-accent hover:shadow-[0_32px_80px_-38px_rgba(15,20,16,0.82)] hover:-translate-y-0.75 max-[640px]:rounded-2xl"
            type="button"
            aria-label="Play Vida Verde video"
            onClick={() => setIsOpen(true)}
            data-scroll-from="right"
            data-scroll-reveal="true"
          >
            <Image
              src={thumbnailUrl}
              alt="Vida Verde video preview"
              width={1280}
              height={720}
              sizes="(max-width: 768px) 100vw, 58vw"
              className="block h-full w-full object-cover transition-transform duration-350 group-hover:scale-[1.04]"
              priority={false}
            />
            <span
              className="absolute inset-0 bg-linear-to-b from-[rgba(15,20,16,0.08)] to-[rgba(15,20,16,0.56)]"
              aria-hidden="true"
            />
            <span
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-21.5 w-21.5 items-center justify-center rounded-full bg-vv-accent border-8 border-white/34 text-vv-accent-deep transition-[background,transform] duration-200 group-hover:bg-vv-accent-hi group-hover:scale-[1.06] max-[640px]:h-16.5 max-[640px]:w-16.5 max-[640px]:border-[6px]"
              aria-hidden="true"
            >
              <Play className="fill-current h-7.5 w-7.5 ml-1 max-[640px]:h-6 max-[640px]:w-6" />
            </span>
          </button>
        </div>
      </Container>

      {isOpen ? (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center p-6 backdrop-blur-md bg-[rgba(15,20,16,0.74)] animate-[video-overlay-in_0.22s_ease_forwards] max-[640px]:p-4"
          role="presentation"
          onMouseDown={() => setIsOpen(false)}
        >
          <div
            className="relative w-full max-w-270 animate-[video-modal-in_0.26s_cubic-bezier(0.2,0.85,0.25,1)_forwards]"
            role="dialog"
            aria-modal="true"
            aria-label="Vida Verde video"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              className="absolute -right-3.5 -top-3.5 z-10 flex h-10.5 w-10.5 items-center justify-center rounded-full border border-vv-line bg-vv-bg text-vv-ink cursor-pointer transition-[background,transform] duration-150 hover:bg-vv-accent hover:scale-[1.04] max-[640px]:-right-2 max-[640px]:-top-11.5"
              type="button"
              aria-label="Close video"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4.5 w-4.5" />
            </button>
            <div className="aspect-video w-full overflow-hidden rounded-[18px] border border-white/16 bg-[#050705] shadow-[0_36px_100px_-42px_rgba(0,0,0,0.9)] max-[640px]:rounded-2xl">
              <iframe
                src={embedUrl}
                title="Vida Verde YouTube video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="block h-full w-full border-0"
              />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

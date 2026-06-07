"use client";

import { testimonials } from "../data/marketing.data";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";

function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={i < count ? "text-amber-400" : "text-vv-line"}
          aria-hidden="true"
        >
          ★
        </span>
      ))}
    </div>
  );
}

export function TestimonialCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const scrollBy = (direction: -1 | 1) => {
    const track = trackRef.current;
    const first = track?.querySelector<HTMLElement>("[data-card]");
    if (!track || !first) return;
    track.scrollBy({
      left: direction * (first.offsetWidth + 24),
      behavior: "smooth",
    });
  };

  const update = () => {
    const track = trackRef.current;
    const first = track?.querySelector<HTMLElement>("[data-card]");
    if (!track || !first) return;
    setIndex(Math.round(track.scrollLeft / (first.offsetWidth + 24)));
  };

  return (
    <div>
      {/* Track */}
      <div
        className="flex gap-6 overflow-x-auto p-1 pb-6 scroll-smooth snap-x snap-mandatory scrollbar-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden max-[640px]:gap-3.5 max-[640px]:-mx-5 max-[640px]:px-5"
        ref={trackRef}
        onScroll={update}
      >
        {testimonials.map((testimonial) => (
          <article
            data-card
            className="flex flex-[0_0_calc(50%-12px)] flex-col gap-5 rounded-[22px] border border-vv-line bg-vv-bg p-8 snap-start max-[800px]:flex-[0_0_88%] max-[640px]:flex-[0_0_86%] max-[640px]:rounded-2xl max-[640px]:gap-4 max-[640px]:p-5.5"
            key={testimonial.name}
          >
            <StarRating />

            <span
              className="text-vv-accent-deep leading-[0.5] h-8 font-[var(--font-newsreader),Georgia,serif] text-[64px] italic"
              aria-hidden="true"
            >
              &quot;
            </span>

            <blockquote className="flex-1 text-[18px] tracking-[-0.01em] leading-normal m-0 text-pretty text-vv-ink max-[640px]:text-[16px]">
              {testimonial.quote}
            </blockquote>

            <div className="flex items-center gap-3.5 border-t border-vv-line pt-5">
              <div className="grid h-11 w-11 place-items-center rounded-full bg-vv-accent text-vv-accent-deep text-[15px] font-bold shrink-0">
                {testimonial.initials}
              </div>
              <div>
                <div className="text-[15px] font-semibold text-vv-ink">
                  {testimonial.name}
                </div>
                <div className="text-vv-muted text-[12px] mt-0.5">
                  {testimonial.meta}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-6 max-[640px]:flex-col max-[640px]:items-start max-[640px]:gap-3.5">
        <div className="font-code text-vv-muted text-[12px] tracking-[0.05em]">
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(testimonials.length).padStart(2, "0")}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Previous"
            className="grid h-11 w-11 place-items-center rounded-full border border-vv-line bg-vv-bg transition-all duration-150 hover:bg-vv-ink hover:border-vv-ink hover:text-vv-bg"
            onClick={() => scrollBy(-1)}
          >
            <ChevronLeft aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Next"
            className="grid h-11 w-11 place-items-center rounded-full border border-vv-line bg-vv-bg transition-all duration-150 hover:bg-vv-ink hover:border-vv-ink hover:text-vv-bg"
            onClick={() => scrollBy(1)}
          >
            <ChevronRight aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

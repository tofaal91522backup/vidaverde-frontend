"use client";

import { testimonials } from "../data/marketing.data";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";

export function TestimonialCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const scrollBy = (direction: -1 | 1) => {
    const track = trackRef.current;
    const first = track?.querySelector<HTMLElement>(".tcar-card");
    if (!track || !first) return;
    track.scrollBy({
      left: direction * (first.offsetWidth + 24),
      behavior: "smooth",
    });
  };

  const update = () => {
    const track = trackRef.current;
    const first = track?.querySelector<HTMLElement>(".tcar-card");
    if (!track || !first) return;
    setIndex(Math.round(track.scrollLeft / (first.offsetWidth + 24)));
  };

  return (
    <div className="tcar">
      <div className="tcar-track" ref={trackRef} onScroll={update}>
        {testimonials.map((testimonial) => (
          <article className="tcar-card" key={testimonial.name}>
            <span className="quote-mark">&quot;</span>
            <blockquote>{testimonial.quote}</blockquote>
            <div className="who">
              <div className="ava">{testimonial.initials}</div>
              <div className="info">
                <div className="name">{testimonial.name}</div>
                <div className="meta">{testimonial.meta}</div>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="tcar-controls">
        <div className="tcar-progress">
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(testimonials.length).padStart(2, "0")}
        </div>
        <div className="arrows">
          <button
            type="button"
            aria-label="Previous"
            onClick={() => scrollBy(-1)}
          >
            <ChevronLeft aria-hidden="true" />
          </button>
          <button type="button" aria-label="Next" onClick={() => scrollBy(1)}>
            <ChevronRight aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

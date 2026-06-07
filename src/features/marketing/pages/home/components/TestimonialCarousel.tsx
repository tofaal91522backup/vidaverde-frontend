"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { testimonials } from "../data/marketing.data";

export function TestimonialCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const scroller = scrollerRef.current;
    if (!container || !scroller) return;

    Array.from(scroller.children).forEach((item) => {
      scroller.appendChild(item.cloneNode(true));
    });

    container.style.setProperty("--marquee-duration", "55s");
    container.style.setProperty("--marquee-direction", "forwards");
    setReady(true);
  }, []);

  return (
    <div
      ref={containerRef}
      className="overflow-hidden mask-[linear-gradient(to_right,transparent,white_8%,white_92%,transparent)]"
      aria-label="Student testimonials"
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-6 py-1",
          ready && "animate-scroll-marquee",
          "hover:paused",
        )}
      >
        {testimonials.map((testimonial) => (
          <li key={testimonial.name} className="w-95 max-[640px]:w-75 shrink-0">
            <article className="flex h-full flex-col gap-4 rounded-[22px] border border-vv-line bg-vv-bg p-7 max-[640px]:p-5">
              <blockquote className="flex-1 text-[16px] tracking-[-0.01em] leading-relaxed m-0 text-pretty text-vv-ink">
                {testimonial.quote}
              </blockquote>

              <div className="flex items-center gap-3 border-t border-vv-line pt-4">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-vv-accent text-vv-accent-deep text-[14px] font-bold shrink-0">
                  {testimonial.initials}
                </div>
                <div>
                  <div className="text-[14px] font-semibold text-vv-ink">
                    {testimonial.name}
                  </div>
                  <div className="text-vv-muted text-[11px] mt-0.5">
                    {testimonial.meta}
                  </div>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}

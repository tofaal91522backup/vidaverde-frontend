"use client";

import { usePublicTestimonials } from "@/features/marketing/pages/home/queries/use-public-testimonials";
import type { PublicTestimonial } from "@/features/marketing/types/public-api.types";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { useMemo } from "react";
import { useLanguage } from "@/providers/language-provider";
import { initials } from "@/utils/initials";

function Rating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          aria-hidden="true"
          className={cn(
            "size-3.5 fill-current",
            index < rating ? "text-amber-400" : "text-vv-line-2",
          )}
        />
      ))}
    </div>
  );
}

export function TestimonialCarousel() {
  const { language } = useLanguage();
  const { data, isLoading, isError } = usePublicTestimonials({
    lang: language,
  });
  /*
    Admin shob testimonial-er Spanish lekhe na; na thakle backend `?lang=es`-eo
    English pathay. Oita `translate="no"` hole ES-e English-i theke jay. Tai
    English-ta-o ani (EN-e eki query, alada request na) ar shudhu je quote
    English theke alada, shetakei Google theke bachai — blog-er moto.
  */
  const { data: english } = usePublicTestimonials({ lang: "en" });
  const englishOutcome = useMemo(
    () => new Map(english?.map((t) => [t.id, t.outcome])),
    [english],
  );
  const testimonials = data ?? [];
  const marqueeTestimonials = [...testimonials, ...testimonials];

  if (isLoading) {
    return (
      <p className="text-vv-ink-2" role="status">
        Loading testimonials…
      </p>
    );
  }

  if (isError) {
    return (
      <p className="text-red-600" role="alert">
        Testimonials are unavailable right now. Please try again shortly.
      </p>
    );
  }

  if (testimonials.length === 0) {
    return (
      <p className="text-vv-ink-2">No testimonials are currently available.</p>
    );
  }

  return (
    <div
      className="overflow-hidden mask-[linear-gradient(to_right,transparent,white_8%,white_92%,transparent)]"
      aria-label="Student testimonials"
    >
      <ul
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-6 py-1 animate-scroll-marquee",
          "hover:paused",
        )}
      >
        {marqueeTestimonials.map((testimonial, index) => (
          <TestimonialCard
            key={`${testimonial.id}-${index}`}
            testimonial={testimonial}
            ownTranslation={
              testimonial.outcome !== englishOutcome.get(testimonial.id)
            }
            aria-hidden={index >= testimonials.length}
          />
        ))}
      </ul>
    </div>
  );
}

function TestimonialCard({
  testimonial,
  ownTranslation,
  "aria-hidden": ariaHidden,
}: {
  testimonial: PublicTestimonial;
  /** School-er nijer lekha Spanish — Google jeno na chhoy */
  ownTranslation: boolean;
  "aria-hidden"?: boolean;
}) {
  return (
    <li
      className="w-95 max-[640px]:w-75 shrink-0"
      aria-hidden={ariaHidden || undefined}
    >
      <article className="flex h-full flex-col gap-4 rounded-[22px] border border-vv-line bg-vv-bg p-7 max-[640px]:p-5">
        <Rating rating={testimonial.rating} />
        <blockquote className="flex-1 text-[16px] tracking-[-0.01em] leading-relaxed m-0 text-pretty text-vv-ink">
          <span translate={ownTranslation ? "no" : undefined}>
            “{testimonial.outcome}”
          </span>
        </blockquote>

        <div className="flex items-center gap-3 border-t border-vv-line pt-4">
          {/* Naam ar initials Google-er na: "Sophie" -> "Sofía", "EM" -> "mi" */}
          <div
            translate="no"
            className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full bg-vv-accent text-[14px] font-bold text-vv-accent-deep"
          >
            {testimonial.photo_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={testimonial.photo_url}
                alt=""
                className="h-full w-full object-cover"
              />
            ) : (
              initials(testimonial.student_name)
            )}
          </div>
          <div>
            <div
              translate="no"
              className="text-[14px] font-semibold text-vv-ink"
            >
              {testimonial.student_name}
            </div>
            <div className="text-vv-muted text-[11px] mt-0.5">
              {testimonial.country} · {testimonial.programme}
            </div>
          </div>
        </div>
      </article>
    </li>
  );
}

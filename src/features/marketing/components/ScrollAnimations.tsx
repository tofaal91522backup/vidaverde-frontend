"use client";

import { useEffect } from "react";

const revealSelectors = [
  ".section-head",
  ".trust .label",
  ".trust .badge",
  ".video-preview-copy",
  ".video-preview-card",
  ".learn-about-image",
  ".learn-about-copy",
  ".welcome-school-card",
  ".feat",
  ".course-card",
  ".split > *",
  ".booking > *",
  ".tcar-card",
  ".cta-strip",
  ".ac-hero > *",
  ".hs-hero > *",
  ".act-card",
  ".weekly-schedule > *",
  ".schedule-row",
  ".cat-layout > *",
  ".cat-card",
  ".compare-strip",
  ".hs-mosaic img",
  ".pillar",
  ".inc",
  ".tier",
  ".faq-item",
  ".school-intro-card",
  ".school-intro-copy",
  ".popular-program-card",
  ".teacher-card",
  ".map-location-copy",
  ".map-location-card",
  ".footer-col",
  ".footer-bar",
].join(",");

export function ScrollAnimations() {
  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const observer = reducedMotion
      ? null
      : new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;

              entry.target.classList.add("is-visible");
              observer?.unobserve(entry.target);
            });
          },
          {
            rootMargin: "0px 0px -12% 0px",
            threshold: 0.12,
          },
        );

    const prepareElements = () => {
      const elements = Array.from(
        document.querySelectorAll<HTMLElement>(revealSelectors),
      );
      const siblingIndexes = new WeakMap<Element, number>();

      elements.forEach((element) => {
        if (element.dataset.scrollReveal === "true") return;

        const parent = element.parentElement;
        const index = parent ? siblingIndexes.get(parent) ?? 0 : 0;

        element.dataset.scrollReveal = "true";
        element.style.setProperty("--reveal-delay", `${Math.min(index, 8) * 70}ms`);
        siblingIndexes.set(parent ?? element, index + 1);

        if (reducedMotion) {
          element.classList.add("is-visible");
        } else {
          observer?.observe(element);
        }
      });
    };

    prepareElements();

    const mutationObserver = new MutationObserver(prepareElements);
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer?.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}

"use client";

import { useEffect, useRef, useState } from "react";

function parse(raw: string) {
  const m = raw.match(/^([^0-9]*)([0-9,]+)([^0-9]*)$/);
  if (!m) return null;
  const num = parseInt(m[2].replace(/,/g, ""), 10);
  return isNaN(num) ? null : { num, pre: m[1], suf: m[3], hasComma: m[2].includes(",") };
}

function fmt(n: number, hasComma: boolean) {
  return hasComma ? n.toLocaleString("en-US") : String(n);
}

export function CountUpStat({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const parsed = parse(value);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  const [display, setDisplay] = useState(
    parsed ? `${parsed.pre}0${parsed.suf}` : value
  );

  useEffect(() => {
    if (!parsed || !ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;

        const duration = 1600;
        const t0 = performance.now();
        const target = parsed.num;

        function tick(now: number) {
          const p = Math.min((now - t0) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setDisplay(
            `${parsed!.pre}${fmt(Math.round(eased * target), parsed!.hasComma)}${parsed!.suf}`
          );
          if (p < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}

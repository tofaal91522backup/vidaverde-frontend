"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage, type LanguageCode } from "@/providers/language-provider";

/*
  `translate="no"` — hero-r typewriter-er moto eta-o 1.6s dhore proti frame-e
  lekha bodlay. Google majhpothe text node-ta dhore anubad kore bosiye dey
  ("4.687+"), tarpor React-er update puron node-e jay, tai shonkhya shekhanei
  atke thake. Ar "25+"-ke Google "Más de 25 años" banay, jeta label-er shathe
  dui bar "años" hoy. Tai shonkhya Google-er hate na, nijerai format kori:
  ES-e RAE-r niyom: 4 ongko alada hoy na (4700+), 5 ongko theke "." (13.800);
  EN-e "," (4,700+).
*/
function parse(raw: string) {
  const m = raw.match(/^([^0-9]*)([0-9,]+)([^0-9]*)$/);
  if (!m) return null;
  const num = parseInt(m[2].replace(/,/g, ""), 10);
  return isNaN(num) ? null : { num, pre: m[1], suf: m[3], hasComma: m[2].includes(",") };
}

function fmt(n: number, hasComma: boolean, language: LanguageCode) {
  if (!hasComma) return String(n);
  // es-ES nijei RAE mane: 4700, 13.800
  return n.toLocaleString(language === "es" ? "es-ES" : "en-US");
}

export function CountUpStat({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const { language } = useLanguage();
  const parsed = parse(value);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  const [current, setCurrent] = useState(0);

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
          setCurrent(Math.round(eased * target));
          if (p < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const display = parsed
    ? `${parsed.pre}${fmt(current, parsed.hasComma, language)}${parsed.suf}`
    : value;

  return (
    <span ref={ref} translate="no" className={className}>
      {display}
    </span>
  );
}

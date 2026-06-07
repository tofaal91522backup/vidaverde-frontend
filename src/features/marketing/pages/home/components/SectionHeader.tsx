import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type SectionHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  lede?: string;
  action?: ReactNode;
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  lede,
  action,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-end justify-between gap-8 mb-12 max-[760px]:flex-col max-[760px]:items-start",
        className,
      )}
    >
      <div className="flex flex-col gap-3.5 max-w-160">
        <span className="font-code text-vv-muted text-[11px] font-medium tracking-[0.14em] uppercase">
          {eyebrow}
        </span>
        <h2 className="text-[clamp(28px,3vw,44px)] font-semibold tracking-[-0.02em] leading-[1.08] m-0 text-balance">
          {title}
        </h2>
      </div>
      {action ??
        (lede ? (
          <p className="text-vv-ink-2 text-[clamp(17px,1.4vw,20px)] leading-normal max-w-[36ch] text-pretty">
            {lede}
          </p>
        ) : null)}
    </div>
  );
}

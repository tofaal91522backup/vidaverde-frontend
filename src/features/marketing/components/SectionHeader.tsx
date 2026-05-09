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
    <div className={cn("section-head", className)}>
      <div className="meta">
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="h2">{title}</h2>
      </div>
      {action ?? (lede ? <p className="lede max-w-[36ch]">{lede}</p> : null)}
    </div>
  );
}

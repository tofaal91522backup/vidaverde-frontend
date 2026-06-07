import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ReactNode } from "react";

type Tone = "primary" | "dark" | "ghost";

const toneClasses: Record<Tone, string> = {
  primary:
    "bg-vv-accent border-vv-accent text-vv-accent-deep hover:bg-vv-accent-hi hover:-translate-y-px",
  dark: "bg-vv-ink border-vv-ink text-vv-bg hover:bg-vv-accent-deep hover:border-vv-accent-deep hover:-translate-y-px",
  ghost:
    "bg-transparent border-vv-line-2 text-vv-ink hover:bg-vv-ink hover:border-vv-ink hover:text-vv-bg",
};

type MarketingButtonProps = {
  href: string;
  children: ReactNode;
  tone?: Tone;
  size?: "md" | "sm";
  className?: string;
};

export function MarketingButton({
  href,
  children,
  tone = "primary",
  size = "md",
  className,
}: MarketingButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2.5 border rounded-full cursor-pointer font-semibold tracking-[-0.005em] transition-[transform,background,color,border-color] duration-200 whitespace-nowrap",
        size === "sm" ? "text-[13px] py-2.25 px-3.5" : "text-[15px] py-3.5 px-5.5",
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </Link>
  );
}

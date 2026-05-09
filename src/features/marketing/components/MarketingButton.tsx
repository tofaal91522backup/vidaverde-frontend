import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ReactNode } from "react";

type MarketingButtonProps = {
  href: string;
  children: ReactNode;
  tone?: "primary" | "dark" | "ghost";
  className?: string;
};

export function MarketingButton({
  href,
  children,
  tone = "primary",
  className,
}: MarketingButtonProps) {
  return (
    <Button
      asChild
      className={cn("vv-btn", `vv-btn-${tone}`, className)}
      variant="ghost"
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
}

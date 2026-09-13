"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { StudentPackage } from "@/features/protected/pages/dashboard/student/types/student.types";
import { formatLocalDate } from "@/features/protected/pages/dashboard/student/utils/format-local-datetime";
import { cn } from "@/lib/utils";
import { CalendarPlus } from "lucide-react";
import Link from "next/link";

/** `progress_percent` backend theke ashe (koto part use hoyeche) */
function ProgressBar({
  percent,
  used,
  total,
}: {
  percent: number;
  used: number;
  total: number;
}) {
  const pct = Math.min(100, Math.max(0, percent));
  const color =
    pct >= 100
      ? "bg-muted-foreground/40"
      : pct >= 60
        ? "bg-amber-500"
        : "bg-green-500";

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>
          {used} of {total} used
        </span>
        <span>{pct}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all duration-500", color)}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function statusBadge(pkg: StudentPackage) {
  if (pkg.payment_status !== "paid") {
    return { label: pkg.payment_status, variant: "secondary" as const };
  }
  if (pkg.is_expired) return { label: "Expired", variant: "secondary" as const };
  if (pkg.classes_remaining === 0)
    return { label: "Completed", variant: "secondary" as const };
  return { label: "Active", variant: "default" as const };
}

export function PackageCard({ pkg }: { pkg: StudentPackage }) {
  const status = statusBadge(pkg);
  const currency = pkg.invoice?.currency ?? "";

  return (
    <Card className={cn(!pkg.can_book && "opacity-60")}>
      <CardContent className="flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-base leading-snug">
            {pkg.package_title}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {pkg.amount_paid} {currency} paid
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1">
          <Badge variant={status.variant} className="capitalize">
            {status.label}
          </Badge>
          {pkg.package_data?.is_first_lesson && (
            <Badge variant="outline" className="text-[10px]">
              First lesson
            </Badge>
          )}
        </div>
      </div>

      <ProgressBar
        percent={pkg.progress_percent}
        used={pkg.classes_used}
        total={pkg.classes_total}
      />

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-xs text-muted-foreground">Classes remaining</p>
          <p className="font-semibold text-base mt-0.5">
            {pkg.classes_remaining}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Expires</p>
          <p
            className={cn(
              "font-medium mt-0.5",
              pkg.is_expired && "text-muted-foreground",
            )}
          >
            {formatLocalDate(pkg.expires_at)}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Purchased</p>
          <p className="text-sm mt-0.5 text-muted-foreground">
            {formatLocalDate(pkg.paid_at || pkg.created_at)}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Invoice</p>
          <p className="text-sm mt-0.5 text-muted-foreground">
            {pkg.invoice?.number ?? "—"}
          </p>
        </div>
      </div>

      {pkg.can_book && (
        <Button asChild size="sm" className="w-fit gap-2">
          {/* Package ta preselect kore booking flow-e niye jay */}
          <Link href={`/dashboard/student/book-class?package=${pkg.id}`}>
            <CalendarPlus className="h-4 w-4" />
            Book a class
          </Link>
        </Button>
      )}
      </CardContent>
    </Card>
  );
}

"use client";

import { Badge } from "@/components/ui/badge";
import type {
  AdminBooking,
  PaymentStatus,
} from "@/features/protected/pages/dashboard/admin/types/admin.types";
import { formatSchoolDate } from "@/features/protected/pages/dashboard/admin/utils/format-school-datetime";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

const PAYMENT_VARIANTS: Record<
  PaymentStatus,
  "default" | "secondary" | "destructive" | "outline"
> = {
  paid: "default",
  pending: "secondary",
  failed: "destructive",
  refunded: "outline",
};

export const bookingsColumns: ColumnDef<AdminBooking>[] = [
  {
    accessorKey: "student_name",
    header: "Student",
    cell: ({ row }) => (
      <div>
        <p className="text-sm font-medium">{row.original.student_name}</p>
        <p className="text-xs text-muted-foreground">
          {row.original.student_email}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "package_title",
    header: "Package",
    cell: ({ row }) => (
      <span className="text-sm">{row.original.package_title}</span>
    ),
  },
  {
    accessorKey: "amount_paid",
    header: "Amount",
    // Decimal string — toFixed kora jabe na
    cell: ({ row }) => (
      <div>
        <p className="text-sm font-semibold tabular-nums">
          {row.original.amount_paid} {row.original.invoice?.currency ?? ""}
        </p>
        {row.original.invoice?.number && (
          <p className="font-mono text-xs text-muted-foreground">
            {row.original.invoice.number}
          </p>
        )}
      </div>
    ),
  },
  {
    accessorKey: "payment_status",
    header: "Payment",
    cell: ({ row }) => (
      <div className="flex flex-col items-start gap-1">
        <Badge
          variant={PAYMENT_VARIANTS[row.original.payment_status] ?? "secondary"}
          className="capitalize"
        >
          {row.original.payment_status}
        </Badge>
        {row.original.payment_provider && (
          <span className="text-[10px] text-muted-foreground">
            {row.original.payment_provider}
          </span>
        )}
      </div>
    ),
  },
  {
    id: "classes",
    header: "Classes",
    cell: ({ row }) => (
      <div>
        <p className="text-sm tabular-nums">
          {row.original.classes_used} / {row.original.classes_total} used
        </p>
        <p className="text-xs text-muted-foreground tabular-nums">
          {row.original.classes_remaining} left · {row.original.progress_percent}%
        </p>
      </div>
    ),
  },
  {
    accessorKey: "expires_at",
    header: "Expires",
    cell: ({ row }) => (
      <span
        className={cn(
          "text-sm",
          row.original.is_expired && "text-muted-foreground line-through",
        )}
      >
        {formatSchoolDate(row.original.expires_at)}
      </span>
    ),
  },
  {
    accessorKey: "paid_at",
    header: "Purchased",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {formatSchoolDate(row.original.paid_at || row.original.created_at)}
      </span>
    ),
  },
];

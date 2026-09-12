"use client";

import { Badge } from "@/components/ui/badge";
import type {
  AdminScheduledEmail,
  EmailStatus,
} from "@/features/protected/pages/dashboard/admin/types/admin.types";
import { formatSchoolDateTime } from "@/features/protected/pages/dashboard/admin/utils/format-school-datetime";
import { ColumnDef } from "@tanstack/react-table";

const STATUS_VARIANTS: Record<
  EmailStatus,
  "default" | "secondary" | "destructive" | "outline"
> = {
  pending: "secondary",
  sent: "default",
  failed: "destructive",
  cancelled: "outline",
};

function labelForTemplate(templateKey: string) {
  return templateKey.replaceAll("_", " ");
}

export const emailsColumns: ColumnDef<AdminScheduledEmail>[] = [
  {
    accessorKey: "to_email",
    header: "Recipient",
    cell: ({ row }) => (
      <div>
        <p className="text-sm font-medium">{row.original.to_email}</p>
        <p className="max-w-80 truncate text-xs text-muted-foreground">
          {row.original.subject}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "template_key",
    header: "Template",
    cell: ({ row }) => (
      <Badge variant="outline" className="capitalize">
        {labelForTemplate(row.original.template_key)}
      </Badge>
    ),
  },
  {
    accessorKey: "send_at",
    header: "Scheduled",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {formatSchoolDateTime(row.original.send_at)}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="flex flex-col items-start gap-1">
        <Badge variant={STATUS_VARIANTS[row.original.status]} className="capitalize">
          {row.original.status}
        </Badge>
        {row.original.sent_at && (
          <span className="text-[10px] text-muted-foreground">
            Sent {formatSchoolDateTime(row.original.sent_at)}
          </span>
        )}
      </div>
    ),
  },
  {
    accessorKey: "attempts",
    header: "Attempts",
    cell: ({ row }) => (
      <span className="text-sm tabular-nums">{row.original.attempts}</span>
    ),
  },
  {
    accessorKey: "error",
    header: "Delivery error",
    cell: ({ row }) =>
      row.original.status === "failed" ? (
        <p className="max-w-72 text-sm text-destructive" title={row.original.error}>
          {row.original.error || "No error detail provided."}
        </p>
      ) : (
        <span className="text-sm text-muted-foreground">—</span>
      ),
  },
];

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

/** Backend-er `template_key` gula porar moto kore */
const TEMPLATE_LABELS: Record<string, string> = {
  lead_guide: "Lead guide",
  nurture_2: "Nurture 2",
  nurture_3: "Nurture 3",
  nurture_4: "Nurture 4",
  booking_confirmation: "Booking confirmation",
  booking_credentials: "Account credentials",
  teacher_new_booking: "Teacher new booking",
  session_reminder: "Class reminder",
  session_followup: "Class follow-up",
  contact_received: "Enquiry received",
  contact_notification: "Enquiry notification",
};

export const emailsColumns: ColumnDef<AdminScheduledEmail>[] = [
  {
    accessorKey: "to_email",
    header: "To",
    cell: ({ row }) => (
      <div>
        <p className="text-sm font-medium">{row.original.to_email}</p>
        <p className="text-xs text-muted-foreground">
          {TEMPLATE_LABELS[row.original.template_key] ??
            row.original.template_key}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "subject",
    header: "Subject",
    cell: ({ row }) => (
      <p className="max-w-100 truncate text-sm">{row.original.subject}</p>
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
    accessorKey: "sent_at",
    header: "Sent",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.sent_at
          ? formatSchoolDateTime(row.original.sent_at)
          : "—"}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="flex flex-col items-start gap-1">
        <Badge
          variant={STATUS_VARIANTS[row.original.status] ?? "secondary"}
          className="capitalize"
        >
          {row.original.status}
        </Badge>
        {row.original.attempts > 0 && (
          <span className="text-[10px] text-muted-foreground">
            {row.original.attempts} attempt
            {row.original.attempts === 1 ? "" : "s"}
          </span>
        )}
      </div>
    ),
  },
  {
    accessorKey: "error",
    header: "Reason",
    // Failed row-er karon ta-i ei screen-er mul kaj — truncate kora hoy na
    cell: ({ row }) =>
      row.original.error ? (
        <p className="max-w-80 whitespace-pre-wrap text-xs text-red-700 dark:text-red-300">
          {row.original.error}
        </p>
      ) : (
        <span className="text-sm text-muted-foreground">—</span>
      ),
  },
];

"use client";

import { Badge } from "@/components/ui/badge";
import type { AdminLead } from "@/features/protected/pages/dashboard/admin/types/admin.types";
import { formatSchoolDate } from "@/features/protected/pages/dashboard/admin/utils/format-school-datetime";
import { ColumnDef } from "@tanstack/react-table";

/** Backend: 4 mane tinta follow-up-i schedule hoye geche */
const NURTURE_TOTAL = 4;

export const leadsColumns: ColumnDef<AdminLead>[] = [
  {
    accessorKey: "first_name",
    header: "Lead",
    cell: ({ row }) => (
      <div>
        <p className="text-sm font-medium">{row.original.first_name || "—"}</p>
        <p className="text-xs text-muted-foreground">{row.original.email}</p>
      </div>
    ),
  },
  {
    accessorKey: "source",
    header: "Source",
    cell: ({ row }) => (
      <Badge variant="secondary" className="text-xs capitalize">
        {row.original.source || "—"}
      </Badge>
    ),
  },
  {
    accessorKey: "guide_sent_at",
    header: "Guide sent",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.guide_sent_at
          ? formatSchoolDate(row.original.guide_sent_at)
          : "Not sent"}
      </span>
    ),
  },
  {
    accessorKey: "nurture_stage",
    header: "Nurture",
    cell: ({ row }) => (
      <span className="text-sm tabular-nums text-muted-foreground">
        {row.original.nurture_stage} / {NURTURE_TOTAL}
      </span>
    ),
  },
  {
    accessorKey: "is_subscribed",
    header: "Subscribed",
    cell: ({ row }) => (
      <div className="flex flex-col items-start gap-1">
        <Badge variant={row.original.is_subscribed ? "default" : "secondary"}>
          {row.original.is_subscribed ? "Subscribed" : "Unsubscribed"}
        </Badge>
        {row.original.unsubscribed_at && (
          <span className="text-[10px] text-muted-foreground">
            {formatSchoolDate(row.original.unsubscribed_at)}
          </span>
        )}
      </div>
    ),
  },
  {
    accessorKey: "converted_at",
    header: "Converted",
    // Backend nijei stamp kore jokhon ei email diye checkout complete hoy
    cell: ({ row }) =>
      row.original.converted_at ? (
        <div className="flex flex-col items-start gap-1">
          <Badge variant="default">Booked</Badge>
          <span className="text-[10px] text-muted-foreground">
            {formatSchoolDate(row.original.converted_at)}
          </span>
        </div>
      ) : (
        <span className="text-sm text-muted-foreground">—</span>
      ),
  },
  {
    accessorKey: "gdpr_consent",
    header: "GDPR",
    cell: ({ row }) => (
      <span className="text-sm">
        {row.original.gdpr_consent ? "Yes" : "No"}
      </span>
    ),
  },
];

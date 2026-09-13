"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { AdminStudent } from "@/features/protected/pages/dashboard/admin/types/admin.types";
import { formatSchoolDate } from "@/features/protected/pages/dashboard/admin/utils/format-school-datetime";
import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import Link from "next/link";

const LEVEL_LABELS: Record<string, string> = {
  none: "No Spanish yet",
  beginner: "Beginner",
  intermediate: "Intermediate",
  upper_intermediate: "Upper intermediate",
  advanced: "Advanced",
};

export const studentsColumns: ColumnDef<AdminStudent>[] = [
  {
    accessorKey: "profile_img_url",
    header: "Image",
    cell: ({ row }) =>
      row.original.profile_img_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={row.original.profile_img_url}
          alt={row.original.name}
          className="h-9 w-9 rounded-full border object-cover"
        />
      ) : (
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-xs font-medium">
          {row.original.name?.charAt(0).toUpperCase() || "?"}
        </div>
      ),
  },
  {
    accessorKey: "name",
    header: "Student",
    cell: ({ row }) => (
      <div>
        <p className="text-sm font-medium">{row.original.name}</p>
        <p className="text-xs text-muted-foreground">{row.original.email}</p>
      </div>
    ),
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ row }) => (
      <span className="text-sm">{row.original.country || "—"}</span>
    ),
  },
  {
    accessorKey: "timezone",
    header: "Timezone",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.timezone || "—"}
      </span>
    ),
  },
  {
    accessorKey: "current_spanish_level",
    header: "Level",
    cell: ({ row }) => (
      <Badge variant="secondary" className="text-xs">
        {LEVEL_LABELS[row.original.current_spanish_level] ??
          row.original.current_spanish_level}
      </Badge>
    ),
  },
  {
    accessorKey: "created_at",
    header: "Joined",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {formatSchoolDate(row.original.created_at)}
      </span>
    ),
  },
  {
    accessorKey: "active",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={row.original.active ? "default" : "secondary"}>
        {row.original.active ? "Active" : "Inactive"}
      </Badge>
    ),
  },
  {
    id: "actions",
    header: "",
    // Admin student profile edit kore na — shudhu dekhe
    cell: ({ row }) => (
      <div className="flex justify-end">
        <Button variant="outline" size="sm" asChild className="gap-1">
          <Link href={`/dashboard/admin/students/${row.original.id}`}>
            <Eye className="h-3.5 w-3.5" />
            View
          </Link>
        </Button>
      </div>
    ),
  },
];

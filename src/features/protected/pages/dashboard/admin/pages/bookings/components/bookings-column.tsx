"use client";

import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { Booking } from "../queries/use-bookings";

const STATUS_VARIANTS: Record<
  Booking["status"],
  "default" | "secondary" | "destructive" | "outline"
> = {
  pending: "secondary",
  confirmed: "default",
  completed: "outline",
  cancelled: "destructive",
};

export const bookingsColumns: ColumnDef<Booking>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <span className="text-xs text-muted-foreground font-mono">
        #{row.original.id.slice(0, 8)}
      </span>
    ),
  },
  {
    id: "student",
    header: "Student",
    cell: ({ row }) => (
      <div>
        <div className="font-medium text-sm">{row.original.student.name}</div>
        <div className="text-xs text-muted-foreground">{row.original.student.email}</div>
      </div>
    ),
  },
  {
    id: "teacher",
    header: "Teacher",
    cell: ({ row }) => (
      <span className="text-sm">{row.original.teacher.name}</span>
    ),
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      <span className="text-sm">{row.original.date}</span>
    ),
  },
  {
    accessorKey: "time",
    header: "Time",
    cell: ({ row }) => (
      <span className="text-sm">{row.original.time}</span>
    ),
  },
  {
    accessorKey: "package",
    header: "Package",
    cell: ({ row }) => (
      <span className="text-sm">{row.original.package}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={STATUS_VARIANTS[row.original.status]} className="capitalize">
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => (
      <span className="text-xs text-muted-foreground">
        {new Date(row.original.createdAt).toLocaleDateString()}
      </span>
    ),
  },
];

"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { AdminPackage } from "@/features/protected/pages/dashboard/admin/types/admin.types";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Power } from "lucide-react";
import Link from "next/link";
import { useTogglePackageStatus } from "../queries/use-packages";

function ToggleStatusButton({ pkg }: { pkg: AdminPackage }) {
  const { mutate, isPending } = useTogglePackageStatus();
  return (
    <Button
      variant="outline"
      size="sm"
      disabled={isPending}
      onClick={() => mutate({ id: pkg.id, active: !pkg.active })}
      className="gap-1"
    >
      <Power className="h-3.5 w-3.5" />
      {pkg.active ? "Deactivate" : "Activate"}
    </Button>
  );
}

export const packagesColumns: ColumnDef<AdminPackage>[] = [
  {
    accessorKey: "title_en",
    header: "Package",
    cell: ({ row }) => (
      <div>
        <p className="font-medium">{row.original.title_en}</p>
        {row.original.title_es && (
          <p className="text-xs text-muted-foreground">
            {row.original.title_es}
          </p>
        )}
      </div>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    // Decimal string — toFixed kora jabe na
    cell: ({ row }) => (
      <span className="text-sm font-semibold tabular-nums">
        ${row.original.price}
      </span>
    ),
  },
  {
    accessorKey: "total_classes",
    header: "Classes",
    cell: ({ row }) => (
      <span className="text-sm">
        {row.original.total_classes} class
        {row.original.total_classes === 1 ? "" : "es"}
      </span>
    ),
  },
  {
    accessorKey: "validity_days",
    header: "Validity",
    cell: ({ row }) => (
      <span className="text-sm">{row.original.validity_days} days</span>
    ),
  },
  {
    id: "teachers",
    header: "Teachers",
    cell: ({ row }) => {
      // `teacher_names` read-only echo. **Khali = shob teacher**, keu na NA —
      // tai khali obosthay "All" dekhano hoy, "0" ba "None" na.
      const names = row.original.teacher_names ?? [];

      if (names.length === 0) {
        return (
          <span className="text-sm text-muted-foreground">All teachers</span>
        );
      }

      return (
        // Naam gula title-e — column chhoto rakhte hobe, table already chowra
        <Badge variant="outline" title={names.join(", ")}>
          {names.length} {names.length === 1 ? "teacher" : "teachers"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "sort_order",
    header: "Order",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground tabular-nums">
        {row.original.sort_order}
      </span>
    ),
  },
  {
    accessorKey: "active",
    header: "Status",
    cell: ({ row }) => (
      <div className="flex flex-col items-start gap-1">
        <Badge variant={row.original.active ? "default" : "secondary"}>
          {row.original.active ? "Active" : "Inactive"}
        </Badge>
        {row.original.is_first_lesson && (
          <Badge variant="outline" className="text-[10px]">
            First lesson
          </Badge>
        )}
      </div>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      // Delete button nai — backend-e DELETE asholei deactivate kore (purchase
      // package ke PROTECT kore), ar sheta Deactivate button-i kore
      <div className="flex items-center justify-end gap-2">
        <Button variant="outline" size="sm" asChild className="gap-1">
          <Link href={`/dashboard/admin/packages/${row.original.id}/edit`}>
            <Edit className="h-3.5 w-3.5" />
            Edit
          </Link>
        </Button>
        <ToggleStatusButton pkg={row.original} />
      </div>
    ),
  },
];

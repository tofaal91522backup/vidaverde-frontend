"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Power } from "lucide-react";
import Link from "next/link";
import DeleteMutation from "@/components/shared/delete-mutation";
import {
  Package,
  PACKAGES_QUERY_KEY,
  useTogglePackageStatus,
} from "../queries/use-packages";

function ToggleStatusButton({ pkg }: { pkg: Package }) {
  const { mutate, isPending } = useTogglePackageStatus();
  return (
    <Button
      variant="outline"
      size="sm"
      disabled={isPending}
      onClick={() => mutate({ id: pkg.id, isActive: !pkg.isActive })}
      className="gap-1"
    >
      <Power className="h-3.5 w-3.5" />
      {pkg.isActive ? "Deactivate" : "Activate"}
    </Button>
  );
}

export const packagesColumns: ColumnDef<Package>[] = [
  {
    accessorKey: "name",
    header: "Package Name",
    cell: ({ row }) => (
      <span className="font-medium">{row.original.name}</span>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => (
      <span className="text-sm font-medium">${row.original.price}</span>
    ),
  },
  {
    accessorKey: "classesCount",
    header: "Classes",
    cell: ({ row }) => (
      <span className="text-sm">{row.original.classesCount} classes</span>
    ),
  },
  {
    accessorKey: "validityDays",
    header: "Validity",
    cell: ({ row }) => (
      <span className="text-sm">{row.original.validityDays} days</span>
    ),
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={row.original.isActive ? "default" : "secondary"}>
        {row.original.isActive ? "Active" : "Inactive"}
      </Badge>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" asChild className="gap-1">
          <Link href={`/dashboard/admin/packages/${row.original.id}/edit`}>
            <Edit className="h-3.5 w-3.5" />
            Edit
          </Link>
        </Button>
        <ToggleStatusButton pkg={row.original} />
        <DeleteMutation
          endpoint={`/api/packages/${row.original.id}/`}
          invalidateKeys={[[PACKAGES_QUERY_KEY]]}
          confirmMessage="Delete this package?"
          confirmDescription="This will permanently remove the package."
          successMessage="Package deleted!"
          errorMessage="Failed to delete package."
        />
      </div>
    ),
  },
];

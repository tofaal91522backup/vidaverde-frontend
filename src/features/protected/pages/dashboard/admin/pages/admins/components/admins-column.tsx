"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { AdminAccount } from "@/features/protected/pages/dashboard/admin/types/admin.types";
import { formatSchoolDate } from "@/features/protected/pages/dashboard/admin/utils/format-school-datetime";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Power } from "lucide-react";
import Link from "next/link";
import { useDeactivateAdmin } from "../queries/use-admins";

function DeactivateButton({ account }: { account: AdminAccount }) {
  const { mutate, isPending } = useDeactivateAdmin();

  if (!account.active) return null;

  return (
    <Button
      variant="outline"
      size="sm"
      className="gap-1 text-destructive hover:text-destructive"
      disabled={isPending}
      onClick={() => {
        if (window.confirm(`Deactivate ${account.name}? They will no longer be able to sign in.`)) {
          mutate({ id: account.id });
        }
      }}
    >
      <Power className="h-3.5 w-3.5" />
      Deactivate
    </Button>
  );
}

export const adminsColumns: ColumnDef<AdminAccount>[] = [
  {
    accessorKey: "name",
    header: "Admin",
    cell: ({ row }) => (
      <div>
        <p className="text-sm font-medium">{row.original.name}</p>
        <p className="text-xs text-muted-foreground">{row.original.email}</p>
      </div>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <Badge variant={row.original.role === "master" ? "default" : "secondary"} className="capitalize">
        {row.original.role}
      </Badge>
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
    accessorKey: "created_at",
    header: "Created",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {formatSchoolDate(row.original.created_at)}
      </span>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex items-center justify-end gap-2">
        <Button variant="outline" size="sm" asChild className="gap-1">
          <Link href={`/dashboard/admin/admins/${row.original.id}/edit`}>
            <Edit className="h-3.5 w-3.5" />
            Edit
          </Link>
        </Button>
        <DeactivateButton account={row.original} />
      </div>
    ),
  },
];

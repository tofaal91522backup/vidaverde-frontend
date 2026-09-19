"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-1 text-destructive hover:text-destructive"
          disabled={isPending}
        >
          <Power className="h-3.5 w-3.5" />
          Deactivate
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Deactivate {account.name}?</AlertDialogTitle>
          <AlertDialogDescription>
            {account.email} will no longer be able to sign in. The account is
            kept, so blog posts they wrote still show their name. To bring them
            back, edit the account, turn it on and set a new password.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-white hover:bg-destructive/90"
            onClick={() => mutate({ id: account.id })}
          >
            Deactivate
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

/** `currentEmail` — nijer row-te "You" dekhay, Deactivate na (backend 400 dey). */
export const adminsColumns = (
  currentEmail: string,
): ColumnDef<AdminAccount>[] => [
  {
    accessorKey: "name",
    header: "Admin",
    cell: ({ row }) => (
      <div>
        <p className="text-sm font-medium">
          {row.original.name}
          {row.original.email === currentEmail && (
            <span className="ml-2 text-xs font-normal text-muted-foreground">
              (you)
            </span>
          )}
        </p>
        <p className="text-xs text-muted-foreground">{row.original.email}</p>
      </div>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <Badge
        variant={row.original.role === "master" ? "default" : "secondary"}
        className="capitalize"
      >
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
        {row.original.active && row.original.email !== currentEmail && (
          <DeactivateButton account={row.original} />
        )}
      </div>
    ),
  },
];

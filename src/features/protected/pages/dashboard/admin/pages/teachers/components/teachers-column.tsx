"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Power } from "lucide-react";
import Link from "next/link";
import { Teacher, useToggleTeacherStatus } from "../queries/use-teachers";
import DeleteMutation from "@/components/shared/delete-mutation";
import { TEACHERS_QUERY_KEY } from "../queries/use-teachers";

function ToggleStatusButton({ teacher }: { teacher: Teacher }) {
  const { mutate, isPending } = useToggleTeacherStatus();
  return (
    <Button
      variant="outline"
      size="sm"
      disabled={isPending}
      onClick={() => mutate({ id: teacher.id, isActive: !teacher.isActive })}
      className="gap-1"
    >
      <Power className="h-3.5 w-3.5" />
      {teacher.isActive ? "Deactivate" : "Activate"}
    </Button>
  );
}

export const teachersColumns: ColumnDef<Teacher>[] = [
  {
    accessorKey: "photo",
    header: "Photo",
    cell: ({ row }) =>
      row.original.photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={row.original.photo}
          alt={row.original.name}
          className="h-9 w-9 rounded-full object-cover border"
        />
      ) : (
        <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
          {row.original.name.charAt(0).toUpperCase()}
        </div>
      ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <span className="font-medium">{row.original.name}</span>
    ),
  },
  {
    accessorKey: "specialisations",
    header: "Specialisations",
    cell: ({ row }) => (
      <div className="flex flex-wrap gap-1 max-w-[240px]">
        {row.original.specialisations.slice(0, 3).map((s) => (
          <Badge key={s} variant="secondary" className="text-xs">
            {s}
          </Badge>
        ))}
        {row.original.specialisations.length > 3 && (
          <Badge variant="outline" className="text-xs">
            +{row.original.specialisations.length - 3}
          </Badge>
        )}
      </div>
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
          <Link href={`/dashboard/admin/teachers/${row.original.id}/edit`}>
            <Edit className="h-3.5 w-3.5" />
            Edit
          </Link>
        </Button>
        <ToggleStatusButton teacher={row.original} />
        <DeleteMutation
          endpoint={`/api/teachers/${row.original.id}/`}
          invalidateKeys={[[TEACHERS_QUERY_KEY]]}
          confirmMessage="Delete this teacher?"
          confirmDescription="This will permanently remove the teacher and all related data."
          successMessage="Teacher deleted!"
          errorMessage="Failed to delete teacher."
        />
      </div>
    ),
  },
];

"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { AdminTeacher } from "@/features/protected/pages/dashboard/admin/types/admin.types";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Power } from "lucide-react";
import Link from "next/link";
import { useToggleTeacherStatus } from "../queries/use-teachers";

function ToggleStatusButton({ teacher }: { teacher: AdminTeacher }) {
  const { mutate, isPending } = useToggleTeacherStatus();
  return (
    <Button
      variant="outline"
      size="sm"
      disabled={isPending}
      onClick={() => mutate({ id: teacher.id, active: !teacher.active })}
      className="gap-1"
    >
      <Power className="h-3.5 w-3.5" />
      {teacher.active ? "Deactivate" : "Activate"}
    </Button>
  );
}

export const teachersColumns: ColumnDef<AdminTeacher>[] = [
  {
    accessorKey: "profile_img_url",
    header: "Photo",
    cell: ({ row }) =>
      row.original.profile_img_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={row.original.profile_img_url}
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
      <div>
        <p className="font-medium">{row.original.name}</p>
        {row.original.institute && (
          <p className="text-xs text-muted-foreground">
            {row.original.institute}
          </p>
        )}
      </div>
    ),
  },
  {
    accessorKey: "tags",
    header: "Specialisations",
    cell: ({ row }) => {
      const tags = row.original.tags ?? [];
      return (
        <div className="flex flex-wrap gap-1 max-w-60">
          {tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs capitalize">
              {tag}
            </Badge>
          ))}
          {tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{tags.length - 3}
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "availability",
    header: "Weekly hours",
    cell: ({ row }) => {
      const days = new Set((row.original.availability ?? []).map((r) => r.day));
      return (
        <span className="text-sm text-muted-foreground">
          {days.size === 0
            ? "—"
            : `${days.size} day${days.size === 1 ? "" : "s"}`}
        </span>
      );
    },
  },
  {
    accessorKey: "active",
    header: "Status",
    cell: ({ row }) => (
      <div className="flex flex-col items-start gap-1">
        <Badge variant={row.original.active ? "default" : "secondary"}>
          {row.original.active ? "Active" : "Inactive"}
        </Badge>
        {row.original.active && !row.original.accepting_students && (
          <Badge variant="outline" className="text-[10px]">
            Not accepting new students
          </Badge>
        )}
      </div>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      // Delete button nai — backend-e DELETE asholei deactivate kore, ar
      // sheta ei Deactivate button-i kore. Duita rakhle bhul bujhabe.
      <div className="flex items-center justify-end gap-2">
        <Button variant="outline" size="sm" asChild className="gap-1">
          <Link href={`/dashboard/admin/teachers/${row.original.id}/edit`}>
            <Edit className="h-3.5 w-3.5" />
            Edit
          </Link>
        </Button>
        <ToggleStatusButton teacher={row.original} />
      </div>
    ),
  },
];

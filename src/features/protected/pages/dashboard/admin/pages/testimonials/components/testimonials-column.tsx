"use client";

import DeleteMutation from "@/components/shared/delete-mutation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { AdminTestimonial } from "@/features/protected/pages/dashboard/admin/types/admin.types";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Power, Star } from "lucide-react";
import Link from "next/link";
import {
  TESTIMONIALS_QUERY_KEY,
  useToggleTestimonialStatus,
} from "../queries/use-testimonials";

function ToggleStatusButton({ item }: { item: AdminTestimonial }) {
  const { mutate, isPending } = useToggleTestimonialStatus();
  return (
    <Button
      variant="outline"
      size="sm"
      disabled={isPending}
      onClick={() => mutate({ id: item.id, active: !item.active })}
      className="gap-1"
    >
      <Power className="h-3.5 w-3.5" />
      {item.active ? "Hide" : "Show"}
    </Button>
  );
}

export const testimonialsColumns: ColumnDef<AdminTestimonial>[] = [
  {
    accessorKey: "student_name",
    header: "Student",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        {row.original.photo_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={row.original.photo_url}
            alt={row.original.student_name}
            className="h-8 w-8 rounded-full border object-cover"
          />
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-medium">
            {row.original.student_name?.charAt(0).toUpperCase() || "?"}
          </div>
        )}
        <div>
          <p className="text-sm font-medium">{row.original.student_name}</p>
          {row.original.country && (
            <p className="text-xs text-muted-foreground">
              {row.original.country}
            </p>
          )}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "outcome_en",
    header: "Outcome",
    cell: ({ row }) => (
      <p className="max-w-100 truncate text-sm">{row.original.outcome_en}</p>
    ),
  },
  {
    accessorKey: "programme",
    header: "Programme",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.programme || "—"}
      </span>
    ),
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => (
      <span className="flex items-center gap-1 text-sm tabular-nums">
        <Star className="h-3.5 w-3.5 fill-current text-amber-500" />
        {row.original.rating}
      </span>
    ),
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
      <Badge variant={row.original.active ? "default" : "secondary"}>
        {row.original.active ? "Shown" : "Hidden"}
      </Badge>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex items-center justify-end gap-2">
        <Button variant="outline" size="sm" asChild className="gap-1">
          <Link href={`/dashboard/admin/testimonials/${row.original.id}/edit`}>
            <Edit className="h-3.5 w-3.5" />
            Edit
          </Link>
        </Button>
        <ToggleStatusButton item={row.original} />
        {/* Doc-e "deactivates rather than deletes" bola nai (teachers/packages-er moto),
            tai ekhane DELETE sotti delete kore dhore neওয়া hoyeche */}
        <DeleteMutation
          endpoint={`/administrator/testimonials/${row.original.id}/`}
          invalidateKeys={[[TESTIMONIALS_QUERY_KEY]]}
          confirmMessage="Delete this testimonial?"
          confirmDescription="To keep it but take it off the site, use Hide instead."
          successMessage="Testimonial deleted."
          errorMessage="Could not delete the testimonial."
          size="sm"
        />
      </div>
    ),
  },
];

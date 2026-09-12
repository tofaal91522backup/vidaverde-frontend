"use client";

import DeleteMutation from "@/components/shared/delete-mutation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { AdminBlog } from "@/features/protected/pages/dashboard/admin/types/admin.types";
import { formatSchoolDate } from "@/features/protected/pages/dashboard/admin/utils/format-school-datetime";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { BLOGS_QUERY_KEY, useToggleBlogStatus } from "../queries/use-blogs";
import { BLOG_CATEGORIES } from "../schemas/blog.schema";

const CATEGORY_LABELS: Record<string, string> = Object.fromEntries(
  BLOG_CATEGORIES.map((c) => [c.value, c.label]),
);

function ToggleStatusButton({ blog }: { blog: AdminBlog }) {
  const { mutate, isPending } = useToggleBlogStatus();
  const next = blog.status === "published" ? "draft" : "published";

  return (
    <Button
      variant="outline"
      size="sm"
      disabled={isPending}
      onClick={() => mutate({ id: blog.id, status: next })}
      className="gap-1"
    >
      {blog.status === "published" ? (
        <EyeOff className="h-3.5 w-3.5" />
      ) : (
        <Eye className="h-3.5 w-3.5" />
      )}
      {blog.status === "published" ? "Unpublish" : "Publish"}
    </Button>
  );
}

export const blogsColumns: ColumnDef<AdminBlog>[] = [
  {
    accessorKey: "thumbnail",
    header: "",
    cell: ({ row }) =>
      row.original.thumbnail ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={row.original.thumbnail}
          alt=""
          className="h-10 w-14 rounded object-cover border"
        />
      ) : (
        <div className="h-10 w-14 rounded bg-muted" />
      ),
  },
  {
    accessorKey: "title_en",
    header: "Title",
    cell: ({ row }) => (
      <div className="max-w-80">
        <p className="font-medium truncate">{row.original.title_en}</p>
        <p className="text-xs text-muted-foreground truncate">
          /{row.original.slug}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <Badge variant="secondary" className="text-xs">
        {CATEGORY_LABELS[row.original.category] ?? row.original.category}
      </Badge>
    ),
  },
  {
    accessorKey: "reading_time",
    header: "Read",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.reading_time} min
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="flex flex-col items-start gap-1">
        <Badge
          variant={row.original.status === "published" ? "default" : "secondary"}
          className="capitalize"
        >
          {row.original.status}
        </Badge>
        {row.original.published_at && (
          <span className="text-[10px] text-muted-foreground">
            {formatSchoolDate(row.original.published_at)}
          </span>
        )}
      </div>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex items-center justify-end gap-2">
        <Button variant="outline" size="sm" asChild className="gap-1">
          <Link href={`/dashboard/admin/blogs/${row.original.id}/edit`}>
            <Edit className="h-3.5 w-3.5" />
            Edit
          </Link>
        </Button>
        <ToggleStatusButton blog={row.original} />
        {/* Teachers/packages-er theke alada: blog-e DELETE **sotti** delete kore */}
        <DeleteMutation
          endpoint={`/administrator/blogs/${row.original.id}/`}
          invalidateKeys={[[BLOGS_QUERY_KEY]]}
          confirmMessage="Delete this blog post?"
          confirmDescription="This permanently removes the post. Unlike teachers and packages, it is not just hidden."
          successMessage="Blog post deleted."
          errorMessage="Could not delete the blog post."
          size="sm"
        />
      </div>
    ),
  },
];

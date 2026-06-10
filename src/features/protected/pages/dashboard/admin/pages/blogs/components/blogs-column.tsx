"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Globe, FileText } from "lucide-react";
import Link from "next/link";
import { Blog, BLOGS_QUERY_KEY, useToggleBlogStatus } from "../queries/use-blogs";
import DeleteMutation from "@/components/shared/delete-mutation";

function ToggleStatusButton({ blog }: { blog: Blog }) {
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
      {next === "published" ? (
        <Globe className="h-3.5 w-3.5" />
      ) : (
        <FileText className="h-3.5 w-3.5" />
      )}
      {next === "published" ? "Publish" : "Unpublish"}
    </Button>
  );
}

export const blogsColumns: ColumnDef<Blog>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <span className="font-medium text-sm">{row.original.title}</span>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <Badge variant="secondary" className="text-xs">{row.original.category}</Badge>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={row.original.status === "published" ? "default" : "secondary"}>
        {row.original.status === "published" ? "Published" : "Draft"}
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
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" asChild className="gap-1">
          <Link href={`/dashboard/admin/blogs/${row.original.id}/edit`}>
            <Edit className="h-3.5 w-3.5" />
            Edit
          </Link>
        </Button>
        <ToggleStatusButton blog={row.original} />
        <DeleteMutation
          endpoint={`/api/blogs/${row.original.id}/`}
          invalidateKeys={[[BLOGS_QUERY_KEY]]}
          confirmMessage="Delete this blog post?"
          confirmDescription="This will permanently remove the blog post."
          successMessage="Blog post deleted!"
          errorMessage="Failed to delete blog post."
        />
      </div>
    ),
  },
];

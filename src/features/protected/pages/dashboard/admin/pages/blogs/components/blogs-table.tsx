"use client";

import DataTable from "@/components/shared/data-table";
import Pagination from "@/components/shared/pagination";
import { ReusableSelect } from "@/components/shared/form-related/reusable-select";
import { Button } from "@/components/ui/button";
import type {
  BlogCategory,
  BlogStatus,
} from "@/features/protected/pages/dashboard/admin/types/admin.types";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useBlogs } from "../queries/use-blogs";
import { BLOG_CATEGORIES, BLOG_STATUSES } from "../schemas/blog.schema";
import { blogsColumns } from "./blogs-column";

export function BlogsTable() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<BlogStatus | "">("");
  const [category, setCategory] = useState<BlogCategory | "">("");

  const { data, isLoading, isError } = useBlogs({ page, status, category });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        {/* Ei endpoint search param ney na — shudhu status ar category */}
        <ReusableSelect
          className="w-40"
          value={status}
          options={[...BLOG_STATUSES]}
          placeholder="All statuses"
          onChange={(e) => {
            setStatus(e.target.value as BlogStatus | "");
            setPage(1);
          }}
        />

        <ReusableSelect
          className="w-56"
          value={category}
          options={[...BLOG_CATEGORIES]}
          placeholder="All categories"
          onChange={(e) => {
            setCategory(e.target.value as BlogCategory | "");
            setPage(1);
          }}
        />

        <Button asChild className="ml-auto">
          <Link href="/dashboard/admin/blogs/create">
            <Plus className="h-4 w-4 mr-1" />
            New Post
          </Link>
        </Button>
      </div>

      <DataTable
        data={data?.results}
        columns={blogsColumns}
        loading={isLoading}
        error={isError ? "Failed to load blog posts." : ""}
      />

      <Pagination page={page} total={data?.count ?? 0} onPageChange={setPage} />
    </div>
  );
}

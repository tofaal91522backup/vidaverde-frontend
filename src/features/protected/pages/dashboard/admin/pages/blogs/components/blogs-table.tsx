"use client";

import DataTable from "@/components/shared/data-table";
import { ReusableSelect } from "@/components/shared/form-related/reusable-select";
import Pagination from "@/components/shared/pagination";
import { TableCard } from "@/components/shared/table-card";
import { Button } from "@/components/ui/button";
import type {
  BlogCategory,
  BlogStatus,
} from "@/features/protected/pages/dashboard/admin/types/admin.types";
import { useState } from "react";
import { useBlogs } from "../queries/use-blogs";
import { BLOG_CATEGORIES, BLOG_STATUSES } from "../schemas/blog.schema";
import { blogsColumns } from "./blogs-column";

export function BlogsTable() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<BlogStatus | "">("");
  const [category, setCategory] = useState<BlogCategory | "">("");

  const { data, isLoading, isError } = useBlogs({ page, status, category });

  const filtering = Boolean(status || category);
  const count = data?.count ?? 0;

  return (
    <TableCard
      toolbar={
        <>
          {/* Ei endpoint search param ney na — shudhu status ar category */}
          <ReusableSelect
            className="w-40 bg-background"
            value={status}
            options={BLOG_STATUSES}
            placeholder="All statuses"
            onChange={(e) => {
              setStatus(e.target.value as BlogStatus | "");
              setPage(1);
            }}
          />

          <ReusableSelect
            className="w-56 bg-background"
            value={category}
            options={BLOG_CATEGORIES}
            placeholder="All categories"
            onChange={(e) => {
              setCategory(e.target.value as BlogCategory | "");
              setPage(1);
            }}
          />

          {filtering && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setStatus("");
                setCategory("");
                setPage(1);
              }}
            >
              Clear
            </Button>
          )}
        </>
      }
      meta={
        isLoading
          ? "Loading…"
          : `${count} ${count === 1 ? "post" : "posts"}${
              filtering ? " match" : ""
            }`
      }
      footer={
        <Pagination page={page} total={count} onPageChange={setPage} />
      }
    >
      <DataTable
        embedded
        data={data?.results}
        columns={blogsColumns}
        loading={isLoading}
        error={isError ? "Failed to load blog posts." : ""}
      />
    </TableCard>
  );
}

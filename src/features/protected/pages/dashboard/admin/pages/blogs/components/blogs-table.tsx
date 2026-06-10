"use client";

import DataTable from "@/components/shared/data-table";
import Pagination from "@/components/shared/pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useBlogs } from "../queries/use-blogs";
import { blogsColumns } from "./blogs-column";

export function BlogsTable() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const { data, isLoading, isError } = useBlogs({
    page,
    search,
    status: status || undefined,
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by title..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="pl-9"
          />
        </div>

        <Select
          value={status || "all"}
          onValueChange={(v) => { setStatus(v === "all" ? "" : v); setPage(1); }}
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>

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

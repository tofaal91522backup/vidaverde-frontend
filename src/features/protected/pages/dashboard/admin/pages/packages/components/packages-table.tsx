"use client";

import DataTable from "@/components/shared/data-table";
import Pagination from "@/components/shared/pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { usePackages } from "../queries/use-packages";
import { packagesColumns } from "./packages-column";

export function PackagesTable() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isLoading, isError } = usePackages({ page, search });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search packages..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="pl-9"
          />
        </div>
        <Button asChild className="ml-auto">
          <Link href="/dashboard/admin/packages/create">
            <Plus className="h-4 w-4 mr-1" />
            New Package
          </Link>
        </Button>
      </div>

      <DataTable
        data={data?.results}
        columns={packagesColumns}
        loading={isLoading}
        error={isError ? "Failed to load packages." : ""}
      />

      <Pagination page={page} total={data?.count ?? 0} onPageChange={setPage} />
    </div>
  );
}

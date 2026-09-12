"use client";

import DataTable from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toList } from "@/features/protected/pages/dashboard/admin/utils/to-list";
import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useAdmins } from "../queries/use-admins";
import { adminsColumns } from "./admins-column";

export function AdminsTable() {
  const [search, setSearch] = useState("");
  const { data, isLoading, isError } = useAdmins();

  const accounts = useMemo(() => {
    const query = search.trim().toLowerCase();
    const all = toList(data);
    if (!query) return all;

    return all.filter(
      (account) =>
        account.name.toLowerCase().includes(query) ||
        account.email.toLowerCase().includes(query),
    );
  }, [data, search]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search name or email..."
            className="pl-9"
          />
        </div>
        <Button asChild className="ml-auto">
          <Link href="/dashboard/admin/admins/create">
            <Plus className="mr-1 h-4 w-4" />
            New admin
          </Link>
        </Button>
      </div>

      <DataTable
        data={accounts}
        columns={adminsColumns}
        loading={isLoading}
        error={isError ? "Failed to load admin accounts." : ""}
      />
    </div>
  );
}

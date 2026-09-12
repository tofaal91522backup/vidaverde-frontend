"use client";

import DataTable from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ReusableSelect } from "@/components/shared/form-related/reusable-select";
import { toList } from "@/features/protected/pages/dashboard/admin/utils/to-list";
import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useTeachers } from "../queries/use-teachers";
import { teachersColumns } from "./teachers-column";

const ACTIVE_OPTIONS = [
  { value: "true", label: "Active only" },
  { value: "false", label: "Inactive only" },
];

export function TeachersTable() {
  const [search, setSearch] = useState("");
  const [active, setActive] = useState("");

  const { data, isLoading, isError } = useTeachers({
    search: search || undefined,
    active: active === "" ? undefined : active === "true",
  });

  // List shape ekhono nishchit na (bare array naki envelope) — normalize kora hoy
  const teachers = toList(data);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-45 flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or institute..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <ReusableSelect
          className="w-40"
          value={active}
          options={ACTIVE_OPTIONS}
          placeholder="All statuses"
          onChange={(e) => setActive(e.target.value)}
        />

        <Button asChild className="ml-auto">
          <Link href="/dashboard/admin/teachers/create">
            <Plus className="h-4 w-4 mr-1" />
            Add Teacher
          </Link>
        </Button>
      </div>

      <DataTable
        data={teachers}
        columns={teachersColumns}
        loading={isLoading}
        error={isError ? "Failed to load teachers." : ""}
      />

      {/* Backend doc-e ei endpoint-e pagination-er ullekh nai, tai <Pagination> nai */}
    </div>
  );
}

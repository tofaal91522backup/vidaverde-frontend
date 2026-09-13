"use client";

import DataTable from "@/components/shared/data-table";
import { ReusableSelect } from "@/components/shared/form-related/reusable-select";
import { TableCard } from "@/components/shared/table-card";
import { Input } from "@/components/ui/input";
import { toList } from "@/features/protected/pages/dashboard/admin/utils/to-list";
import { Search } from "lucide-react";
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
    <TableCard
      toolbar={
        <>
          <div className="relative min-w-56 flex-1 sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name or institute..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-background pl-9"
            />
          </div>

          <ReusableSelect
            className="w-40 bg-background"
            value={active}
            options={ACTIVE_OPTIONS}
            placeholder="All statuses"
            onChange={(e) => setActive(e.target.value)}
          />
        </>
      }
      meta={
        isLoading
          ? null
          : `${teachers.length} ${teachers.length === 1 ? "teacher" : "teachers"}`
      }
    >
      <DataTable
        embedded
        data={teachers}
        columns={teachersColumns}
        loading={isLoading}
        error={isError ? "Failed to load teachers." : ""}
      />

      {/* Backend doc-e ei endpoint-e pagination-er ullekh nai, tai <Pagination> nai */}
    </TableCard>
  );
}

"use client";

import DataTable from "@/components/shared/data-table";
import { ReusableSelect } from "@/components/shared/form-related/reusable-select";
import { TableCard } from "@/components/shared/table-card";
import { TableSearchInput } from "@/components/shared/table-search-input";
import { toList } from "@/features/protected/pages/dashboard/admin/utils/to-list";
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

  const { data, isLoading, isError, isFetching } = useTeachers({
    search: search || undefined,
    active: active === "" ? undefined : active === "true",
  });

  // List shape ekhono nishchit na (bare array naki envelope) — normalize kora hoy
  const teachers = toList(data);

  return (
    <TableCard
      toolbar={
        <>
          <TableSearchInput
            placeholder="Search by name or institute..."
            loading={isFetching}
            onSearch={setSearch}
          />

          <ReusableSelect
            className="w-40 bg-background"
            value={active}
            options={ACTIVE_OPTIONS}
            placeholder="All statuses"
            onChange={(e) => setActive(e.target.value)}
          />
        </>
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

"use client";

import DataTable from "@/components/shared/data-table";
import Pagination from "@/components/shared/pagination";
import { TableCard } from "@/components/shared/table-card";
import { TableSearchInput } from "@/components/shared/table-search-input";
import { useState } from "react";
import { useStudents } from "../queries/use-students";
import { studentsColumns } from "./students-column";

export function StudentsTable() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isLoading, isError, isFetching } = useStudents({
    page,
    search,
  });

  return (
    <TableCard
      toolbar={
        <TableSearchInput
          placeholder="Search by name or email..."
          loading={isFetching}
          onSearch={(value) => {
            setSearch(value);
            // Notun search mane page 1 — na hole faka page-e giye porto
            setPage(1);
          }}
        />
      }
      footer={
        <Pagination
          page={page}
          total={data?.count ?? 0}
          onPageChange={setPage}
        />
      }
    >
      <DataTable
        embedded
        data={data?.results}
        columns={studentsColumns}
        loading={isLoading}
        error={isError ? "Failed to load students." : ""}
      />
    </TableCard>
  );
}

"use client";

import DataTable from "@/components/shared/data-table";
import { TableCard } from "@/components/shared/table-card";
import { TableSearchInput } from "@/components/shared/table-search-input";
import { useMemo, useState } from "react";
import { useInvoices } from "../queries/use-invoices";
import { invoicesColumns } from "./invoices-column";

export function InvoicesTable() {
  const [search, setSearch] = useState("");

  const { data, isLoading, isError } = useInvoices();

  // Backend ei endpoint-e search param ney na, puro list ek shathe dey —
  // tai filter ta client-side.
  const invoices = useMemo(() => {
    const all = data?.results ?? [];
    const query = search.trim().toLowerCase();
    if (!query) return all;

    return all.filter(
      (invoice) =>
        invoice.package_title.toLowerCase().includes(query) ||
        invoice.number.toLowerCase().includes(query),
    );
  }, [data?.results, search]);

  return (
    <TableCard
      toolbar={
        // Debounce chhoto — filter client-side, kono request jay na
        <TableSearchInput
          placeholder="Search by package or invoice no..."
          delay={150}
          onSearch={setSearch}
        />
      }
    >
      <DataTable
        embedded
        data={invoices}
        columns={invoicesColumns}
        loading={isLoading}
        error={isError ? "Failed to load invoices." : ""}
      />

      {/* Backend ei endpoint paginate kore na — tai <Pagination> nai */}
    </TableCard>
  );
}

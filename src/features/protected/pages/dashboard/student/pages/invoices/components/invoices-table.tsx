"use client";

import DataTable from "@/components/shared/data-table";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
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
    <div className="space-y-4">
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by package or invoice no..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <DataTable
        data={invoices}
        columns={invoicesColumns}
        loading={isLoading}
        error={isError ? "Failed to load invoices." : ""}
      />
    </div>
  );
}

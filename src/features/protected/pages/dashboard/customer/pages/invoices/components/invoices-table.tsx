"use client";

import DataTable from "@/components/shared/data-table";
import Pagination from "@/components/shared/pagination";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { useState } from "react";
import { useInvoices } from "../queries/use-invoices";
import { invoicesColumns } from "./invoices-column";

export function InvoicesTable() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const { data, isLoading, isError } = useInvoices({
    page,
    search,
    status: status || undefined,
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[180px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by package or invoice no..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="pl-9"
          />
        </div>

        <Select
          value={status || "all"}
          onValueChange={(v) => { setStatus(v === "all" ? "" : v); setPage(1); }}
        >
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <DataTable
        data={data?.results}
        columns={invoicesColumns}
        loading={isLoading}
        error={isError ? "Failed to load invoices." : ""}
      />

      <Pagination page={page} total={data?.count ?? 0} onPageChange={setPage} />
    </div>
  );
}

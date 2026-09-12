"use client";

import DataTable from "@/components/shared/data-table";
import { ReusableSelect } from "@/components/shared/form-related/reusable-select";
import Pagination from "@/components/shared/pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Download, Search } from "lucide-react";
import { useState } from "react";
import { useExportLeads, useLeads } from "../queries/use-leads";
import { leadsColumns } from "./leads-column";

const SUBSCRIBED_OPTIONS = [{ value: "true", label: "Subscribed only" }];
const CONVERTED_OPTIONS = [{ value: "true", label: "Converted only" }];

export function LeadsTable() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [subscribed, setSubscribed] = useState<"true" | "">("");
  const [converted, setConverted] = useState<"true" | "">("");

  const { data, isLoading, isError } = useLeads({
    page,
    search,
    subscribed,
    converted,
  });

  const exportLeads = useExportLeads();

  const resetPage = () => setPage(1);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-45 max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by email..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              resetPage();
            }}
            className="pl-9"
          />
        </div>

        <ReusableSelect
          className="w-44"
          value={subscribed}
          options={SUBSCRIBED_OPTIONS}
          placeholder="All subscriptions"
          onChange={(e) => {
            setSubscribed(e.target.value as "true" | "");
            resetPage();
          }}
        />

        <ReusableSelect
          className="w-44"
          value={converted}
          options={CONVERTED_OPTIONS}
          placeholder="All leads"
          onChange={(e) => {
            setConverted(e.target.value as "true" | "");
            resetPage();
          }}
        />

        <Button
          variant="outline"
          className="ml-auto gap-1.5"
          disabled={exportLeads.isPending}
          onClick={() => exportLeads.mutate({ subscribed, converted, search })}
        >
          {exportLeads.isPending ? (
            <Spinner className="h-4 w-4" />
          ) : (
            <Download className="h-4 w-4" />
          )}
          Export CSV
        </Button>
      </div>

      <DataTable
        data={data?.results}
        columns={leadsColumns}
        loading={isLoading}
        error={isError ? "Failed to load leads." : ""}
      />

      <Pagination page={page} total={data?.count ?? 0} onPageChange={setPage} />
    </div>
  );
}

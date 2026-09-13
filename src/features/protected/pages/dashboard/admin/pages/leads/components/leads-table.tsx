"use client";

import DataTable from "@/components/shared/data-table";
import { ReusableSelect } from "@/components/shared/form-related/reusable-select";
import Pagination from "@/components/shared/pagination";
import { TableCard } from "@/components/shared/table-card";
import { TableSearchInput } from "@/components/shared/table-search-input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Download } from "lucide-react";
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

  const { data, isLoading, isFetching, isError } = useLeads({
    page,
    search,
    subscribed,
    converted,
  });

  const resetPage = () => setPage(1);
  const filtering = Boolean(search || subscribed || converted);
  const count = data?.count ?? 0;

  return (
    <TableCard
      toolbar={
        <>
          {/* Age bare `<Input>` chilo, debounce chhara — proti okkhore ekta
              kore API call jeto */}
          <TableSearchInput
            placeholder="Search by email..."
            loading={isFetching}
            onSearch={(value) => {
              setSearch(value);
              resetPage();
            }}
          />

          <ReusableSelect
            className="w-44 bg-background"
            value={subscribed}
            options={SUBSCRIBED_OPTIONS}
            placeholder="All subscriptions"
            onChange={(e) => {
              setSubscribed(e.target.value as "true" | "");
              resetPage();
            }}
          />

          <ReusableSelect
            className="w-44 bg-background"
            value={converted}
            options={CONVERTED_OPTIONS}
            placeholder="All leads"
            onChange={(e) => {
              setConverted(e.target.value as "true" | "");
              resetPage();
            }}
          />

          {filtering && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearch("");
                setSubscribed("");
                setConverted("");
                resetPage();
              }}
            >
              Clear
            </Button>
          )}
        </>
      }
      footer={<Pagination page={page} total={count} onPageChange={setPage} />}
    >
      <DataTable
        embedded
        data={data?.results}
        columns={leadsColumns}
        loading={isLoading}
        error={isError ? "Failed to load leads." : ""}
      />
    </TableCard>
  );
}

/**
 * Export button — page-er header-e boshe.
 *
 * ⚠️ Button-er lekha **"Export all leads"**, "Export CSV" na. Backend-er
 * `LeadExportView` kono query param **porei na** (source-e verify kora), tai
 * filter kora thakleও puro list-i name. Age ei kotha ta table-er upore ekta
 * amber line-e lekha chilo; label-er bhitore boshale oi warning-er dorkar-i
 * pore na, ar admin bhul bujhbe na.
 */
export function ExportLeadsButton() {
  const exportLeads = useExportLeads();

  return (
    <Button
      variant="outline"
      className="gap-1.5"
      disabled={exportLeads.isPending}
      onClick={() => exportLeads.mutate()}
    >
      {exportLeads.isPending ? (
        <Spinner className="h-4 w-4" />
      ) : (
        <Download className="h-4 w-4" />
      )}
      Export all leads
    </Button>
  );
}

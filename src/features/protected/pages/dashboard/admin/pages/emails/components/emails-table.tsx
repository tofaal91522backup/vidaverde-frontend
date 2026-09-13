"use client";

import DataTable from "@/components/shared/data-table";
import { ReusableSelect } from "@/components/shared/form-related/reusable-select";
import Pagination from "@/components/shared/pagination";
import { TableCard } from "@/components/shared/table-card";
import { Button } from "@/components/ui/button";
import type { EmailStatus } from "@/features/protected/pages/dashboard/admin/types/admin.types";
import { SCHOOL_TIMEZONE_LABEL } from "@/features/protected/pages/dashboard/admin/utils/format-school-datetime";
import { useState } from "react";
import { useEmails } from "../queries/use-emails";
import { emailsColumns } from "./emails-column";

const STATUS_OPTIONS = [
  { value: "pending", label: "Pending" },
  { value: "sent", label: "Sent" },
  { value: "failed", label: "Failed" },
  { value: "cancelled", label: "Cancelled" },
];

export function EmailsTable() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<EmailStatus | "">("");

  const { data, isLoading, isError } = useEmails({ page, status });

  const count = data?.count ?? 0;

  return (
    <TableCard
      toolbar={
        <>
          <ReusableSelect
            className="w-44 bg-background"
            value={status}
            options={STATUS_OPTIONS}
            placeholder="All emails"
            onChange={(e) => {
              setStatus(e.target.value as EmailStatus | "");
              setPage(1);
            }}
          />

          {status && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setStatus("");
                setPage(1);
              }}
            >
              Clear
            </Button>
          )}
        </>
      }
      meta={
        isLoading
          ? "Loading…"
          : `${count} ${count === 1 ? "email" : "emails"}${status ? " match" : ""}`
      }
      footer={
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <Pagination page={page} total={count} onPageChange={setPage} />

          {/* Age eta filter-er pashe chilo, tai filter-er ekta option mone hoto.
              Footer-e giye ja ta-i — grid ta porar niyom. */}
          <span className="shrink-0 text-xs text-muted-foreground">
            Times in {SCHOOL_TIMEZONE_LABEL}. The mailer runs every 5 minutes.
          </span>
        </div>
      }
    >
      <DataTable
        embedded
        data={data?.results}
        columns={emailsColumns}
        loading={isLoading}
        error={isError ? "Failed to load the email outbox." : ""}
      />
    </TableCard>
  );
}

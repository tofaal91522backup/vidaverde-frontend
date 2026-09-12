"use client";

import DataTable from "@/components/shared/data-table";
import { ReusableSelect } from "@/components/shared/form-related/reusable-select";
import Pagination from "@/components/shared/pagination";
import type { EmailStatus } from "@/features/protected/pages/dashboard/admin/types/admin.types";
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

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <ReusableSelect
          className="w-40"
          value={status}
          options={STATUS_OPTIONS}
          placeholder="All statuses"
          onChange={(event) => {
            setStatus(event.target.value as EmailStatus | "");
            setPage(1);
          }}
        />
      </div>

      <DataTable
        data={data?.results}
        columns={emailsColumns}
        loading={isLoading}
        error={isError ? "Failed to load the email outbox." : ""}
      />

      <Pagination page={page} total={data?.count ?? 0} onPageChange={setPage} />
    </div>
  );
}

"use client";

import DataTable from "@/components/shared/data-table";
import { ReusableSelect } from "@/components/shared/form-related/reusable-select";
import Pagination from "@/components/shared/pagination";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { useContactMessages } from "../queries/use-contact-messages";
import { contactMessagesColumns } from "./contact-messages-column";

const HANDLED_OPTIONS = [
  { value: "false", label: "Open only" },
  { value: "true", label: "Handled only" },
];

export function ContactMessagesTable() {
  const [page, setPage] = useState(1);
  const [handled, setHandled] = useState<"true" | "false" | "">("");
  const [subject, setSubject] = useState("");

  const { data, isLoading, isError } = useContactMessages({
    page,
    handled,
    subject,
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <ReusableSelect
          className="w-44"
          value={handled}
          options={HANDLED_OPTIONS}
          placeholder="All enquiries"
          onChange={(e) => {
            setHandled(e.target.value as "true" | "false" | "");
            setPage(1);
          }}
        />

        {/* Backend-e `subject` er valid value gula documented na, tai free text */}
        <div className="relative max-w-xs flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Filter by subject, e.g. immersion"
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
              setPage(1);
            }}
            className="pl-9"
          />
        </div>
      </div>

      <DataTable
        data={data?.results}
        columns={contactMessagesColumns}
        loading={isLoading}
        error={isError ? "Failed to load enquiries." : ""}
      />

      <Pagination page={page} total={data?.count ?? 0} onPageChange={setPage} />
    </div>
  );
}

"use client";

import DataTable from "@/components/shared/data-table";
import { ReusableSelect } from "@/components/shared/form-related/reusable-select";
import Pagination from "@/components/shared/pagination";
import { TableCard } from "@/components/shared/table-card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useContactMessages } from "../queries/use-contact-messages";
import { useContactSubjects } from "../queries/use-contact-subjects";
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

  // Age ekhane free-text `<Input>` chilo, debounce chhara — proti okkhore ekta
  // kore API call jeto. Backend-e `subject` ekta enum, ar oi list-er jonno
  // endpoint ache, tai select-i thik.
  const { data: subjectData } = useContactSubjects();
  const subjectOptions = subjectData?.subjects ?? [];

  const filtering = Boolean(handled || subject);
  const count = data?.count ?? 0;

  return (
    <TableCard
      toolbar={
        <>
          <ReusableSelect
            className="w-44 bg-background"
            value={handled}
            options={HANDLED_OPTIONS}
            placeholder="All enquiries"
            onChange={(e) => {
              setHandled(e.target.value as "true" | "false" | "");
              setPage(1);
            }}
          />

          <ReusableSelect
            className="w-56 bg-background"
            value={subject}
            options={subjectOptions}
            placeholder="All subjects"
            onChange={(e) => {
              setSubject(e.target.value);
              setPage(1);
            }}
          />

          {filtering && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setHandled("");
                setSubject("");
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
          : `${count} ${count === 1 ? "enquiry" : "enquiries"}${
              filtering ? " match" : ""
            }`
      }
      footer={<Pagination page={page} total={count} onPageChange={setPage} />}
    >
      <DataTable
        embedded
        data={data?.results}
        columns={contactMessagesColumns}
        loading={isLoading}
        error={isError ? "Failed to load enquiries." : ""}
      />
    </TableCard>
  );
}

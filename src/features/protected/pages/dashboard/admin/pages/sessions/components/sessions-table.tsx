"use client";

import DataTable from "@/components/shared/data-table";
import { ReusableSelect } from "@/components/shared/form-related/reusable-select";
import Pagination from "@/components/shared/pagination";
import { TableCard } from "@/components/shared/table-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTeachers } from "@/features/protected/pages/dashboard/admin/pages/teachers/queries/use-teachers";
import type { SessionStatus } from "@/features/protected/pages/dashboard/admin/types/admin.types";
import { SCHOOL_TIMEZONE_LABEL } from "@/features/protected/pages/dashboard/admin/utils/format-school-datetime";
import { toList } from "@/features/protected/pages/dashboard/admin/utils/to-list";
import { Clock, Loader2 } from "lucide-react";
import { useState } from "react";
import { useSessions, type SessionFilter } from "../queries/use-sessions";
import { sessionsColumns } from "./sessions-column";

const STATUS_OPTIONS = [
  { value: "scheduled", label: "Scheduled" },
  { value: "completed", label: "Completed" },
  { value: "no_show", label: "No show" },
  { value: "cancelled", label: "Cancelled" },
  { value: "rescheduled", label: "Rescheduled" },
];

export function SessionsTable() {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<SessionFilter>("upcoming");
  const [teacher, setTeacher] = useState("");
  const [status, setStatus] = useState<SessionStatus | "">("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const { data: teacherData } = useTeachers();
  const teacherOptions = toList(teacherData).map((t) => ({
    value: t.id,
    label: t.name,
  }));

  const { data, isLoading, isError, isFetching } = useSessions({
    filter,
    page,
    teacher,
    status,
    from,
    to,
  });

  /** Kono filter bodlale prothom page-e fire jaওয়া uchit */
  const resetPage = () => setPage(1);

  return (
    <TableCard
      toolbar={
        <>
          <Tabs
            value={filter}
            onValueChange={(value) => {
              setFilter(value as SessionFilter);
              resetPage();
            }}
          >
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
            </TabsList>
          </Tabs>

          <ReusableSelect
            className="w-48 bg-background"
            value={teacher}
            options={teacherOptions}
            placeholder="All teachers"
            onChange={(e) => {
              setTeacher(e.target.value);
              resetPage();
            }}
          />

          <ReusableSelect
            className="w-40 bg-background"
            value={status}
            options={STATUS_OPTIONS}
            placeholder="All statuses"
            onChange={(e) => {
              setStatus(e.target.value as SessionStatus | "");
              resetPage();
            }}
          />

          <div className="flex flex-col gap-1">
            <Label htmlFor="sessions-from" className="text-xs">
              From
            </Label>
            <Input
              id="sessions-from"
              type="date"
              className="w-40 bg-background"
              value={from}
              onChange={(e) => {
                setFrom(e.target.value);
                resetPage();
              }}
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="sessions-to" className="text-xs">
              To
            </Label>
            <Input
              id="sessions-to"
              type="date"
              className="w-40 bg-background"
              value={to}
              onChange={(e) => {
                setTo(e.target.value);
                resetPage();
              }}
            />
          </div>
        </>
      }
      footer={
        <Pagination
          page={page}
          total={data?.count ?? 0}
          onPageChange={setPage}
        />
      }
    >
      {/* Admin-er shob time school time e — na bolle bhul bojhabe */}
      <p className="flex items-center gap-2 border-b bg-muted/30 px-4 py-2 text-xs text-muted-foreground">
        <Clock className="size-3.5 shrink-0" />
        Times in {SCHOOL_TIMEZONE_LABEL}.
      </p>

      <DataTable
        embedded
        data={data?.results}
        columns={sessionsColumns}
        loading={isLoading}
        error={isError ? "Failed to load sessions." : ""}
      />
    </TableCard>
  );
}

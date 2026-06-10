"use client";

import DataTable from "@/components/shared/data-table";
import Pagination from "@/components/shared/pagination";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import { useState } from "react";
import { useSessions } from "../queries/use-sessions";
import { sessionsColumns } from "./sessions-column";

type TabType = "upcoming" | "past";

export function SessionsTable() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<TabType>("upcoming");

  const statusFilter =
    tab === "upcoming" ? "upcoming" : "completed,no-show,rescheduled";

  const { data, isLoading, isError } = useSessions({
    page,
    search,
    status: statusFilter,
  });

  const handleTabChange = (value: string) => {
    setTab(value as TabType);
    setPage(1);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <Tabs value={tab} onValueChange={handleTabChange}>
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by student or teacher..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="pl-9"
          />
        </div>
      </div>

      <DataTable
        data={data?.results}
        columns={sessionsColumns}
        loading={isLoading}
        error={isError ? "Failed to load sessions." : ""}
      />

      <Pagination page={page} total={data?.count ?? 0} onPageChange={setPage} />
    </div>
  );
}

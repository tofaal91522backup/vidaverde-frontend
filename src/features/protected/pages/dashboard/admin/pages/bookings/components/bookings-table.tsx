"use client";

import DataTable from "@/components/shared/data-table";
import { ReusableSelect } from "@/components/shared/form-related/reusable-select";
import Pagination from "@/components/shared/pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { useTeachers } from "@/features/protected/pages/dashboard/admin/pages/teachers/queries/use-teachers";
import type { PaymentStatus } from "@/features/protected/pages/dashboard/admin/types/admin.types";
import { toList } from "@/features/protected/pages/dashboard/admin/utils/to-list";
import { Download, Search } from "lucide-react";
import { useState } from "react";
import { useBookings, useExportBookings } from "../queries/use-bookings";
import { bookingsColumns } from "./bookings-column";

const PAYMENT_OPTIONS = [
  { value: "paid", label: "Paid" },
  { value: "pending", label: "Pending" },
  { value: "failed", label: "Failed" },
  { value: "refunded", label: "Refunded" },
];

export function BookingsTable() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [teacher, setTeacher] = useState("");
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | "">("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const { data: teacherData } = useTeachers();
  const teacherOptions = toList(teacherData).map((t) => ({
    value: t.id,
    label: t.name,
  }));

  const { data, isLoading, isError } = useBookings({
    page,
    search,
    teacher,
    payment_status: paymentStatus,
    from,
    to,
  });

  const exportBookings = useExportBookings();

  const resetPage = () => setPage(1);

  // Export endpoint teacher/search ignore kore — admin ke sposhto bola dorkar
  const exportIgnoresFilters = Boolean(teacher || search);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end gap-3">
        <div className="relative min-w-45 max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by student email..."
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
          value={teacher}
          options={teacherOptions}
          placeholder="All teachers"
          onChange={(e) => {
            setTeacher(e.target.value);
            resetPage();
          }}
        />

        <ReusableSelect
          className="w-40"
          value={paymentStatus}
          options={PAYMENT_OPTIONS}
          placeholder="All payments"
          onChange={(e) => {
            setPaymentStatus(e.target.value as PaymentStatus | "");
            resetPage();
          }}
        />

        <div className="flex flex-col gap-1">
          <Label htmlFor="bookings-from" className="text-xs">
            From
          </Label>
          <Input
            id="bookings-from"
            type="date"
            className="w-40"
            value={from}
            onChange={(e) => {
              setFrom(e.target.value);
              resetPage();
            }}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor="bookings-to" className="text-xs">
            To
          </Label>
          <Input
            id="bookings-to"
            type="date"
            className="w-40"
            value={to}
            onChange={(e) => {
              setTo(e.target.value);
              resetPage();
            }}
          />
        </div>

        <Button
          variant="outline"
          className="ml-auto gap-1.5"
          disabled={exportBookings.isPending}
          onClick={() =>
            exportBookings.mutate({
              payment_status: paymentStatus,
              from,
              to,
            })
          }
        >
          {exportBookings.isPending ? (
            <Spinner className="h-4 w-4" />
          ) : (
            <Download className="h-4 w-4" />
          )}
          Export CSV
        </Button>
      </div>

      {exportIgnoresFilters && (
        <p className="text-xs text-amber-600">
          The CSV export only applies the payment status and date filters — the
          teacher and search filters are not included.
        </p>
      )}

      <DataTable
        data={data?.results}
        columns={bookingsColumns}
        loading={isLoading}
        error={isError ? "Failed to load bookings." : ""}
      />

      <Pagination page={page} total={data?.count ?? 0} onPageChange={setPage} />
    </div>
  );
}

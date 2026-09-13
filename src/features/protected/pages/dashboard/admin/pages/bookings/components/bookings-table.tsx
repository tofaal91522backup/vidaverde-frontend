"use client";

import DataTable from "@/components/shared/data-table";
import { ReusableSelect } from "@/components/shared/form-related/reusable-select";
import Pagination from "@/components/shared/pagination";
import { TableCard } from "@/components/shared/table-card";
import { TableSearchInput } from "@/components/shared/table-search-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { useTeachers } from "@/features/protected/pages/dashboard/admin/pages/teachers/queries/use-teachers";
import type { PaymentStatus } from "@/features/protected/pages/dashboard/admin/types/admin.types";
import { toList } from "@/features/protected/pages/dashboard/admin/utils/to-list";
import { Download, Info } from "lucide-react";
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

  const { data, isLoading, isError, isFetching } = useBookings({
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
    <TableCard
      toolbar={
        <>
          <TableSearchInput
            placeholder="Search by student email..."
            loading={isFetching}
            onSearch={(value) => {
              setSearch(value);
              resetPage();
            }}
          />

          <ReusableSelect
            className="w-44 bg-background"
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
              className="w-40 bg-background"
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
      {exportIgnoresFilters && (
        <p className="flex items-start gap-2 border-b bg-amber-50 px-4 py-2.5 text-xs text-amber-900 dark:bg-amber-950 dark:text-amber-200">
          <Info className="mt-0.5 size-3.5 shrink-0" />
          The CSV export only applies the payment status and date filters — the
          teacher and search filters are not included.
        </p>
      )}

      <DataTable
        embedded
        data={data?.results}
        columns={bookingsColumns}
        loading={isLoading}
        error={isError ? "Failed to load bookings." : ""}
      />
    </TableCard>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import type { StudentInvoice } from "@/features/protected/pages/dashboard/student/types/student.types";
import { formatLocalDate } from "@/features/protected/pages/dashboard/student/utils/format-local-datetime";
import { ColumnDef } from "@tanstack/react-table";
import { Download } from "lucide-react";
import { useDownloadInvoice } from "../queries/use-download-invoice";

function DownloadPdfButton({ invoice }: { invoice: StudentInvoice }) {
  const { mutate, isPending } = useDownloadInvoice();

  return (
    <Button
      variant="outline"
      size="sm"
      className="gap-1.5"
      disabled={isPending}
      onClick={() => mutate(invoice)}
    >
      {isPending ? (
        <Spinner className="h-3.5 w-3.5" />
      ) : (
        <Download className="h-3.5 w-3.5" />
      )}
      PDF
    </Button>
  );
}

export const invoicesColumns: ColumnDef<StudentInvoice>[] = [
  {
    accessorKey: "number",
    header: "Invoice #",
    cell: ({ row }) => (
      <span className="font-mono text-sm text-muted-foreground">
        {row.original.number}
      </span>
    ),
  },
  {
    accessorKey: "issued_at",
    header: "Date",
    cell: ({ row }) => (
      <span className="text-sm">{formatLocalDate(row.original.issued_at)}</span>
    ),
  },
  {
    accessorKey: "package_title",
    header: "Package",
    cell: ({ row }) => (
      <span className="text-sm font-medium">{row.original.package_title}</span>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => (
      // `amount` decimal string ashe ("12.00") — number na, tai toFixed kora jabe na
      <span className="text-sm font-semibold">
        {row.original.amount} {row.original.currency}
      </span>
    ),
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => <DownloadPdfButton invoice={row.original} />,
  },
];

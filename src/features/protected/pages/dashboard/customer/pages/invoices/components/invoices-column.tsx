"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Download } from "lucide-react";
import { Invoice } from "../queries/use-invoices";
import { downloadInvoicePdf } from "./invoice-pdf";

const STATUS_VARIANTS: Record<
  Invoice["paymentStatus"],
  "default" | "secondary" | "destructive"
> = {
  paid: "default",
  pending: "secondary",
  failed: "destructive",
};

export const invoicesColumns: ColumnDef<Invoice>[] = [
  {
    accessorKey: "invoiceNumber",
    header: "Invoice #",
    cell: ({ row }) => (
      <span className="font-mono text-sm text-muted-foreground">
        {row.original.invoiceNumber}
      </span>
    ),
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      <span className="text-sm">
        {new Date(row.original.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </span>
    ),
  },
  {
    accessorKey: "package",
    header: "Package",
    cell: ({ row }) => (
      <span className="text-sm font-medium">{row.original.package}</span>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => (
      <span className="text-sm font-semibold">${row.original.amount.toFixed(2)}</span>
    ),
  },
  {
    accessorKey: "paymentStatus",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        variant={STATUS_VARIANTS[row.original.paymentStatus]}
        className="capitalize"
      >
        {row.original.paymentStatus}
      </Badge>
    ),
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <Button
        variant="outline"
        size="sm"
        className="gap-1.5"
        onClick={() => downloadInvoicePdf(row.original)}
      >
        <Download className="h-3.5 w-3.5" />
        PDF
      </Button>
    ),
  },
];

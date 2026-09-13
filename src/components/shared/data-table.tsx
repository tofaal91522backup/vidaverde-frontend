"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import AsyncStateWrapper from "@/components/shared/async-state-wrapper";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData> {
  data?: TData[]; // allow undefined
  columns: ColumnDef<TData>[];
  loading?: boolean;
  error?: string;
  /** `<TableCard>`-er bhitore bosle nijer border/rounding lagbe na */
  embedded?: boolean;
}

export default function DataTable<TData>({
  data,
  columns,
  loading = false,
  error = "",
  embedded = false,
}: DataTableProps<TData>) {
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: data ?? [], // ⬅️ key line: fallback to []
    columns: columns ?? [], // (optional safety)
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <AsyncStateWrapper loading={loading} error={error}>
      <div className="w-full">
        <div
          className={
            embedded ? "bg-card" : "overflow-hidden rounded-md border bg-card"
          }
        >
          <Table>
            {/* Header-ta theme-er muted patti — TableCard-er toolbar ar
                FormSection-er header-er ek-i rong. `hover:bg-transparent`
                lage, na hole TableRow-er hover rule header-eo dhore. */}
            <TableHeader className="bg-muted/40">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="hover:bg-transparent">
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className={cn(
                        "h-11 font-semibold text-muted-foreground",
                        header.column.id === "actions" && "text-right",
                      )}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className={
                          cell.column.id === "actions" ? "text-right" : ""
                        }
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-28 text-center text-sm text-muted-foreground"
                  >
                    Nothing found. Try adjusting the filters, or add something
                    new.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AsyncStateWrapper>
  );
}

"use client";

import DataTable from "@/components/shared/data-table";
import { TableCard } from "@/components/shared/table-card";
import { TableSearchInput } from "@/components/shared/table-search-input";
import { toList } from "@/features/protected/pages/dashboard/admin/utils/to-list";
import { useMemo, useState } from "react";
import { useTestimonials } from "../queries/use-testimonials";
import { testimonialsColumns } from "./testimonials-column";

export function TestimonialsTable() {
  const [search, setSearch] = useState("");
  const { data, isLoading, isError } = useTestimonials();

  const all = useMemo(() => toList(data), [data]);

  // Ei endpoint search param ney na ar paginated-o na — filter client-side.
  // Mane ja dekhacche ta **puro list**, kono ek page na.
  const testimonials = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return all;

    return all.filter(
      (item) =>
        item.student_name.toLowerCase().includes(query) ||
        item.outcome_en.toLowerCase().includes(query) ||
        item.programme?.toLowerCase().includes(query),
    );
  }, [all, search]);

  return (
    <TableCard
      toolbar={
        // Debounce chhoto — filter client-side, kono request jay na
        <TableSearchInput
          placeholder="Search by name, outcome or programme..."
          delay={150}
          onSearch={setSearch}
        />
      }
    >
      <DataTable
        embedded
        data={testimonials}
        columns={testimonialsColumns}
        loading={isLoading}
        error={isError ? "Failed to load testimonials." : ""}
      />

      {/* Backend doc: "Not paginated" — tai <Pagination> nai */}
    </TableCard>
  );
}

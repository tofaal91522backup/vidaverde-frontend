"use client";

import DataTable from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toList } from "@/features/protected/pages/dashboard/admin/utils/to-list";
import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useTestimonials } from "../queries/use-testimonials";
import { testimonialsColumns } from "./testimonials-column";

export function TestimonialsTable() {
  const [search, setSearch] = useState("");
  const { data, isLoading, isError } = useTestimonials();

  // Ei endpoint search param ney na ar paginated-o na — filter client-side
  const testimonials = useMemo(() => {
    const all = toList(data);
    const query = search.trim().toLowerCase();
    if (!query) return all;

    return all.filter(
      (item) =>
        item.student_name.toLowerCase().includes(query) ||
        item.outcome_en.toLowerCase().includes(query) ||
        item.programme?.toLowerCase().includes(query),
    );
  }, [data, search]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search testimonials..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button asChild className="ml-auto">
          <Link href="/dashboard/admin/testimonials/create">
            <Plus className="h-4 w-4 mr-1" />
            New Testimonial
          </Link>
        </Button>
      </div>

      <DataTable
        data={testimonials}
        columns={testimonialsColumns}
        loading={isLoading}
        error={isError ? "Failed to load testimonials." : ""}
      />
    </div>
  );
}

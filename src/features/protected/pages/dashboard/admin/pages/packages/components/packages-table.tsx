"use client";

import DataTable from "@/components/shared/data-table";
import { TableCard } from "@/components/shared/table-card";
import { TableSearchInput } from "@/components/shared/table-search-input";
import { toList } from "@/features/protected/pages/dashboard/admin/utils/to-list";
import { useMemo, useState } from "react";
import { usePackages } from "../queries/use-packages";
import { packagesColumns } from "./packages-column";

export function PackagesTable() {
  const [search, setSearch] = useState("");

  const { data, isLoading, isError } = usePackages();

  const all = useMemo(() => toList(data), [data]);

  // Ei endpoint search param ney na ar paginated-o na — tai filter client-side.
  // Mane ja dekhacche ta **puro list**, kono ek page na.
  const packages = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return all;

    return all.filter(
      (pkg) =>
        pkg.title_en.toLowerCase().includes(query) ||
        pkg.title_es?.toLowerCase().includes(query),
    );
  }, [all, search]);

  return (
    <TableCard
      toolbar={
        // Debounce chhoto — filter ta client-side, request jay na, tai opekkha
        // korar kono karon nai. Onno table-e 400ms, karon oigula API dake.
        <TableSearchInput
          placeholder="Search packages..."
          delay={150}
          onSearch={setSearch}
        />
      }
      meta={
        search.trim()
          ? `${packages.length} of ${all.length}`
          : `${all.length} ${all.length === 1 ? "package" : "packages"}`
      }
    >
      <DataTable
        embedded
        data={packages}
        columns={packagesColumns}
        loading={isLoading}
        error={isError ? "Failed to load packages." : ""}
      />

      {/* Backend doc: "Not paginated" — tai <Pagination> nai */}
    </TableCard>
  );
}

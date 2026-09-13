"use client";

import DataTable from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toList } from "@/features/protected/pages/dashboard/admin/utils/to-list";
import { Plus, Search } from "lucide-react";
import Link from "next/link";
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

  const filtering = search.trim().length > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>All packages</CardTitle>
        <CardDescription>
          {isLoading
            ? "Loading…"
            : filtering
              ? `${packages.length} of ${all.length} shown`
              : `${all.length} ${all.length === 1 ? "package" : "packages"}`}
        </CardDescription>
        <CardAction>
          <Button asChild>
            <Link href="/dashboard/admin/packages/create">
              <Plus className="h-4 w-4 mr-1" />
              New Package
            </Link>
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search packages..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <DataTable
          data={packages}
          columns={packagesColumns}
          loading={isLoading}
          error={isError ? "Failed to load packages." : ""}
        />

        {/* Backend doc: "Not paginated" — tai <Pagination> nai */}
      </CardContent>
    </Card>
  );
}

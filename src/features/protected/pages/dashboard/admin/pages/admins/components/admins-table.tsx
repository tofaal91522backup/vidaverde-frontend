"use client";

import DataTable from "@/components/shared/data-table";
import { ReusableSelect } from "@/components/shared/form-related/reusable-select";
import { TableCard } from "@/components/shared/table-card";
import { TableSearchInput } from "@/components/shared/table-search-input";
import { Button } from "@/components/ui/button";
import { toList } from "@/features/protected/pages/dashboard/admin/utils/to-list";
import { useMemo, useState } from "react";
import { useAdmins } from "../queries/use-admins";
import { adminsColumns } from "./admins-column";

const STATUS_OPTIONS = [
  { value: "active", label: "Active only" },
  { value: "inactive", label: "Inactive only" },
];

const ROLE_OPTIONS = [
  { value: "master", label: "Masters" },
  { value: "manager", label: "Managers" },
];

/**
 * Endpoint paginated na, filter-o ney na — "a school has a handful of staff".
 * Tai shob ekbar-e ene browser-e filter; search-e tai delay 150.
 */
export function AdminsTable({ currentEmail }: { currentEmail: string }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [role, setRole] = useState("");
  const { data, isLoading, isError } = useAdmins();

  const columns = useMemo(() => adminsColumns(currentEmail), [currentEmail]);

  // useMemo — DataTable-e proti render-e notun array dile loop hoy
  const accounts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return toList(data).filter(
      (account) =>
        (!query ||
          account.name.toLowerCase().includes(query) ||
          account.email.toLowerCase().includes(query)) &&
        (!status || account.active === (status === "active")) &&
        (!role || account.role === role),
    );
  }, [data, search, status, role]);

  const filtering = Boolean(status || role);

  return (
    <TableCard
      toolbar={
        <>
          <TableSearchInput
            placeholder="Search name or email..."
            delay={150}
            onSearch={setSearch}
          />

          <ReusableSelect
            className="w-40 bg-background"
            value={status}
            options={STATUS_OPTIONS}
            placeholder="All statuses"
            onChange={(e) => setStatus(e.target.value)}
          />

          <ReusableSelect
            className="w-40 bg-background"
            value={role}
            options={ROLE_OPTIONS}
            placeholder="All roles"
            onChange={(e) => setRole(e.target.value)}
          />

          {filtering && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setStatus("");
                setRole("");
              }}
            >
              Clear
            </Button>
          )}
        </>
      }
    >
      <DataTable
        embedded
        data={accounts}
        columns={columns}
        loading={isLoading}
        error={isError ? "Failed to load admin accounts." : ""}
      />
    </TableCard>
  );
}

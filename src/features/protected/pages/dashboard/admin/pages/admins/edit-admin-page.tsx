"use client";

import AsyncStateWrapper from "@/components/shared/async-state-wrapper";
import DashboardPageLayout from "@/features/protected/pages/dashboard/shared/components/dashboard-page-layout";
import type { AdminAccount } from "@/features/protected/pages/dashboard/admin/types/admin.types";
import { AdminAccountForm } from "./components/admin-account-form";
import { useAdminDetails, useUpdateAdmin } from "./queries/use-admins";

function toFormValues(account: AdminAccount) {
  return {
    email: account.email,
    name: account.name,
    password: "",
    role: account.role,
    active: account.active,
  };
}

export default function EditAdminPage({ id }: { id: string }) {
  const { data, isLoading, isError } = useAdminDetails(id);
  const mutation = useUpdateAdmin(id);
  const account = data?.admin;

  return (
    <DashboardPageLayout
      title="Edit Admin"
      subtitle={account ? `Editing ${account.name}` : undefined}
    >
      <div className="max-w-2xl">
        <AsyncStateWrapper
          loading={isLoading}
          error={isError ? "Could not load this admin account." : null}
        >
          {account && (
            <AdminAccountForm
              mutation={mutation}
              defaultValues={toFormValues(account)}
              mode="edit"
            />
          )}
        </AsyncStateWrapper>
      </div>
    </DashboardPageLayout>
  );
}

"use client";

import AsyncStateWrapper from "@/components/shared/async-state-wrapper";
import type { AdminAccount } from "@/features/protected/pages/dashboard/admin/types/admin.types";
import { useAdminDetails, useUpdateAdmin } from "../queries/use-admins";
import { AdminAccountForm } from "./admin-account-form";

/** `password_txt` backend pathay, kintu form-e kokhono boshano hoy na */
function toFormValues(account: AdminAccount) {
  return {
    email: account.email,
    name: account.name,
    password: "",
    role: account.role,
    active: account.active,
  };
}

export function EditAdminContent({
  id,
  currentEmail,
}: {
  id: string;
  currentEmail: string;
}) {
  const { data, isLoading, isError } = useAdminDetails(id);
  const mutation = useUpdateAdmin(id);
  const account = data?.admin;

  return (
    <AsyncStateWrapper
      loading={isLoading}
      error={isError ? "Could not load this admin account." : null}
    >
      {account && (
        <AdminAccountForm
          mutation={mutation}
          defaultValues={toFormValues(account)}
          mode="edit"
          isSelf={account.email === currentEmail}
        />
      )}
    </AsyncStateWrapper>
  );
}

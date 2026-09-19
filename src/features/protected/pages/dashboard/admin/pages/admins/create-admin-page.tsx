"use client";

import DashboardPageLayout from "@/features/protected/pages/dashboard/shared/components/dashboard-page-layout";
import { AdminAccountForm } from "./components/admin-account-form";
import { useCreateAdmin } from "./queries/use-admins";

export default function CreateAdminPage() {
  const mutation = useCreateAdmin();

  return (
    <DashboardPageLayout
      title="New Admin"
      subtitle="Give them a password here and share it with them directly."
      maxWidth="max-w-3xl"
    >
      <AdminAccountForm mutation={mutation} mode="create" />
    </DashboardPageLayout>
  );
}

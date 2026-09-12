"use client";

import DashboardPageLayout from "@/features/protected/pages/dashboard/shared/components/dashboard-page-layout";
import { AdminAccountForm } from "./components/admin-account-form";
import { useCreateAdmin } from "./queries/use-admins";

export default function CreateAdminPage() {
  const mutation = useCreateAdmin();

  return (
    <DashboardPageLayout
      title="New Admin"
      subtitle="Choose Manager for normal access. Only Masters can manage administrator accounts."
    >
      <div className="max-w-2xl">
        <AdminAccountForm mutation={mutation} mode="create" />
      </div>
    </DashboardPageLayout>
  );
}

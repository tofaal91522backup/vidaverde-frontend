"use client";

import DashboardPageLayout from "@/features/protected/pages/dashboard/shared/components/dashboard-page-layout";
import { usePackageDetails, useUpdatePackage } from "./queries/use-packages";
import { PackageForm } from "./components/package-form";

export default function EditPackagePage({ id }: { id: string }) {
  const { data, isLoading } = usePackageDetails(id);
  const mutation = useUpdatePackage(id);

  if (isLoading) {
    return (
      <DashboardPageLayout title="Edit Package">
        <p className="text-muted-foreground text-sm">Loading package...</p>
      </DashboardPageLayout>
    );
  }

  return (
    <DashboardPageLayout
      title="Edit Package"
      subtitle={`Editing: ${data?.name}`}
    >
      <div className="max-w-xl">
        <PackageForm mutation={mutation} defaultValues={data} />
      </div>
    </DashboardPageLayout>
  );
}

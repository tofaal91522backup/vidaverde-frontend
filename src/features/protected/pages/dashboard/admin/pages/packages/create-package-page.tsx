"use client";

import DashboardPageLayout from "@/features/protected/pages/dashboard/shared/components/dashboard-page-layout";
import { useCreatePackage } from "./queries/use-packages";
import { PackageForm } from "./components/package-form";

export default function CreatePackagePage() {
  const mutation = useCreatePackage();
  return (
    <DashboardPageLayout
      title="New Package"
      subtitle="Define a new lesson package for students."
    >
      <div className="max-w-xl">
        <PackageForm mutation={mutation} />
      </div>
    </DashboardPageLayout>
  );
}

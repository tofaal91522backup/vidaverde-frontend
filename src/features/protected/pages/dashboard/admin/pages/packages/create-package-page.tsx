"use client";

import { Button } from "@/components/ui/button";
import DashboardPageLayout from "@/features/protected/pages/dashboard/shared/components/dashboard-page-layout";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { PackageForm } from "./components/package-form";
import { useCreatePackage } from "./queries/use-packages";

export default function CreatePackagePage() {
  const mutation = useCreatePackage();

  return (
    <DashboardPageLayout
      maxWidth="max-w-6xl"
      title="New Package"
      subtitle="Define a new lesson package for students."
      action={
        <Button variant="outline" asChild>
          <Link href="/dashboard/admin/packages">
            <ArrowLeft className="size-4" />
            All packages
          </Link>
        </Button>
      }
    >
      <PackageForm mutation={mutation} submitLabel="Create package" />
    </DashboardPageLayout>
  );
}

"use client";

import AsyncStateWrapper from "@/components/shared/async-state-wrapper";
import DashboardPageLayout from "@/features/protected/pages/dashboard/shared/components/dashboard-page-layout";
import type { AdminPackage } from "@/features/protected/pages/dashboard/admin/types/admin.types";
import { PackageForm } from "./components/package-form";
import { usePackageDetails, useUpdatePackage } from "./queries/use-packages";
import type { PackageFormValues } from "./schemas/package.schema";

/**
 * API response-e computed field (`title`, `description`, `lang`) ar `id`,
 * `created_at` thake — egula form-e dhukle submit-er shomoy backend-e chole jeto.
 * Tai shudhu form-er nijer field neওয়া hoy.
 */
function toFormValues(pkg: AdminPackage): PackageFormValues {
  return {
    title_en: pkg.title_en ?? "",
    title_es: pkg.title_es ?? "",
    description_en: pkg.description_en ?? "",
    description_es: pkg.description_es ?? "",
    image_url: pkg.image_url ?? "",
    total_classes: pkg.total_classes ?? 1,
    validity_days: pkg.validity_days ?? 90,
    price: pkg.price ?? "",
    is_first_lesson: pkg.is_first_lesson ?? false,
    sort_order: pkg.sort_order ?? 0,
    active: pkg.active ?? true,
  };
}

export default function EditPackagePage({ id }: { id: string }) {
  const { data, isLoading, isError } = usePackageDetails(id);
  const mutation = useUpdatePackage(id);

  return (
    <DashboardPageLayout
      title="Edit Package"
      subtitle={data ? `Editing: ${data.title_en}` : undefined}
    >
      <div className="max-w-3xl">
        <AsyncStateWrapper
          loading={isLoading}
          error={isError ? "Could not load this package." : null}
        >
          {/* Data asar por-i mount, jate defaultValues thik thake */}
          {data && (
            <PackageForm mutation={mutation} defaultValues={toFormValues(data)} />
          )}
        </AsyncStateWrapper>
      </div>
    </DashboardPageLayout>
  );
}

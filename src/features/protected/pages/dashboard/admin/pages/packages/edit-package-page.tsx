"use client";

import AsyncStateWrapper from "@/components/shared/async-state-wrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { AdminPackage } from "@/features/protected/pages/dashboard/admin/types/admin.types";
import DashboardPageLayout from "@/features/protected/pages/dashboard/shared/components/dashboard-page-layout";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
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
    // Backend `teachers` (uuid) ar `teacher_names` duita-i dey; `teacher_names`
    // read-only, tai shudhu `teachers` form-e ashe.
    teachers: pkg.teachers ?? [],
  };
}

/** Spinner-er cheye form-er akar-er skeleton kom jhatka lage */
function EditPackageSkeleton() {
  return (
    <div className="space-y-5">
      {[0, 1, 2].map((i) => (
        <Card key={i} className="py-0">
          <CardContent className="space-y-4 p-5">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-3 w-64" />
            <div className="grid gap-4 sm:grid-cols-2">
              <Skeleton className="h-9 w-full" />
              <Skeleton className="h-9 w-full" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function EditPackagePage({ id }: { id: string }) {
  const { data, isLoading, isError } = usePackageDetails(id);
  const mutation = useUpdatePackage(id);

  return (
    <DashboardPageLayout
      maxWidth="max-w-6xl"
      title="Edit Package"
      subtitle="Changes go live on the pricing page as soon as you save."
      action={
        <Button variant="outline" asChild>
          <Link href="/dashboard/admin/packages">
            <ArrowLeft className="size-4" />
            All packages
          </Link>
        </Button>
      }
    >
      <div className="space-y-5">
        <AsyncStateWrapper
          loading={isLoading}
          error={isError ? "Could not load this package." : null}
          loaderFallback={<EditPackageSkeleton />}
        >
          {/* Data asar por-i mount, jate defaultValues thik thake */}
          {data && (
            <>
              <Card className="py-0">
                <CardContent className="flex flex-wrap items-center justify-between gap-3 p-5">
                  <div className="min-w-0">
                    <p className="truncate text-lg font-semibold">
                      {data.title_en}
                    </p>
                    <p className="truncate text-sm text-muted-foreground">
                      ${data.price} · {data.total_classes} classes ·{" "}
                      {data.validity_days} days
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant={data.active ? "secondary" : "outline"}>
                      {data.active ? "Visible to students" : "Hidden"}
                    </Badge>
                    {data.is_first_lesson && (
                      <Badge variant="secondary">First lesson package</Badge>
                    )}
                    <Badge variant="outline">
                      {data.teachers?.length
                        ? `${data.teachers.length} teacher${data.teachers.length === 1 ? "" : "s"} only`
                        : "All teachers"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <PackageForm
                mutation={mutation}
                defaultValues={toFormValues(data)}
                submitLabel="Save changes"
              />
            </>
          )}
        </AsyncStateWrapper>
      </div>
    </DashboardPageLayout>
  );
}

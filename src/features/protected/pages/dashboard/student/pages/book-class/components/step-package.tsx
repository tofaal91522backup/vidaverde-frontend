"use client";

import AsyncStateWrapper from "@/components/shared/async-state-wrapper";
import { Badge } from "@/components/ui/badge";
import { useMyPackages } from "@/features/protected/pages/dashboard/student/pages/my-packages/queries/use-my-packages";
import { formatLocalDate } from "@/features/protected/pages/dashboard/student/utils/format-local-datetime";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function StepPackage({
  selectedId,
  onSelect,
}: {
  selectedId: string | null;
  /**
   * Duita id-i lage.
   *
   * `studentPackageId` (`StudentPackage.id`) jay `POST /student/sessions/` e
   * `student_package` hisebe. `cataloguePackageId` (`StudentPackage.package`)
   * jay `GET /public/packages/:id/teachers/` e — oi package-e kon teacher
   * allowed seta jante. Ei duita golale khali list ashe, kono error na.
   */
  onSelect: (studentPackageId: string, cataloguePackageId: string) => void;
}) {
  const { data, isLoading, isError } = useMyPackages();

  // `can_book` = paid + expire hoy nai + at least 1 class baki. Backend computed.
  const bookable = (data?.results ?? []).filter((pkg) => pkg.can_book);

  return (
    <AsyncStateWrapper
      loading={isLoading}
      error={isError ? "Could not load your packages." : null}
    >
      {bookable.length === 0 ? (
        <div className="rounded-xl border border-dashed p-6 text-center">
          <p className="text-sm font-medium">No package available to book</p>
          <p className="mt-1 text-sm text-muted-foreground">
            You need a paid package with classes remaining.
          </p>
          <Link
            href="/dashboard/student/my-packages"
            className="mt-3 inline-block text-sm font-medium text-primary hover:underline"
          >
            View my packages
          </Link>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {bookable.map((pkg) => (
            <button
              key={pkg.id}
              type="button"
              onClick={() => onSelect(pkg.id, pkg.package)}
              className={cn(
                "flex flex-col gap-2 rounded-xl border p-4 text-left transition",
                selectedId === pkg.id
                  ? "border-primary bg-primary/5"
                  : "hover:border-foreground/40",
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <span className="font-semibold text-sm">
                  {pkg.package_title}
                </span>
                <Badge variant="secondary" className="shrink-0 text-xs">
                  {pkg.classes_remaining} left
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Expires {formatLocalDate(pkg.expires_at)}
              </p>
            </button>
          ))}
        </div>
      )}
    </AsyncStateWrapper>
  );
}

"use client";

import AsyncStateWrapper from "@/components/shared/async-state-wrapper";
import DashboardPageLayout from "@/features/protected/pages/dashboard/shared/components/dashboard-page-layout";
import { PackageCard } from "./components/package-card";
import { useMyPackages } from "./queries/use-my-packages";

export default function MyPackagesIndex() {
  const { data, isLoading, isError } = useMyPackages();

  const packages = data?.results ?? [];
  const active = packages.filter((pkg) => pkg.can_book);
  const past = packages.filter((pkg) => !pkg.can_book);

  return (
    <DashboardPageLayout
      title="My Packages"
      subtitle="Overview of all your purchased lesson packages and remaining class balance."
    >
      <AsyncStateWrapper
        loading={isLoading}
        error={isError ? "Failed to load your packages." : null}
      >
        <div className="space-y-8">
          {active.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Active
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {active.map((pkg) => (
                  <PackageCard key={pkg.id} pkg={pkg} />
                ))}
              </div>
            </section>
          )}

          {past.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Past / Completed
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {past.map((pkg) => (
                  <PackageCard key={pkg.id} pkg={pkg} />
                ))}
              </div>
            </section>
          )}

          {packages.length === 0 && (
            <p className="text-sm text-muted-foreground">
              You have not purchased any packages yet.
            </p>
          )}
        </div>
      </AsyncStateWrapper>
    </DashboardPageLayout>
  );
}

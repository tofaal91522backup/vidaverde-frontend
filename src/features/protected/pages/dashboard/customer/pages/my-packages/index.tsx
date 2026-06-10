"use client";

import DashboardPageLayout from "@/features/protected/pages/dashboard/shared/components/dashboard-page-layout";
import { useMyPackages } from "./queries/use-my-packages";
import { PackageCard } from "./components/package-card";

export default function MyPackagesIndex() {
  const { data: packages = [], isLoading } = useMyPackages();

  const active = packages.filter((p) => p.isActive);
  const past = packages.filter((p) => !p.isActive);

  return (
    <DashboardPageLayout
      title="My Packages"
      subtitle="Overview of all your purchased lesson packages and remaining class balance."
    >
      {isLoading ? (
        <p className="text-sm text-muted-foreground">Loading packages...</p>
      ) : (
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
      )}
    </DashboardPageLayout>
  );
}

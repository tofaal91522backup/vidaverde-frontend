import { Button } from "@/components/ui/button";
import DashboardPageLayout from "@/features/protected/pages/dashboard/shared/components/dashboard-page-layout";
import { Plus } from "lucide-react";
import Link from "next/link";
import { PackagesTable } from "./components/packages-table";

export default function PackagesIndex() {
  return (
    <DashboardPageLayout
      title="Manage Packages"
      subtitle="Create and manage lesson packages available for students to purchase."
      /* Add button toolbar theke ekhane — filter gula tokhon jayga pay */
      action={
        <Button asChild>
          <Link href="/dashboard/admin/packages/create">
            <Plus className="h-4 w-4" />
            New Package
          </Link>
        </Button>
      }
    >
      <PackagesTable />
    </DashboardPageLayout>
  );
}

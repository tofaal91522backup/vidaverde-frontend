import DashboardPageLayout from "@/features/protected/pages/dashboard/shared/components/dashboard-page-layout";
import { PackagesTable } from "./components/packages-table";

export default function PackagesIndex() {
  return (
    <DashboardPageLayout
      title="Manage Packages"
      subtitle="Create and manage lesson packages available for students to purchase."
    >
      <PackagesTable />
    </DashboardPageLayout>
  );
}

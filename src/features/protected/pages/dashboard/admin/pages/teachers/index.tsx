import DashboardPageLayout from "@/features/protected/pages/dashboard/shared/components/dashboard-page-layout";
import { TeachersTable } from "./components/teachers-table";

export default function TeachersIndex() {
  return (
    <DashboardPageLayout
      title="Manage Teachers"
      subtitle="Add, edit, deactivate teachers and manage their weekly availability."
    >
      <TeachersTable />
    </DashboardPageLayout>
  );
}

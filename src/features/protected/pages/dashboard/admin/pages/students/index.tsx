import DashboardPageLayout from "@/features/protected/pages/dashboard/shared/components/dashboard-page-layout";
import { StudentsTable } from "./components/students-table";

export default function StudentsIndex() {
  return (
    <DashboardPageLayout
      title="Students"
      subtitle="Everyone enrolled at the school. Profiles are read-only — students edit their own details."
    >
      <StudentsTable />
    </DashboardPageLayout>
  );
}

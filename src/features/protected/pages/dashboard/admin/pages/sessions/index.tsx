import DashboardPageLayout from "@/features/protected/pages/dashboard/shared/components/dashboard-page-layout";
import { SessionsTable } from "./components/sessions-table";

export default function SessionsIndex() {
  return (
    <DashboardPageLayout
      title="Manage Sessions"
      subtitle="View upcoming and past sessions. Mark sessions as completed, no-show, or rescheduled."
    >
      <SessionsTable />
    </DashboardPageLayout>
  );
}

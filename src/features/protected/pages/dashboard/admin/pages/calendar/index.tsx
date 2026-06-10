import DashboardPageLayout from "@/features/protected/pages/dashboard/shared/components/dashboard-page-layout";
import { AdminCalendar } from "./components/admin-calendar";

export default function CalendarIndex() {
  return (
    <DashboardPageLayout
      title="Admin Calendar"
      subtitle="View all sessions across teachers. Filter by teacher, switch between monthly and weekly views."
    >
      <AdminCalendar />
    </DashboardPageLayout>
  );
}

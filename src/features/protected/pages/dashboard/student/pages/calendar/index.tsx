import DashboardPageLayout from "@/features/protected/pages/dashboard/shared/components/dashboard-page-layout";
import { StudentCalendar } from "./components/student-calendar";

export default function StudentCalendarIndex() {
  return (
    <DashboardPageLayout
      title="My Calendar"
      subtitle="Your upcoming and past sessions. All times are shown in your local timezone. Click any session to view details and join the meeting."
    >
      <StudentCalendar />
    </DashboardPageLayout>
  );
}

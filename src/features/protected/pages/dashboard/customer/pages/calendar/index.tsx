import DashboardPageLayout from "@/features/protected/pages/dashboard/shared/components/dashboard-page-layout";
import { CustomerCalendar } from "./components/customer-calendar";

export default function CustomerCalendarIndex() {
  return (
    <DashboardPageLayout
      title="My Calendar"
      subtitle="Your upcoming and past sessions. All times are shown in your local timezone. Click any session to view details and join the meeting."
    >
      <CustomerCalendar />
    </DashboardPageLayout>
  );
}

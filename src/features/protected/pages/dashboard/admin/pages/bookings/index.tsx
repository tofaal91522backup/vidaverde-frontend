import DashboardPageLayout from "@/features/protected/pages/dashboard/shared/components/dashboard-page-layout";
import { BookingsTable } from "./components/bookings-table";

export default function BookingsIndex() {
  return (
    <DashboardPageLayout
      title="Manage Bookings"
      subtitle="View and filter all student bookings. Export filtered results as CSV."
    >
      <BookingsTable />
    </DashboardPageLayout>
  );
}

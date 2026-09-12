import DashboardPageLayout from "@/features/protected/pages/dashboard/shared/components/dashboard-page-layout";
import { TestimonialsTable } from "./components/testimonials-table";

export default function TestimonialsIndex() {
  return (
    <DashboardPageLayout
      title="Testimonials"
      subtitle="Student outcomes shown on the public site. Only 'Shown' ones appear there."
    >
      <TestimonialsTable />
    </DashboardPageLayout>
  );
}

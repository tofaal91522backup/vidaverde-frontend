import DashboardPageLayout from "@/features/protected/pages/dashboard/shared/components/dashboard-page-layout";
import { LeadsTable } from "./components/leads-table";

export default function LeadsIndex() {
  return (
    <DashboardPageLayout
      title="Leads"
      subtitle="Everyone who downloaded the free guide. Read-only — the nurture sequence runs automatically."
    >
      <LeadsTable />
    </DashboardPageLayout>
  );
}

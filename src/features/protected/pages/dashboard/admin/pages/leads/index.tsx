import DashboardPageLayout from "@/features/protected/pages/dashboard/shared/components/dashboard-page-layout";
import { ExportLeadsButton, LeadsTable } from "./components/leads-table";

export default function LeadsIndex() {
  return (
    <DashboardPageLayout
      title="Leads"
      subtitle="Everyone who downloaded the free guide. Read-only — the nurture sequence runs automatically."
      action={<ExportLeadsButton />}
    >
      <LeadsTable />
    </DashboardPageLayout>
  );
}

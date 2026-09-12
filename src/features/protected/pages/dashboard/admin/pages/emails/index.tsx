import DashboardPageLayout from "@/features/protected/pages/dashboard/shared/components/dashboard-page-layout";
import { EmailsTable } from "./components/emails-table";

export default function EmailsIndex() {
  return (
    <DashboardPageLayout
      title="Email Outbox"
      subtitle="Queued and delivered emails. Failed messages are retried automatically up to three times."
    >
      <EmailsTable />
    </DashboardPageLayout>
  );
}

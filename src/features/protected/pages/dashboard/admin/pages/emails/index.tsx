import DashboardPageLayout from "@/features/protected/pages/dashboard/shared/components/dashboard-page-layout";
import { EmailsTable } from "./components/emails-table";

export default function EmailsIndex() {
  return (
    <DashboardPageLayout
      title="Email Outbox"
      subtitle="What is queued, what went out, and what failed. Read-only — the mailer sends these automatically."
    >
      <EmailsTable />
    </DashboardPageLayout>
  );
}

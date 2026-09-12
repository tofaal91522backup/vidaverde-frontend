import DashboardPageLayout from "@/features/protected/pages/dashboard/shared/components/dashboard-page-layout";
import { InvoicesTable } from "./components/invoices-table";

export default function InvoicesIndex() {
  return (
    <DashboardPageLayout
      title="My Invoices"
      subtitle="View all your payment records. Click the PDF button on any row to download the invoice."
    >
      <InvoicesTable />
    </DashboardPageLayout>
  );
}

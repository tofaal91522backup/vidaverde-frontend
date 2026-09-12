import DashboardPageLayout from "@/features/protected/pages/dashboard/shared/components/dashboard-page-layout";
import { ContactMessagesTable } from "./components/contact-messages-table";

export default function ContactMessagesIndex() {
  return (
    <DashboardPageLayout
      title="Enquiries"
      subtitle="Messages sent from the contact form. The message itself is a record and cannot be edited."
    >
      <ContactMessagesTable />
    </DashboardPageLayout>
  );
}

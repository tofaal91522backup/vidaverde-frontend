import { getSession } from "@/features/auth/utils/session";
import DashboardPageLayout from "@/features/protected/pages/dashboard/shared/components/dashboard-page-layout";
import { redirect } from "next/navigation";
import { AdminsTable } from "./components/admins-table";

/** Server-side route gate; sidebar hiding alone would not protect direct URLs. */
export default async function AdminsIndex() {
  const session = await getSession();

  if (session?.user.adminRole !== "master") {
    redirect("/dashboard/admin");
  }

  return (
    <DashboardPageLayout
      title="Admin Accounts"
      subtitle="Master-only account management. Passwords are never displayed."
    >
      <AdminsTable />
    </DashboardPageLayout>
  );
}

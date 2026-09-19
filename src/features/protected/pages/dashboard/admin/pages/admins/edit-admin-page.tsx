import { getSession } from "@/features/auth/utils/session";
import DashboardPageLayout from "@/features/protected/pages/dashboard/shared/components/dashboard-page-layout";
import { EditAdminContent } from "./components/edit-admin-content";

/** Server-e session pora hoy — nijer account chinte (role/active lock) */
export default async function EditAdminPage({ id }: { id: string }) {
  const session = await getSession();

  return (
    <DashboardPageLayout
      title="Edit Admin"
      subtitle="Change the name, role or password, or deactivate the account."
      maxWidth="max-w-3xl"
    >
      <EditAdminContent id={id} currentEmail={session?.user.email ?? ""} />
    </DashboardPageLayout>
  );
}

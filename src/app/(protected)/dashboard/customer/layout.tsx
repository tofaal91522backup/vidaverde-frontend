import { getSession } from "@/features/auth/utils/session";
import { CustomerSidebar } from "@/features/protected/pages/dashboard/customer/sidebar/customer-sidebar";
import DashboardShell from "@/features/protected/pages/dashboard/shared/components/dashboard-shell";

export default async function CustomerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  return (
    <DashboardShell sidebar={<CustomerSidebar session={session} />}>
      {children}
    </DashboardShell>
  );
}

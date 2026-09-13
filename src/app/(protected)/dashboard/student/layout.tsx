import { getSession } from "@/features/auth/utils/session";
import { StudentSidebar } from "@/features/protected/pages/dashboard/student/sidebar/student-sidebar";
import DashboardShell from "@/features/protected/pages/dashboard/shared/components/dashboard-shell";

export default async function StudentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  return (
    <DashboardShell user={session?.user} sidebar={<StudentSidebar />}>
      {children}
    </DashboardShell>
  );
}

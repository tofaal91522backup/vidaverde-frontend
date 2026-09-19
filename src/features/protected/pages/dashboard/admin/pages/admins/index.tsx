import { Button } from "@/components/ui/button";
import { getSession } from "@/features/auth/utils/session";
import DashboardPageLayout from "@/features/protected/pages/dashboard/shared/components/dashboard-page-layout";
import { Plus } from "lucide-react";
import Link from "next/link";
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
      subtitle="Who can sign in to this dashboard. Managers run the school; only masters can manage these accounts."
      action={
        <Button asChild>
          <Link href="/dashboard/admin/admins/create">
            <Plus className="h-4 w-4" />
            New Admin
          </Link>
        </Button>
      }
    >
      {/* Nijer row chinte — backend nijeke deactivate korte dey na (400) */}
      <AdminsTable currentEmail={session.user.email} />
    </DashboardPageLayout>
  );
}

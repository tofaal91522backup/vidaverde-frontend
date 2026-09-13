import { Button } from "@/components/ui/button";
import DashboardPageLayout from "@/features/protected/pages/dashboard/shared/components/dashboard-page-layout";
import { Plus } from "lucide-react";
import Link from "next/link";
import { TeachersTable } from "./components/teachers-table";

export default function TeachersIndex() {
  return (
    <DashboardPageLayout
      title="Manage Teachers"
      subtitle="Add, edit, deactivate teachers and manage their weekly availability."
      /* Add button toolbar theke ekhane — filter gula tokhon jayga pay */
      action={
        <Button asChild>
          <Link href="/dashboard/admin/teachers/create">
            <Plus className="h-4 w-4" />
            Add Teacher
          </Link>
        </Button>
      }
    >
      <TeachersTable />
    </DashboardPageLayout>
  );
}

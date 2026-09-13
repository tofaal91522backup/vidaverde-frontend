import { Button } from "@/components/ui/button";
import DashboardPageLayout from "@/features/protected/pages/dashboard/shared/components/dashboard-page-layout";
import { Plus } from "lucide-react";
import Link from "next/link";
import { BlogsTable } from "./components/blogs-table";

export default function BlogsIndex() {
  return (
    <DashboardPageLayout
      title="Manage Blogs"
      subtitle="Create, edit, publish or draft blog posts."
      /* Add button toolbar theke ekhane — filter gula tokhon jayga pay */
      action={
        <Button asChild>
          <Link href="/dashboard/admin/blogs/create">
            <Plus className="h-4 w-4" />
            New Post
          </Link>
        </Button>
      }
    >
      <BlogsTable />
    </DashboardPageLayout>
  );
}

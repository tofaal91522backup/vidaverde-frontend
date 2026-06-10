import DashboardPageLayout from "@/features/protected/pages/dashboard/shared/components/dashboard-page-layout";
import { BlogsTable } from "./components/blogs-table";

export default function BlogsIndex() {
  return (
    <DashboardPageLayout
      title="Manage Blogs"
      subtitle="Create, edit, publish or draft blog posts."
    >
      <BlogsTable />
    </DashboardPageLayout>
  );
}

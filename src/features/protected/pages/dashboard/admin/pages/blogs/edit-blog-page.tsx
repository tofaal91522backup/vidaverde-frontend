"use client";

import DashboardPageLayout from "@/features/protected/pages/dashboard/shared/components/dashboard-page-layout";
import { useBlogDetails, useUpdateBlog } from "./queries/use-blogs";
import { BlogForm } from "./components/blog-form";

export default function EditBlogPage({ id }: { id: string }) {
  const { data, isLoading } = useBlogDetails(id);
  const mutation = useUpdateBlog(id);

  if (isLoading) {
    return (
      <DashboardPageLayout title="Edit Blog Post">
        <p className="text-muted-foreground text-sm">Loading post...</p>
      </DashboardPageLayout>
    );
  }

  return (
    <DashboardPageLayout
      title="Edit Blog Post"
      subtitle={`Editing: ${data?.title}`}
    >
      <div className="max-w-3xl">
        <BlogForm mutation={mutation} defaultValues={data} />
      </div>
    </DashboardPageLayout>
  );
}

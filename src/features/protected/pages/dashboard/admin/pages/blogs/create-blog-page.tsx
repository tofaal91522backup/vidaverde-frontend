"use client";

import DashboardPageLayout from "@/features/protected/pages/dashboard/shared/components/dashboard-page-layout";
import { useCreateBlog } from "./queries/use-blogs";
import { BlogForm } from "./components/blog-form";

export default function CreateBlogPage() {
  const mutation = useCreateBlog();
  return (
    <DashboardPageLayout
      title="New Blog Post"
      subtitle="Write and publish a new post to the blog."
    >
      <div className="max-w-3xl">
        <BlogForm mutation={mutation} />
      </div>
    </DashboardPageLayout>
  );
}

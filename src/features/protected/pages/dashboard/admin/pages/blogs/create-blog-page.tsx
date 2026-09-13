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
      /* Package/teacher form-er moto 6xl — form-ta xl:-e duita column-e bhage,
         ar Tailwind breakpoint viewport dhore chole, container dhore na. Chhoto
         container-e oi duita column chepe jeto. */
      maxWidth="max-w-6xl"
    >
      <BlogForm mutation={mutation} />
    </DashboardPageLayout>
  );
}

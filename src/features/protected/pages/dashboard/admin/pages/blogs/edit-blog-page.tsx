"use client";

import AsyncStateWrapper from "@/components/shared/async-state-wrapper";
import DashboardPageLayout from "@/features/protected/pages/dashboard/shared/components/dashboard-page-layout";
import type { AdminBlog } from "@/features/protected/pages/dashboard/admin/types/admin.types";
import { BlogForm } from "./components/blog-form";
import { useBlogDetails, useUpdateBlog } from "./queries/use-blogs";
import type { BlogFormValues } from "./schemas/blog.schema";

/**
 * Read-only ar computed field (`reading_time`, `author`, `thumbnail`,
 * `published_at`, `title`, `body`, `lang`) form-e dhukiye deওয়া jabe na —
 * submit-er shomoy backend-e chole jeto.
 */
function toFormValues(blog: AdminBlog): BlogFormValues {
  return {
    title_en: blog.title_en ?? "",
    title_es: blog.title_es ?? "",
    slug: blog.slug ?? "",
    excerpt_en: blog.excerpt_en ?? "",
    excerpt_es: blog.excerpt_es ?? "",
    body_en: blog.body_en ?? "",
    body_es: blog.body_es ?? "",
    image_urls: blog.image_urls ?? [],
    category: blog.category ?? "school_news",
    status: blog.status ?? "draft",
    meta_title: blog.meta_title ?? "",
    meta_description: blog.meta_description ?? "",
  };
}

export default function EditBlogPage({ id }: { id: string }) {
  const { data, isLoading, isError } = useBlogDetails(id);
  const mutation = useUpdateBlog(id);

  return (
    <DashboardPageLayout
      title="Edit Blog Post"
      subtitle={data ? `Editing: ${data.title_en}` : undefined}
      /* Package/teacher form-er moto 6xl — niche-r note dekho create page-e */
      maxWidth="max-w-6xl"
    >
      <AsyncStateWrapper
        loading={isLoading}
        error={isError ? "Could not load this post." : null}
      >
        {data && (
          <div className="space-y-5">
            {/* Backend-er computed field — edit kora jay na, kintu dekhale kaje lage */}
            <div className="flex flex-wrap gap-4 rounded-lg border bg-muted/30 p-3 text-xs text-muted-foreground">
              <span>Author: {data.author || "—"}</span>
              <span>Reading time: {data.reading_time} min</span>
            </div>

            <BlogForm mutation={mutation} defaultValues={toFormValues(data)} />
          </div>
        )}
      </AsyncStateWrapper>
    </DashboardPageLayout>
  );
}

import { ADMIN_DASHBOARD_QUERY_KEY } from "@/features/protected/pages/dashboard/admin/pages/overview/queries/use-admin-dashboard";
import type {
  AdminBlog,
  AdminBlogsResponse,
  BlogCategory,
  BlogStatus,
} from "@/features/protected/pages/dashboard/admin/types/admin.types";
import { useFetchData } from "@/hooks/use-fetch-data";
import { useMutationHandler } from "@/hooks/use-mutation-handler";
import { makeEndpoint } from "@/lib/http/make-endpoint";
import { request } from "@/lib/http/request";

export const BLOGS_QUERY_KEY = "admin-blogs";
export const BLOG_DETAILS_QUERY_KEY = "admin-blog-details";

type BlogListParams = {
  page?: number;
  status?: BlogStatus | "";
  category?: BlogCategory | "";
};

/**
 * GET /administrator/blogs/ — paginated. `?status=` ar `?category=` diye filter.
 *
 * ⚠️ Ei endpoint-e **search param nai** — bru te shudhu status ar category ache.
 *
 * docs/bruno/administrator/blogs.bru
 */
export function useBlogs(params: BlogListParams = {}) {
  const query = {
    p: params.page,
    status: params.status || undefined,
    category: params.category || undefined,
  };

  return useFetchData<AdminBlogsResponse>({
    url: makeEndpoint("/administrator/blogs/", query),
    querykey: [BLOGS_QUERY_KEY, query],
  });
}

/** GET /administrator/blogs/:id/ — bare object */
export function useBlogDetails(id: string) {
  return useFetchData<AdminBlog>({
    url: `/administrator/blogs/${id}/`,
    querykey: [BLOG_DETAILS_QUERY_KEY, id],
    options: { enabled: Boolean(id) },
  });
}

type BlogPayload = Partial<
  Pick<
    AdminBlog,
    | "title_en"
    | "title_es"
    | "slug"
    | "excerpt_en"
    | "excerpt_es"
    | "body_en"
    | "body_es"
    | "image_urls"
    | "category"
    | "status"
    | "meta_title"
    | "meta_description"
  >
>;

/** POST /administrator/blogs/ — bare object ferot dey */
export function useCreateBlog() {
  return useMutationHandler<AdminBlog, BlogPayload>({
    mutationFn: (data) => request.post("/administrator/blogs/", data),
    // Dashboard-e `blogs_draft` count ache, tai oita-o bashi hoye jay
    invalidateKeys: [[BLOGS_QUERY_KEY], [ADMIN_DASHBOARD_QUERY_KEY]],
    successMessage: "Blog post created.",
    errorMessage: "Could not create the blog post.",
    debugLabel: "CreateBlog",
  });
}

/** PATCH /administrator/blogs/:id/ */
export function useUpdateBlog(id: string) {
  return useMutationHandler<AdminBlog, BlogPayload>({
    mutationFn: (data) => request.patch(`/administrator/blogs/${id}/`, data),
    invalidateKeys: [
      [BLOGS_QUERY_KEY],
      [BLOG_DETAILS_QUERY_KEY, id],
      [ADMIN_DASHBOARD_QUERY_KEY],
    ],
    successMessage: "Blog post updated.",
    errorMessage: "Could not update the blog post.",
    debugLabel: "UpdateBlog",
  });
}

/**
 * Draft ↔ published toggle.
 *
 * `published` kora hole backend `published_at` **ekbar-i** stamp kore — pore abar
 * draft kore abar publish korleo prothom tarikh-i thake.
 */
export function useToggleBlogStatus() {
  return useMutationHandler<AdminBlog, { id: string; status: BlogStatus }>({
    mutationFn: ({ id, status }) =>
      request.patch(`/administrator/blogs/${id}/`, { status }),
    invalidateKeys: [[BLOGS_QUERY_KEY], [ADMIN_DASHBOARD_QUERY_KEY]],
    successMessage: "Blog status updated.",
    errorMessage: "Could not update the blog status.",
    debugLabel: "ToggleBlogStatus",
  });
}

import type {
  PublicBlogCategoriesResponse,
  PublicBlogCategory,
  PublicBlogsResponse,
  PublicLanguage,
} from "@/features/marketing/types/public-api.types";
import { useFetchData } from "@/hooks/use-fetch-data";
import { makeEndpoint } from "@/lib/http/make-endpoint";

export const PUBLIC_BLOGS_QUERY_KEY = "public-blogs";
export const PUBLIC_BLOG_CATEGORIES_QUERY_KEY = "public-blog-categories";

/**
 * Backend default 10, max 500.
 *
 * ⚠️ 10-i rakha hoyeche ichchhe kore: shared `<Pagination>` component
 * `Math.ceil(total / 10)` **hardcode** kore. Onno page size dile page count
 * vul hoto ar shesh page gulo-te jawa-i jeto na.
 */
export const PUBLIC_BLOGS_PAGE_SIZE = 10;

type PublicBlogsParams = {
  lang: PublicLanguage;
  /** Page number — backend-e param-er naam `p`. */
  p: number;
  page_size: number;
  /** Khali mane shob category. */
  category?: PublicBlogCategory;
};

/**
 * GET /public/blogs/ — shudhu published post; draft ekhane ashe na.
 *
 * docs/bruno/public/blogs.bru
 */
export function usePublicBlogs(params: PublicBlogsParams) {
  return useFetchData<PublicBlogsResponse>({
    url: makeEndpoint("/public/blogs/", params),
    querykey: [PUBLIC_BLOGS_QUERY_KEY, params],
    client: "public",
  });
}

/**
 * GET /public/blogs/categories/ — valid category value + display label.
 *
 * Label gula backend theke newa hoy, frontend-e hardcode kora hoy na — na hole
 * backend-e notun category ele pill list purono theke jeto.
 */
export function usePublicBlogCategories(params: { lang: PublicLanguage }) {
  return useFetchData<PublicBlogCategoriesResponse>({
    url: makeEndpoint("/public/blogs/categories/", params),
    querykey: [PUBLIC_BLOG_CATEGORIES_QUERY_KEY, params],
    client: "public",
  });
}

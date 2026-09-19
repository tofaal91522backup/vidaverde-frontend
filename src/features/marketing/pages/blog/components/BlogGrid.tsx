"use client";

import Pagination from "@/components/shared/pagination";
import {
  PUBLIC_BLOGS_PAGE_SIZE,
  usePublicBlogCategories,
  usePublicBlogs,
} from "@/features/marketing/pages/blog/queries/use-public-blogs";
import type { PublicBlogCategory } from "@/features/marketing/types/public-api.types";
import { BLOG_CATEGORY_ES } from "@/features/marketing/pages/blog/utils/blog-category-es";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/providers/language-provider";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

function formatPublishedAt(value: string, language: string) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString(language === "es" ? "es-ES" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function BlogGrid() {
  const { language } = useLanguage();
  const [category, setCategory] = useState<PublicBlogCategory | "">("");
  const [page, setPage] = useState(1);

  const { data: categoryData } = usePublicBlogCategories({ lang: language });
  const categories = categoryData?.categories ?? [];

  const { data, isLoading, isError } = usePublicBlogs({
    lang: language,
    p: page,
    page_size: PUBLIC_BLOGS_PAGE_SIZE,
    category: category || undefined,
  });

  const posts = data?.results ?? [];

  /*
    Post-er Spanish admin na likhle `?lang=es` English pathay; shob shomoy
    `translate="no"` dile ES-e English-i theke jeto (Daniel, Otavalo…). Eki
    page-er English ene mile — shudhu school-er nijer Spanish Google theke
    bachai. EN-e eki query.
  */
  const { data: englishData } = usePublicBlogs({
    lang: "en",
    p: page,
    page_size: PUBLIC_BLOGS_PAGE_SIZE,
    category: category || undefined,
  });
  const englishPost = useMemo(
    () => new Map(englishData?.results.map((post) => [post.slug, post])),
    [englishData],
  );
  const own = (
    post: (typeof posts)[number],
    field: "title" | "excerpt",
  ) => post[field] !== englishPost.get(post.slug)?.[field];
  const categoryLabel = (value: string, label: string) =>
    (language === "es" && BLOG_CATEGORY_ES[value]) || label;

  /** Category bodlale prothom page-e fire jete hobe. */
  const selectCategory = (next: PublicBlogCategory | "") => {
    setCategory(next);
    setPage(1);
  };

  const pills: { value: PublicBlogCategory | ""; label: string }[] = [
    { value: "", label: "All" },
    ...categories.map((item) => ({
      value: item.value,
      label: categoryLabel(item.value, item.label),
    })),
  ];

  return (
    <>
      <div
        className="mb-8 flex flex-wrap gap-2"
        role="group"
        aria-label="Filter posts by category"
      >
        {pills.map((pill) => {
          const isActive = pill.value === category;
          return (
            <button
              key={pill.value || "all"}
              type="button"
              aria-pressed={isActive}
              onClick={() => selectCategory(pill.value)}
              className={cn(
                "rounded-full border px-3 py-1 text-[12px] font-medium transition",
                isActive
                  ? "border-vv-ink bg-vv-ink text-vv-bg"
                  : "border-vv-line bg-vv-bg-warm text-vv-ink-2 hover:border-vv-ink",
              )}
            >
              {/* "All" amader lekha, Google anubad koruk; baki gula upore hate */}
              <span translate={pill.value ? "no" : undefined}>{pill.label}</span>
            </button>
          );
        })}
      </div>

      {isLoading ? (
        <p className="text-vv-ink-2" role="status">
          Loading posts…
        </p>
      ) : isError ? (
        <p className="text-red-600" role="alert">
          Posts are unavailable right now. Please try again shortly.
        </p>
      ) : posts.length === 0 ? (
        <p className="text-vv-ink-2">
          No posts published in this category yet.
        </p>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.id}
                className="group flex flex-col overflow-hidden rounded-[22px] border border-vv-line bg-vv-bg transition hover:-translate-y-0.5 hover:border-vv-accent"
              >
                <div className="relative aspect-video overflow-hidden bg-vv-bg-warm">
                  {/* Backend `thumbnail` khali string dite pare — tokhon warm block-i thakbe */}
                  {post.thumbnail && (
                    <Image
                      src={post.thumbnail}
                      alt={post.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition duration-300 group-hover:scale-[1.03]"
                      unoptimized
                    />
                  )}
                </div>

                <div className="flex flex-1 flex-col gap-3 p-6">
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-vv-accent/20 px-2.5 py-0.5 text-[11px] font-semibold text-vv-accent-deep">
                      <span translate="no">
                        {categoryLabel(post.category, post.category_label)}
                      </span>
                    </span>
                    <span className="text-[11px] text-vv-ink-2">
                      {post.reading_time} min read
                    </span>
                  </div>

                  <h2 className="text-[18px] font-semibold leading-tight tracking-[-0.01em] text-vv-ink">
                    <span translate={own(post, "title") ? "no" : undefined}>
                      {post.title}
                    </span>
                  </h2>

                  <p className="flex-1 text-[13px] leading-[1.6] text-vv-ink-2">
                    <span translate={own(post, "excerpt") ? "no" : undefined}>
                      {post.excerpt}
                    </span>
                  </p>

                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[12px] text-vv-ink-2">
                      {formatPublishedAt(post.published_at, language)}
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1.5 text-[13px] font-medium text-vv-ink transition hover:text-vv-accent-deep"
                    >
                      Read more{" "}
                      <ChevronRight className="h-4 w-4 shrink-0 translate-y-0.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10">
            <Pagination
              page={page}
              total={data?.count ?? 0}
              onPageChange={setPage}
            />
          </div>
        </>
      )}
    </>
  );
}

import { DEFAULT_PUBLIC_LANGUAGE } from "@/features/marketing/constants/public-api";
import { getPublicBlogDetail } from "@/features/marketing/pages/blog/queries/get-public-blog-detail";
import { PostDetail } from "@/features/marketing/pages/blog/PostDetail";
import { notFound } from "next/navigation";

/**
 * `generateStaticParams` shoriye deওয়া holo — slug list ekhon CMS-e, build-time-e
 * jana jay na. Notun post publish korle rebuild chhara-i dekha jabe.
 */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPublicBlogDetail(slug, DEFAULT_PUBLIC_LANGUAGE);
  if (!post) return {};

  // Backend SEO field dile sheta, na hole documented title/excerpt fallback
  return {
    title: post.meta_title || `${post.title} | Vida Verde Blog`,
    description: post.meta_description || post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPublicBlogDetail(slug, DEFAULT_PUBLIC_LANGUAGE);

  // Draft ba na-thaka slug — API 404 dey, tai amader 404
  if (!post) notFound();

  return <PostDetail post={post} />;
}

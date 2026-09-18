import { DEFAULT_PUBLIC_LANGUAGE } from "@/features/marketing/constants/public-api";
import { getPublicBlogDetail } from "@/features/marketing/pages/blog/queries/get-public-blog-detail";
import { PostDetail } from "@/features/marketing/pages/blog/PostDetail";
import { ByLanguage } from "@/components/shared/by-language";
import { notFound } from "next/navigation";

/**
 * `generateStaticParams` shoriye dewa holo — slug list ekhon CMS-e, build-time-e
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

  /*
    Duita bhasha-i server-e. Age shudhu English ana hoto — admin `body_es`-e
    puro article Spanish-e likhleo keu kokhono dekhto na, Google English
    body-ta machine-translate kore dekhato.
  */
  const [en, es] = await Promise.all([
    getPublicBlogDetail(slug, "en"),
    getPublicBlogDetail(slug, "es"),
  ]);

  // Draft ba na-thaka slug — API 404 dey, tai amader 404
  if (!en) notFound();

  /*
    Spanish na likhle backend chup-chap English fire dey, ar tokhon-o
    `lang: "es"` bole — response dekhe bojha jay na. Kintu ekhane duita
    pashapashi, tai field dhore milie dekha jay: English-er hubohu hole
    Spanish lekha hoy ni, oita Google-er hate chhere dewa hoy.
  */
  const spanish = es ?? en;
  const written = {
    title: spanish.title !== en.title,
    excerpt: spanish.excerpt !== en.excerpt,
    body: spanish.body !== en.body,
  };

  return (
    <ByLanguage
      en={<PostDetail post={en} />}
      es={<PostDetail post={spanish} handWritten={written} />}
    />
  );
}

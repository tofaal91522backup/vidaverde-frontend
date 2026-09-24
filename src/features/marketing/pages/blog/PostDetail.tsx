import { ByLanguage } from "@/components/shared/by-language";
import { LowestPrice } from "@/features/marketing/components/lowest-package-price";
import { Container } from "@/components/shared/Container";
import { DEFAULT_PUBLIC_LANGUAGE } from "@/features/marketing/constants/public-api";
import type { PublicBlogDetail } from "@/features/marketing/types/public-api.types";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { sanitizeBlogHtml } from "./utils/sanitize-blog-html";
import { BLOG_CATEGORY_ES } from "./utils/blog-category-es";

function formatPublishedAt(value: string, lang: string) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString(lang === "es" ? "es-ES" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

type HandWritten = { title: boolean; excerpt: boolean; body: boolean };

/**
 * `handWritten` — kon field admin nije Spanish-e likheche. Oigulo Google
 * Translate chhoy na (`translate="no"`); baki gula (English fallback) Google
 * anubad kore. English version-e dewa hoy na.
 */
export function PostDetail({
  post,
  handWritten,
}: {
  post: PublicBlogDetail;
  handWritten?: HandWritten;
}) {
  const keep = (field: keyof HandWritten) =>
    handWritten?.[field] ? ("no" as const) : undefined;

  const lang = post.lang ?? DEFAULT_PUBLIC_LANGUAGE;
  // Spanish version (`handWritten` ache) — category hate lekha, BlogGrid-er sathe mile
  const category = (value: string, label: string) => {
    const es = handWritten && BLOG_CATEGORY_ES[value];
    return es ? <span translate="no">{es}</span> : label;
  };
  // Server component — sanitize ekhanei hoy, browser kacha HTML pay na
  const body = sanitizeBlogHtml(post.body);
  // Backend already 3 tar beshi dey na, tobu UI-r dik theke cap
  const related = (post.related_posts ?? []).slice(0, 3);
  /*
    Detail response-e `thumbnail` nai — `image_urls` array ache, ar prothom ta-i
    thumbnail (admin blog form-eও ei niyom lekha: "The first image is used as
    the thumbnail on the blog index").

    Age ekhane `post.thumbnail` pora hocchilo, ja detail-e kokhono thake na —
    tai chhobi chup-chap uthe jeto, kono error chhara.
  */
  const heroImage = post.image_urls?.[0];

  return (
    <>
      <section
        className="bg-vv-bg-warm border-b border-vv-line"
        data-screen-label="01 Post Hero"
      >
        <Container>
          <div className="font-code text-vv-muted text-[12px] tracking-[0.06em] mb-6">
            Home <span className="mx-1 text-vv-line-2">/</span>{" "}
            <Link href="/blog" className="hover:text-vv-ink">
              Blog
            </Link>{" "}
            <span className="mx-1 text-vv-line-2">/</span>{" "}
            {category(post.category, post.category_label)}
          </div>
          <div className="mt-4 flex items-center gap-3">
            <span className="rounded-full bg-vv-accent/20 px-2.5 py-0.5 text-[11px] font-semibold text-vv-accent-deep">
              {category(post.category, post.category_label)}
            </span>
            <span className="text-[12px] text-vv-ink-2">
              {post.reading_time} min read
            </span>
            <span className="text-[12px] text-vv-ink-2">
              {formatPublishedAt(post.published_at, lang)}
            </span>
          </div>
          <h1
            translate={keep("title")}
            className="text-[clamp(36px,5vw,68px)] font-semibold tracking-[-0.03em] leading-none m-0 mt-4 mb-5"
          >
            {post.title}
          </h1>
          <p
            translate={keep("excerpt")}
            className="text-vv-ink-2 text-[clamp(17px,1.4vw,20px)] leading-normal max-w-[52ch] text-pretty m-0"
          >
            {post.excerpt}
          </p>
        </Container>
      </section>

      <section
        className="border-t border-vv-line py-12"
        data-screen-label="02 Post Body"
      >
        <Container>
          {/*
            `after:*` gula clearfix. Chhobi-ta `float-right`, ar float parent-er
            height-e gone na — tai chhoto body hole (jemon ek line) figure-ta
            container theke ber hoye niche-r CTA box-er upor giye porto.
            Clearfix parent-ke float-tuku porjonto lomba kore dey.
          */}
          <div className="text-[16px] leading-[1.75] text-vv-ink-2 after:block after:clear-both after:content-['']">
            {/* Chhobi optional — na thakle figure-i dekhano hoy na */}
            {heroImage && (
              <figure className="float-right mb-6 ml-8 w-[44%] max-w-[27rem] overflow-hidden rounded-[22px] border border-vv-line bg-vv-bg-warm max-[760px]:float-none max-[760px]:mb-8 max-[760px]:ml-0 max-[760px]:w-full max-[760px]:max-w-none">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={heroImage}
                    alt={post.title}
                    fill
                    sizes="(max-width: 760px) 100vw, 44vw"
                    className="object-cover"
                    unoptimized
                  />
                </div>
              </figure>
            )}

            <div
              translate={keep("body")}
              className="vv-prose"
              // `body` upore sanitizeBlogHtml() diye allowlist-e chhenke newa
              dangerouslySetInnerHTML={{ __html: body }}
            />
          </div>

          {/* Lead capture inline — `clear-both` jate kono obosthatei float-er
              pashe giye na boshe */}
          <div className="mt-12 clear-both rounded-xl border border-vv-accent bg-vv-accent/10 p-6">
            <h3 className="text-[18px] font-semibold text-vv-ink mb-2">
              Ready to put this into practice?
            </h3>
            <p className="text-[14px] text-vv-ink-2 mb-4">
              Book your first lesson with a Vida Verde teacher, from just{" "}
              <LowestPrice />. Includes a level assessment and personalised
              learning plan.
            </p>
            <Link
              href="/online-classes/book"
              className="inline-flex items-center justify-center gap-2.5 border border-vv-accent rounded-full cursor-pointer text-[15px] font-semibold tracking-[-0.005em] leading-none py-3.5 px-5.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-vv-accent text-vv-accent-deep hover:bg-vv-accent-hi hover:-translate-y-px"
            >
              {/* Google "Reserva mi primera lección" — baki site "clase" */}
              <span translate="no">
                <ByLanguage
                  en="Book My First Lesson"
                  es="Reserva tu primera clase"
                />
              </span>{" "}
              <ChevronRight className="h-4 w-4 shrink-0 translate-y-0.5" />
            </Link>
          </div>
        </Container>
      </section>

      {related.length > 0 && (
        <section
          className="border-t border-vv-line bg-vv-bg-warm py-12"
          data-screen-label="03 Related"
        >
          <Container>
            <h2 className="text-[22px] font-semibold tracking-[-0.02em] leading-[1.08] m-0 mb-6">
              Related Posts
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <article
                  key={item.id}
                  className="group flex flex-col overflow-hidden rounded-[22px] border border-vv-line bg-vv-bg transition hover:border-vv-accent"
                >
                  <div className="relative aspect-video overflow-hidden bg-vv-bg-warm">
                    {item.thumbnail && (
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        fill
                        sizes="(max-width: 820px) 50vw, 400px"
                        className="object-cover"
                        unoptimized
                      />
                    )}
                  </div>
                  <div className="flex flex-col gap-2 p-5 flex-1">
                    <span className="text-[11px] font-semibold text-vv-accent-deep">
                      {category(item.category, item.category_label)}
                    </span>
                    <h3 className="text-[16px] font-semibold text-vv-ink flex-1">
                      {item.title}
                    </h3>
                    <Link
                      href={`/blog/${item.slug}`}
                      className="inline-flex items-center gap-1.5 text-[13px] font-medium text-vv-ink hover:text-vv-accent-deep"
                    >
                      Read more{" "}
                      <ChevronRight className="h-4 w-4 shrink-0 translate-y-0.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-6">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-[13px] text-vv-ink-2 underline hover:text-vv-ink"
              >
                <ArrowLeft className="size-3.5" aria-hidden="true" />
                All posts
              </Link>
            </div>
          </Container>
        </section>
      )}
    </>
  );
}

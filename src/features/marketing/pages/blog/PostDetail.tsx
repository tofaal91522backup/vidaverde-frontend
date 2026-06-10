import { Container } from "@/components/shared/Container";
import type { BlogPost } from "./data/posts.data";
import { blogPosts } from "./data/posts.data";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function PostDetail({ post }: { post: BlogPost }) {
  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <section
        className="bg-vv-bg-warm border-b border-vv-line"
        data-screen-label="01 Post Hero"
      >
        <Container className="max-w-220">
          <div className="font-code text-vv-muted text-[12px] tracking-[0.06em] mb-6">
            Home <span className="mx-1 text-vv-line-2">/</span>{" "}
            <Link href="/blog" className="hover:text-vv-ink">
              Blog
            </Link>{" "}
            <span className="mx-1 text-vv-line-2">/</span> {post.category}
          </div>
          <div className="mt-4 flex items-center gap-3">
            <span className="rounded-full bg-vv-accent/20 px-2.5 py-0.5 text-[11px] font-semibold text-vv-accent-deep">
              {post.category}
            </span>
            <span className="text-[12px] text-vv-ink-2">
              {post.readingTime}
            </span>
            <span className="text-[12px] text-vv-ink-2">
              {new Date(post.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
          <h1 className="text-[clamp(36px,5vw,68px)] font-semibold tracking-[-0.03em] leading-none m-0 mt-4 mb-5">
            {post.title}
          </h1>
          <p className="text-vv-ink-2 text-[clamp(17px,1.4vw,20px)] leading-normal max-w-[52ch] text-pretty m-0">
            {post.excerpt}
          </p>
        </Container>
      </section>

      <section
        className="border-t border-vv-line py-12"
        data-screen-label="02 Post Body"
      >
        <Container className="max-w-220">
          <div className="relative aspect-video mb-10 overflow-hidden rounded-[22px] border border-vv-line">
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="(max-width: 820px) 100vw, 820px"
              className="object-cover"
              unoptimized
            />
          </div>
          <div className="flex flex-col gap-5">
            {post.body.map((para, i) => (
              <p key={i} className="text-[16px] leading-[1.75] text-vv-ink-2">
                {para}
              </p>
            ))}
          </div>

          {/* Lead capture inline */}
          <div className="mt-12 rounded-xl border border-vv-accent bg-vv-accent/10 p-6">
            <h3 className="text-[18px] font-semibold text-vv-ink mb-2">
              Ready to put this into practice?
            </h3>
            <p className="text-[14px] text-vv-ink-2 mb-4">
              Book your first lesson with a Vida Verde teacher for just $12 —
              includes a level assessment and personalised learning plan.
            </p>
            <Link
              href="/online-classes/book"
              className="inline-flex items-center justify-center gap-2.5 border border-vv-accent rounded-full cursor-pointer text-[15px] font-semibold tracking-[-0.005em] leading-none py-3.5 px-5.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-vv-accent text-vv-accent-deep hover:bg-vv-accent-hi hover:-translate-y-px"
            >
              Book My First Lesson{" "}
              <ChevronRight className="h-4 w-4 shrink-0 translate-y-0.5" />
            </Link>
          </div>
        </Container>
      </section>

      {/* Related posts */}
      {related.length > 0 && (
        <section
          className="border-t border-vv-line bg-vv-bg-warm py-12"
          data-screen-label="03 Related"
        >
          <Container className="max-w-220">
            <h2 className="text-[22px] font-semibold tracking-[-0.02em] leading-[1.08] m-0 mb-6">
              Related Posts
            </h2>
            <div className="grid gap-5 sm:grid-cols-2">
              {related.map((p) => (
                <article
                  key={p.slug}
                  className="group flex flex-col overflow-hidden rounded-[22px] border border-vv-line bg-vv-bg transition hover:border-vv-accent"
                >
                  <div className="relative aspect-video overflow-hidden bg-vv-bg-warm">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(max-width: 820px) 50vw, 400px"
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="flex flex-col gap-2 p-5 flex-1">
                    <span className="text-[11px] font-semibold text-vv-accent-deep">
                      {p.category}
                    </span>
                    <h3 className="text-[16px] font-semibold text-vv-ink flex-1">
                      {p.title}
                    </h3>
                    <Link
                      href={`/blog/${p.slug}`}
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
                className="text-[13px] text-vv-ink-2 underline hover:text-vv-ink"
              >
                ← All posts
              </Link>
            </div>
          </Container>
        </section>
      )}
    </>
  );
}

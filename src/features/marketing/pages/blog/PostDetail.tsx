import { Container } from "@/components/shared/Container";
import type { BlogPost } from "./data/posts.data";
import { blogPosts } from "./data/posts.data";
import Image from "next/image";
import Link from "next/link";

export function PostDetail({ post }: { post: BlogPost }) {
  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <section className="page-head" data-screen-label="01 Post Hero">
        <Container className="max-w-[820px]">
          <div className="crumb">
            Home <span>/</span>{" "}
            <Link href="/blog" className="hover:text-[var(--vv-ink)]">Blog</Link>{" "}
            <span>/</span> {post.category}
          </div>
          <div className="mt-4 flex items-center gap-3">
            <span className="rounded-full bg-[var(--vv-accent)]/20 px-2.5 py-0.5 text-[11px] font-semibold text-[var(--vv-accent-deep)]">
              {post.category}
            </span>
            <span className="text-[12px] text-[var(--vv-ink-2)]">{post.readingTime}</span>
            <span className="text-[12px] text-[var(--vv-ink-2)]">
              {new Date(post.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
          <h1 className="h1 mt-4">{post.title}</h1>
          <p className="lede mt-3">{post.excerpt}</p>
        </Container>
      </section>

      <section className="border-t border-[var(--vv-line)] py-12" data-screen-label="02 Post Body">
        <Container className="max-w-[820px]">
          <div className="relative aspect-video mb-10 overflow-hidden rounded-[var(--vv-radius-lg)] border border-[var(--vv-line)]">
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="(max-width: 820px) 100vw, 820px"
              className="object-cover"
              unoptimized
            />
          </div>
          <div className="prose-custom flex flex-col gap-5">
            {post.body.map((para, i) => (
              <p key={i} className="text-[16px] leading-[1.75] text-[var(--vv-ink-2)]">
                {para}
              </p>
            ))}
          </div>

          {/* Lead capture inline */}
          <div className="mt-12 rounded-xl border border-[var(--vv-accent)] bg-[var(--vv-accent)]/10 p-6">
            <h3 className="text-[18px] font-semibold text-[var(--vv-ink)] mb-2">
              Ready to put this into practice?
            </h3>
            <p className="text-[14px] text-[var(--vv-ink-2)] mb-4">
              Book your first lesson with a Vida Verde teacher for just $12 — includes a level assessment and personalised learning plan.
            </p>
            <Link href="/book" className="vv-btn vv-btn-primary">
              Book My First Lesson →
            </Link>
          </div>
        </Container>
      </section>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="border-t border-[var(--vv-line)] bg-[var(--vv-bg-warm)] py-12" data-screen-label="03 Related">
          <Container className="max-w-[820px]">
            <h2 className="h2 mb-6 text-[22px]">Related Posts</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              {related.map((p) => (
                <article key={p.slug} className="group flex flex-col overflow-hidden rounded-[var(--vv-radius-lg)] border border-[var(--vv-line)] bg-[var(--vv-bg)] transition hover:border-[var(--vv-accent)]">
                  <div className="relative aspect-video overflow-hidden bg-[var(--vv-bg-warm)]">
                    <Image src={p.image} alt={p.title} fill sizes="(max-width: 820px) 50vw, 400px" className="object-cover" unoptimized />
                  </div>
                  <div className="flex flex-col gap-2 p-5 flex-1">
                    <span className="text-[11px] font-semibold text-[var(--vv-accent-deep)]">{p.category}</span>
                    <h3 className="text-[16px] font-semibold text-[var(--vv-ink)] flex-1">{p.title}</h3>
                    <Link href={`/blog/${p.slug}`} className="text-[13px] font-medium text-[var(--vv-ink)] hover:text-[var(--vv-accent-deep)]">
                      Read more →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-6">
              <Link href="/blog" className="text-[13px] text-[var(--vv-ink-2)] underline hover:text-[var(--vv-ink)]">
                ← All posts
              </Link>
            </div>
          </Container>
        </section>
      )}
    </>
  );
}

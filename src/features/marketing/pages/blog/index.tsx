import { Container } from "@/components/shared/Container";
import { blogPosts, categories } from "./data/posts.data";
import Image from "next/image";
import Link from "next/link";

export default function BlogRoute() {
  return (
    <>
      <section className="bg-vv-bg-warm border-b border-vv-line" data-screen-label="01 Blog">
        <Container>
          <div className="font-code text-vv-muted text-[12px] tracking-[0.06em] mb-6">
            Home <span className="mx-1 text-vv-line-2">/</span> Blog
          </div>
          <h1 className="text-[clamp(36px,5vw,68px)] font-semibold tracking-[-0.03em] leading-none m-0 mb-5">
            Spanish Learning &amp; Ecuador Travel
          </h1>
          <p className="text-vv-ink-2 text-[clamp(17px,1.4vw,20px)] leading-normal max-w-[52ch] text-pretty m-0">
            Tips, stories, and insights from Vida Verde&apos;s teachers and
            students — to help you learn faster and travel smarter.
          </p>
        </Container>
      </section>

      <section className="border-t border-vv-line py-16" data-screen-label="02 Blog Grid">
        <Container>
          <div className="mb-8 flex flex-wrap gap-2">
            {["All", ...categories].map((cat) => (
              <span
                key={cat}
                className="rounded-full border border-vv-line bg-vv-bg-warm px-3 py-1 text-[12px] font-medium text-vv-ink-2 cursor-pointer hover:border-vv-ink transition"
              >
                {cat}
              </span>
            ))}
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post, i) => (
              <article
                key={post.slug}
                className={`group flex flex-col overflow-hidden rounded-[22px] border border-vv-line bg-vv-bg transition hover:-translate-y-0.5 hover:border-vv-accent ${i === 0 ? "sm:col-span-2 lg:col-span-1" : ""}`}
              >
                <div className="relative aspect-video overflow-hidden bg-vv-bg-warm">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-300 group-hover:scale-[1.03]"
                    unoptimized
                  />
                </div>
                <div className="flex flex-col gap-3 p-6 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-vv-accent/20 px-2.5 py-0.5 text-[11px] font-semibold text-vv-accent-deep">
                      {post.category}
                    </span>
                    <span className="text-[11px] text-vv-ink-2">{post.readingTime}</span>
                  </div>
                  <h2 className="text-[18px] font-semibold leading-tight tracking-[-0.01em] text-vv-ink">
                    {post.title}
                  </h2>
                  <p className="text-[13px] leading-[1.6] text-vv-ink-2 flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[12px] text-vv-ink-2">
                      {new Date(post.date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-[13px] font-medium text-vv-ink hover:text-vv-accent-deep transition"
                    >
                      Read more →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

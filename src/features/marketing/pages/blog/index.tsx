import { Container } from "@/components/shared/Container";
import { BlogGrid } from "./components/BlogGrid";
import { NewsletterSignup } from "./components/NewsletterSignup";

export default function BlogRoute() {
  return (
    <>
      <section
        className="bg-vv-bg-warm border-b border-vv-line"
        data-screen-label="01 Blog"
      >
        <Container>
          <div className="font-code text-vv-muted text-[12px] tracking-[0.06em] mb-6">
            Home <span className="mx-1 text-vv-line-2">/</span> Blog
          </div>
          <h1 className="text-[clamp(36px,5vw,68px)] font-semibold tracking-[-0.03em] leading-none m-0 mb-5">
            Spanish Learning &amp; Ecuador Travel
          </h1>
          <p className="text-vv-ink-2 text-[clamp(17px,1.4vw,20px)] leading-normal max-w-[52ch] text-pretty m-0">
            Tips, stories, and insights from Vida Verde&apos;s teachers and
            students. To help you learn faster and travel smarter.
          </p>
        </Container>
      </section>

      <section
        className="border-t border-vv-line py-16"
        data-screen-label="02 Blog Grid"
      >
        <Container>
          <BlogGrid />
        </Container>
      </section>

      <NewsletterSignup />
    </>
  );
}

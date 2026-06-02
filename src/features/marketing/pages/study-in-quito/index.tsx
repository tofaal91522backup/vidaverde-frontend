import { Container } from "@/components/shared/Container";
import { programs } from "./data/programs.data";
import Image from "next/image";
import Link from "next/link";

export default function StudyInQuitoRoute() {
  return (
    <>
      {/* Hero */}
      <section className="page-head" data-screen-label="01 Study in Quito Hero">
        <Container>
          <div className="crumb">
            Home <span>/</span> Study in Quito
          </div>
          <h1 className="h1">
            Immerse Yourself in Spanish.
            <br />
            Live It in Ecuador.
          </h1>
          <p className="lede">
            From a week of classes and culture in Quito to a journey deep into
            the Amazon — Vida Verde&apos;s immersion programmes weave expert
            teaching, guided activities, and life with a local Ecuadorian
            family into a single, unforgettable experience.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <a href="#programmes" className="vv-btn vv-btn-primary">
              Explore Programmes ↓
            </a>
            <Link href="/contact" className="vv-btn vv-btn-ghost">
              Contact Us to Plan Your Stay
            </Link>
          </div>
        </Container>
      </section>

      {/* Programme Cards */}
      <section
        className="border-t border-[var(--vv-line)] py-16"
        data-screen-label="02 Programmes"
        id="programmes"
      >
        <Container>
          <div className="section-head">
            <div className="meta">
              <span className="eyebrow">{"// Programmes"}</span>
              <h2 className="h2">Choose Your Immersion</h2>
            </div>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {programs.map((program) => (
              <article
                key={program.slug}
                className="group flex flex-col overflow-hidden rounded-[var(--vv-radius-lg)] border border-[var(--vv-line)] bg-[var(--vv-bg)] transition hover:-translate-y-0.5 hover:border-[var(--vv-accent)]"
              >
                <div className="relative aspect-video overflow-hidden bg-[var(--vv-bg-warm)]">
                  <Image
                    src={program.heroImage}
                    alt={program.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition duration-300 group-hover:scale-[1.03]"
                    unoptimized
                  />
                </div>
                <div className="flex flex-col gap-3 p-6 flex-1">
                  <div>
                    <h3 className="text-[20px] font-semibold leading-tight tracking-[-0.02em] text-[var(--vv-ink)]">
                      {program.title}
                    </h3>
                    <div className="mt-1 text-[13px] text-[var(--vv-ink-2)]">
                      From{" "}
                      <strong className="text-[var(--vv-ink)]">
                        {program.priceFrom}
                      </strong>
                      {program.pricePeriod}
                    </div>
                  </div>
                  <p className="text-[14px] leading-[1.6] text-[var(--vv-ink-2)] flex-1">
                    {program.tagline}
                  </p>
                  <Link
                    href={`/study-in-quito/${program.slug}`}
                    className="vv-btn vv-btn-ghost vv-btn-sm text-center mt-auto"
                  >
                    View Programme →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Homestay Preview */}
      <section
        className="border-t border-[var(--vv-line)] bg-[var(--vv-bg-warm)] py-16"
        data-screen-label="03 Homestay Preview"
      >
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--vv-radius-lg)] border border-[var(--vv-line)]">
              <Image
                src="https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1000&q=80"
                alt="Ecuadorian host family at home"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="flex flex-col gap-5">
              <span className="eyebrow">{"// Homestay"}</span>
              <h2 className="h2">Live Like a Local. Learn Faster.</h2>
              <p className="text-[15px] leading-[1.7] text-[var(--vv-ink-2)]">
                The best Spanish classroom isn&apos;t a classroom at all — it&apos;s a
                family dinner table in Quito. Our homestay programme places you
                with a vetted Ecuadorian family, so the immersion never stops
                when the lesson does.
              </p>
              <p className="text-[15px] leading-[1.7] text-[var(--vv-ink-2)]">
                Meals, conversation, local insight, and a warm home base —
                all from{" "}
                <strong className="text-[var(--vv-ink)]">$26/night</strong>.
                Included in the Quito Immersion Program or bookable as an add-on
                to any programme.
              </p>
              <Link href="/homestay" className="vv-btn vv-btn-dark w-fit">
                Find out about Homestay →
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Enquiry CTA */}
      <section
        className="border-t border-[var(--vv-line)] py-16"
        data-screen-label="04 Enquiry"
      >
        <Container className="text-center">
          <span className="eyebrow">{"// Need help choosing?"}</span>
          <div className="h-4" />
          <h2 className="h2">Not Sure Which Programme Is Right for You?</h2>
          <p className="lede mt-3 max-w-[52ch] mx-auto text-[var(--vv-ink-2)]">
            Tell us a bit about your goals and we&apos;ll recommend the best fit.
            WhatsApp us or send a message — we respond within 24 hours.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <a
              href="https://wa.me/593998037473?text=Hi%2C+I%27d+like+to+find+out+more+about+Vida+Verde%27s+immersion+programmes."
              target="_blank"
              rel="noopener noreferrer"
              className="vv-btn vv-btn-primary"
            >
              WhatsApp Us
            </a>
            <Link href="/contact" className="vv-btn vv-btn-ghost">
              Send a Message →
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}

import { Container } from "@/components/shared/Container";
import { programs } from "./data/programs.data";
import Image from "next/image";
import Link from "next/link";

export default function StudyInQuitoRoute() {
  return (
    <>
      {/* Hero */}
      <section
        className="bg-vv-bg-warm border-b border-vv-line"
        data-screen-label="01 Study in Quito Hero"
      >
        <Container>
          <div className="font-code text-vv-muted text-[12px] tracking-[0.06em] mb-6">
            Home <span className="mx-1 text-vv-line-2">/</span> Study in Quito
          </div>
          <h1 className="text-[clamp(36px,5vw,68px)] font-semibold tracking-[-0.03em] leading-none m-0 mb-5">
            Immerse Yourself in Spanish.
            <br />
            Live It in Ecuador.
          </h1>
          <p className="text-vv-ink-2 text-[clamp(17px,1.4vw,20px)] leading-normal max-w-[52ch] text-pretty m-0">
            From a week in Quito to a journey along the Pacific coast — Vida
            Verde&apos;s immersion programmes combine expert teaching with real
            Ecuadorian life.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <a
              href="#programmes"
              className="inline-flex items-center justify-center gap-2.5 border border-vv-accent rounded-full cursor-pointer text-[15px] font-semibold tracking-[-0.005em] py-3.5 px-5.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-vv-accent text-vv-accent-deep hover:bg-vv-accent-hi hover:-translate-y-px"
            >
              Explore Our Programmes ↓
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2.5 border border-vv-line-2 rounded-full cursor-pointer text-[15px] font-semibold tracking-[-0.005em] py-3.5 px-5.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-transparent text-vv-ink hover:bg-vv-ink hover:border-vv-ink hover:text-vv-bg"
            >
              Contact Us to Plan Your Stay
            </Link>
          </div>
        </Container>
      </section>

      {/* Programme Cards */}
      <section
        className="border-t border-vv-line"
        data-screen-label="02 Programmes"
        id="programmes"
      >
        <Container>
          <div className="flex flex-col gap-3.5 mb-12 max-w-[58ch]">
            <span className="font-code text-vv-muted text-[11px] font-medium tracking-[0.14em] uppercase">
              {"// Programmes"}
            </span>
            <h2 className="text-[clamp(28px,3vw,44px)] font-semibold tracking-[-0.02em] leading-[1.08] m-0 text-balance">
              Choose Your Programme
            </h2>
            <p className="text-vv-ink-2 text-[clamp(15px,1.1vw,17px)] leading-relaxed m-0 text-pretty">
              All programmes include one-on-one classes with an expert
              Ecuadorian teacher. Most include homestay with a local family.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {programs.map((program) => (
              <article
                key={program.slug}
                className="group flex flex-col overflow-hidden rounded-[22px] border border-vv-line bg-vv-bg transition hover:-translate-y-0.5 hover:border-vv-accent"
              >
                <div className="relative aspect-video overflow-hidden bg-vv-bg-warm">
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
                    <h3 className="text-[20px] font-semibold leading-tight tracking-[-0.02em] text-vv-ink m-0">
                      {program.title}
                    </h3>
                    <div className="mt-1 text-[13px] text-vv-ink-2">
                      From{" "}
                      <strong className="text-vv-ink font-semibold">
                        {program.priceFrom}
                      </strong>
                      {program.pricePeriod}
                    </div>
                  </div>
                  <p className="text-[14px] leading-[1.6] text-vv-ink-2 flex-1 m-0">
                    {program.tagline}
                  </p>
                  <Link
                    href={`/study-in-quito/${program.slug}`}
                    className="mt-auto inline-flex items-center justify-center gap-2.5 border border-vv-line-2 rounded-full cursor-pointer text-[13px] font-semibold tracking-[-0.005em] py-2.25 px-3.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-transparent text-vv-ink hover:bg-vv-ink hover:border-vv-ink hover:text-vv-bg text-center"
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
      {/* <section
        className="border-t border-vv-line bg-vv-bg-warm"
        data-screen-label="03 Homestay Preview"
      >
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="relative aspect-4/3 overflow-hidden rounded-[22px] border border-vv-line">
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
              <span className="font-code text-vv-muted text-[11px] font-medium tracking-[0.14em] uppercase">
                {"// Homestay"}
              </span>
              <h2 className="text-[clamp(28px,3vw,44px)] font-semibold tracking-[-0.02em] leading-[1.08] m-0 text-balance">
                Live Like a Local. Learn Faster.
              </h2>
              <p className="text-[15px] leading-[1.7] text-vv-ink-2 m-0">
                The best Spanish classroom isn&apos;t a classroom at all — it&apos;s a
                family dinner table in Quito. Our homestay programme places you
                with a vetted Ecuadorian family, so the immersion never stops
                when the lesson does.
              </p>
              <p className="text-[15px] leading-[1.7] text-vv-ink-2 m-0">
                Meals, conversation, local insight, and a warm home base —
                all from{" "}
                <strong className="text-vv-ink font-semibold">$26/night</strong>.
                Included in the Quito Immersion Program or bookable as an add-on
                to any programme.
              </p>
              <Link
                href="/homestay"
                className="w-fit inline-flex items-center justify-center gap-2.5 border border-vv-ink rounded-full cursor-pointer text-[15px] font-semibold tracking-[-0.005em] py-3.5 px-5.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-vv-ink text-vv-bg hover:bg-vv-accent-deep hover:border-vv-accent-deep hover:-translate-y-px"
              >
                Find out about Homestay →
              </Link>
            </div>
          </div>
        </Container>
      </section> */}

      {/* Enquiry CTA */}
      <section
        className="border-t border-vv-line bg-vv-bg-warm"
        data-screen-label="04 Enquiry"
      >
        <Container className="text-center">
          <span className="font-code text-vv-muted text-[11px] font-medium tracking-[0.14em] uppercase">
            {"// Need help choosing?"}
          </span>
          <div className="h-4" />
          <h2 className="text-[clamp(28px,3vw,44px)] font-semibold tracking-[-0.02em] leading-[1.08] m-0 text-balance">
            Not Sure Which Programme Is Right for You?
          </h2>
          <p className="text-vv-ink-2 text-[clamp(17px,1.4vw,20px)] leading-normal mt-3 max-w-[52ch] mx-auto m-0">
            Tell us a little about your goals, your schedule, and what kind of
            experience you&apos;re looking for. We&apos;ll recommend the best
            fit and answer any questions — in English or Spanish.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <a
              href="https://wa.me/593998037473?text=Hi%2C+I%27d+like+to+find+out+more+about+Vida+Verde%27s+immersion+programmes."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 border border-vv-accent rounded-full cursor-pointer text-[15px] font-semibold tracking-[-0.005em] py-3.5 px-5.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-vv-accent text-vv-accent-deep hover:bg-vv-accent-hi hover:-translate-y-px"
            >
              WhatsApp Us
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2.5 border border-vv-line-2 rounded-full cursor-pointer text-[15px] font-semibold tracking-[-0.005em] py-3.5 px-5.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-transparent text-vv-ink hover:bg-vv-ink hover:border-vv-ink hover:text-vv-bg"
            >
              Send a Message →
            </Link>
          </div>
          <p className="mt-5 text-[13px] text-vv-muted">
            We respond to all enquiries within 24 hours, Monday to Friday.
          </p>
        </Container>
      </section>
    </>
  );
}

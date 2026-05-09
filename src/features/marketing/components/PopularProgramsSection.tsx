import { Container } from "@/components/shared/Container";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const programs = [
  {
    title: "Quito Immersion Program",
    image: "https://vidaverde.com/wp-content/uploads/2019/01/El_Parque-300x300.jpg",
    caption: "Classes + Field Trips + Homestay",
    detail: "A complete Quito experience built around classroom confidence and daily local practice.",
    label: "City Immersion",
    href: "https://vidaverde.com/quito-immersion-program/",
  },
  {
    title: "Puerto López",
    image:
      "https://vidaverde.com/wp-content/uploads/2018/12/Monte-Libano-Study-at-the-Beach-300x300.jpg",
    caption: "Relax + Study + Excursions on the beach",
    detail: "Study Spanish by the coast with relaxed lessons, beach time, and guided excursions.",
    label: "Beach Program",
    href: "https://vidaverde.com/puerto-lopez-spanish-program/",
  },
  {
    title: "The Traveling Classroom",
    image:
      "https://vidaverde.com/wp-content/uploads/2019/03/traveling-classroom-300x300.jpg",
    caption: "Quito + Jungle Lodge + Beach Getaway",
    detail: "Move through Ecuador while learning Spanish in real places, not only in a classroom.",
    label: "Travel Study",
    href: "https://vidaverde.com/traveling-classroom/",
  },
];

export function PopularProgramsSection() {
  return (
    <section className="overflow-hidden border-t border-[var(--vv-line)] bg-[var(--vv-bg-warm)]">
      <Container>
        <div className="section-head">
          <div className="meta">
            <span className="eyebrow">{"// Programs"}</span>
            <h2 className="h2">Our Most Popular Programs</h2>
          </div>
          <p className="lede max-w-[38ch]">
            Choose a Spanish program shaped around Quito, the coast, or a full
            Ecuador travel classroom.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {programs.map((program) => (
            <ProgramCard key={program.title} program={program} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function ProgramCard({ program }: { program: (typeof programs)[number] }) {
  return (
    <article className="popular-program-card group flex h-full flex-col overflow-hidden rounded-[var(--vv-radius-lg)] border border-[var(--vv-line)] bg-[var(--vv-bg)] transition duration-300 hover:-translate-y-1 hover:border-[var(--vv-accent)] hover:shadow-[0_28px_70px_-52px_rgba(15,20,16,0.75)]">
      <div className="relative m-4 mb-0 aspect-square overflow-hidden rounded-[var(--vv-radius)] border border-[var(--vv-line)] bg-[var(--vv-bg-warm)]">
        <Image
          src={program.image}
          alt={program.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition duration-300 group-hover:scale-[1.03]"
          unoptimized
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[color-mix(in_oklab,var(--vv-ink)_72%,transparent)] to-transparent p-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[color-mix(in_oklab,var(--vv-bg)_24%,transparent)] bg-[color-mix(in_oklab,var(--vv-bg)_12%,transparent)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--vv-bg)] backdrop-blur-md">
            <MapPin aria-hidden="true" className="size-3.5" />
            {program.label}
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-5 p-6">
        <div>
          <div className="mb-4 flex size-10 items-center justify-center rounded-full bg-[var(--vv-accent)] text-[var(--vv-accent-deep)]">
            <Sparkles aria-hidden="true" className="size-4" />
          </div>
          <h3 className="text-[26px] font-semibold leading-[1.08] tracking-[-0.02em] text-[var(--vv-ink)]">
            {program.title}
          </h3>
          <p className="mt-3 font-[var(--font-jetbrains)] text-[12px] uppercase tracking-[0.08em] text-[var(--vv-muted)]">
            {program.caption}
          </p>
          <p className="mt-4 text-[15px] leading-[1.6] text-[var(--vv-ink-2)]">
            {program.detail}
          </p>
        </div>

        <Link
          href={program.href}
          target="_blank"
          rel="noreferrer"
          className="vv-btn vv-btn-dark mt-auto w-fit"
        >
          Learn More
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </div>
    </article>
  );
}

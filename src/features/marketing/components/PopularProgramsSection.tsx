import { Container } from "@/components/shared/Container";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const programs = [
  {
    title: "Quito Immersion Program",
    image: "/images/programmes/1.jpg",
    caption: "Classes + Field Trips + Homestay",
    detail:
      "A complete Quito experience built around classroom confidence and daily local practice.",
    label: "City Immersion",
    href: "https://vidaverde.com/quito-immersion-program/",
  },
  {
    title: "Puerto López",
    image: "/images/programmes/2.jpg",
    caption: "Relax + Study + Excursions on the beach",
    detail:
      "Study Spanish by the coast with relaxed lessons, beach time, and guided excursions.",
    label: "Beach Program",
    href: "https://vidaverde.com/puerto-lopez-spanish-program/",
  },
  {
    title: "The Traveling Classroom",
    image: "/images/programmes/3.jpg",
    caption: "Quito + Jungle Lodge + Beach Getaway",
    detail:
      "Move through Ecuador while learning Spanish in real places, not only in a classroom.",
    label: "Travel Study",
    href: "https://vidaverde.com/traveling-classroom/",
  },
];

export function PopularProgramsSection() {
  return (
    <section
      className="overflow-hidden border-t border-vv-line bg-vv-bg-warm"
      data-scroll-reveal="true"
    >
      <Container>
        <div className="flex items-end justify-between gap-8 mb-12 max-[760px]:flex-col max-[760px]:items-start">
          <div className="flex flex-col gap-3.5 max-w-160">
            <span className="font-code text-vv-muted text-[11px] font-medium tracking-[0.14em] uppercase">
              {"// Programs"}
            </span>
            <h2 className="text-[clamp(28px,3vw,44px)] font-semibold tracking-[-0.02em] leading-[1.08] m-0 text-balance">
              Our Most Popular Programs
            </h2>
          </div>
          <p className="text-vv-ink-2 text-[clamp(17px,1.4vw,20px)] leading-normal max-w-[36ch] text-pretty m-0">
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
    <article className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-vv-line bg-vv-bg transition duration-300 hover:-translate-y-1 hover:border-vv-accent hover:shadow-[0_28px_70px_-52px_rgba(15,20,16,0.75)]">
      <div className="relative m-4 mb-0 aspect-square overflow-hidden rounded-[14px] border border-vv-line bg-vv-bg-warm">
        <Image
          src={program.image}
          alt={program.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition duration-300 group-hover:scale-[1.03]"
          unoptimized
        />
        <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-vv-bg-deep/72 to-transparent p-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/24 bg-white/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-white backdrop-blur-md">
            <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
            {program.label}
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-5 p-6">
        <div>
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-vv-accent text-vv-accent-deep">
            <Sparkles aria-hidden="true" className="h-4 w-4" />
          </div>
          <h3 className="text-[26px] font-semibold leading-[1.08] tracking-[-0.02em] text-vv-ink m-0">
            {program.title}
          </h3>
          <p className="mt-3 font-code text-[12px] uppercase tracking-[0.08em] text-vv-muted m-0">
            {program.caption}
          </p>
          <p className="mt-4 text-[15px] leading-[1.6] text-vv-ink-2 m-0">
            {program.detail}
          </p>
        </div>

        <Link
          href={program.href}
          target="_blank"
          rel="noreferrer"
          className="mt-auto inline-flex w-fit items-center gap-2.5 border border-vv-ink rounded-full cursor-pointer text-[15px] font-semibold tracking-[-0.005em] py-3.5 px-5.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-vv-ink text-vv-bg hover:bg-vv-accent-deep hover:border-vv-accent-deep hover:-translate-y-px"
        >
          Learn More
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}

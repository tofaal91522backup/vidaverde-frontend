import { Container } from "@/components/shared/Container";
import { BookOpen, Globe2, Leaf, MapPin, UserRound } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const cards = [
  {
    title: "Classes in Quito",
    category: "Classes in Quito",
    author: "Vida Verde",
    description:
      "Learn Spanish in the heart of Quito with teachers who connect classwork to real local life.",
    icon: MapPin,
  },
  {
    title: "Online Classes",
    category: "Online Classes",
    author: "Vida Verde",
    description:
      "Study from anywhere with focused one-on-one Spanish lessons and flexible scheduling.",
    icon: Globe2,
  },
  {
    title: "Jungle Programs",
    category: "Jungle Programs",
    author: "Vida Verde",
    description:
      "Combine Spanish practice with Ecuadorian nature, community, and cultural discovery.",
    icon: Leaf,
  },
];

export function WelcomeSchoolSection() {
  return (
    <section
      className="border-b border-t border-vv-line bg-vv-bg"
      data-screen-label="Welcome"
    >
      <Container>
        <SectionHeader
          eyebrow="// Welcome"
          title="Welcome to Vida Verde Spanish School!"
          lede="Choose the study experience that fits your goals, your schedule, and the way you want to discover Ecuador."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {cards.map((card) => (
            <WelcomeCard key={card.title} card={card} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function WelcomeCard({ card }: { card: (typeof cards)[number] }) {
  const Icon = card.icon;

  return (
    <article className="group flex min-h-90 flex-col overflow-hidden rounded-[22px] border border-vv-line bg-vv-bg transition duration-300 hover:-translate-y-1 hover:border-vv-accent hover:shadow-[0_28px_70px_-52px_rgba(15,20,16,0.75)]">
      <div className="flex flex-1 flex-col p-7">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-vv-accent text-vv-accent-deep">
            <Icon aria-hidden="true" className="h-5 w-5" />
          </div>
          <div className="font-code text-[11px] font-semibold uppercase tracking-[0.12em] text-vv-muted">
            Spanish
          </div>
        </div>
        <div className="mt-auto">
          <h3 className="max-w-[11ch] text-[36px] font-semibold leading-[0.98] tracking-[-0.035em] text-vv-ink md:text-[40px] m-0">
            {card.title}
          </h3>
          <p className="mt-5 text-[15px] leading-[1.6] text-vv-ink-2">
            {card.description}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 bg-vv-ink px-7 py-5 text-vv-bg">
        <span className="text-[18px] font-semibold leading-[1.15] tracking-[-0.01em]">
          {card.category}
        </span>
        <BookOpen aria-hidden="true" className="h-5 w-5 text-vv-accent" />
      </div>

      <div className="flex items-center gap-3 border-t border-vv-line bg-vv-bg-warm px-7 py-5">
        <span className="grid h-9 w-9 place-items-center rounded-full border border-vv-line bg-vv-bg text-vv-ink-2">
          <UserRound aria-hidden="true" className="h-4 w-4" />
        </span>
        <span className="font-code text-[12px] font-semibold uppercase tracking-[0.08em] text-vv-muted">
          {card.author}
        </span>
      </div>
    </article>
  );
}

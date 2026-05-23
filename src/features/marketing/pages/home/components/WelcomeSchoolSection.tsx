import { Container } from "@/components/shared/Container";
import { BookOpen, Globe2, Leaf, MapPin, UserRound } from "lucide-react";

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
      className="border-b border-t border-[var(--vv-line)] bg-[var(--vv-bg)]"
      data-screen-label="Welcome"
    >
      <Container>
        <div className="section-head">
          <div className="meta">
            <span className="eyebrow">{"// Welcome"}</span>
            <h2 className="h2">Welcome to Vida Verde Spanish School!</h2>
          </div>
          <p className="lede max-w-[38ch]">
            Choose the study experience that fits your goals, your schedule,
            and the way you want to discover Ecuador.
          </p>
        </div>

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
    <article className="welcome-school-card group flex min-h-[360px] flex-col overflow-hidden rounded-[var(--vv-radius-lg)] border border-[var(--vv-line)] bg-[var(--vv-bg)] transition duration-300 hover:-translate-y-1 hover:border-[var(--vv-accent)] hover:shadow-[0_28px_70px_-52px_rgba(15,20,16,0.75)]">
      <div className="flex flex-1 flex-col p-7">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div className="flex size-12 items-center justify-center rounded-full bg-[var(--vv-accent)] text-[var(--vv-accent-deep)]">
            <Icon aria-hidden="true" className="size-5" />
          </div>
          <div className="font-[var(--font-jetbrains)] text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--vv-muted)]">
            Spanish
          </div>
        </div>
        <div className="mt-auto">
          <h3 className="max-w-[11ch] text-[36px] font-semibold leading-[0.98] tracking-[-0.035em] text-[var(--vv-ink)] md:text-[40px]">
            {card.title}
          </h3>
          <p className="mt-5 text-[15px] leading-[1.6] text-[var(--vv-ink-2)]">
            {card.description}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 bg-[var(--vv-ink)] px-7 py-5 text-[var(--vv-bg)]">
        <span className="text-[18px] font-semibold leading-[1.15] tracking-[-0.01em]">
          {card.category}
        </span>
        <BookOpen aria-hidden="true" className="size-5 text-[var(--vv-accent)]" />
      </div>

      <div className="flex items-center gap-3 border-t border-[var(--vv-line)] bg-[var(--vv-bg-warm)] px-7 py-5">
        <span className="grid size-9 place-items-center rounded-full border border-[var(--vv-line)] bg-[var(--vv-bg)] text-[var(--vv-ink-2)]">
          <UserRound aria-hidden="true" className="size-4" />
        </span>
        <span className="font-[var(--font-jetbrains)] text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--vv-muted)]">
          {card.author}
        </span>
      </div>
    </article>
  );
}

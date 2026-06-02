import { Container } from "@/components/shared/Container";
import Link from "next/link";

export function OnlineClassesHero() {
  return (
    <section className="page-head" data-screen-label="01 Online Classes Hero">
      <Container>
        <div className="crumb">
          Home <span>/</span> Online Classes
        </div>
        <h1 className="h1">
          One-on-One Spanish Classes.
          <br />
          Real Teacher. Anywhere.
        </h1>
        <p className="lede">
          Personalised lessons with expert Ecuadorian native speakers — via
          Google Meet, at a time that works for you.
        </p>
        <div className="flex flex-wrap gap-3 mt-6">
          <Link href="/book" className="vv-btn vv-btn-primary">
            Start for $12 — Book Your First Lesson →
          </Link>
          <Link href="#teachers" className="vv-btn vv-btn-ghost">
            Choose Your Teacher
          </Link>
        </div>
        <div className="mt-8 flex flex-wrap gap-4 text-sm text-[var(--vv-ink-2)]">
          {["AECEE Certified", "Est. 1999", "4,700+ Students", "All Levels Welcome", "Classes via Google Meet"].map(
            (item) => (
              <span key={item} className="flex items-center gap-1.5">
                <span className="text-[var(--vv-accent)]">✓</span>
                {item}
              </span>
            ),
          )}
        </div>
      </Container>
    </section>
  );
}

import { Container } from "@/components/shared/Container";
import { onlineTeachers } from "../data/online-classes.data";
import Image from "next/image";
import Link from "next/link";

export function OnlineTeachersSection() {
  return (
    <section
      className="border-t border-[var(--vv-line)] bg-[var(--vv-bg-warm)] py-16"
      data-screen-label="04 Teachers"
      id="teachers"
    >
      <Container>
        <div className="section-head">
          <div className="meta">
            <span className="eyebrow">{"// Choose Your Teacher"}</span>
            <h2 className="h2">Your Teacher Is Waiting</h2>
          </div>
          <p className="lede max-w-[46ch]">
            All teachers are university-trained Ecuadorian native speakers. Book
            directly with the one that feels right for you.
          </p>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {onlineTeachers.map((teacher) => (
            <OnlineTeacherCard key={teacher.name} teacher={teacher} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function OnlineTeacherCard({
  teacher,
}: {
  teacher: (typeof onlineTeachers)[number];
}) {
  return (
    <article className="teacher-card group grid overflow-hidden rounded-[var(--vv-radius-lg)] border border-[var(--vv-line)] bg-[var(--vv-bg)] transition duration-200 hover:-translate-y-0.5 hover:border-[var(--vv-accent)] md:grid-cols-[200px_1fr]">
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--vv-bg-warm)] md:aspect-auto md:min-h-[280px]">
        <Image
          src={teacher.image}
          alt={teacher.name}
          fill
          sizes="(max-width: 768px) 100vw, 200px"
          className="object-cover transition duration-300 group-hover:scale-[1.03]"
          unoptimized
        />
      </div>
      <div className="flex min-h-[280px] flex-col gap-3 p-6">
        <div>
          <div className="eyebrow mb-1">Teacher</div>
          <h3 className="text-[22px] font-semibold leading-tight tracking-[-0.02em] text-[var(--vv-ink)]">
            {teacher.name}
          </h3>
          <div className="mt-1 text-[12px] text-[var(--vv-ink-2)]">
            {teacher.credentials} · {teacher.experience}
          </div>
        </div>
        <p className="text-[14px] leading-[1.6] text-[var(--vv-ink-2)] flex-1">
          {teacher.bio}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {teacher.specialisations.map((s) => (
            <span
              key={s}
              className="rounded-full border border-[var(--vv-line)] bg-[var(--vv-bg-warm)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--vv-ink-2)]"
            >
              {s}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between border-t border-[var(--vv-line)] pt-3 mt-1">
          <div className="flex items-center gap-1.5">
            <span
              className={`h-2 w-2 rounded-full ${teacher.accepting ? "bg-green-500" : "bg-amber-400"}`}
            />
            <span className="text-[12px] text-[var(--vv-ink-2)]">
              {teacher.accepting ? "Accepting new students" : "Limited availability"} ·{" "}
              {teacher.availability}
            </span>
          </div>
        </div>
        <Link
          href={`/book?teacher=${teacher.firstName.toLowerCase()}`}
          className="vv-btn vv-btn-primary vv-btn-sm text-center"
        >
          Book with {teacher.firstName} →
        </Link>
      </div>
    </article>
  );
}

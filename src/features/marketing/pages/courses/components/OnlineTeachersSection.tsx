import { Container } from "@/components/shared/Container";
import { onlineTeachers } from "../data/online-classes.data";
import Image from "next/image";
import Link from "next/link";

export function OnlineTeachersSection() {
  return (
    <section
      className="border-t border-vv-line bg-vv-bg-warm"
      data-screen-label="04 Teachers"
      id="teachers"
    >
      <Container>
        <div className="flex items-end justify-between gap-8 mb-12 max-[760px]:flex-col max-[760px]:items-start">
          <div className="flex flex-col gap-3.5">
            <span className="font-code text-vv-muted text-[11px] font-medium tracking-[0.14em] uppercase">
              {"// Choose Your Teacher"}
            </span>
            <h2 className="text-[clamp(28px,3vw,44px)] font-semibold tracking-[-0.02em] leading-[1.08] m-0 text-balance">
              Your Teacher Is Waiting
            </h2>
          </div>
          <p className="text-vv-ink-2 text-[clamp(17px,1.4vw,20px)] leading-normal max-w-[46ch] text-pretty m-0">
            All teachers are university-trained Ecuadorian native speakers. Book
            directly with the one that feels right for you.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
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
    <article className="group grid overflow-hidden rounded-[22px] border border-vv-line bg-vv-bg transition duration-200 hover:-translate-y-0.5 hover:border-vv-accent md:grid-cols-[200px_1fr]">
      <div className="relative aspect-4/3 overflow-hidden bg-vv-bg-warm md:aspect-auto md:min-h-70">
        <Image
          src={teacher.image}
          alt={teacher.name}
          fill
          sizes="(max-width: 768px) 100vw, 200px"
          className="object-cover transition duration-300 group-hover:scale-[1.03]"
          unoptimized
        />
      </div>
      <div className="flex min-h-70 flex-col gap-3 p-6">
        <div>
          <div className="font-code text-vv-muted text-[11px] font-medium tracking-[0.14em] uppercase mb-1">
            Teacher
          </div>
          <h3 className="text-[22px] font-semibold leading-tight tracking-[-0.02em] text-vv-ink m-0">
            {teacher.name}
          </h3>
          <div className="mt-1 text-[12px] text-vv-ink-2">
            {teacher.credentials} · {teacher.experience}
          </div>
        </div>
        <p className="text-[14px] leading-[1.6] text-vv-ink-2 flex-1 m-0">
          {teacher.bio}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {teacher.specialisations.map((s) => (
            <span
              key={s}
              className="rounded-full border border-vv-line bg-vv-bg-warm px-2.5 py-0.5 text-[11px] font-medium text-vv-ink-2"
            >
              {s}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-1.5 border-t border-vv-line pt-3 mt-1">
          <span
            className={`h-2 w-2 rounded-full ${teacher.accepting ? "bg-green-500" : "bg-amber-400"}`}
          />
          <span className="text-[12px] text-vv-ink-2">
            {teacher.accepting ? "Accepting new students" : "Limited availability"} ·{" "}
            {teacher.availability}
          </span>
        </div>
        <Link
          href={`/book?teacher=${teacher.firstName.toLowerCase()}`}
          className="inline-flex items-center justify-center gap-2.5 border border-vv-accent rounded-full cursor-pointer text-[13px] font-semibold tracking-[-0.005em] py-2.25 px-3.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-vv-accent text-vv-accent-deep hover:bg-vv-accent-hi hover:-translate-y-px text-center"
        >
          Book with {teacher.firstName} →
        </Link>
      </div>
    </article>
  );
}

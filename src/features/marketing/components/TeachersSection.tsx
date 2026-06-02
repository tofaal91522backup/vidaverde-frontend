import { Container } from "@/components/shared/Container";
import Image from "next/image";
import Link from "next/link";

const teachers = [
  {
    name: "Ximena Argüello",
    firstName: "Ximena",
    image: "/images/teachers/2.jpg",
    description:
      "Students say class hours with Ximena pass by in a flash. She has been teaching Spanish since 2011 and is fluent in English, making her especially effective with beginners.",
    credentials: "Universidad Central del Ecuador — Linguistics",
    experience: "13+ years teaching",
    specialisations: ["Beginner-friendly", "Conversational Spanish", "DELE Preparation"],
    availability: "Mon – Fri mornings & afternoons",
    accepting: true,
  },
  {
    name: "Lucía Rivadeneira",
    firstName: "Lucía",
    image: "/images/teachers/3.jpg",
    description:
      "Lucía is a language nerd who loves to teach the nuts and bolts of Spanish. She excels at helping students understand grammar intuitively and speaks at a clear, easy-to-follow pace.",
    credentials: "PUCE Quito — Modern Languages",
    experience: "10+ years teaching",
    specialisations: ["Grammar Focus", "Intermediate to Advanced", "Business Spanish"],
    availability: "Mon – Fri afternoons",
    accepting: true,
  },
  {
    name: "Fernando Báez Guzmán",
    firstName: "Fernando",
    image: "/images/teachers/4.jpg",
    description:
      "Fernando is our Academic Director and master teacher. He brings structure, warmth, and deep expertise to every lesson — students consistently rate him as the most effective teacher they have had.",
    credentials: "Universidad de Cuenca — Spanish Literature",
    experience: "20+ years teaching",
    specialisations: ["All Levels", "Academic Spanish", "Advanced Conversation"],
    availability: "Limited — Tue & Thu",
    accepting: true,
  },
  {
    name: "Rosa Laura García Caiza",
    firstName: "Laura",
    image: "/images/teachers/5.jpg",
    description:
      "Laura has taught Spanish since 1991. She has a passion for sharing Ecuadorian culture with her students and considers herself not just a teacher but an ambassador of her culture and her language.",
    credentials: "Universidad Central del Ecuador — Education",
    experience: "33+ years teaching",
    specialisations: ["Culture & Language", "Beginners", "Travel Spanish"],
    availability: "Mon, Wed & Fri",
    accepting: true,
  },
];

export function TeachersSection() {
  return (
    <section className="border-t border-[var(--vv-line)] bg-[var(--vv-bg)]">
      <Container>
        <div className="section-head">
          <div className="meta">
            <span className="eyebrow">{"// Our Team"}</span>
            <h2 className="h2">Meet Our Teachers</h2>
          </div>
          <p className="lede max-w-[42ch]">
            All of our teachers are university-trained, native Ecuadorians with
            years of experience. They&apos;re dedicated to supporting you and
            inspiring you as you learn Spanish.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {teachers.map((teacher) => (
            <TeacherCard key={teacher.name} teacher={teacher} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function TeacherCard({ teacher }: { teacher: (typeof teachers)[number] }) {
  return (
    <article className="teacher-card group grid overflow-hidden rounded-[var(--vv-radius-lg)] border border-[var(--vv-line)] bg-[var(--vv-bg)] transition duration-200 hover:-translate-y-0.5 hover:border-[var(--vv-accent)] md:grid-cols-[220px_1fr]">
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--vv-bg-warm)] md:aspect-auto md:min-h-[280px]">
        <Image
          src={teacher.image}
          alt={teacher.name}
          fill
          sizes="(max-width: 768px) 100vw, 220px"
          className="object-cover transition duration-300 group-hover:scale-[1.03]"
          unoptimized
        />
      </div>

      <div className="flex min-h-[280px] flex-col gap-3 p-6 md:p-7">
        <div>
          <div className="eyebrow mb-1">Teacher</div>
          <h3 className="text-[22px] font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--vv-ink)]">
            {teacher.name}
          </h3>
          <div className="mt-1 text-[12px] text-[var(--vv-ink-2)]">
            {teacher.credentials} · {teacher.experience}
          </div>
        </div>

        <p className="flex-1 text-[14px] leading-[1.6] text-[var(--vv-ink-2)]">
          {teacher.description}
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

        <div className="flex items-center gap-1.5 py-2 border-t border-[var(--vv-line)]">
          <span
            className={`h-2 w-2 rounded-full ${teacher.accepting ? "bg-green-500" : "bg-amber-400"}`}
          />
          <span className="text-[12px] text-[var(--vv-ink-2)]">
            {teacher.accepting ? "Accepting new students" : "Limited availability"} ·{" "}
            {teacher.availability}
          </span>
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

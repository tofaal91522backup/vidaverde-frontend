import { Container } from "@/components/shared/Container";
import { ArrowRight } from "lucide-react";
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
    <section className="border-t border-vv-line bg-vv-bg">
      <Container>
        <div className="flex flex-col gap-3.5 mb-12 max-w-[54ch]">
          <span className="font-code text-vv-muted text-[11px] font-medium tracking-[0.14em] uppercase">
            {"// Meet the Teachers"}
          </span>
          <h2 className="text-[clamp(28px,3vw,44px)] font-semibold tracking-[-0.02em] leading-[1.08] m-0 text-balance">
            Your Teacher Is Waiting
          </h2>
          <p className="text-vv-ink-2 text-[clamp(15px,1.1vw,17px)] leading-relaxed m-0 text-pretty">
            Choose your teacher and book your first lesson today. All our
            teachers are Ecuadorian native speakers with university-level
            training.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {teachers.map((teacher) => (
            <TeacherCard key={teacher.name} teacher={teacher} />
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Link
            href="/teachers"
            className="inline-flex items-center gap-2.5 border border-vv-line rounded-full cursor-pointer text-[15px] font-semibold tracking-[-0.005em] py-3.5 px-5.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap hover:border-vv-ink hover:-translate-y-px"
          >
            Meet all our teachers
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}

function TeacherCard({ teacher }: { teacher: (typeof teachers)[number] }) {
  return (
    <article className="group grid overflow-hidden rounded-[22px] border border-vv-line bg-vv-bg transition duration-200 hover:-translate-y-0.5 hover:border-vv-accent md:grid-cols-[220px_1fr]">
      <div className="relative aspect-4/3 overflow-hidden bg-vv-bg-warm md:aspect-auto md:min-h-70">
        <Image
          src={teacher.image}
          alt={teacher.name}
          fill
          sizes="(max-width: 768px) 100vw, 220px"
          className="object-cover transition duration-300 group-hover:scale-[1.03]"
          unoptimized
        />
      </div>

      <div className="flex min-h-70 flex-col gap-3 p-6 md:p-7">
        <div>
          <div className="font-code text-vv-muted text-[11px] font-medium tracking-[0.14em] uppercase mb-1">
            Teacher
          </div>
          <h3 className="text-[22px] font-semibold leading-[1.1] tracking-[-0.02em] text-vv-ink m-0">
            {teacher.name}
          </h3>
          <div className="mt-1 text-[12px] text-vv-ink-2">
            {teacher.credentials} · {teacher.experience}
          </div>
        </div>

        <p className="flex-1 text-[14px] leading-[1.6] text-vv-ink-2 m-0">
          {teacher.description}
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

        <div className="flex items-center gap-1.5 py-2 border-t border-vv-line">
          <span
            className={`h-2 w-2 rounded-full ${teacher.accepting ? "bg-green-500" : "bg-amber-400"}`}
          />
          <span className="text-[12px] text-vv-ink-2">
            {teacher.accepting ? "Accepting new students" : "Limited availability"} ·{" "}
            {teacher.availability}
          </span>
        </div>

        <Link
          href={`/online-classes/book?teacher=${teacher.firstName.toLowerCase()}`}
          className="inline-flex items-center justify-center gap-2.5 border border-vv-accent rounded-full cursor-pointer text-[13px] font-semibold tracking-[-0.005em] py-2.25 px-3.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-vv-accent text-vv-accent-deep hover:bg-vv-accent-hi hover:-translate-y-px text-center"
        >
          Book with {teacher.firstName} →
        </Link>
      </div>
    </article>
  );
}

import { Container } from "@/components/shared/Container";
import { Link } from "@/i18n/navigation";
import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

type TeacherKey = "ximena" | "lucia" | "fernando" | "laura";
type SpecialisationKey =
  | "beginnerFriendly"
  | "conversational"
  | "dele"
  | "grammar"
  | "intermediateAdvanced"
  | "business"
  | "allLevels"
  | "academic"
  | "advancedConversation"
  | "culture"
  | "beginners"
  | "travel";

const teachers: {
  key: TeacherKey;
  name: string;
  firstName: string;
  image: string;
  experience: string;
  specialisations: SpecialisationKey[];
  accepting: boolean;
}[] = [
  {
    key: "ximena",
    name: "Ximena Argüello",
    firstName: "Ximena",
    image: "/images/teachers/2.jpg",
    experience: "13+ years teaching",
    specialisations: ["beginnerFriendly", "conversational", "dele"],
    accepting: true,
  },
  {
    key: "lucia",
    name: "Lucía Rivadeneira",
    firstName: "Lucía",
    image: "/images/teachers/3.jpg",
    experience: "10+ years teaching",
    specialisations: ["grammar", "intermediateAdvanced", "business"],
    accepting: true,
  },
  {
    key: "fernando",
    name: "Fernando Báez Guzmán",
    firstName: "Fernando",
    image: "/images/teachers/4.jpg",
    experience: "20+ years teaching",
    specialisations: ["allLevels", "academic", "advancedConversation"],
    accepting: true,
  },
  {
    key: "laura",
    name: "Rosa Laura García Caiza",
    firstName: "Laura",
    image: "/images/teachers/5.jpg",
    experience: "33+ years teaching",
    specialisations: ["culture", "beginners", "travel"],
    accepting: true,
  },
];

export function TeachersSection() {
  const t = useTranslations("Home.teachers");

  return (
    <section className="border-t border-vv-line bg-vv-bg">
      <Container>
        <div className="flex flex-col gap-3.5 mb-12 max-w-[54ch]">
          <span className="font-code text-vv-muted text-[11px] font-medium tracking-[0.14em] uppercase">
            {t("eyebrow")}
          </span>
          <h2 className="text-[clamp(28px,3vw,44px)] font-semibold tracking-[-0.02em] leading-[1.08] m-0 text-balance">
            {t("title")}
          </h2>
          <p className="text-vv-ink-2 text-[clamp(15px,1.1vw,17px)] leading-relaxed m-0 text-pretty">
            {t("lede")}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {teachers.map((teacher) => (
            <TeacherCard key={teacher.key} teacher={teacher} />
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Link
            href="/teachers"
            className="inline-flex items-center gap-2.5 border border-vv-line rounded-full cursor-pointer text-[15px] font-semibold tracking-[-0.005em] leading-none py-3.5 px-5.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap hover:border-vv-ink hover:-translate-y-px"
          >
            {t("viewAll")}
            <ChevronRight aria-hidden="true" className="h-4 w-4 shrink-0" />
          </Link>
        </div>
      </Container>
    </section>
  );
}

function TeacherCard({ teacher }: { teacher: (typeof teachers)[number] }) {
  const t = useTranslations("Home.teachers");

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
            {t("teacherLabel")}
          </div>
          <h3 className="text-[22px] font-semibold leading-[1.1] tracking-[-0.02em] text-vv-ink m-0">
            {teacher.name}
          </h3>
          <div className="mt-1 text-[12px] text-vv-ink-2">
            {t(`credentials.${teacher.key}`)} · {teacher.experience}
          </div>
        </div>

        <p className="flex-1 text-[14px] leading-[1.6] text-vv-ink-2 m-0">
          {t(`descriptions.${teacher.key}`)}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {teacher.specialisations.map((s) => (
            <span
              key={s}
              className="rounded-full border border-vv-line bg-vv-bg-warm px-2.5 py-0.5 text-[11px] font-medium text-vv-ink-2"
            >
              {t(`specialisations.${s}`)}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-1.5 py-2 border-t border-vv-line">
          <span
            className={`h-2 w-2 rounded-full ${teacher.accepting ? "bg-green-500" : "bg-amber-400"}`}
          />
          <span className="text-[12px] text-vv-ink-2">
            {teacher.accepting
              ? t("acceptingStudents")
              : t("limitedAvailability")}{" "}
            · {t(`availability.${teacher.key}`)}
          </span>
        </div>

        <Link
          href={`/online-classes/book?teacher=${teacher.firstName.toLowerCase()}`}
          className="inline-flex items-center justify-center gap-2.5 border border-vv-accent rounded-full cursor-pointer text-[13px] font-semibold tracking-[-0.005em] leading-none py-2.25 px-3.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-vv-accent text-vv-accent-deep hover:bg-vv-accent-hi hover:-translate-y-px text-center"
        >
          {t("bookWith", { name: teacher.firstName })}{" "}
          <ChevronRight className="h-4 w-4 shrink-0 translate-y-0.5" />
        </Link>
      </div>
    </article>
  );
}

"use client";

import { Container } from "@/components/shared/Container";
import { useLanguage } from "@/providers/language-provider";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  Languages,
  UserRound,
  Video,
} from "lucide-react";
import Link from "next/link";
import TeacherPackages from "./components/TeacherPackages";
import {
  TeacherTag,
  useOwnSpanishBio,
} from "@/features/marketing/components/teacher-i18n";
import { usePublicTeacher } from "../queries/use-public-teachers";

function firstName(name: string) {
  return name.trim().split(/\s+/)[0] || name;
}

export default function TeacherProfilePage({ id }: { id: string }) {
  const { language } = useLanguage();
  const { data: teacher, isLoading, isError } = usePublicTeacher({
    id,
    lang: language,
  });
  const isOwnBio = useOwnSpanishBio();
  /* Google "Conozca" (usted) likhto; baki site "tú" */
  const meetAll = (
    <span translate="no">
      {language === "es"
        ? "Conoce a todos nuestros profesores"
        : "Meet all our teachers"}
    </span>
  );

  if (isLoading) {
    return (
      <section className="min-h-[60vh] py-16">
        <Container>
          <p className="text-vv-ink-2" role="status">
            Loading teacher profile…
          </p>
        </Container>
      </section>
    );
  }

  if (isError || !teacher) {
    return (
      <section className="min-h-[60vh] py-16">
        <Container>
          <Link
            href="/online-classes#teachers"
            className="inline-flex items-center gap-2 text-[13px] font-medium text-vv-ink-2 transition hover:text-vv-ink"
          >
            <ArrowLeft className="h-4 w-4" />
            {meetAll}
          </Link>
          <h1 className="mt-8 text-[clamp(30px,4vw,52px)] font-semibold tracking-[-0.03em] text-vv-ink">
            Teacher profile unavailable
          </h1>
          <p className="mt-3 text-vv-ink-2">
            This teacher may no longer be accepting public bookings. Please choose
            another teacher.
          </p>
        </Container>
      </section>
    );
  }

  const teacherFirstName = firstName(teacher.name);
  const ownBio = isOwnBio(teacher.id, teacher.description);
  // Naam Google-er na
  const name = <span translate="no">{teacherFirstName}</span>;
  // Naam alada span-e thakle Google baki tuku-ke "lección" kore; baki site "clase"
  const bookFirstWith = (english: string) => (
    <span translate="no">
      {language === "es" ? "Reserva tu primera clase con" : english}{" "}
      {teacherFirstName}
    </span>
  );

  return (
    <>
      <section
        className="relative overflow-hidden border-b border-vv-line bg-vv-bg-warm"
        data-screen-label="Teacher Profile Hero"
      >
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-vv-accent/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -left-24 h-88 w-88 rounded-full bg-vv-accent/14 blur-3xl" />

        <Container className="relative z-10 py-16 lg:py-20">
          <Link
            href="/online-classes#teachers"
            className="mb-8 inline-flex items-center gap-2 text-[13px] font-medium text-vv-ink-2 transition hover:text-vv-ink"
          >
            <ArrowLeft className="h-4 w-4" />
            {meetAll}
          </Link>

          <div className="grid items-center gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16">
            <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-[22px] border border-vv-line bg-vv-bg shadow-sm">
              {teacher.profile_img_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={teacher.profile_img_url}
                  alt={teacher.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <UserRound aria-hidden="true" className="h-20 w-20 text-vv-muted" />
              )}
            </div>

            <div>
              <span className="font-code text-[11px] font-medium uppercase tracking-[0.14em] text-vv-muted">
                {"// Teacher Profile"}
              </span>
              <h1 className="mt-4 max-w-[13ch] text-[clamp(38px,5vw,72px)] font-semibold leading-[0.96] tracking-[-0.04em] text-vv-ink">
                Learn Spanish with {name}
              </h1>
              <p className="mt-5 max-w-[58ch] text-[17px] leading-relaxed text-vv-ink-2">
                <span translate="no">{teacher.institute}</span> ·{" "}
                {/* Google "Hablante nativo" — Gabriela/Lucía/Rosa-r page-eo
                    purush-linga. Eta dui lingei chole */}
                {language === "es" ? (
                  <span translate="no">Español como lengua materna</span>
                ) : (
                  "Native Spanish speaker"
                )}
              </p>

              {teacher.tags.length > 0 && (
                <div className="mt-7 flex flex-wrap gap-2">
                  {teacher.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-vv-line bg-vv-bg px-3 py-1 text-[12px] font-medium text-vv-ink-2"
                    >
                      <TeacherTag tag={tag} />
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-8">
                <Link
                  href="#packages"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full border border-vv-accent bg-vv-accent px-5.5 py-3.5 text-[15px] font-semibold tracking-[-0.005em] text-vv-accent-deep transition hover:-translate-y-px hover:bg-vv-accent-hi"
                >
                  {bookFirstWith("Book Your First Lesson with")}
                  <ChevronRight className="h-4 w-4 shrink-0 translate-y-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section
        className="border-b border-vv-line bg-vv-bg py-16"
        data-screen-label="Teacher Profile Bio"
      >
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:gap-16">
            <div>
              <span className="font-code text-[11px] font-medium uppercase tracking-[0.14em] text-vv-muted">
                {"// Bio"}
              </span>
              <h2 className="mt-4 text-[clamp(28px,3vw,44px)] font-semibold leading-[1.08] tracking-[-0.02em] text-vv-ink">
                {/* Google "Les presento a…" dito */}
                <span translate="no">
                  {language === "es" ? "Conoce a" : "Meet"} {teacherFirstName}
                </span>
              </h2>
              <p className="mt-5 text-[17px] leading-[1.75] text-vv-ink-2">
                <span translate={ownBio ? "no" : undefined}>
                  {teacher.description}
                </span>
              </p>
            </div>

            <aside className="h-fit rounded-[22px] border border-vv-line bg-vv-bg-warm p-6">
              <div className="font-code text-[11px] font-medium uppercase tracking-[0.14em] text-vv-muted">
                {"// Class Details"}
              </div>
              <div className="mt-5 flex flex-col gap-4">
                <div className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-vv-accent-deep" />
                  <div>
                    <div className="text-[14px] font-semibold text-vv-ink">
                      {teacher.availability_label}
                    </div>
                    <div className="text-[13px] text-vv-ink-2">
                      Bookable times are shown during checkout.
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Video className="mt-0.5 h-5 w-5 shrink-0 text-vv-accent-deep" />
                  <div>
                    <div className="text-[14px] font-semibold text-vv-ink">
                      Online via Google Meet
                    </div>
                    <div className="text-[13px] text-vv-ink-2">
                      Learn from anywhere in the world.
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <GraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-vv-accent-deep" />
                  <div>
                    <div
                      className="text-[14px] font-semibold text-vv-ink"
                      translate="no"
                    >
                      {teacher.institute}
                    </div>
                    <div className="text-[13px] text-vv-ink-2">
                      Academic background.
                    </div>
                  </div>
                </div>
                {teacher.tags.length > 0 && (
                  <div className="flex gap-3">
                    <Languages className="mt-0.5 h-5 w-5 shrink-0 text-vv-accent-deep" />
                    <div>
                      <div className="text-[14px] font-semibold text-vv-ink">
                        {/* Google "Especializado en" — purush-linga */}
                        <span translate="no">
                          {language === "es" ? "Especialidades" : "Specialises in"}
                        </span>
                      </div>
                      <div className="text-[13px] text-vv-ink-2">
                        {teacher.tags.map((tag, i) => (
                          <span key={tag}>
                            {i > 0 && ", "}
                            <TeacherTag tag={tag} />
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <TeacherPackages
        teacherId={teacher.id}
        teacherFirstName={teacherFirstName}
      />

      <section
        className="bg-vv-bg-warm py-16"
        data-screen-label="Teacher Profile CTA"
      >
        <Container className="text-center">
          <span className="font-code text-[11px] font-medium uppercase tracking-[0.14em] text-vv-muted">
            {"// Ready to start?"}
          </span>
          <h2 className="mx-auto mt-4 max-w-[14ch] text-[clamp(30px,3.5vw,52px)] font-semibold leading-[1.02] tracking-[-0.03em] text-vv-ink">
            {bookFirstWith("Book your first lesson with")}
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="#packages"
              className="inline-flex items-center justify-center gap-2.5 rounded-full border border-vv-accent bg-vv-accent px-5.5 py-3.5 text-[15px] font-semibold tracking-[-0.005em] text-vv-accent-deep transition hover:-translate-y-px hover:bg-vv-accent-hi"
            >
              {/* Google "lección"; baki site "clase" */}
              <span translate="no">
                {language === "es"
                  ? "Reserva tu primera clase"
                  : "Book Your First Lesson"}
              </span>
              <ChevronRight className="h-4 w-4 shrink-0 translate-y-0.5" />
            </Link>
            <Link
              href="/online-classes#teachers"
              className="inline-flex items-center justify-center gap-2.5 rounded-full border border-vv-line bg-vv-bg px-5.5 py-3.5 text-[15px] font-semibold tracking-[-0.005em] text-vv-ink-2 transition hover:border-vv-ink hover:text-vv-ink"
            >
              {meetAll}
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}

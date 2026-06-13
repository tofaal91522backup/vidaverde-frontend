import { Container } from "@/components/shared/Container";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  Languages,
  Video,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { onlineTeachers } from "../data/online-classes.data";

export function getOnlineTeacherBySlug(slug: string) {
  return onlineTeachers.find((teacher) => teacher.slug === slug);
}

export function getOnlineTeacherSlugs() {
  return onlineTeachers.map((teacher) => teacher.slug);
}

export default function TeacherProfilePage({ slug }: { slug: string }) {
  const teacher = getOnlineTeacherBySlug(slug);

  if (!teacher) {
    notFound();
  }

  const availabilityLabel = teacher.accepting
    ? "Now accepting new students"
    : "Limited availability. Book soon";

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
            Meet all our teachers
          </Link>

          <div className="grid items-center gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16">
            <div className="relative overflow-hidden rounded-[22px] border border-vv-line bg-vv-bg shadow-sm">
              <div className="relative aspect-[4/5]">
                <Image
                  src={teacher.image}
                  alt={teacher.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 38vw"
                  className="object-cover"
                  priority
                  unoptimized
                />
              </div>
            </div>

            <div>
              <span className="font-code text-[11px] font-medium uppercase tracking-[0.14em] text-vv-muted">
                {"// Teacher Profile"}
              </span>
              <h1 className="mt-4 max-w-[13ch] text-[clamp(38px,5vw,72px)] font-semibold leading-[0.96] tracking-[-0.04em] text-vv-ink">
                Learn Spanish with {teacher.firstName}
              </h1>
              <p className="mt-5 max-w-[58ch] text-[17px] leading-relaxed text-vv-ink-2">
                {teacher.credentials} · {teacher.experience} · Native Spanish
                speaker
              </p>

              <div className="mt-7 flex flex-wrap gap-2">
                {teacher.specialisations.map((specialisation) => (
                  <span
                    key={specialisation}
                    className="rounded-full border border-vv-line bg-vv-bg px-3 py-1 text-[12px] font-medium text-vv-ink-2"
                  >
                    {specialisation}
                  </span>
                ))}
              </div>

              <div className="mt-8">
                <Link
                  href={`/online-classes/book?teacher=${teacher.firstName.toLowerCase()}`}
                  className="inline-flex items-center justify-center gap-2.5 rounded-full border border-vv-accent bg-vv-accent px-5.5 py-3.5 text-[15px] font-semibold tracking-[-0.005em] text-vv-accent-deep transition hover:-translate-y-px hover:bg-vv-accent-hi"
                >
                  Book Your First Lesson with {teacher.firstName}
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
                Meet {teacher.firstName}
              </h2>
              <p className="mt-5 text-[17px] leading-[1.75] text-vv-ink-2">
                {teacher.profileBio}
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
                      {availabilityLabel}
                    </div>
                    <div className="text-[13px] text-vv-ink-2">
                      {teacher.availability}
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
                    <div className="text-[14px] font-semibold text-vv-ink">
                      {teacher.experience}
                    </div>
                    <div className="text-[13px] text-vv-ink-2">
                      Professional Spanish teaching experience.
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Languages className="mt-0.5 h-5 w-5 shrink-0 text-vv-accent-deep" />
                  <div>
                    <div className="text-[14px] font-semibold text-vv-ink">
                      Specialises in
                    </div>
                    <div className="text-[13px] text-vv-ink-2">
                      {teacher.specialisations.join(", ")}
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <section
        className="bg-vv-bg-warm py-16"
        data-screen-label="Teacher Profile CTA"
      >
        <Container className="text-center">
          <span className="font-code text-[11px] font-medium uppercase tracking-[0.14em] text-vv-muted">
            {"// Ready to start?"}
          </span>
          <h2 className="mx-auto mt-4 max-w-[14ch] text-[clamp(30px,3.5vw,52px)] font-semibold leading-[1.02] tracking-[-0.03em] text-vv-ink">
            Book your first lesson with {teacher.firstName}
          </h2>
          <p className="mx-auto mt-4 max-w-[48ch] text-[16px] leading-relaxed text-vv-ink-2">
            Meet your teacher, find your level, and leave with a personalised
            plan. No contracts. Cancel or continue. It is your call.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href={`/online-classes/book?teacher=${teacher.firstName.toLowerCase()}`}
              className="inline-flex items-center justify-center gap-2.5 rounded-full border border-vv-accent bg-vv-accent px-5.5 py-3.5 text-[15px] font-semibold tracking-[-0.005em] text-vv-accent-deep transition hover:-translate-y-px hover:bg-vv-accent-hi"
            >
              Book Your First Lesson
              <ChevronRight className="h-4 w-4 shrink-0 translate-y-0.5" />
            </Link>
            <Link
              href="/online-classes#teachers"
              className="inline-flex items-center justify-center gap-2.5 rounded-full border border-vv-line bg-vv-bg px-5.5 py-3.5 text-[15px] font-semibold tracking-[-0.005em] text-vv-ink-2 transition hover:border-vv-ink hover:text-vv-ink"
            >
              Meet all our teachers
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}

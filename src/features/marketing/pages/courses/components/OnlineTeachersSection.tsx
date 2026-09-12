"use client";

import { Container } from "@/components/shared/Container";
import { useLanguage } from "@/providers/language-provider";
import { ChevronRight, UserRound } from "lucide-react";
import Link from "next/link";
import {
  usePublicTeachers,
} from "../queries/use-public-teachers";
import type { PublicTeacher } from "@/features/marketing/types/public-api.types";

function firstName(name: string) {
  return name.trim().split(/\s+/)[0] || name;
}

export function OnlineTeachersSection() {
  const { language } = useLanguage();
  const { data, isLoading, isError } = usePublicTeachers({ lang: language });
  const teachers = data ?? [];

  return (
    <section
      className="border-t border-vv-line bg-vv-bg-warm"
      data-screen-label="04 Teachers"
      id="teachers"
    >
      <Container>
        <div className="flex flex-col gap-3.5 mb-12 max-w-[58ch]">
          <span className="font-code text-vv-muted text-[11px] font-medium tracking-[0.14em] uppercase">
            {"// Choose Your Teacher"}
          </span>
          <h2 className="text-[clamp(28px,3vw,44px)] font-semibold tracking-[-0.02em] leading-[1.08] m-0 text-balance">
            Choose Your Teacher
          </h2>
          <p className="text-vv-ink-2 text-[clamp(15px,1.1vw,17px)] leading-relaxed m-0 text-pretty">
            All our teachers are Ecuadorian native speakers with
            university-level training and years of teaching experience. Pick the
            one that feels right for you.
          </p>
        </div>

        {isLoading && <p className="text-vv-ink-2">Loading teachers…</p>}
        {isError && (
          <p className="text-red-600" role="alert">
            Teachers are unavailable right now. Please try again shortly.
          </p>
        )}
        {!isLoading && !isError && teachers.length === 0 && (
          <p className="text-vv-ink-2">No teachers are currently available.</p>
        )}
        {teachers.length > 0 && (
          <div className="grid gap-6 lg:grid-cols-2">
            {teachers.map((teacher) => (
              <OnlineTeacherCard key={teacher.id} teacher={teacher} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}

function OnlineTeacherCard({ teacher }: { teacher: PublicTeacher }) {
  const teacherFirstName = firstName(teacher.name);

  return (
    <article className="group grid overflow-hidden rounded-[22px] border border-vv-line bg-vv-bg transition duration-200 hover:-translate-y-0.5 hover:border-vv-accent md:grid-cols-[200px_1fr]">
      <div className="relative flex aspect-4/3 items-center justify-center overflow-hidden bg-vv-bg-warm md:aspect-auto md:min-h-70">
        {teacher.profile_img_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={teacher.profile_img_url}
            alt={teacher.name}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <UserRound aria-hidden="true" className="h-14 w-14 text-vv-muted" />
        )}
      </div>
      <div className="flex min-h-70 flex-col gap-3 p-6">
        <div>
          <div className="font-code text-vv-muted text-[11px] font-medium tracking-[0.14em] uppercase mb-1">
            Teacher
          </div>
          <h3 className="text-[22px] font-semibold leading-tight tracking-[-0.02em] text-vv-ink m-0">
            {teacher.name}
          </h3>
          <div className="mt-1 text-[12px] text-vv-ink-2">{teacher.institute}</div>
        </div>
        <p className="text-[14px] leading-[1.6] text-vv-ink-2 flex-1 m-0">
          {teacher.description}
        </p>
        {teacher.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {teacher.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-vv-line bg-vv-bg-warm px-2.5 py-0.5 text-[11px] font-medium text-vv-ink-2"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="flex items-center gap-1.5 border-t border-vv-line pt-3 mt-1">
          <span
            className={`h-2 w-2 rounded-full ${teacher.accepting_students ? "bg-green-500" : "bg-amber-400"}`}
          />
          <span className="text-[12px] text-vv-ink-2">
            {teacher.availability_label}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            // Booking ekhon package-first. Shoja /book e pathale visitor package
            // screen-e porto ar tar bachai kora teacher kothao dekhato na.
            // Profile-er #packages e oi teacher-er shathe kena jay emon
            // package gula dekhay, tarpor duita param niye booking-e jay.
            href={`/online-classes/teachers/${encodeURIComponent(teacher.id)}#packages`}
            className="flex-1 inline-flex items-center justify-center gap-2.5 border border-vv-accent rounded-full cursor-pointer text-[13px] font-semibold tracking-[-0.005em] leading-none py-2.25 px-3.5 transition-[transform,background,color,border-color] duration-200 whitespace-nowrap bg-vv-accent text-vv-accent-deep hover:bg-vv-accent-hi hover:-translate-y-px text-center"
          >
            Book with {teacherFirstName}
            <ChevronRight className="h-4 w-4 shrink-0 translate-y-0.5" />
          </Link>
          <Link
            href={`/online-classes/teachers/${encodeURIComponent(teacher.id)}`}
            className="shrink-0 inline-flex items-center gap-1.5 text-[13px] font-medium text-vv-ink-2 underline underline-offset-2 hover:text-vv-ink transition-colors duration-150 whitespace-nowrap"
          >
            View profile
            <ChevronRight className="h-4 w-4 shrink-0 translate-y-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

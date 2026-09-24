"use client";

import { usePublicTeachers } from "@/features/marketing/pages/courses/queries/use-public-teachers";
import type { PublicTeacher } from "@/features/marketing/types/public-api.types";
import {
  TeacherTag,
  useOwnSpanishBio,
} from "@/features/marketing/components/teacher-i18n";
import { useLanguage } from "@/providers/language-provider";
import { UserRound } from "lucide-react";

/** Our School-er "Meet the Team" — `/public/teachers/` theke active teacher. */
export function OurSchoolTeachers() {
  const { language } = useLanguage();
  const { data: teachers, isLoading, isError } = usePublicTeachers({
    lang: language,
  });

  if (isLoading) {
    return <p className="col-span-full text-vv-ink-2">Loading teachers…</p>;
  }
  if (isError) {
    return (
      <p className="col-span-full text-red-600" role="alert">
        Teachers are unavailable right now. Please try again shortly.
      </p>
    );
  }
  if (!teachers?.length) {
    return (
      <p className="col-span-full text-vv-ink-2">
        No teachers are currently available.
      </p>
    );
  }

  return (
    <>
      {teachers.map((teacher) => (
        <TeacherCard key={teacher.id} teacher={teacher} />
      ))}
    </>
  );
}

function TeacherCard({ teacher }: { teacher: PublicTeacher }) {
  const ownBio = useOwnSpanishBio()(teacher.id, teacher.description);

  return (
    <article className="grid overflow-hidden rounded-[22px] border border-vv-line bg-vv-bg md:grid-cols-[180px_1fr]">
      <div className="relative flex aspect-4/3 items-center justify-center overflow-hidden bg-vv-bg-warm md:aspect-auto md:min-h-60">
        {teacher.profile_img_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={teacher.profile_img_url}
            alt={teacher.name}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <UserRound aria-hidden="true" className="h-14 w-14 text-vv-muted" />
        )}
      </div>
      <div className="flex flex-col gap-3 p-6">
        <div>
          <h3 className="text-[20px] font-semibold leading-tight tracking-[-0.02em] text-vv-ink">
            <span translate="no">{teacher.name}</span>
          </h3>
          {/* Proshthaner naam — Google chhoto hater kore dito */}
          {teacher.institute && (
            <div translate="no" className="mt-1 text-[12px] text-vv-ink-2">
              {teacher.institute}
            </div>
          )}
        </div>
        <p className="flex-1 text-[13px] leading-[1.6] text-vv-ink-2">
          <span translate={ownBio ? "no" : undefined}>
            {teacher.description}
          </span>
        </p>
        {teacher.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {teacher.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-vv-line bg-vv-bg-warm px-2 py-0.5 text-[11px] text-vv-ink-2"
              >
                <TeacherTag tag={tag} />
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

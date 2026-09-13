"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTeachers } from "@/features/protected/pages/dashboard/admin/pages/teachers/queries/use-teachers";
import type { AdminPackage } from "@/features/protected/pages/dashboard/admin/types/admin.types";
import { SCHOOL_TIMEZONE_LABEL } from "@/features/protected/pages/dashboard/admin/utils/format-school-datetime";
import { availabilitySummary } from "@/features/protected/pages/dashboard/admin/utils/teacher-display";
import { toList } from "@/features/protected/pages/dashboard/admin/utils/to-list";
import { initials } from "@/utils/initials";
import Link from "next/link";
import { useState } from "react";

/**
 * Dialog-er bhitorer ongsho — **alada component kore rakha hoyeche ichchha kore**.
 *
 * Radix dialog bondho thakle content unmount kore rakhe, tai `useTeachers()`
 * shudhu kholar por-i chole. Ek-i hook column cell-e rakhle table-er **proti ta
 * row** oi query mount korto (React Query dedupe kortoi, kintu bina karone).
 */
function TeacherList({ pkg }: { pkg: AdminPackage }) {
  const { data, isLoading, isError } = useTeachers({ active: true });
  const allTeachers = toList(data);

  const restricted = (pkg.teachers ?? []).length > 0;
  const teachers = restricted
    ? allTeachers.filter((teacher) => pkg.teachers.includes(teacher.id))
    : allTeachers;

  // `teacher_names` response-e ache, kintu `teachers` (uuid) er shathe mile na
  // emon naam thakle bojha jabe teacher ta deactivate hoye geche — active list-e
  // ar ashe na. Admin-er jana dorkar, na hole "3 teachers" lekha othocho 2 jon
  // dekhe confuse hoto.
  const missing = restricted
    ? Math.max(0, pkg.teachers.length - teachers.length)
    : 0;

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Loading teachers…</p>;
  }
  if (isError) {
    return <p className="text-sm text-destructive">Could not load teachers.</p>;
  }
  if (teachers.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No active teachers to show.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        {teachers.map((teacher) => (
          <div
            key={teacher.id}
            className="flex items-start gap-3 rounded-lg border p-3"
          >
            <Avatar className="size-10 shrink-0">
              <AvatarImage src={teacher.profile_img_url} alt={teacher.name} />
              <AvatarFallback className="text-xs">
                {initials(teacher.name)}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <Link
                  href={`/dashboard/admin/teachers/${teacher.id}/edit`}
                  className="truncate text-sm font-medium hover:underline"
                >
                  {teacher.name}
                </Link>
                {!teacher.accepting_students && (
                  <Badge variant="outline" className="text-[10px]">
                    Limited availability
                  </Badge>
                )}
              </div>

              {teacher.institute && (
                <p className="truncate text-xs text-muted-foreground">
                  {teacher.institute}
                </p>
              )}

              <p className="truncate text-xs text-muted-foreground">
                {availabilitySummary(teacher.availability)}
              </p>

              {teacher.tags?.length > 0 && (
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {teacher.tags.slice(0, 4).map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-[10px] capitalize"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {missing > 0 && (
        <p className="text-xs text-destructive">
          {missing} assigned {missing === 1 ? "teacher is" : "teachers are"} no
          longer active and {missing === 1 ? "is" : "are"} not shown.
        </p>
      )}

      <p className="text-[11px] text-muted-foreground">
        Weekly hours are in {SCHOOL_TIMEZONE_LABEL}.
      </p>
    </div>
  );
}

/**
 * Packages table-er "Teachers" cell — click korle kara, seta dekhay.
 *
 * Age shudhu ekta count badge chilo ar naam gula `title=` attribute-e lukono —
 * hover chhara pora jeto na, ar touch-e kono upay-i chilo na.
 *
 * Unrestricted package-eও click kaj kore: tokhon **shob active teacher** dekhay,
 * karon "All teachers" mane thik oita-i.
 */
export function PackageTeachersDialog({ pkg }: { pkg: AdminPackage }) {
  const [open, setOpen] = useState(false);

  const names = pkg.teacher_names ?? [];
  const restricted = names.length > 0;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="cursor-pointer rounded-md underline-offset-2 hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          {restricted ? (
            <Badge variant="outline">
              {names.length} {names.length === 1 ? "teacher" : "teachers"}
            </Badge>
          ) : (
            <span className="text-sm text-muted-foreground">All teachers</span>
          )}
        </button>
      </DialogTrigger>

      <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{pkg.title_en}</DialogTitle>
          <DialogDescription>
            {restricted
              ? "This package can only be booked with these teachers."
              : "No teachers are assigned, so every active teacher can be booked with this package."}
          </DialogDescription>
        </DialogHeader>

        {open && <TeacherList pkg={pkg} />}
      </DialogContent>
    </Dialog>
  );
}

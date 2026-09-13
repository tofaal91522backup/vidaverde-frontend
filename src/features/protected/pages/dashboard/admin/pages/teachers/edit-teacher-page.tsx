"use client";

import AsyncStateWrapper from "@/components/shared/async-state-wrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { AdminTeacher } from "@/features/protected/pages/dashboard/admin/types/admin.types";
import DashboardPageLayout from "@/features/protected/pages/dashboard/shared/components/dashboard-page-layout";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { TeacherForm } from "./components/teacher-form";
import { TimeOffSection } from "./components/time-off-section";
import type { TeacherFormValues } from "./schemas/teacher.schema";
import { useTeacherDetails, useUpdateTeacher } from "./queries/use-teachers";

/**
 * API response-er shob field form-e dhele deওয়া jabe na — `id`, `created_at`,
 * `time_off` egula form state-e dhuke submit-er shomoy backend-e chole jeto.
 * Tai shudhu form-er nijer field gula neওয়া hoy.
 */
function toFormValues(teacher: AdminTeacher): TeacherFormValues {
  return {
    name: teacher.name ?? "",
    profile_img_url: teacher.profile_img_url ?? "",
    tags: teacher.tags ?? [],
    institute: teacher.institute ?? "",
    description_en: teacher.description_en ?? "",
    description_es: teacher.description_es ?? "",
    availability: teacher.availability ?? [],
    accepting_students: teacher.accepting_students ?? true,
    google_calendar_id: teacher.google_calendar_id ?? "",
    meet_link: teacher.meet_link ?? "",
    active: teacher.active ?? true,
  };
}

/** Spinner-er cheye form-er akar-er skeleton kom jhatka lage */
function EditTeacherSkeleton() {
  return (
    <div className="space-y-5">
      {[0, 1, 2].map((i) => (
        <Card key={i} className="py-0">
          <CardContent className="space-y-4 p-5">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-3 w-64" />
            <div className="grid gap-4 sm:grid-cols-2">
              <Skeleton className="h-9 w-full" />
              <Skeleton className="h-9 w-full" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function EditTeacherPage({ id }: { id: string }) {
  // Detail endpoint bare teacher dey — `{ success, teacher }` na
  const { data: teacher, isLoading, isError } = useTeacherDetails(id);
  const mutation = useUpdateTeacher(id);

  return (
    <DashboardPageLayout
      title="Edit Teacher"
      subtitle={
        teacher
          ? `Changes go live on the public site as soon as you save.`
          : undefined
      }
      action={
        <Button variant="outline" asChild>
          <Link href="/dashboard/admin/teachers">
            <ArrowLeft className="size-4" />
            All teachers
          </Link>
        </Button>
      }
    >
      <div className="max-w-4xl space-y-5">
        <AsyncStateWrapper
          loading={isLoading}
          error={isError ? "Could not load this teacher." : null}
          loaderFallback={<EditTeacherSkeleton />}
        >
          {/* Form data asar por-i mount hoy, jate defaultValues thik thake */}
          {teacher && (
            <>
              <Card className="py-0">
                <CardContent className="flex flex-wrap items-center justify-between gap-3 p-5">
                  <div className="min-w-0">
                    <p className="truncate text-lg font-semibold">
                      {teacher.name}
                    </p>
                    {teacher.institute && (
                      <p className="truncate text-sm text-muted-foreground">
                        {teacher.institute}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant={teacher.active ? "secondary" : "outline"}>
                      {teacher.active ? "Active" : "Inactive"}
                    </Badge>
                    <Badge
                      variant={
                        teacher.accepting_students ? "secondary" : "outline"
                      }
                    >
                      {teacher.accepting_students
                        ? "Accepting new students"
                        : "Limited availability"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <TeacherForm
                mutation={mutation}
                defaultValues={toFormValues(teacher)}
                submitLabel="Save changes"
              />

              <TimeOffSection teacherId={id} />
            </>
          )}
        </AsyncStateWrapper>
      </div>
    </DashboardPageLayout>
  );
}

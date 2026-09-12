"use client";

import AsyncStateWrapper from "@/components/shared/async-state-wrapper";
import DashboardPageLayout from "@/features/protected/pages/dashboard/shared/components/dashboard-page-layout";
import type { AdminTeacher } from "@/features/protected/pages/dashboard/admin/types/admin.types";
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

export default function EditTeacherPage({ id }: { id: string }) {
  const { data, isLoading, isError } = useTeacherDetails(id);
  const mutation = useUpdateTeacher(id);

  const teacher = data?.teacher;

  return (
    <DashboardPageLayout
      title="Edit Teacher"
      subtitle={teacher ? `Editing: ${teacher.name}` : undefined}
    >
      <div className="max-w-3xl">
        <AsyncStateWrapper
          loading={isLoading}
          error={isError ? "Could not load this teacher." : null}
        >
          {/* Form data asar por-i mount hoy, jate defaultValues thik thake */}
          {teacher && (
            <div className="space-y-8">
              <TeacherForm
                mutation={mutation}
                defaultValues={toFormValues(teacher)}
              />
              <TimeOffSection teacherId={id} />
            </div>
          )}
        </AsyncStateWrapper>
      </div>
    </DashboardPageLayout>
  );
}

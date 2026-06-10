"use client";

import DashboardPageLayout from "@/features/protected/pages/dashboard/shared/components/dashboard-page-layout";
import { useTeacherDetails, useUpdateTeacher } from "./queries/use-teachers";
import { TeacherForm } from "./components/teacher-form";

export default function EditTeacherPage({ id }: { id: string }) {
  const { data, isLoading } = useTeacherDetails(id);
  const mutation = useUpdateTeacher(id);

  if (isLoading) {
    return (
      <DashboardPageLayout title="Edit Teacher">
        <p className="text-muted-foreground text-sm">Loading teacher data...</p>
      </DashboardPageLayout>
    );
  }

  return (
    <DashboardPageLayout
      title="Edit Teacher"
      subtitle={`Editing: ${data?.name}`}
    >
      <div className="max-w-3xl">
        <TeacherForm
          mutation={mutation}
          defaultValues={data}
        />
      </div>
    </DashboardPageLayout>
  );
}

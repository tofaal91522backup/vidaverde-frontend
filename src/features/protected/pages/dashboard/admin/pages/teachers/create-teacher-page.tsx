"use client";

import DashboardPageLayout from "@/features/protected/pages/dashboard/shared/components/dashboard-page-layout";
import { useCreateTeacher } from "./queries/use-teachers";
import { TeacherForm } from "./components/teacher-form";

export default function CreateTeacherPage() {
  const mutation = useCreateTeacher();
  return (
    <DashboardPageLayout
      title="Add New Teacher"
      subtitle="Fill in the details below to add a new teacher."
    >
      <div className="max-w-3xl">
        <TeacherForm mutation={mutation} />
      </div>
    </DashboardPageLayout>
  );
}

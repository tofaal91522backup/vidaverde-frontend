"use client";

import { Button } from "@/components/ui/button";
import DashboardPageLayout from "@/features/protected/pages/dashboard/shared/components/dashboard-page-layout";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { TeacherForm } from "./components/teacher-form";
import { useCreateTeacher } from "./queries/use-teachers";

export default function CreateTeacherPage() {
  const mutation = useCreateTeacher();

  return (
    <DashboardPageLayout
      title="Add New Teacher"
      subtitle="Time off can be added once the teacher is saved."
      action={
        <Button variant="outline" asChild>
          <Link href="/dashboard/admin/teachers">
            <ArrowLeft className="size-4" />
            All teachers
          </Link>
        </Button>
      }
    >
      <div className="max-w-4xl">
        <TeacherForm mutation={mutation} submitLabel="Create teacher" />
      </div>
    </DashboardPageLayout>
  );
}

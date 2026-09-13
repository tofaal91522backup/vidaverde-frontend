"use client";

import AsyncStateWrapper from "@/components/shared/async-state-wrapper";
import DashboardPageLayout from "@/features/protected/pages/dashboard/shared/components/dashboard-page-layout";
import { ProfileForm } from "./components/profile-form";
import { useStudentProfile } from "./queries/use-student-profile";

export default function StudentProfileIndex() {
  const { data, isLoading, isError } = useStudentProfile();

  return (
    <DashboardPageLayout
      title="My Profile"
      subtitle="Your details, and the timezone everything in the portal is shown in."
      /* Form-ta xl:-e duita column-e bhage; Tailwind breakpoint viewport dhore
         chole, container dhore na — chhoto container-e column duita chepe jeto */
      maxWidth="max-w-6xl"
    >
      <AsyncStateWrapper
        loading={isLoading}
        error={isError ? "Could not load your profile." : null}
      >
        {/* Form ta data asar por-i mount hoy, jate defaultValues thik thake */}
        {data?.profile && <ProfileForm profile={data.profile} />}
      </AsyncStateWrapper>
    </DashboardPageLayout>
  );
}

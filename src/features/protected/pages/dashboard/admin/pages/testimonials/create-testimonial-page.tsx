"use client";

import DashboardPageLayout from "@/features/protected/pages/dashboard/shared/components/dashboard-page-layout";
import { TestimonialForm } from "./components/testimonial-form";
import { useCreateTestimonial } from "./queries/use-testimonials";

export default function CreateTestimonialPage() {
  const mutation = useCreateTestimonial();
  return (
    <DashboardPageLayout
      title="New Testimonial"
      subtitle="Add a student outcome for the public site."
      /* Form-ta xl:-e duita column-e bhage, ar Tailwind breakpoint viewport
         dhore chole — container dhore na. Chhoto container-e column duita
         chepe jeto, tai package/teacher form-er moto 6xl. */
      maxWidth="max-w-6xl"
    >
      <TestimonialForm mutation={mutation} />
    </DashboardPageLayout>
  );
}

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
    >
      <div className="max-w-3xl">
        <TestimonialForm mutation={mutation} />
      </div>
    </DashboardPageLayout>
  );
}

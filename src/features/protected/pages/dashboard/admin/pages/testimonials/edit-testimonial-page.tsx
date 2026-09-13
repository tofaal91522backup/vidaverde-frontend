"use client";

import AsyncStateWrapper from "@/components/shared/async-state-wrapper";
import DashboardPageLayout from "@/features/protected/pages/dashboard/shared/components/dashboard-page-layout";
import type { AdminTestimonial } from "@/features/protected/pages/dashboard/admin/types/admin.types";
import { TestimonialForm } from "./components/testimonial-form";
import {
  useTestimonialDetails,
  useUpdateTestimonial,
} from "./queries/use-testimonials";
import type { TestimonialFormValues } from "./schemas/testimonial.schema";

/** Computed field (`outcome`, `lang`) ar `id`/`created_at` form-e nite nai */
function toFormValues(item: AdminTestimonial): TestimonialFormValues {
  return {
    student_name: item.student_name ?? "",
    country: item.country ?? "",
    photo_url: item.photo_url ?? "",
    outcome_en: item.outcome_en ?? "",
    outcome_es: item.outcome_es ?? "",
    rating: item.rating ?? 5,
    programme: item.programme ?? "",
    active: item.active ?? true,
    sort_order: item.sort_order ?? 0,
  };
}

export default function EditTestimonialPage({ id }: { id: string }) {
  const { data, isLoading, isError } = useTestimonialDetails(id);
  const mutation = useUpdateTestimonial(id);

  return (
    <DashboardPageLayout
      title="Edit Testimonial"
      subtitle={data ? `Editing: ${data.student_name}` : undefined}
      /* Niche-r note create page-e — two-column form-er jonno 6xl lage */
      maxWidth="max-w-6xl"
    >
      <AsyncStateWrapper
        loading={isLoading}
        error={isError ? "Could not load this testimonial." : null}
      >
        {data && (
          <TestimonialForm
            mutation={mutation}
            defaultValues={toFormValues(data)}
          />
        )}
      </AsyncStateWrapper>
    </DashboardPageLayout>
  );
}

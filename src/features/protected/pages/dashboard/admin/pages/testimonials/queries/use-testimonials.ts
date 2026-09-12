import type {
  AdminTestimonial,
  AdminTestimonialsResponse,
} from "@/features/protected/pages/dashboard/admin/types/admin.types";
import { useFetchData } from "@/hooks/use-fetch-data";
import { useMutationHandler } from "@/hooks/use-mutation-handler";
import { request } from "@/lib/http/request";

export const TESTIMONIALS_QUERY_KEY = "admin-testimonials";
export const TESTIMONIAL_DETAILS_QUERY_KEY = "admin-testimonial-details";

/**
 * GET /administrator/testimonials/ — shob ta, inactive shoho.
 * (Public endpoint shudhu `active` gula `sort_order` onujayi dey.)
 *
 * Doc bole **not paginated**; list-er exact shape bru te nai, tai `toList()`.
 *
 * docs/bruno/administrator/testimonials.bru
 */
export function useTestimonials() {
  return useFetchData<AdminTestimonialsResponse>({
    url: "/administrator/testimonials/",
    querykey: [TESTIMONIALS_QUERY_KEY],
  });
}

/** GET /administrator/testimonials/:id/ — bare object */
export function useTestimonialDetails(id: string) {
  return useFetchData<AdminTestimonial>({
    url: `/administrator/testimonials/${id}/`,
    querykey: [TESTIMONIAL_DETAILS_QUERY_KEY, id],
    options: { enabled: Boolean(id) },
  });
}

type TestimonialPayload = Partial<
  Pick<
    AdminTestimonial,
    | "student_name"
    | "country"
    | "photo_url"
    | "outcome_en"
    | "outcome_es"
    | "rating"
    | "programme"
    | "active"
    | "sort_order"
  >
>;

/** POST /administrator/testimonials/ — **bare object** ferot dey */
export function useCreateTestimonial() {
  return useMutationHandler<AdminTestimonial, TestimonialPayload>({
    mutationFn: (data) => request.post("/administrator/testimonials/", data),
    invalidateKeys: [[TESTIMONIALS_QUERY_KEY]],
    successMessage: "Testimonial created.",
    errorMessage: "Could not create the testimonial.",
    debugLabel: "CreateTestimonial",
  });
}

/** PATCH /administrator/testimonials/:id/ */
export function useUpdateTestimonial(id: string) {
  return useMutationHandler<AdminTestimonial, TestimonialPayload>({
    mutationFn: (data) =>
      request.patch(`/administrator/testimonials/${id}/`, data),
    invalidateKeys: [
      [TESTIMONIALS_QUERY_KEY],
      [TESTIMONIAL_DETAILS_QUERY_KEY, id],
    ],
    successMessage: "Testimonial updated.",
    errorMessage: "Could not update the testimonial.",
    debugLabel: "UpdateTestimonial",
  });
}

/** Public site-e dekhabe kina — `active` toggle */
export function useToggleTestimonialStatus() {
  return useMutationHandler<AdminTestimonial, { id: string; active: boolean }>({
    mutationFn: ({ id, active }) =>
      request.patch(`/administrator/testimonials/${id}/`, { active }),
    invalidateKeys: [[TESTIMONIALS_QUERY_KEY]],
    successMessage: "Testimonial status updated.",
    errorMessage: "Could not update the testimonial status.",
    debugLabel: "ToggleTestimonialStatus",
  });
}

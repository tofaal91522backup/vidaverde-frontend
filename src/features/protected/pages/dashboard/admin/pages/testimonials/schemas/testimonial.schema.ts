import { z } from "zod";

/**
 * docs/bruno/administrator/testimonials.bru
 *
 * `outcome_en` niye backend doc-e ekta sposhto niyom ache: eta **specific
 * outcome** bolte hobe, generic proshongsha na — "Great school!" convert kore na.
 * Form-er helper text-e sheta bola ache.
 */
export const TestimonialSchema = z.object({
  /** First name-i jothesto — spec-e sheta-i dekhano */
  student_name: z.string().min(1, "Student name is required"),
  country: z.string(),
  photo_url: z.string(),
  outcome_en: z.string().min(1, "The outcome is required"),
  outcome_es: z.string(),
  /** Star-rating aggregate-e jay */
  rating: z.coerce.number().min(1, "Minimum 1").max(5, "Maximum 5"),
  /** Free text — "Online Classes", "Quito Immersion" */
  programme: z.string(),
  active: z.boolean(),
  /** Ascending display order */
  sort_order: z.coerce.number(),
});

export type TestimonialFormValues = z.infer<typeof TestimonialSchema>;

import { z } from "zod";

/**
 * docs/bruno/administrator/packages.bru
 *
 * ⚠️ `price` backend-e **decimal string** ("250.00"), number na. Tai form-eo
 * string-i rakha hoy — number kore ferot dile "250" hoye jeto ar float-er
 * gondogol dhukto.
 */
export const PackageSchema = z.object({
  title_en: z.string().min(1, "English title is required"),
  title_es: z.string(),
  description_en: z.string(),
  description_es: z.string(),
  image_url: z.string(),
  total_classes: z.coerce.number().min(1, "Must grant at least 1 class"),
  validity_days: z.coerce.number().min(1, "Validity must be at least 1 day"),
  price: z
    .string()
    .min(1, "Price is required")
    .regex(/^\d+(\.\d{1,2})?$/, "Use a number like 250 or 250.00"),
  /** Discounted Assessment & First Lesson — ekta package-ei thaka uchit */
  is_first_lesson: z.boolean(),
  sort_order: z.coerce.number(),
  active: z.boolean(),
  /**
   * Kon teacher-der shathe book kora jabe.
   *
   * ⚠️ **Khali array = shob teacher allowed**, "keu na" NA. Default-i khali,
   * tai purono package gulo-r kichu bodlay na.
   *
   * PATCH-e ei field pathale backend purono list **replace** kore (merge kore na),
   * ar na pathale purono ta rekhe dey.
   *
   * `teacher_names` read-only, tai ekhane nai.
   */
  teachers: z.array(z.string()).default([]),
});

export type PackageFormValues = z.infer<typeof PackageSchema>;

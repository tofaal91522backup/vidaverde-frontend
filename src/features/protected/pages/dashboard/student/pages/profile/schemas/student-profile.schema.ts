import { z } from "zod";

/**
 * PATCH /student/me/ er body.
 *
 * Backend-e shob field optional (ja bodleche shudhu ta pathano jay), kintu
 * form-e shob ek shathe jay — PATCH merge kore, tai oshubidha nai.
 *
 * `id`, `email`, `active` read-only — email account system diye bodlay ar
 * deactivate kora admin-er kaj.
 *
 * docs/bruno/student/me.bru
 */
export const StudentProfileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  country: z.string(),
  phone_number: z.string(),
  /** IANA name, e.g. "Europe/Berlin". Ochena zone hole backend 400 dey */
  timezone: z.string().min(1, "Timezone is required"),
  current_spanish_level: z.enum([
    "none",
    "beginner",
    "intermediate",
    "upper_intermediate",
    "advanced",
  ]),
  profile_img_url: z
    .string()
    .refine((value) => !value || /^https?:\/\//.test(value), {
      message: "Must be a full URL starting with http:// or https://",
    }),
});

export type StudentProfileValues = z.infer<typeof StudentProfileSchema>;

export const SPANISH_LEVEL_OPTIONS = [
  { value: "none", label: "No Spanish yet" },
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "upper_intermediate", label: "Upper intermediate" },
  { value: "advanced", label: "Advanced" },
] as const;

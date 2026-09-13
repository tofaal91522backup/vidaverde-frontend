import { SPANISH_LEVEL_VALUES } from "@/constants/spanish-levels";
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
  current_spanish_level: z.enum(SPANISH_LEVEL_VALUES),
  profile_img_url: z
    .string()
    .refine((value) => !value || /^https?:\/\//.test(value), {
      message: "Must be a full URL starting with http:// or https://",
    }),
});

export type StudentProfileValues = z.infer<typeof StudentProfileSchema>;

/*
  `SPANISH_LEVEL_OPTIONS` ekhan theke shorano hoyeche.

  Ekta copy chilo `src/constants/spanish-levels.ts` e (registration ar public
  checkout use kore) ar arekta ekhane — ar **label duita alada chilo**. Mane
  student registration-e "Beginner. I know some basics" dekhto, ar nijer
  profile-e "Beginner". Ekhon ek jayga.
*/

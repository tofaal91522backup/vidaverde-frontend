import { z } from "zod";

export const WEEK_DAYS = [
  { value: "mon", label: "Monday" },
  { value: "tue", label: "Tuesday" },
  { value: "wed", label: "Wednesday" },
  { value: "thu", label: "Thursday" },
  { value: "fri", label: "Friday" },
  { value: "sat", label: "Saturday" },
  { value: "sun", label: "Sunday" },
] as const;

const TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/;

/**
 * Ekta weekly availability rule — **school time** (America/Guayaquil) e.
 * Backend ochena day, bhul time format, ba start >= end hole 400 dey,
 * tai ekhanei atkano hoy.
 */
export const AvailabilityRuleSchema = z
  .object({
    day: z.enum(["mon", "tue", "wed", "thu", "fri", "sat", "sun"]),
    start: z.string().regex(TIME_PATTERN, "Use HH:MM (24-hour)"),
    end: z.string().regex(TIME_PATTERN, "Use HH:MM (24-hour)"),
  })
  .refine((rule) => rule.start < rule.end, {
    message: "Start time must be before end time",
    path: ["end"],
  });

/**
 * docs/bruno/administrator/teachers.bru
 *
 * `name` chhara shob optional. `description_en`/`_es` bilingual — public API
 * `?lang=` onujayi dey, na pele English e fallback kore.
 */
export const TeacherSchema = z.object({
  name: z.string().min(1, "Name is required"),
  profile_img_url: z.string(),
  /** Free-text specialisation, public card-e chip hisebe dekhay */
  tags: z.array(z.string()),
  institute: z.string(),
  description_en: z.string(),
  description_es: z.string(),
  availability: z.array(AvailabilityRuleSchema),
  /** true → "Accepting new students", false → "Limited availability" */
  accepting_students: z.boolean(),
  /** Khali hole Google Calendar sync off, `meet_link` use hobe */
  google_calendar_id: z.string(),
  meet_link: z
    .string()
    .refine((value) => !value || /^https?:\/\//.test(value), {
      message: "Must be a full URL starting with http:// or https://",
    }),
  active: z.boolean(),
});

export type TeacherFormValues = z.infer<typeof TeacherSchema>;
export type AvailabilityRuleValue = z.infer<typeof AvailabilityRuleSchema>;

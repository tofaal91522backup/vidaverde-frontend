import { z } from "zod";

/**
 * POST /student/sessions/ er payload.
 *
 * `start_datetime` te slots API-r `start_utc` **hubohu** boshate hobe —
 * nijer theke banano ba convert kora jabe na, backend oita re-validate kore.
 *
 * docs/bruno/student/book session.bru
 */
export const BookSessionSchema = z.object({
  student_package: z.string().min(1, "Choose a package"),
  teacher: z.string().min(1, "Choose a teacher"),
  start_datetime: z.string().min(1, "Choose a time slot"),
});

export type BookSessionValues = z.infer<typeof BookSessionSchema>;

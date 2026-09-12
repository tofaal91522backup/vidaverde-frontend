import { z } from "zod";

/**
 * docs/bruno/administrator/teacher time off.bru
 *
 * Form-e `<input type="datetime-local">` er value ("YYYY-MM-DDTHH:MM") rakha hoy;
 * pathanor age `toSchoolIso()` diye offset boshano hoy — backend ISO-8601
 * with offset chay.
 */
export const TimeOffSchema = z
  .object({
    start_datetime: z.string().min(1, "Start date and time is required"),
    end_datetime: z.string().min(1, "End date and time is required"),
    reason: z.string(),
  })
  .refine((value) => value.start_datetime < value.end_datetime, {
    message: "End must be after the start",
    path: ["end_datetime"],
  });

export type TimeOffFormValues = z.infer<typeof TimeOffSchema>;

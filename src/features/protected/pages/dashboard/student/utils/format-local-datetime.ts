/**
 * Student portal-er date/time format.
 *
 * Backend `start_local` already student-er nijer timezone-e diye dey
 * (jemon "2026-09-10T15:00:00+02:00"). Ei string-e
 * `new Date(...).toLocaleString()` chalale browser-er timezone-e abar convert
 * hoye vul shomoy dekhabe — tai naive part direct pora hoy.
 *
 * Asol logic `@/utils/iso-datetime` e (admin-eo school time-er jonno ek-i
 * logic use kore); ekhane shudhu student-er naam diye re-export.
 */
import {
  isoDate,
  isoDateKey,
  isoDateTime,
  isoTime,
} from "@/utils/iso-datetime";

/** "2026-09-10T15:00:00+02:00" → "15:00" */
export const formatLocalTime = isoTime;

/** "2026-09-10T15:00:00+02:00" → "10 Sep 2026" */
export const formatLocalDate = isoDate;

/** "2026-09-10T15:00:00+02:00" → "Thu, 10 Sep 2026 · 15:00" */
export const formatLocalDateTime = isoDateTime;

/** YYYY-MM-DD — filter/grouping er jonno */
export const localDateKey = isoDateKey;

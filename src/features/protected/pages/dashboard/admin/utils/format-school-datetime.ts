/**
 * Admin dashboard-er date/time format.
 *
 * ⚠️ **Student-er theke alada:** admin response-e `start_local` **nai** — shudhu
 * `start_datetime` / `end_datetime`, ar oigula **school time** e ashe
 * (America/Guayaquil). Admin puro school-er kaj dekhe, kono ek student-er
 * timezone-e na.
 *
 * Tai ekhane ja dekhano hoy ta **school time**, ar UI te sheta bole deওয়া uchit
 * (`SCHOOL_TIMEZONE_LABEL`) jate admin bhul na bojhe.
 *
 * Logic `@/utils/iso-datetime` er — offset-er ager naive part direct pora hoy,
 * browser-er zone-e convert kora hoy na.
 */
import {
  isoDate,
  isoDateKey,
  isoDateTime,
  isoTime,
} from "@/utils/iso-datetime";

/** Backend-er school timezone — docs/bruno/public/teacher slots.bru */
export const SCHOOL_TIMEZONE = "America/Guayaquil";

/** UI te dekhanor jonno label */
export const SCHOOL_TIMEZONE_LABEL = "school time (America/Guayaquil)";

/** "2026-09-10T08:00:00-05:00" → "08:00" */
export const formatSchoolTime = isoTime;

/** "2026-09-10T08:00:00-05:00" → "10 Sep 2026" */
export const formatSchoolDate = isoDate;

/** "2026-09-10T08:00:00-05:00" → "Thu, 10 Sep 2026 · 08:00" */
export const formatSchoolDateTime = isoDateTime;

/** YYYY-MM-DD — calendar grouping / filter er jonno */
export const schoolDateKey = isoDateKey;

/**
 * Ecuador-er offset. Ekhane DST nai — bochor bhor UTC-5, tai eta hardcode kora
 * nirapod. (Kono din bodlale ei ek jayga bodlalei hobe.)
 */
const SCHOOL_UTC_OFFSET = "-05:00";

/**
 * `<input type="datetime-local">` er value ("2026-12-24T00:00") →
 * backend-er cheye neওয়া ISO-8601 with offset ("2026-12-24T00:00:00-05:00").
 *
 * Admin ja type kore ta school time hisebe dhora hoy — admin school-er kaj
 * dekhe, nijer device-er zone-e na.
 */
export function toSchoolIso(localValue: string): string {
  if (!localValue) return "";
  // "YYYY-MM-DDTHH:MM" ba "YYYY-MM-DDTHH:MM:SS" duito-i ashte pare
  const withSeconds =
    localValue.length === 16 ? `${localValue}:00` : localValue.slice(0, 19);
  return `${withSeconds}${SCHOOL_UTC_OFFSET}`;
}

/**
 * Ulto dik — API-r ISO string theke `<input type="datetime-local">` er value.
 * Offset-er ager tuku-i school time, tai kono convert kora hoy na.
 */
export function toDatetimeLocalValue(iso: string): string {
  return iso?.slice(0, 16) ?? "";
}

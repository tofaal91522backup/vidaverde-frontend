/**
 * ISO-8601 string (offset shoho) format korar generic helper.
 *
 * **Mul kotha:** backend je string dey (jemon "2026-09-10T15:00:00+02:00") tar
 * offset-er ager tuku-i oi context-er asol local shomoy. Tate
 * `new Date(...).toLocaleString()` chalale **browser-er timezone-e abar convert**
 * hoye jay — mane vul shomoy dekhabe.
 *
 * Tai ekhane naive part (offset-er ager tuku) direct pora hoy.
 *
 * - Student portal-e ei string student-er nijer timezone-e ashe (`start_local`)
 * - Admin dashboard-e school time-e ashe (America/Guayaquil)
 *
 * Duito khetre-i logic ek — tai ek jaygay rakha.
 */

/** Naive part theke Date banay, kono convert chhara */
function parseNaive(iso: string): Date | null {
  const naive = iso?.slice(0, 19);
  if (!naive) return null;
  const date = new Date(naive);
  return Number.isNaN(date.getTime()) ? null : date;
}

/** "2026-09-10T15:00:00+02:00" → "15:00" */
export function isoTime(iso: string): string {
  return iso?.slice(11, 16) ?? "";
}

/** "2026-09-10T15:00:00+02:00" → "10 Sep 2026" */
export function isoDate(iso: string): string {
  const date = parseNaive(iso);
  if (!date) return "";
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/** "2026-09-10T15:00:00+02:00" → "Thu, 10 Sep 2026 · 15:00" */
export function isoDateTime(iso: string): string {
  const date = parseNaive(iso);
  if (!date) return "";
  const day = date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  return `${day} · ${isoTime(iso)}`;
}

/** "2026-09-10T15:00:00+02:00" → "2026-09-10" (grouping/filter er jonno) */
export function isoDateKey(iso: string): string {
  return iso?.slice(0, 10) ?? "";
}

/**
 * Ekta Date object theke local YYYY-MM-DD.
 *
 * `toISOString()` **UTC** dey — tate timezone offset-e "today" ek din age/pore
 * dekhate pare. Tai local part theke banano hoy.
 */
export function localDateInput(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

/** Aj-ker date, `<input type="date">` er jonno */
export function todayInput(): string {
  return localDateInput(new Date());
}

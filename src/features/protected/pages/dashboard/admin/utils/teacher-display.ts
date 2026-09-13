import type { AdminTeacher } from "@/features/protected/pages/dashboard/admin/types/admin.types";

/** Sort korar jonno — `availability` kono nirdishto order-e ashe na. */
const DAY_ORDER = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const;

/**
 * Weekly rule gula ek line-e — "Mon, Tue, Wed · 08:00–16:00".
 *
 * Shob din-er time ek hole ekbar-i time dekhay; alada hole shudhu koyta window,
 * karon proti din-er alada time ek line-e dhukbe na.
 *
 * ⚠️ Ei hour gula **school time** (America/Guayaquil) — jekhane dekhabe, shekhane
 * seta bole deওয়া uchit (`SCHOOL_TIMEZONE_LABEL`).
 */
export function availabilitySummary(availability: AdminTeacher["availability"]) {
  const rules = availability ?? [];
  if (rules.length === 0) return "No weekly hours set";

  const days = [...new Set(rules.map((rule) => rule.day))].sort(
    (a, b) => DAY_ORDER.indexOf(a) - DAY_ORDER.indexOf(b),
  );
  const label = days
    .map((day) => day.charAt(0).toUpperCase() + day.slice(1))
    .join(", ");

  const windows = [...new Set(rules.map((rule) => `${rule.start}–${rule.end}`))];

  return windows.length === 1
    ? `${label} · ${windows[0]}`
    : `${label} · ${windows.length} different windows`;
}

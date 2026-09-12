/**
 * Puro backend-e common domain enum.
 *
 * Ek jaygay rakha, jate student ar admin duita alada definition rekhe pore
 * drift na kore (backend notun status add korle ek jaygay bodlalei hobe).
 */

/** docs/bruno/administrator/session update.bru */
export type SessionStatus =
  | "scheduled"
  | "completed"
  | "no_show"
  | "cancelled"
  | "rescheduled";

/** docs/bruno/student/me.bru */
export type SpanishLevel =
  | "none"
  | "beginner"
  | "intermediate"
  | "upper_intermediate"
  | "advanced";

/** Teacher availability ar time-off e byabohrito */
export type WeekDay = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

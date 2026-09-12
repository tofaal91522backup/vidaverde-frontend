import type { PublicTeacherSlotsResponse } from "@/features/marketing/types/public-api.types";
import { useFetchData } from "@/hooks/use-fetch-data";
import { makeEndpoint } from "@/lib/http/make-endpoint";

export const PUBLIC_TEACHER_SLOTS_QUERY_KEY = "public-teacher-slots";

/** Ek call-e puro week bhorte — backend 1-31 ney. */
export const PUBLIC_SLOT_DAYS = 7;

type TeacherSlotsParams = {
  teacherId: string | null;
  /** YYYY-MM-DD; khali hole backend aj dhore ney. */
  date: string;
  /** Visitor-er IANA zone. Ochena zone hole backend 400 dey. */
  tz: string;
  days?: number;
};

/**
 * GET /public/teachers/:id/slots/ — asol bookable slot, visitor-er timezone-e.
 *
 * Kichu store kora hoy na: proti request-e teacher-er weekly rule theke hisheb
 * hoy, booked class ar time-off bad diye, ar ekhon theke `BOOKING_MIN_LEAD_HOURS`
 * (12) er bhitore shuru howa gula-o bad.
 *
 * ⚠️ Slot-er `start_utc` **hubohu** checkout-e `start_datetime` hisebe pathate
 * hobe — nijer theke banano ba convert kora jabe na, backend re-validate kore.
 *
 * docs/bruno/public/teacher slots.bru
 */
export function usePublicTeacherSlots({
  teacherId,
  date,
  tz,
  days = PUBLIC_SLOT_DAYS,
}: TeacherSlotsParams) {
  const query = { date: date || undefined, tz, days };

  return useFetchData<PublicTeacherSlotsResponse>({
    url: makeEndpoint(`/public/teachers/${teacherId ?? ""}/slots/`, query),
    // Teacher/date/tz — ei tinta bodlalei refetch, onno kichute na
    querykey: [PUBLIC_TEACHER_SLOTS_QUERY_KEY, teacherId, query],
    client: "public",
    options: { enabled: Boolean(teacherId) },
  });
}

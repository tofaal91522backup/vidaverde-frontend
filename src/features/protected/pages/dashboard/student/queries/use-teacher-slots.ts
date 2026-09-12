import { useFetchData } from "@/hooks/use-fetch-data";
import type { TeacherSlotsResponse } from "@/features/protected/pages/dashboard/student/types/student.types";
import { makeEndpoint } from "@/lib/http/make-endpoint";

export const TEACHER_SLOTS_QUERY_KEY = "teacher-slots";

type TeacherSlotsParams = {
  teacherId: string;
  /** YYYY-MM-DD. Na dile backend aj dhore ney */
  date?: string;
  /** IANA zone. Na dile backend "America/Guayaquil" dhore ney */
  tz?: string;
  /** Koto din-er slot, 1-31. Week view bhorte 7 */
  days?: number;
  enabled?: boolean;
};

/**
 * GET /public/teachers/:id/slots/ — asol bookable slot, visitor-er timezone-e.
 *
 * Kichu store kora hoy na — proti request-e teacher-er weekly rule theke hisheb
 * hoy, booked session ar time-off bad diye, ar ekhon theke 12 ghontar bhitore
 * shuru howa gula-o bad.
 *
 * `start_utc` **hubohu** pathate hobe book/reschedule-e — nijer theke banano
 * ba convert kora jabe na.
 *
 * Public endpoint, kintu student logged-in thake tai normal `request` diyei hoy.
 *
 * docs/bruno/public/teacher slots.bru
 */
export function useTeacherSlots({
  teacherId,
  date,
  tz,
  days = 7,
  enabled = true,
}: TeacherSlotsParams) {
  const query = { date, tz, days };

  return useFetchData<TeacherSlotsResponse>({
    url: makeEndpoint(`/public/teachers/${teacherId}/slots/`, query),
    querykey: [TEACHER_SLOTS_QUERY_KEY, teacherId, query],
    options: { enabled: enabled && Boolean(teacherId) },
  });
}

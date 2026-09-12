import type {
  TeacherTimeOff,
  TeacherTimeOffResponse,
} from "@/features/protected/pages/dashboard/admin/types/admin.types";
import { useFetchData } from "@/hooks/use-fetch-data";
import { useMutationHandler } from "@/hooks/use-mutation-handler";
import { request } from "@/lib/http/request";
import type { ListResponse } from "@/types/api-response.type";
import { TEACHER_DETAILS_QUERY_KEY } from "./use-teachers";

export const TIME_OFF_QUERY_KEY = "admin-teacher-time-off";

/**
 * GET /administrator/teachers/:id/time-off/ — oi teacher-er blackout window.
 *
 * ⚠️ List shape bru te dekhano nai (POST `{ success, time_off }` dey), tai
 * `toList()` diye normalize kora hoy.
 *
 * docs/bruno/administrator/teacher time off.bru
 */
export function useTeacherTimeOff(teacherId: string) {
  return useFetchData<ListResponse<TeacherTimeOff> | TeacherTimeOff[]>({
    url: `/administrator/teachers/${teacherId}/time-off/`,
    querykey: [TIME_OFF_QUERY_KEY, teacherId],
    options: { enabled: Boolean(teacherId) },
  });
}

type TimeOffPayload = {
  /** ISO-8601 with offset */
  start_datetime: string;
  end_datetime: string;
  reason?: string;
};

/**
 * POST /administrator/teachers/:id/time-off/
 *
 * Ei window-er kono slot public slots API te ar dekhabe na, ar booking-e refuse
 * hobe. Kintu **age theke book hoye thaka class cancel hoy na** — oigula
 * sessions list theke alada kore move/cancel korte hobe.
 */
export function useCreateTimeOff(teacherId: string) {
  return useMutationHandler<TeacherTimeOffResponse, TimeOffPayload>({
    mutationFn: (data) =>
      request.post(`/administrator/teachers/${teacherId}/time-off/`, data),
    invalidateKeys: [
      [TIME_OFF_QUERY_KEY, teacherId],
      // Teacher detail response-e time_off embed thake, tai oita-o bashi
      [TEACHER_DETAILS_QUERY_KEY, teacherId],
    ],
    successMessage: "Time off added.",
    errorMessage: "Could not add the time off.",
    debugLabel: "CreateTeacherTimeOff",
  });
}

import { STUDENT_DASHBOARD_QUERY_KEY } from "@/features/protected/pages/dashboard/student/pages/overview/queries/use-student-dashboard";
import { STUDENT_SESSIONS_QUERY_KEY } from "@/features/protected/pages/dashboard/student/pages/calendar/queries/use-student-sessions";
import type {
  StudentProfileResponse,
  UpdateStudentProfilePayload,
} from "@/features/protected/pages/dashboard/student/types/student.types";
import { useFetchData } from "@/hooks/use-fetch-data";
import { useMutationHandler } from "@/hooks/use-mutation-handler";
import { request } from "@/lib/http/request";

export const STUDENT_PROFILE_QUERY_KEY = "student-profile";

/**
 * GET /student/me/ — profile.
 *
 * docs/bruno/student/me.bru
 */
export function useStudentProfile() {
  return useFetchData<StudentProfileResponse>({
    url: "/student/me/",
    querykey: [STUDENT_PROFILE_QUERY_KEY],
  });
}

/**
 * PATCH /student/me/ — profile update. Shob field optional.
 *
 * `timezone` bodlale portal-er shob date/time oi zone-e render hobe, tai
 * sessions ar dashboard-o invalidate kora hoy (`start_local` notun kore ashbe).
 */
export function useUpdateStudentProfile() {
  return useMutationHandler<StudentProfileResponse, UpdateStudentProfilePayload>(
    {
      mutationFn: (payload) => request.patch("/student/me/", payload),
      invalidateKeys: [
        [STUDENT_PROFILE_QUERY_KEY],
        // timezone bodlale `start_local` bodlay, tai ei duto-o bashi
        [STUDENT_SESSIONS_QUERY_KEY],
        [STUDENT_DASHBOARD_QUERY_KEY],
      ],
      successMessage: "Profile updated.",
      errorMessage: "Could not update your profile.",
      debugLabel: "UpdateStudentProfile",
    },
  );
}

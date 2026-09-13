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
 * ⚠️ **Authenticated endpoint.** Logged-out obosthay dakle 401 ashe ar
 * `apiClient`-er interceptor session destroy kore redirect kore dey. Tai
 * jekhane user logged-in kina nishchit na (jemon marketing navbar), shekhane
 * `enabled` diye gate korte hobe.
 *
 * Navbar-er avatar-o ei ek-i key use kore, tai profile save korle
 * `useUpdateStudentProfile`-er invalidate-e navbar-er chhobi-o shathe shathe bodlay.
 *
 * docs/bruno/student/me.bru
 */
export function useStudentProfile(enabled = true) {
  return useFetchData<StudentProfileResponse>({
    url: "/student/me/",
    querykey: [STUDENT_PROFILE_QUERY_KEY],
    options: { enabled },
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

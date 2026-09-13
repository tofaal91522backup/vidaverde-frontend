import type { StudentProfileResponse } from "@/features/protected/pages/dashboard/student/types/student.types";
import { useFetchData } from "@/hooks/use-fetch-data";

export const BOOKING_PREFILL_QUERY_KEY = "booking-prefill-profile";

/**
 * `GET /student/me/` — booking form-e logged-in student-er details bhorar jonno.
 *
 * ⚠️ **`enabled` shudhu tokhon-i true kora jabe jokhon nishchit je user logged in
 * ar STUDENT.** Ei ta authenticated endpoint; logged-out obosthay dakle 401
 * ashto ar `apiClient`-er interceptor session destroy kore public visitor-ke
 * shoja bar kore dito — booking page-e ja bhoyaboh.
 *
 * Type ta student feature theke neওয়া (backend contract, copy korar mane nai);
 * hook ta ekhane-i, karon eta marketing-er nijer kaj.
 */
export function useBookingPrefill(enabled: boolean) {
  return useFetchData<StudentProfileResponse>({
    url: "/student/me/",
    querykey: [BOOKING_PREFILL_QUERY_KEY],
    options: { enabled },
  });
}

import { useFetchData } from "@/hooks/use-fetch-data";
import type { StudentPackagesResponse } from "@/features/protected/pages/dashboard/student/types/student.types";

export const MY_PACKAGES_QUERY_KEY = "student-packages";

/**
 * GET /student/packages/ — ki kena hoyeche, koto baki, kobe expire.
 *
 * `classes_remaining`, `progress_percent`, `is_expired`, `can_book` — shob
 * backend-e computed, frontend-e abar hisheb korar dorkar nai.
 *
 * docs/bruno/student/packages.bru
 */
export function useMyPackages() {
  return useFetchData<StudentPackagesResponse>({
    url: "/student/packages/",
    querykey: [MY_PACKAGES_QUERY_KEY],
  });
}

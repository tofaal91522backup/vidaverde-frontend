import { useFetchData } from "@/hooks/use-fetch-data";
import type { StudentDashboardResponse } from "@/features/protected/pages/dashboard/student/types/student.types";

export const STUDENT_DASHBOARD_QUERY_KEY = "student-dashboard";

/**
 * GET /student/dashboard/ — portal er landing page.
 * Ek call-e: next upcoming class, shob paid package progress shoho, ar
 * shesh 5 ta invoice.
 *
 * docs/bruno/student/dashboard.bru
 */
export function useStudentDashboard() {
  return useFetchData<StudentDashboardResponse>({
    url: "/student/dashboard/",
    querykey: [STUDENT_DASHBOARD_QUERY_KEY],
  });
}

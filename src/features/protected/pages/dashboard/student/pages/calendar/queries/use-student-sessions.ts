import { useFetchData } from "@/hooks/use-fetch-data";
import type { StudentSessionsResponse } from "@/features/protected/pages/dashboard/student/types/student.types";
import { makeEndpoint } from "@/lib/http/make-endpoint";

export const STUDENT_SESSIONS_QUERY_KEY = "student-sessions";

/**
 * `upcoming` — ekhon theke shamner gula, shobar age-erta age
 * `past` — jegula shuru hoye geche, notun ta age
 * `all` — default
 */
export type SessionFilter = "upcoming" | "past" | "all";

type SessionsParams = {
  filter?: SessionFilter;
  /** Page number — backend-e param er naam `p` */
  page?: number;
  pageSize?: number;
};

/**
 * GET /student/sessions/ — "My Calendar".
 *
 * Note: ei endpoint date-range filter **support kore na** — shudhu
 * `upcoming`/`past`/`all` ar pagination (`p`, `page_size`). Tai calendar-er
 * month/week grid `filter=all` diye ene client-side e date onujayi bhag kore.
 *
 * Proti row-e `start_local` thake student-er nijer timezone-e, ar response-e
 * `timezone` label-o ashe.
 *
 * docs/bruno/student/sessions.bru
 */
export function useStudentSessions(params: SessionsParams = {}) {
  const query = {
    filter: params.filter,
    p: params.page,
    page_size: params.pageSize,
  };

  return useFetchData<StudentSessionsResponse>({
    url: makeEndpoint("/student/sessions/", query),
    querykey: [STUDENT_SESSIONS_QUERY_KEY, query],
  });
}

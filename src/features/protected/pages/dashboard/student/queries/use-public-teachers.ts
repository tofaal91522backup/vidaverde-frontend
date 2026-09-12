import { useFetchData } from "@/hooks/use-fetch-data";
import type { PublicTeacher } from "@/features/protected/pages/dashboard/student/types/student.types";
import { makeEndpoint } from "@/lib/http/make-endpoint";

export const PUBLIC_TEACHERS_QUERY_KEY = "public-teachers";

/**
 * GET /public/teachers/ — active teacher list, booking flow-er step 1.
 *
 * ⚠️ Ei endpoint **bare array** dey, `{ success, results }` envelope na —
 * tai return type `PublicTeacher[]`.
 *
 * Paginated na. `availability` weekly rule (school time) — asol bookable time-er
 * jonno `useTeacherSlots` lagbe.
 *
 * docs/bruno/public/teachers.bru
 */
export function usePublicTeachers(params?: { lang?: string }) {
  const query = { lang: params?.lang };

  return useFetchData<PublicTeacher[]>({
    url: makeEndpoint("/public/teachers/", query),
    querykey: [PUBLIC_TEACHERS_QUERY_KEY, query],
  });
}

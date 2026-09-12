import type {
  PublicLanguage,
  PublicTeacher,
} from "@/features/marketing/types/public-api.types";
import { useFetchData } from "@/hooks/use-fetch-data";
import { makeEndpoint } from "@/lib/http/make-endpoint";

export const PUBLIC_TEACHERS_QUERY_KEY = "public-teachers";
export const PUBLIC_TEACHER_QUERY_KEY = "public-teacher";

type PublicTeachersParams = {
  lang: PublicLanguage;
};

/** GET /public/teachers/ — active teachers, not paginated. */
export function usePublicTeachers(params: PublicTeachersParams) {
  return useFetchData<PublicTeacher[]>({
    url: makeEndpoint("/public/teachers/", params),
    querykey: [PUBLIC_TEACHERS_QUERY_KEY, params],
    client: "public",
  });
}

/** GET /public/teachers/:id/ — one active teacher for the public profile. */
export function usePublicTeacher({
  id,
  lang,
}: PublicTeachersParams & { id: string }) {
  const query = { lang };

  return useFetchData<PublicTeacher>({
    url: makeEndpoint(`/public/teachers/${id}/`, query),
    querykey: [PUBLIC_TEACHER_QUERY_KEY, id, query],
    client: "public",
    options: { enabled: Boolean(id) },
  });
}

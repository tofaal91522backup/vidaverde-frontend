import type { PublicLanguage } from "@/features/marketing/constants/public-api";
import type { TeacherPackagesResponse } from "@/features/marketing/types/public-api.types";
import { useFetchData } from "@/hooks/use-fetch-data";
import { makeEndpoint } from "@/lib/http/make-endpoint";

export const TEACHER_PACKAGES_QUERY_KEY = "public-teacher-packages";

/** Backend-er default-o 14. `next_available` koto dur khujbe. */
export const TEACHER_PACKAGES_DAYS = 14;

type TeacherPackagesParams = {
  teacherId: string | null;
  tz: string;
  days?: number;
  lang?: PublicLanguage;
};

/**
 * GET /public/teachers/:id/packages/ — **teacher-first** entry.
 *
 * `usePackageTeachers` er ulto dik. Mul booking flow package-first, kintu keu
 * jodi teacher card ba profile page theke "Book with X" chape, tokhon age jana
 * dorkar oi teacher-er shathe **kon package gula kena jay**.
 *
 * Ki ashe: active package jader teacher list-e ei teacher ache, **ar shathe shob
 * package jader kono teacher list-i nai** (unrestricted-i default).
 *
 * ⚠️ `restricted_to_listed_teachers` shudhu tokhon `true` jokhon package ta
 * **explicitly** ei teacher-ke name kore shimito. "Exclusive" badge ei flag
 * dhore dite hobe — `teacher_count` dhore na, karon unrestricted package-eo
 * oita boro hoy.
 *
 * `teacher.next_available` `null` hole-o package gula **kena jay** — availability
 * package-bhede bodlay na, tai card disable kora jabe na.
 *
 * Inactive teacher -> 404. Ei endpoint ar `packages/:id/teachers/` ek-i niyom
 * pore, ar backend-e test ache je duita kokhono alada bole na.
 *
 * docs/bruno/public/teacher packages.bru
 */
export function useTeacherPackages({
  teacherId,
  tz,
  days = TEACHER_PACKAGES_DAYS,
  lang,
}: TeacherPackagesParams) {
  const query = { days, tz, lang };

  return useFetchData<TeacherPackagesResponse>({
    url: makeEndpoint(`/public/teachers/${teacherId ?? ""}/packages/`, query),
    querykey: [TEACHER_PACKAGES_QUERY_KEY, teacherId, query],
    client: "public",
    options: { enabled: Boolean(teacherId) },
  });
}

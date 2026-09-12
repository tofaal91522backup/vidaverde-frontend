import { useFetchData } from "@/hooks/use-fetch-data";
import { makeEndpoint } from "@/lib/http/make-endpoint";
/**
 * Type-ta marketing feature theke import kora hoy, duplicate kore na.
 *
 * Eta feature-er nijer shape na — backend-er contract. Duita jaygay duita copy
 * rakhle backend field add korle ek ta chup-chap purono theke jeto. Ar eta
 * **type-only import**, tai marketing-er kono runtime code ekhane ashe na.
 */
import type { PackageTeachersResponse } from "@/features/marketing/types/public-api.types";

export const PACKAGE_TEACHERS_QUERY_KEY = "student-package-teachers";

type PackageTeachersParams = {
  /** **Catalogue** package-er UUID — `StudentPackage.package`, `StudentPackage.id` NA. */
  packageId: string | null;
  /** YYYY-MM-DD. Na dile backend aj (school time) dhore ney. */
  date?: string;
  /** Student-er nijer IANA zone (`profile.timezone`), browser-er ta na. */
  tz?: string;
  /** 1-31. Booking grid ek week dekhay tai 7. */
  days?: number;
  enabled?: boolean;
};

/**
 * GET /public/packages/:id/teachers/ — oi package-e book kora jay emon teacher,
 * protyek-er puro slot list shoho.
 *
 * **Keno portal-e eta dorkar:** package ekhon nirdishto teacher-e shimito kora
 * jay, ar backend oi restriction `POST /student/sessions/` eo enforce kore.
 * Portal-er teacher picker ekhon `/public/teachers/` theke **shob** teacher
 * dekhay — restricted package-e student onno teacher balle submit-e 400 khabe
 * ar karon bujhbe na.
 *
 * ⚠️ **Khali `teachers` array mane "teacher nai" na.** Jar ei window-e ekta-o
 * slot nai, backend take bad diye dey. Khali list mane "ei koy din-e keu free nai".
 *
 * Public endpoint, kintu student logged-in thake — tai `use-teacher-slots.ts`
 * er moto normal authenticated `request` diyei jay.
 *
 * docs/bruno/public/package teachers.bru
 */
export function usePackageTeachers({
  packageId,
  date,
  tz,
  days = 7,
  enabled = true,
}: PackageTeachersParams) {
  const query = { date, tz, days };

  return useFetchData<PackageTeachersResponse>({
    url: makeEndpoint(`/public/packages/${packageId ?? ""}/teachers/`, query),
    querykey: [PACKAGE_TEACHERS_QUERY_KEY, packageId, query],
    options: { enabled: enabled && Boolean(packageId) },
  });
}

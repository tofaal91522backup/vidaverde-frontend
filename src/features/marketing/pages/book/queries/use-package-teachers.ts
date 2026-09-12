import type { PublicLanguage } from "@/features/marketing/constants/public-api";
import type { PackageTeachersResponse } from "@/features/marketing/types/public-api.types";
import { useFetchData } from "@/hooks/use-fetch-data";
import { makeEndpoint } from "@/lib/http/make-endpoint";

export const PACKAGE_TEACHERS_QUERY_KEY = "public-package-teachers";

/**
 * Ek call-e koto din-er slot ana hoy. Backend 1-31 ney ar default 14 dhore,
 * kintu booking grid ek week dekhay.
 *
 * Student portal-eo ek-i 7 (`student/queries/use-package-teachers.ts`).
 */
export const PUBLIC_SLOT_DAYS = 7;

type PackageTeachersParams = {
  packageId: string | null;
  /** YYYY-MM-DD, window-er prothom din. Khali hole backend aj (school time) dhore ney. */
  date?: string;
  /** Visitor-er IANA zone. Ochena zone hole backend 400 dey. */
  tz: string;
  /** 1-31. Backend default 14, kintu booking grid ek week dekhay tai 7. */
  days?: number;
  lang?: PublicLanguage;
};

/**
 * GET /public/packages/:id/teachers/ — **booking step 2**.
 *
 * Package dile oi package-e book kora jay emon teacher gula ashe, **protyek-er
 * puro slot list shoho**. Mane teacher bachai ar date picker ek-i screen —
 * teacher select korar por alada kore slot fetch korte hoy na.
 *
 * ⚠️ **Khali `teachers` array mane "package-e teacher nai" na.** Jei teacher-er
 * ei window-e ekta-o slot nai, backend take **bad diye dey**. Tai khali list
 * mane "ei koy din-e keu free nai" — UI-te `days` barie dekhar option deya
 * uchit, "no teachers" bola jabe na.
 *
 * `package.restricted` bole package ta nirdishto teacher-e shimito kina.
 * Restricted package-er shob teacher deactivated hole backend shob active
 * teacher-e fallback kore, khali picker dekhay na.
 *
 * ⚠️ Slot-er `start_utc` **hubohu** checkout-e `start_datetime` hisebe pathate
 * hobe. Restriction checkout-e abar check hoy — ei list filter kora-i ekmatro guard na.
 *
 * docs/bruno/public/package teachers.bru
 */
export function usePackageTeachers({
  packageId,
  date,
  tz,
  days = PUBLIC_SLOT_DAYS,
  lang,
}: PackageTeachersParams) {
  const query = { date: date || undefined, days, tz, lang };

  return useFetchData<PackageTeachersResponse>({
    url: makeEndpoint(`/public/packages/${packageId ?? ""}/teachers/`, query),
    querykey: [PACKAGE_TEACHERS_QUERY_KEY, packageId, query],
    client: "public",
    options: { enabled: Boolean(packageId) },
  });
}

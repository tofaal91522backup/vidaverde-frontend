import type { ListResponse } from "@/types/api-response.type";

/**
 * Admin list endpoint gula duita alada shape dey, ar bru file-e kono ta-i
 * dekhano nai.
 *
 * **Backend source dekhe confirm kora (2026-09-12):**
 * - `teachers`, `admins` — hate lekha `APIView`, dey `{ success, results }`
 * - `packages`, `blogs`, `testimonials` — DRF `ListCreateAPIView`, dey **bare array**
 *
 * Eta kono design decision na, duijon dui style-e likheche. Duitai dhorar jonno
 * ei helper — backend ek rokom na kora porjonto eta rakhte hobe.
 */
export function toList<T>(
  data: ListResponse<T> | T[] | undefined | null,
): T[] {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  return data.results ?? [];
}

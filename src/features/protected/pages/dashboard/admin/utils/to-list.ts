import type { ListResponse } from "@/types/api-response.type";

/**
 * Kichu admin list endpoint-er shape bru file-e dekhano nai — POST bare object
 * dey ar doc bole "not paginated", kintu GET list-er example nai.
 * (teachers, packages, testimonials, admins)
 *
 * Backend bare array dilo naki `{ success, results }` dilo — dui khetrei kaj
 * kore, tai ekhane normalize kora hoy. Asol shape confirm hole ei helper
 * shoriye direct kora jabe.
 */
export function toList<T>(
  data: ListResponse<T> | T[] | undefined | null,
): T[] {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  return data.results ?? [];
}

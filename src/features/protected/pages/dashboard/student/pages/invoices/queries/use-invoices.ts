import { useFetchData } from "@/hooks/use-fetch-data";
import type { StudentInvoicesResponse } from "@/features/protected/pages/dashboard/student/types/student.types";

export const INVOICES_QUERY_KEY = "student-invoices";

/**
 * GET /student/invoices/ — "My Invoices" list.
 *
 * Note: ei endpoint-e kono query param nai — pagination, search ba status
 * filter backend support kore na, puro list ek shathe ashe. Tai search
 * frontend-e client-side kora hoy.
 *
 * docs/bruno/student/invoices.bru
 */
export function useInvoices() {
  return useFetchData<StudentInvoicesResponse>({
    url: "/student/invoices/",
    querykey: [INVOICES_QUERY_KEY],
  });
}

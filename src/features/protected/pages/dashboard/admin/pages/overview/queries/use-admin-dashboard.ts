import { useFetchData } from "@/hooks/use-fetch-data";
import type { AdminDashboardResponse } from "@/features/protected/pages/dashboard/admin/types/admin.types";

export const ADMIN_DASHBOARD_QUERY_KEY = "admin-dashboard";

/**
 * GET /administrator/dashboard/summary/ — summary card-er shob number ek call-e,
 * shathe porer 10 ta upcoming session.
 *
 * `revenue_30d` / `bookings_30d` shesh 30 diner paid purchase gone.
 * `emails_failed` UI te dekhano uchit — cron 3 bar try korar por-o pathate pare ni.
 *
 * docs/bruno/administrator/dashboard summary.bru
 */
export function useAdminDashboard() {
  return useFetchData<AdminDashboardResponse>({
    url: "/administrator/dashboard/summary/",
    querykey: [ADMIN_DASHBOARD_QUERY_KEY],
  });
}

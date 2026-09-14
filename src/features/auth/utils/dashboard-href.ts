import type { DashboardUser } from "@/components/layout/navbar/dashboard-user-menu";

/**
 * Role dekhe kon dashboard-e jabe.
 *
 * Tinta jaygay ei ek-i sorto lagto — navbar-er Dashboard button, mobile tab
 * bar ar account menu — tai ekjaygay. `null` mane ei user-er kono dashboard
 * nai, tokhon link-ta dekhano-i hoy na.
 */
export function dashboardHref(user?: DashboardUser | null): string | null {
  if (user?.role === "ADMIN") return "/dashboard/admin";
  if (user?.role === "STUDENT") return "/dashboard/student";
  return null;
}

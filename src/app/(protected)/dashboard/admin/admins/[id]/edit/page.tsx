import EditAdminPage from "@/features/protected/pages/dashboard/admin/pages/admins/edit-admin-page";
import type { DynamicRouteIdParams } from "@/types/dynamic-route-id-params.type";
export default async ({ params }: DynamicRouteIdParams) => (
  <EditAdminPage id={(await params).id} />
);

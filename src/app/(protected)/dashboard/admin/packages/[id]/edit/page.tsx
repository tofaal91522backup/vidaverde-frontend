import EditPackagePage from "@/features/protected/pages/dashboard/admin/pages/packages/edit-package-page";
import type { DynamicRouteIdParams } from "@/types/dynamic-route-id-params.type";
export default async ({ params }: DynamicRouteIdParams) => (
  <EditPackagePage id={(await params).id} />
);

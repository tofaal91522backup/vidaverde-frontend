import EditTeacherPage from "@/features/protected/pages/dashboard/admin/pages/teachers/edit-teacher-page";
import type { DynamicRouteIdParams } from "@/types/dynamic-route-id-params.type";
export default async ({ params }: DynamicRouteIdParams) => (
  <EditTeacherPage id={(await params).id} />
);

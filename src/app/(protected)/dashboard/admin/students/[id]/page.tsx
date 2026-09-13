import StudentDetailPage from "@/features/protected/pages/dashboard/admin/pages/students/student-detail-page";
import type { DynamicRouteIdParams } from "@/types/dynamic-route-id-params.type";
export default async ({ params }: DynamicRouteIdParams) => (
  <StudentDetailPage id={(await params).id} />
);

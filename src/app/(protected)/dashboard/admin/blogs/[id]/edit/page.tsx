import EditBlogPage from "@/features/protected/pages/dashboard/admin/pages/blogs/edit-blog-page";
import type { DynamicRouteIdParams } from "@/types/dynamic-route-id-params.type";
export default async ({ params }: DynamicRouteIdParams) => (
  <EditBlogPage id={(await params).id} />
);

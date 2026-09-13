import EditTestimonialPage from "@/features/protected/pages/dashboard/admin/pages/testimonials/edit-testimonial-page";
import type { DynamicRouteIdParams } from "@/types/dynamic-route-id-params.type";
export default async ({ params }: DynamicRouteIdParams) => (
  <EditTestimonialPage id={(await params).id} />
);

import EditTestimonialPage from "@/features/protected/pages/dashboard/admin/pages/testimonials/edit-testimonial-page";
export default ({ params }: { params: { id: string } }) => (
  <EditTestimonialPage id={params.id} />
);

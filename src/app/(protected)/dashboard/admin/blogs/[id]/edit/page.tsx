import EditBlogPage from "@/features/protected/pages/dashboard/admin/pages/blogs/edit-blog-page";
export default ({ params }: { params: { id: string } }) => (
  <EditBlogPage id={params.id} />
);

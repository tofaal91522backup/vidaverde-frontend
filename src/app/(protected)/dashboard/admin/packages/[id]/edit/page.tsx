import EditPackagePage from "@/features/protected/pages/dashboard/admin/pages/packages/edit-package-page";
export default ({ params }: { params: { id: string } }) => (
  <EditPackagePage id={params.id} />
);

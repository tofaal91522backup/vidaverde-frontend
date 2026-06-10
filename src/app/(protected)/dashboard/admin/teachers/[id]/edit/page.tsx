import EditTeacherPage from "@/features/protected/pages/dashboard/admin/pages/teachers/edit-teacher-page";
export default ({ params }: { params: { id: string } }) => (
  <EditTeacherPage id={params.id} />
);

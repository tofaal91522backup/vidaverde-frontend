import StudentDetailPage from "@/features/protected/pages/dashboard/admin/pages/students/student-detail-page";
export default ({ params }: { params: { id: string } }) => (
  <StudentDetailPage id={params.id} />
);

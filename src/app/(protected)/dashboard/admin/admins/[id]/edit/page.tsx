import EditAdminPage from "@/features/protected/pages/dashboard/admin/pages/admins/edit-admin-page";
export default async ({ params }: { params: Promise<{ id: string }> }) => <EditAdminPage id={(await params).id} />;

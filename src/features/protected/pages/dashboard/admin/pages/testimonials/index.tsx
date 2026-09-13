import { Button } from "@/components/ui/button";
import DashboardPageLayout from "@/features/protected/pages/dashboard/shared/components/dashboard-page-layout";
import { Plus } from "lucide-react";
import Link from "next/link";
import { TestimonialsTable } from "./components/testimonials-table";

export default function TestimonialsIndex() {
  return (
    <DashboardPageLayout
      title="Testimonials"
      subtitle="Student outcomes shown on the public site. Only 'Shown' ones appear there."
      /* Add button toolbar theke ekhane — filter gula tokhon jayga pay */
      action={
        <Button asChild>
          <Link href="/dashboard/admin/testimonials/create">
            <Plus className="h-4 w-4" />
            New Testimonial
          </Link>
        </Button>
      }
    >
      <TestimonialsTable />
    </DashboardPageLayout>
  );
}
